import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PatientProfile.css";

const API_URL = "http://127.0.0.1:8000";

function formatDate(value) {
  if (!value) return "Date not recorded";

  const datePart = String(value).split("T")[0];
  const parts = datePart.split("-");

  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return String(value);
}

function getDescription(item, fallback = "Name not recorded") {
  if (typeof item === "string") return item;
  return item?.description || fallback;
}

function PatientProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchPatient() {
      setLoading(true);
      setError("");
      setPatient(null);

      try {
        const response = await fetch(
          `${API_URL}/api/patients/${encodeURIComponent(id)}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Patient record not found.");
          }

          throw new Error("Unable to load this patient record.");
        }

        const data = await response.json();

        if (!cancelled) {
          setPatient(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Could not connect to the backend.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (id) {
      fetchPatient();
    } else {
      setError("Patient ID is missing from the URL.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  
  const [patientLabel, setPatientLabel] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/api/patients`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load patient labels");
        return response.json();
      })
      .then((patients) => {
        if (cancelled) return;
        const match = patients.find((item) => item.patient_id === id);
        setPatientLabel(
          match?.patient_label || `Patient ${String(id || "").slice(0, 8)}`
        );
      })
      .catch(() => {
        if (!cancelled) {
          setPatientLabel(`Patient ${String(id || "").slice(0, 8)}`);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);


  if (loading) {
    return (
      <div className="profile-page">
        <p>Loading patient record...</p>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="profile-page">
        <h1>Unable to display patient</h1>
        <p>{error || "Patient record unavailable."}</p>
      </div>
    );
  }

  const demographics = patient.demographics || {};
  const conditions = patient.conditions || [];
  const medications = patient.medications || [];
  const observations = patient.observations || [];
  const encounters = patient.encounters || [];
  const procedures = patient.procedures || [];
  const allergies = patient.allergies || [];

  

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <div>
          <p className="page-label">Patient Record</p>
          <h1>{patientLabel}</h1>
          <p className="patient-id">Patient ID: {patient.patient_id || id}</p>
        </div>
        <button
          className="copilot-action"
          type="button"
          onClick={() => navigate(`/copilot?patientId=${encodeURIComponent(id)}`)}
        >
          ✦ Open AI Copilot
        </button>
      </div>

      {/* Basic information */}
      <section className="profile-grid">
        <div className="profile-card patient-overview">
          <div className="large-avatar">
            {demographics.gender?.slice(0, 1) || "P"}
          </div>

          <div>
            <h2>{patientLabel}</h2>
            <p>
              {demographics.gender || "Gender not recorded"}
              {demographics.age != null ? ` · ${demographics.age} years` : ""}
            </p>
            <span className="stable-badge">Synthetic Record</span>
          </div>
        </div>

        <div className="profile-card">
          <h3>Patient Information</h3>

          <div className="info-grid">
            <div>
              <span>Gender</span>
              <strong>{demographics.gender || "Not recorded"}</strong>
            </div>

            <div>
              <span>Age</span>
              <strong>
                {demographics.age != null
                  ? `${demographics.age} years`
                  : "Not recorded"}
              </strong>
            </div>

            <div>
              <span>Conditions</span>
              <strong>{conditions.length}</strong>
            </div>

            <div>
              <span>Patient ID</span>
              <strong>{patient.patient_id || id}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Medical history */}
      <section className="profile-card history-card">
        <div className="section-heading">
          <div>
            <h2>Medical History</h2>
            <p>
              Information retrieved from this patient's synthetic longitudinal
              record.
            </p>
          </div>
        </div>

        <div className="history-grid">
          {/* Conditions */}
          <div className="history-section">
            <h3>Conditions</h3>

            {conditions.length ? (
              conditions.map((item, index) => (
                <div
                  className="history-item"
                  key={`${item.description || "condition"}-${index}`}
                >
                  <strong>
                    {getDescription(item, "Condition name unavailable")}
                  </strong>
                  <span>
                    {formatDate(item.start)}
                    {" – "}
                    {item.stop
                      ? formatDate(item.stop)
                      : "No stop date recorded"}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-history">No conditions recorded.</div>
            )}
          </div>

          {/* Medications */}
          <div className="history-section">
            <h3>Medications</h3>

            {medications.length ? (
              medications.map((item, index) => (
                <div
                  className="history-item"
                  key={`${item.description || "medication"}-${index}`}
                >
                  <strong>
                    {getDescription(item, "Medication name unavailable")}
                  </strong>
                  <span>
                    {formatDate(item.start)}
                    {" – "}
                    {item.stop
                      ? formatDate(item.stop)
                      : "No stop date recorded"}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-history">No medications recorded.</div>
            )}
          </div>

          {/* Allergies */}
          <div className="history-section">
            <h3>Allergies</h3>

            {allergies.length ? (
              allergies.map((item, index) => (
                <div className="history-item" key={index}>
                  <strong>{getDescription(item, "Recorded allergy")}</strong>
                  {item?.start && <span>{formatDate(item.start)}</span>}
                </div>
              ))
            ) : (
              <div className="empty-history">
                No allergies recorded in this dataset.
              </div>
            )}
          </div>

          {/* Observations */}
          <div className="history-section">
            <h3>Observations</h3>

            {observations.length ? (
              observations.map((item, index) => (
                <div
                  className="history-item"
                  key={`${item.description || "observation"}-${index}`}
                >
                  <strong>
                    {getDescription(item, "Observation name unavailable")}
                  </strong>
                  <span>
                    {item.value ?? "Value not recorded"}
                    {item.units ? ` ${item.units}` : ""}
                    {" · "}
                    {formatDate(item.date)}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-history">No observations recorded.</div>
            )}
          </div>
        </div>
      </section>

      {/* Encounters */}
      <section className="profile-card">
        <div className="section-heading">
          <div>
            <h2>Recent Encounters</h2>
            <p>Healthcare encounters associated with this synthetic patient.</p>
          </div>
        </div>

        {encounters.length ? (
          encounters.map((item, index) => (
            <div
              className="encounter-row"
              key={`${item.start || "encounter"}-${index}`}
            >
              <div className="encounter-date">
                <strong>{formatDate(item.start)}</strong>
                <span>{item.encounter_class || "Encounter"}</span>
              </div>

              <div>
                <strong>{getDescription(item, "Clinical encounter")}</strong>
                <p>{item.reason || item.reason_description || "No reason recorded"}</p>
              </div>

              <span className="encounter-status">
                {item.stop ? "Completed" : "Status not recorded"}
              </span>
            </div>
          ))
        ) : (
          <p>No encounters recorded.</p>
        )}
      </section>

      {/* Procedures */}
      <section className="profile-card">
        <div className="section-heading">
          <div>
            <h2>Procedures</h2>
            <p>Procedures recorded in the patient history.</p>
          </div>
        </div>

        {procedures.length ? (
          procedures.map((item, index) => (
            <div
              className="history-item"
              key={`${item.description || "procedure"}-${index}`}
            >
              <strong>
                {getDescription(item, "Procedure name unavailable")}
              </strong>
              <span>{formatDate(item.start)}</span>
            </div>
          ))
        ) : (
          <p>No procedures recorded.</p>
        )}
      </section>
    </div>
  );
}

export default PatientProfile;