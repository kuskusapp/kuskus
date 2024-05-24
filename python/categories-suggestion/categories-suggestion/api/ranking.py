from typing import List
from fastbm25 import fastbm25


def get_nearest_topics(model: fastbm25, text: str, k: int):
    bm_pred = model.top_k_sentence(text, k)
    print([(_[1], _[2]) for _ in bm_pred])
    return [_[1] for _ in bm_pred]