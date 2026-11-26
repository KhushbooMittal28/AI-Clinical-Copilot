

# AI Clinical Copilot for Primary Care

> A clinician-in-the-loop AI system designed to assist primary-care workflows through patient history summarization, patient-aware medical information retrieval, and structured consultation support.

---

## Project Overview

Primary-care doctors often need to review patient history, symptoms, previous clinical notes, medications, and other clinical information before and during a consultation. This information may be distributed across multiple records, making it time-consuming to review and organize.

The **AI Clinical Copilot for Primary Care** aims to provide an AI-assisted workflow that helps organize patient information and retrieve relevant medical knowledge using **Natural Language Processing (NLP), Large Language Models (LLMs), and Retrieval-Augmented Generation (RAG)**.

The system integrates patient-specific clinical context with medical guideline retrieval to generate context-aware responses to clinical queries.

It is designed as a **clinician-in-the-loop decision-support prototype**, where AI-generated information is presented to the doctor for review rather than being used for autonomous diagnosis or treatment.

---

## Objectives

The main objectives of the project are:

- Summarize patient history and relevant clinical information.
- Process clinical queries using LLM-based methods.
- Retrieve relevant medical information using Retrieval-Augmented Generation (RAG).
- Incorporate selected patient context into clinical queries.
- Generate structured and context-aware clinical responses.
- Provide a simple and intuitive doctor-facing web interface.
- Present AI-generated information with relevant source references.
- Keep the doctor in control of the final clinical decision.

---

## Key Features

- **Patient Selection:** Select a patient from the available synthetic patient dataset.
- **Patient-Aware AI Copilot:** Ask clinical questions using the selected patient's medical context.
- **Medical Knowledge Retrieval:** Retrieve relevant information from curated medical guidelines.
- **Source References:** Display supporting document names and page numbers with AI responses.
- **Context Management:** Clear previous chat messages when switching between patients.
- **Clinician-in-the-Loop Workflow:** Keep AI-generated responses available for doctor review.

---

## Research Focus

The project focuses on exploring how **LLM-based summarization and RAG-based medical information retrieval** can be integrated into a primary-care workflow.

The research will investigate aspects such as:

- Patient information summarization
- Medical knowledge retrieval
- Patient-aware question answering
- Source-grounded AI responses
- Reliability and hallucination
- Human/doctor review
- Quality of generated clinical summaries

The final system serves as a prototype for experimentation and evaluation rather than a production-ready medical system.

---

## Tech Stack

| Component | Technology |
|---|---|
| Frontend | React.js + Vite |
| Backend | Python + FastAPI |
| Programming Languages | Python, JavaScript |
| Large Language Model | Google Gemini |
| AI / NLP | Large Language Models (LLMs) |
| RAG Framework | Retrieval-Augmented Generation (RAG) |
| Embeddings | Sentence Transformers |
| Vector Database | FAISS |
| Patient Dataset | Synthea Synthetic Patient Data |
| Medical Knowledge Base | Curated WHO Medical Guidelines |
| Version Control | Git + GitHub |

---

## System Workflow

The system follows a clinician-in-the-loop, patient-aware RAG workflow:

```text
Doctor
   ↓
React Web Interface
   ↓
Patient Selection
   ↓
Clinical Query
   ↓
FastAPI Backend
   ↓
Patient Context Retrieval
   ↓
Medical Knowledge Retrieval (RAG)
   ↓
FAISS Vector Search
   ↓
Relevant Guideline Context
   ↓
Patient Context + Retrieved Context
   ↓
Google Gemini LLM
   ↓
Context-Aware AI Response
   ↓
Source References
   ↓
Doctor Review
   ↓
Final Clinical Decision
```

---

## Project Structure

```text
AI-Clinical-Copilot/
│
├── backend/
│   ├── main.py
│   ├── llm_service.py
│   ├── patient_context.py
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
├── data/
├── docs/
├── rag/
└── README.md
```

---

## Safety and Limitations

- This project is an academic prototype and is not intended for direct clinical deployment.
- AI-generated responses may contain inaccuracies and must be reviewed by a qualified healthcare professional.
- The system does not replace professional medical judgment.
- The patient dataset used for development is synthetic.
- Clinical decisions remain the responsibility of the treating healthcare professional.

---

## References

1. Vaswani, A., et al. (2017). *Attention Is All You Need*. Advances in Neural Information Processing Systems (NeurIPS).

2. Lewis, P., et al. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*. Advances in Neural Information Processing Systems (NeurIPS).

3. Zhou, H., et al. (2023). *A Survey of Large Language Models in Medicine: Progress, Application, and Challenge*.

4. Gomez-Cabello, C. A., et al. (2024). *Artificial-Intelligence-Based Clinical Decision Support Systems in Primary Care: A Scoping Review of Current Clinical Implementations*.

5. Iannone, P., Kaur, P., & Johnson, J. (2026). *Artificial Intelligence in Outpatient Primary Care: A Scoping Review on Applications, Challenges, and Future Directions*.

6. Amugongo, L. M., et al. (2025). *Retrieval Augmented Generation for Large Language Models in Healthcare: A Systematic Review*. PLOS Digital Health.

7. Christof, C., et al. (2026). *Evidence, Use Cases, and Implementation Safeguards of Large Language Models in Primary Care*. Communications Medicine.

8. Agweyu, A., et al. (2026). *Generative AI-Enabled Clinical Decision Support System in Primary Care: A Pragmatic, Cluster-Randomized Trial*. Nature Medicine.

9. Agweyu, A., et al. (2026). *Safety of a Large Language Model-Based Clinical Decision Support System in African Primary Healthcare*. Nature Health.

10. Lukac, S., et al. (2025). *Ambient AI Scribes in Clinical Practice: A Randomized Trial*. NEJM AI.

11. Wang, X., et al. (2026). *Human–Large Language Model Collaboration in Clinical Medicine: A Systematic Review and Meta-Analysis*. npj Digital Medicine.

---

## Disclaimer

This project is developed for academic and research purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.

