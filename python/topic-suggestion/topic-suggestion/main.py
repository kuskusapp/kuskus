from typing import List
from fastapi import FastAPI
from fastbm25 import fastbm25
import uvicorn 

from .api import parsing
from .api import ranking
from .api.db import create_async_client
from .api.queries import fetch_available_texts

app = FastAPI()
available_topics = []
available_texts = []

def start():
    uvicorn.run("my_package.main:app", host="0.0.0.0", port=8000, reload=True)

@app.on_event("startup")
async def startup():
    global client
    client = create_async_client()
    await update_texts()

@app.get("/suggest-topics/")
async def suggest_topics(url: str, k: int) -> List[str]:
    print(f"Received request with url={url} and k={k}")
    parsed_text = parsing.parse_text_from_url(url)
    print(parsed_text)
    close_topics_ids = ranking.get_nearest_topics(ranking_model, parsed_text, k)  
    return [available_topics[i] for i in close_topics_ids]

@app.post("/update_texts/")
async def update_texts() -> str:
    global available_texts, available_topics, ranking_model
    topics_dict = await fetch_available_texts(client)
    available_texts = [i['description'] for i in topics_dict]
    available_topics = [i['topic_name'] for i in topics_dict]
    tokenized_corpus = [doc.lower().split(" ") for doc in available_texts]
    ranking_model = fastbm25(tokenized_corpus)

    return "TEXTS UPDATED"

@app.post("/force-update-texts/")
async def force_update_texts() -> str:
    await update_texts()
    return "TEXTS FORCE UPDATED"
