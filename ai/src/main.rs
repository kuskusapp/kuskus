use axum::{http::StatusCode, routing::get, Json, Router};
use serde::Serialize;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    // build our application with a route
    let app = Router::new().route("/", get(handler));

    // run it, 3001 port is used as 3000 is web app for now
    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handler() -> (StatusCode, Json<MyJsonResponse>) {
    let response = MyJsonResponse {
        message: "Hello from JSON!".to_string(),
    };

    (StatusCode::OK, Json(response))
}

#[derive(Serialize)]
struct MyJsonResponse {
    message: String,
}
