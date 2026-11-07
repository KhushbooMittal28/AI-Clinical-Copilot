
import os

from dotenv import load_dotenv
from google import genai

from rag_service import RAGService
from patient_context import extract_patient_context


# Load environment variables from backend/.env
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found. Check your .env file.")

# Initialize Gemini
client = genai.Client(api_key=API_KEY)

# Initialize existing RAG service
rag = RAGService()

MODEL_NAME = "gemini-3.5-flash-lite"


def generate_clinical_answer(
    question: str,
    top_k: int = 5,
    patient=None
):
    # Step 1: Retrieve relevant WHO guideline passages
    retrieved_results = rag.search(question, top_k=top_k)

    if not retrieved_results:
        return {
            "answer": (
                "I could not find relevant information in "
                "the available clinical guidelines."
            ),
            "sources": []
        }

    # Step 2: Prepare patient context separately
    patient_context = ""

    if patient:
        patient_data = extract_patient_context(patient)

        patient_context = f"""
        PATIENT INFORMATION (from synthetic patient records):

        Demographics:
        {patient_data['demographics']}

        Medical Conditions:
        {patient_data['conditions']}

        Medication History:
        {patient_data['medications']}

        Recent Observations (newest first):
        {patient_data['observations']}

        Allergy Record Status:
        {patient_data['allergy_record_status']}

        Total recorded observations:
        {patient_data['observation_count']}
        """
    else:
        patient_context = "No patient selected."

    # Step 3: Prepare guideline evidence context
    context = ""

    for i, result in enumerate(retrieved_results, start=1):
        context += f"""
        Source {i}
        Document: {result.get('source_file')}
        PDF Page: {result.get('page_number')}
        Similarity Score: {result.get('score')}
        Content:
        {result.get('text')}
        """

    # Step 4: Build patient-aware grounded prompt
    prompt = f"""
    You are an AI Clinical Copilot designed to assist healthcare
    professionals in primary care.

    Answer the user's question using ONLY the clinical guideline
    evidence provided below for medical recommendations.

    PATIENT CONTEXT:
    {patient_context}

    PATIENT CONTEXT RULES:
    1. Use patient information only when relevant to the question.
    2. Treat patient information as recorded historical data,
       not necessarily current.
    3. Consider observation dates and medication start/stop dates.
    4. Never interpret missing allergy records as confirmation
       that the patient has no allergies.
    5. Do not treat patient history as clinical guideline evidence.
    6. Do not invent missing patient information.
    7. If patient information is unavailable, explicitly state that.

    CLINICAL GUIDELINE EVIDENCE:
    {context}

    IMPORTANT CLINICAL RULES:
    1. Do not invent medical facts or recommendations.
    2. If the guideline evidence is insufficient, clearly say so.
    3. Do not make a diagnosis or prescribe medication.
    4. Distinguish recommendations from treatment targets.
    5. Explain information in clear, simple language.
    6. Include source document names and PDF page numbers.
    7. If sources disagree or have different contexts, explain that.
    8. Clearly distinguish patient-specific observations from
       guideline recommendations.

    USER QUESTION:
    {question}

    Provide:
    - A clear answer.
    - Relevant patient-specific clinical considerations, if a
      patient has been selected.
    - Important clinical considerations supported by the evidence.
    - Source references.
    - A brief note that the response is decision support and
      should be verified by a qualified healthcare professional.
    """

    # Step 5: Generate answer using Gemini
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    # Step 6: Return answer and source metadata
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
