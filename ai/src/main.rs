use axum::{extract::Query, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use dotenvy::dotenv;
use llm_chain::{executor, output::Output, parameters, prompt, step::Step};
use redis::Commands;
use serde::{Deserialize, Serialize};
use std::{collections::VecDeque, net::SocketAddr};

#[tokio::main]
async fn main() {
    let ext = extract_first_list("
    Sure, here are the steps to create a CLI in Rust to scrape title and URL from a website:

1. Create a new Rust project by running `cargo new project-name --bin` in your terminal. Replace `project-name` with your desired project name.
2. Navigate to the project directory by running `cd project-name`.
3. Open `Cargo.toml` and add the following section



   These dependencies will be required for HTTP requests, HTML parsing, and CLI parameter parsing respectively.

4. Create a new file named `main.rs` to write your Rust code.
5. Start by importing the required libraries by adding the following code:



6. Define the initial client by adding `let client = Client::new();` below the imports.
7. Define the CLI parameters by adding the following code
   This will prompt the user to specify the URL to scrape when running the CLI.

8. Parse the URL provided by the user by adding the following code:


   This will send an HTTP GET request to the specified URL and retrieve the HTML content.

9. Extract the title and URLs by adding the following code:

   This code finds all anchor tags (`<a>`) in the HTML document that have an `href` attribute (i.e., links) and then extracts their `text` and `href` attributes, respectively.

10. Save the file and run the CLI by running `cargo run <url>` in your terminal, where `<url>` is the URL you want to scrape.

That's it! The CLI will now scrape the title and URLs from the specified website and print them to the console.
    ");

    println!("{:?}", ext);
    // load environment variables from .env file
    dotenv().expect(".env file not found");

    // define routes
    let app = Router::new().route("/", get(subtasks_from_request));

    // run it on 3001 port. 3000 is used for web app
    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

#[derive(Deserialize, Debug)]
struct JsonRequest {
    request: String,
}

#[derive(Deserialize, Serialize, Debug)]
struct Subtask {
    title: String,
    note: String,
}

#[derive(Deserialize, Serialize, Debug)]
struct JsonResponse {
    subtasks: Vec<Subtask>,
}

// {
// "subtasks": [{
// "title": "markdown",
// "note": "markdown",
// }]
// }

#[derive(Serialize, Debug, Deserialize)]
enum SubtasksResponse {
    Success(JsonResponse),
    Error(String),
}

async fn subtasks_from_request(Query(request_data): Query<JsonRequest>) -> impl IntoResponse {
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

    if let Ok(data) = con.get(&format!("cache:{}", request_data.request)) {
        let s: String = data;
        return (
            StatusCode::OK,
            Json(SubtasksResponse::Success(serde_json::from_str(&s).unwrap())),
        );
    }

    // Create a new ChatGPT executor
    let exec = executor!();
    if let Err(e) = exec {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(SubtasksResponse::Error(format!("Error: {}", e))),
        );
    }
    let exec = exec.unwrap();

    // Create our step containing our prompt template
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

    let response = JsonResponse { subtasks };

    if let Ok(s) = con.set(
        &format!("cache:{}", &request_data.request),
        serde_json::to_string(&response).unwrap(),
    ) {
        let s: String = s;
        println!("set cache: {}", s);
    }

    (StatusCode::OK, Json(SubtasksResponse::Success(response)))
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
