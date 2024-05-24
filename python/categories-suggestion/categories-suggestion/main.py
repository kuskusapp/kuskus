from typing import List
from fastapi import FastAPI, Query
from sentence_transformers import SentenceTransformer, util
import uvicorn

from .api import parsing
from .api import ranking
from .api.db import create_async_client
from .api.queries import fetch_available_texts

app = FastAPI()
available_topics = []
available_texts = []
corpus_embeddings = None
model = None

def start():
    uvicorn.run("my_package.main:app", host="0.0.0.0", port=8000, reload=True)

@app.on_event("startup")
async def startup():
    global model
    # Load the model on startup
    model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
    await update_texts()

@app.get("/suggest-categories/", response_model=List[str])
async def suggest_topics(text: str = Query(...), k: int = Query(2)) -> List[str]:
    global corpus_embeddings
    print(f"Received request with text of length={len(text)} and k={k}")
    query_embedding = model.encode(text, convert_to_tensor=True)
    cosine_scores = util.pytorch_cos_sim(query_embedding, corpus_embeddings)[0]
    top_k_indices = cosine_scores.topk(k).indices
    return [available_topics[i] for i in top_k_indices]

@app.post("/update_texts/")
async def update_texts() -> str:
    global available_texts, available_topics, corpus_embeddings, model
    topics_dict = await fetch_available_texts()
    available_texts = [i['description'] for i in topics_dict]
    available_topics = [i['name'] for i in topics_dict]
    corpus_embeddings = model.encode(available_texts, convert_to_tensor=True)
    return f"TEXTS UPDATED, got {len(available_topics)} texts"

@app.post("/force-update-texts/")
async def force_update_texts() -> str:
    await update_texts()
    return "TEXTS FORCE UPDATED"

