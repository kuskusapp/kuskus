use axum::{extract::Query, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
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
    message: String,
}

async fn subtasks_from_request(Query(request_data): Query<JsonRequest>) -> impl IntoResponse {
    let response = format!("Received request: {}", request_data.request);
    (StatusCode::OK, Json(response))
}
