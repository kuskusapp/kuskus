use axum::{
    debug_handler, extract::Query, http::StatusCode, response::IntoResponse, routing::get, Json,
    Router,
};
use dotenvy::dotenv;
use http::Method;
use jwt_authorizer::{JwtAuthorizer, JwtClaims, Validation};
use llm_chain::{executor, output::Output, parameters, prompt, step::Step};
use redis::Commands;
use serde::{Deserialize, Serialize};
use std::{collections::VecDeque, net::SocketAddr};
use tower_http::cors::{Any, CorsLayer};

#[derive(Debug, Deserialize, Clone)]
struct User {
    // sub: String // is the user id
}

#[tokio::main]
async fn main() {
    // load environment variables from .env file
    dotenv().expect(".env file not found");

    let cors = CorsLayer::new()
        .allow_methods([Method::GET])
        .allow_headers(Any)
        // allow requests from any origin
        .allow_origin(Any);

    // create an authorizer builder from a JWKS Endpoint
    let validation = Validation::new().aud(&[std::env::var("OIDC_CLIENT_ID").unwrap()]);
    let jwt_auth: JwtAuthorizer<User> =
        JwtAuthorizer::from_oidc(&std::env::var("OIDC_ISSUER").unwrap()).validation(validation);

    // define routes
    let app = Router::new()
        .route("/subtasks", get(subtasks_request))
        .route("/explain", get(explain_request))
        .layer(jwt_auth.layer().await.unwrap())
        .layer(cors);

    // run it on 3001 port. 3000 is used for web app
    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

#[derive(Deserialize, Debug)]
struct JsonRequestWithModel {
    request: String,
    #[serde(default = "default_model")]
    model: String, // llm_chain_openai::chatgpt::Model, But that's not serializable?
}

fn default_model() -> String {
    "gpt-3".to_string()
}

#[derive(Deserialize, Serialize, Debug)]
struct Subtask {
    title: String,
    note: String,
}

// {
// "subtasks": [{
//   "title": "markdown",
//   "note": "markdown",
// }]
// }
#[derive(Deserialize, Serialize, Debug)]
struct JsonSubtasksResponse {
    subtasks: Vec<Subtask>,
}

#[derive(Serialize, Debug, Deserialize)]
enum SubtasksResponse {
    Success(JsonSubtasksResponse),
    Error(String),
}

struct AppState {}

#[debug_handler]
async fn subtasks_request(
    Query(request_data): Query<JsonRequestWithModel>,
    JwtClaims(_claims): JwtClaims<User>,
) -> impl IntoResponse {
    let client = redis::Client::open(
        std::env::var("UPSTASH_REDIS_CONNECTION").expect("UPSTASH_REDIS_CONNECTION not found"),
    );
    if let Err(e) = client {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(SubtasksResponse::Error(format!("Error: {}", e))),
        );
    }
    let client = client.unwrap();

    let con = client.get_connection();
    if let Err(e) = con {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(SubtasksResponse::Error(format!("Error: {}", e))),
        );
    }
    let mut con = con.unwrap();

    // TODO: also dash separate the request string (remove extra spaces)
    // also force lowercase. remove the final full stops too.
    // try to make the caches that are super similar, cache to one value to not make repeated requests.
    // i.e. for request: `Make a game`. redis key is `gpt-3-subtasks-make-a-game`
    // key for redis is of form `gpt-3-subtasks-request`, where gpt-3 and request are variables coming from request

    let redis_key = format!("{}-subtasks-{}", request_data.model, request_data.request);
    if let Ok(data) = con.get(&format!("{}", redis_key)) {
        let s: String = data;
        return (
            StatusCode::OK,
            Json(SubtasksResponse::Success(serde_json::from_str(&s).unwrap())),
        );
    }

    // TODO: the request should also return the number of tokens that were used to make the request
    // on discord, someone wrote:
    // openai Executor returns Output::Response which wraps CreateChatCompletionResponse which has a usage: Option<Usage> field that should contain token usage data
    // not sure how to make it work

    // TODO: should use the model passed in the request
    // https://docs.rs/llm-chain/latest/llm_chain/step/struct.Step.html
    // unclear how to pass in which model to use to llm-chain

    // let model = "gpt-3.5-turbo"; // TODO: can use it later
    // Create a new ChatGPT executor
    let exec = executor!();
    if let Err(e) = exec {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(SubtasksResponse::Error(format!("Error: {}", e))),
        );
    }
    let exec = exec.unwrap();

    // creates step with prompt to generate subtasks from a given request
    // does not have to be a step, but in future maybe can chain things
    // llm-chain allows you to do it directly without a step too, don't think there is any perf hit though
    // so leaving it like this
    let step = Step::for_prompt_template(prompt!(
        "You are a bot for creating subtasks from a given task to you.",
        "Provide detailed steps to do this task: {{text}}. Use bullet points for each step.",
    ));

    let res = step.run(&parameters!(&request_data.request), &exec).await;

    if let Err(e) = res {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(SubtasksResponse::Error(format!("Error: {}", e))),
        );
    }
    let res = res.unwrap();
    println!("{}", res);

    let text_output = res
        .primary_textual_output()
        .await
        .expect("our model will always return at least one output");

    let subtasks: Vec<_> = extract_first_list(&text_output)
        .into_iter()
        .map(|(title, note)| Subtask { title, note })
        .collect();

    let response = JsonSubtasksResponse { subtasks };

    if let Ok(s) = con.set(
        &format!("{}", redis_key),
        serde_json::to_string(&response).unwrap(),
    ) {
        let s: String = s;
        println!("set cache: {}", s);
    }

    (StatusCode::OK, Json(SubtasksResponse::Success(response)))
}

