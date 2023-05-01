use axum::{extract::Query, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use dotenvy::dotenv;
use llm_chain::{executor, parameters, prompt, step::Step};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
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

#[derive(Deserialize)]
struct JsonRequest {
    request: String,
}

#[derive(Serialize)]
struct JsonResponse {
    message: Vec<String>,
}

// {
// "message": ["1. subtask", "2. subtask"]
// }

async fn subtasks_from_request(Query(request_data): Query<JsonRequest>) -> impl IntoResponse {
    // Create a new ChatGPT executor
    let exec = executor!();
    if let Err(e) = exec {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(format!("Error: {}", e)),
        );
    }
    let exec = exec.unwrap();

    // Create our step containing our prompt template
    let step = Step::for_prompt_template(prompt!(
        "You are a bot for creating subtasks from a given task to you.",
        "Provide detailed steps to do this task: {{text}}. Use bullet points for each step.",
    ));

    let res = step.run(&parameters!(request_data.request), &exec).await;

    if let Err(e) = res {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(format!("Error: {}", e)),
        );
    }
    let res = res.unwrap();

    println!("{}", res);

    let response = format!("Received request: {}", res);
    (StatusCode::OK, Json(response))
}
