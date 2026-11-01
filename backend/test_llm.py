
from llm_service import generate_clinical_answer

question = (
    "What blood pressure threshold does WHO recommend "
    "for starting medication in adults?"
)

result = generate_clinical_answer(question)

print("\n========== AI GENERATED ANSWER ==========\n")
print(result["answer"])

print("\n========== SOURCES ==========\n")

for source in result["sources"]:
    print(
        f"Document: {source['source_file']} | "
        f"PDF Page: {source['page_number']} | "
        f"Score: {source['score']:.3f}"
    )
