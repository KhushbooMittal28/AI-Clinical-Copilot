
import os

from dotenv import load_dotenv
from google import genai

from rag_service import RAGService


# Load environment variables from backend/.env
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found. Check your .env file.")

# Initialize Gemini
client = genai.Client(api_key=API_KEY)

# Initialize existing RAG service
rag = RAGService()

MODEL_NAME = "gemini-3.8-flash"


def generate_clinical_answer(question: str, top_k: int = 5):

    # Step 1: Retrieve relevant WHO guideline passages
    retrieved_results = rag.search(question, top_k=top_k)

    if not retrieved_results:
        return {
            "answer": "I could not find relevant information in the available clinical guidelines.",
            "sources": []
        }

    # Step 2: Prepare evidence context
    context = ""

    for i, result in enumerate(retrieved_results, start=1):
        context += f"""
        Source {i}
        Document: {result.get('source_file')}
        PDF Page: {result.get('page_number')}
        Similarity Score: {result.get('score')}
        Content:
        {result.get('text')}
        \n
        """

    # Step 3: Build grounded prompt
    prompt = f"""
    You are an AI Clinical Copilot designed to assist healthcare
    professionals in primary care.

    Answer the user's question using ONLY the clinical guideline
    evidence provided below.

    IMPORTANT RULES:
    1. Do not invent medical facts or recommendations.
    2. If the evidence is insufficient, clearly say so.
    3. Do not make a diagnosis or prescribe medication.
    4. Distinguish recommendations from treatment targets.
    5. Explain the information in clear, simple language.
    6. Include source document names and PDF page numbers.
    7. If sources disagree or have different contexts, explain that.

    CLINICAL GUIDELINE EVIDENCE:
    {context}

    USER QUESTION:
    {question}

    Provide:
    - A clear answer.
    - Important clinical considerations supported by the evidence.
    - Source references.
    - A brief note that the response is decision support and
      should be verified by a qualified healthcare professional.
    """

    # Step 4: Generate answer using Gemini
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    # Step 5: Return answer and source metadata
    sources = [
        {
            "source_file": result.get("source_file"),
            "page_number": result.get("page_number"),
            "score": result.get("score")
        }
        for result in retrieved_results
    ]

    return {
        "answer": response.text or "No answer was generated.",
        "sources": sources
    }
