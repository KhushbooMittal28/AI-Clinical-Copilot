
from datetime import date, datetime


def calculate_age(birthdate):
    """Calculate age from a YYYY-MM-DD birthdate."""
    if not birthdate:
        return None

    try:
        born = datetime.strptime(birthdate, "%Y-%m-%d").date()
        today = date.today()

        return today.year - born.year - (
            (today.month, today.day) < (born.month, born.day)
        )
    except (ValueError, TypeError):
        return None


def get_patient_by_id(patient_id, patients):
    """Find a patient using their UUID."""
    return next(
        (
            patient for patient in patients
            if str(patient.get("patient_id", "")) == patient_id
        ),
        None
    )


def extract_patient_context(patient):
    """
    Build a concise patient context for the clinical copilot.
    Preserve dates and distinguish missing records from negative findings.
    """
    demographics = patient.get("demographics", {})

    conditions = [
        {
            "description": item.get("DESCRIPTION"),
            "start": item.get("START"),
            "stop": item.get("STOP"),
        }
        for item in patient.get("conditions", [])
    ]

    medications = [
        {
            "description": item.get("DESCRIPTION"),
            "start": item.get("START"),
            "stop": item.get("STOP"),
        }
        for item in patient.get("medications", [])
    ]

    observations = [
        {
            "description": item.get("DESCRIPTION"),
            "category": item.get("CATEGORY"),
            "value": item.get("VALUE"),
            "units": item.get("UNITS"),
            "date": item.get("DATE"),
        }
        for item in patient.get("observations", [])
    ]

    observations.sort(
        key=lambda item: item.get("date") or "",
        reverse=True
    )

    allergies = patient.get("allergies", [])

    return {
        "patient_id": str(patient.get("patient_id", "")),
        "demographics": {
            "age": calculate_age(demographics.get("BIRTHDATE")),
            "gender": demographics.get("GENDER"),
        },
        "conditions": conditions,
        "medications": medications,
        "observations": observations[:30],
        "allergies": allergies if allergies else None,
        "allergy_record_status": (
            "records_available" if allergies
            else "no_allergy_records"
        ),
        "observation_count": len(observations),
    }