#[derive(Deserialize, Serialize, Debug)]
struct JsonExplainResponse {
    explanation: String,
}

#[derive(Serialize, Debug, Deserialize)]
enum ExplainResponse {
    Success(JsonExplainResponse),
    Error(String),
}

#[debug_handler]
async fn explain_request(Query(request_data): Query<JsonRequestWithModel>) -> impl IntoResponse {
    let client = redis::Client::open(
        std::env::var("UPSTASH_REDIS_CONNECTION").expect("UPSTASH_REDIS_CONNECTION not found"),
    );
    if let Err(e) = client {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ExplainResponse::Error(format!("Error: {}", e))),
        );
    }
    let client = client.unwrap();

    let con = client.get_connection();
    if let Err(e) = con {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ExplainResponse::Error(format!("Error: {}", e))),
        );
    }
    let mut con = con.unwrap();

    let redis_key = format!("{}-explain-{}", request_data.model, request_data.request);
    if let Ok(data) = con.get(&format!("cache:{}", redis_key)) {
        let s: String = data;
        return (
            StatusCode::OK,
            Json(ExplainResponse::Success(serde_json::from_str(&s).unwrap())),
        );
    }

    // Create a new ChatGPT executor
    let exec = executor!();
    if let Err(e) = exec {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ExplainResponse::Error(format!("Error: {}", e))),
        );
    }
    let exec = exec.unwrap();

    // creates step with prompt to generate explanation for a given request
    let step = Step::for_prompt_template(prompt!(
        "You are a bot for explaining things in detail.",
        "Provide detailed explanation for what this is: {{text}}.",
    ));

    let res = step.run(&parameters!(&request_data.request), &exec).await;

    if let Err(e) = res {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ExplainResponse::Error(format!("Error: {}", e))),
        );
    }
    let res = res.unwrap();

    let explain_response = JsonExplainResponse {
        explanation: res.primary_textual_output().await.unwrap(),
    };

    if let Ok(s) = con.set(
        &redis_key,
        serde_json::to_string(&explain_response).unwrap(),
    ) {
        let s: String = s;
        println!("set cache: {}", s);
    }

    (
        StatusCode::OK,
        Json(ExplainResponse::Success(explain_response)),
    )
}

// === new stuff ===

// 1.
//   1.
//   2.
// 2.

// well first you could have something like this:
// 1. foo
// 2. bar
// but then if consider foo
// 1. something else
// 2. something else

use markdown::{mdast::Node, to_mdast, ParseOptions};
/// Extracts the first list from the LLM response
///
/// LLMs are often inconsistent when they return lists. This function grabs the first list we encounter.
/// ```markdown
/// - a list of two items
/// - this second one
///
/// 1. another list
/// 2. that's irrelevant
/// ```
///
/// # Parameters
/// - `text` the text to parse
///
/// # Returns
/// Vec<String> A vector of key value pairs.
///
/// # Examples
///
/// ```ignore
/// use llm_chain::parsing::extract_labeled_text;
/// let data = "
/// - alpha: beta
/// - *gamma*: delta
/// ";
/// let labs = extract_labeled_text(data);
/// println!("{:?}", labs);
/// assert_eq!(labs[0], ("alpha".to_string(), "beta".to_string()));
/// ```
pub fn extract_first_list(text: &str) -> Vec<(String, String)> {
    let options = ParseOptions::default();
    let ast = to_mdast(text, &options).expect("markdown parsing can't fail");
    let mut nodes = VecDeque::new();
    nodes.push_back(ast);
    // We need a list to contain the things we found. (or maybe not actually)
    let mut extracted_items = Vec::new();

    while let Some(node) = nodes.pop_front() {
        match node {
            Node::List(list) => {
                for child in &list.children {
                    match &child {
                        Node::ListItem(item) => {
                            let pos = item
                                .position
                                .as_ref()
                                .expect("position can't fail (maybe?)");
                            let snippet = text[pos.start.offset..pos.end.offset].to_string();
                            let (title, note) = snippet.split_once("\n").unwrap_or((&snippet, ""));
                            extracted_items.push((title.to_string(), note.to_string()));
                        }
                        _ => {}
                    }
                }
                return extracted_items;
            }
            _ => {}
        }
        let mut index = 0;
        if let Some(children) = node.children() {
            for child in children.iter().cloned() {
                nodes.insert(index, child);
                index += 1;
            }
        }
    }
    extracted_items
}
