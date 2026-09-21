# Retrieval-Augmented Generation (RAG)

This directory contains the components and experiments related to Retrieval-Augmented Generation (RAG) for the AI Clinical Copilot project.

## Purpose

The RAG pipeline is intended to support clinical information retrieval by retrieving relevant information from trusted knowledge sources and providing it as context to the language model.

The goal is to improve the relevance and grounding of generated responses while keeping the retrieved information traceable to its source.

## Planned Workflow

The RAG workflow will generally follow these steps:

1. Collect and prepare relevant clinical documents.
2. Clean and preprocess the documents.
3. Split documents into smaller chunks.
4. Generate embeddings for the document chunks.
5. Store embeddings in a vector database.
6. Retrieve relevant chunks based on a user query.
7. Provide the retrieved context to the language model.
8. Generate a grounded response using the retrieved information.

## Directory Structure

```text
rag/
├── README.md
├── ingestion/
├── retrieval/
├── embeddings/
└── evaluation/