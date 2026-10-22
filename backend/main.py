import json
from datetime import date, datetime
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Clinical Copilot API")

# Allow requests from the local Vite frontend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "patient_records_sanitized.json"
)


def load_records():
    with DATA_PATH.open("r", encoding="utf-8") as file:
        records = json.load(file)

    if not isinstance(records, list):
        raise ValueError("Expected patient JSON to contain a list")

    return records


# Load the dataset once when the backend starts.
PATIENTS = load_records()


def get_age(demographics):
    birthdate = demographics.get("BIRTHDATE")

    if not birthdate:
        return None

    try:
        born = datetime.strptime(birthdate, "%Y-%m-%d").date()
        today = date.today()
        return today.year - born.year - (
            (today.month, today.day) < (born.month, born.day)
        )
    except ValueError:
        return None


def patient_card(patient, index):
    demographics = patient.get("demographics", {})

    return {
        "patient_id": str(patient.get("patient_id", "")),
        "patient_label": f"Patient {index + 1:03d}",
        "age": get_age(demographics),
        "gender": demographics.get("GENDER"),
        "conditions_count": len(patient.get("conditions", [])),
        "encounters_count": len(patient.get("encounters", [])),
    }


@app.get("/")
def home():
    return {"message": "Clinical Copilot backend is running"}


@app.get("/api/health")
def health_check():
    return {"status": "ok", "patient_records_loaded": len(PATIENTS)}


@app.get("/api/patients")
def list_patients():
    """Return basic patient cards for the frontend."""
    return [
        patient_card(patient, index)
        for index, patient in enumerate(PATIENTS)
    ]


@app.get("/api/patients/{patient_id}")
def get_patient(patient_id: str):
    """Return selected clinical history for one patient."""

    patient = next(
        (
            p for p in PATIENTS
            if str(p.get("patient_id", "")) == patient_id
        ),
        None,
    )

    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")

    demographics = patient.get("demographics", {})

    # Return only clinically relevant fields for this prototype.
    return {
        "patient_id": str(patient.get("patient_id", "")),
        "demographics": {
            "age": get_age(demographics),
            "gender": demographics.get("GENDER"),
        },
        "conditions": [
            {
                "start": item.get("START"),
                "stop": item.get("STOP"),
                "description": item.get("DESCRIPTION"),
            }
            for item in patient.get("conditions", [])
        ],
        "medications": [
            {
                "start": item.get("START"),
                "stop": item.get("STOP"),
                "description": item.get("DESCRIPTION"),
            }
            for item in patient.get("medications", [])
        ],
        "observations": [
            {
                "date": item.get("DATE"),
                "category": item.get("CATEGORY"),
                "description": item.get("DESCRIPTION"),
                "value": item.get("VALUE"),
                "units": item.get("UNITS"),
            }
            for item in patient.get("observations", [])
        ],
        "encounters": [
            {
                "start": item.get("START"),
                "encounter_class": item.get("ENCOUNTERCLASS"),
                "description": item.get("DESCRIPTION"),
                "reason": item.get("REASONDESCRIPTION"),
            }
            for item in patient.get("encounters", [])
        ],
        "procedures": [
            {
                "start": item.get("START"),
                "description": item.get("DESCRIPTION"),
            }
            for item in patient.get("procedures", [])
        ],
        "allergies": patient.get("allergies", []),
    }