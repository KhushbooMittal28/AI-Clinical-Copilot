
import json
from pathlib import Path

import faiss
import numpy as np
from sentence_transformers import SentenceTransformer


# Paths to the saved RAG vector store
BASE_DIR = Path(__file__).resolve().parent
VECTOR_STORE_DIR = BASE_DIR / "rag_vector_store"

INDEX_PATH = VECTOR_STORE_DIR / "clinical_guidelines.faiss"
METADATA_PATH = VECTOR_STORE_DIR / "metadata.json"
MODEL_PATH = VECTOR_STORE_DIR / "model_name.txt"


class RAGService:

    def __init__(self):
        print("Loading Clinical Guidelines RAG Service...")

        # Load embedding model name
        model_name = MODEL_PATH.read_text(encoding="utf-8").strip()

        # Load the embedding model
        self.model = SentenceTransformer(model_name)

        # Load FAISS index
        self.index = faiss.read_index(str(INDEX_PATH))

        # Load chunk metadata
        with METADATA_PATH.open("r", encoding="utf-8") as file:
            self.metadata = json.load(file)

        print("RAG Service loaded successfully!")
        print("Total indexed vectors:", self.index.ntotal)
        print("Total metadata records:", len(self.metadata))

    def search(self, query: str, top_k: int = 5):

        # Convert query into an embedding
        query_embedding = self.model.encode(
            [query],
            convert_to_numpy=True,
            normalize_embeddings=True
        )

        query_embedding = np.asarray(
            query_embedding,
            dtype="float32"
        )

        # Search the FAISS index
        scores, indices = self.index.search(
            query_embedding,
            top_k
        )

        results = []

        for score, index_id in zip(scores[0], indices[0]):

            if index_id < 0:
                continue

            if index_id >= len(self.metadata):
                continue

            chunk = self.metadata[index_id]

            results.append({
                "score": float(score),
                "source_file": chunk.get("source_file"),
                "page_number": chunk.get("page_number"),
                "text": chunk.get("text")
            })

        return results
