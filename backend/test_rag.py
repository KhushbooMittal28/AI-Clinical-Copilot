from rag_service import RAGService

rag = RAGService()

question = "What blood pressure threshold does WHO recommend for starting medication in adults?"

results = rag.search(question, top_k=5)

for i, result in enumerate(results, start=1):
    print(f"\nResult {i}")
    print("Score:", result["score"])
    print("Source:", result["source_file"])
    print("Page:", result["page_number"])
    print("Text:", result["text"])