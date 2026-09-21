# AI Clinical Copilot for Primary Care

> A clinician-in-the-loop AI system designed to assist primary-care workflows through patient history summarization, medical information retrieval, and structured consultation support.

---

## Project Overview

Primary-care doctors often need to review patient history, symptoms, previous clinical notes, medications, and other clinical information before and during a consultation. This information may be distributed across multiple records, making it time-consuming to review and organize.

The **AI Clinical Copilot for Primary Care** aims to provide an AI-assisted workflow that helps organize and summarize patient information and retrieve relevant medical knowledge using **Natural Language Processing (NLP), Large Language Models (LLMs), and Retrieval-Augmented Generation (RAG)**.

The system is designed as a **clinician-in-the-loop decision-support prototype**, where AI-generated information is presented to the doctor for review rather than being used for autonomous diagnosis or treatment.

---

## Objectives

The main objectives of the project are:

- Summarize patient history and relevant clinical information.
- Process symptoms and clinical notes using NLP/LLM-based methods.
- Retrieve relevant medical information using Retrieval-Augmented Generation (RAG).
- Generate structured consultation summaries.
- Provide a simple and intuitive doctor-facing web interface.
- Present AI-generated information with appropriate source references.
- Keep the doctor in control of the final clinical decision.

---

## Research Focus

The project focuses on exploring how **LLM-based summarization and RAG-based medical information retrieval** can be integrated into a primary-care workflow.

The research will investigate aspects such as:

- Patient information summarization
- Medical knowledge retrieval
- Source-grounded AI responses
- Reliability and hallucination
- Human/doctor review
- Quality of generated clinical summaries

The final system will serve as a prototype for experimentation and evaluation rather than a production-ready medical system.

---

## System Workflow

```text
                Doctor
                   │
                   ▼
            Web Interface
                   │
                   ▼
        Patient Information
        / Clinical Notes
                   │
                   ▼
            Preprocessing
                   │
                   ▼
              NLP / LLM
                   │
                   ▼
                 RAG
                   │
          ┌────────┴────────┐
          ▼                 ▼
   Medical Knowledge    Vector Database
       Base                  │
          └────────┬────────┘
                   ▼
          Retrieved Context
                   │
                   ▼
                 LLM
                   │
                   ▼
        Structured Clinical
             Output
                   │
                   ▼
            Doctor Review
                   │
                   ▼
         Final Clinical Decision

## Tech Stack

| Component | Technology |
|---|---|
| Frontend | React.js + Vite |
| Backend | Python + FastAPI |
| Programming Languages | Python, JavaScript |
| AI / NLP | Large Language Models (LLMs) |
| RAG | Retrieval-Augmented Generation (RAG) |
| Embeddings | To be finalized |
| Vector Database | To be finalized |
| Patient Dataset | Synthea Synthetic Patient Data |
| Medical Knowledge Base | Curated Medical Guidelines and Reference Documents |
| Database | To be finalized |
| Version Control | Git + GitHub |

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
