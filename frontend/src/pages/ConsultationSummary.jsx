import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ConsultationSummary.css";

const API_BASE = "http://127.0.0.1:8000";

function ConsultationSummary() {
  const [searchParams] = useSearchParams();
  const requestedPatientId = searchParams.get("patientId");

  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);

  const [complaint, setComplaint] = useState("");
  const [history, setHistory] = useState("");
  const [observations, setObservations] = useState("");
  const [assessment, setAssessment] = useState("");
  const [plan, setPlan] = useState("");

  const [loadingPatients, setLoadingPatients] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [draftDate] = useState(() => new Date().toISOString());

  useEffect(() => {
    const controller = new AbortController();

    async function loadPatients() {
      try {
        setLoadingPatients(true);
        setError("");

        const response = await fetch(`${API_BASE}/api/patients`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load patients. Check the FastAPI backend.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected patient list response.");
        }

        setPatients(data);

        const requestedPatient = data.find(
          (patient) => patient.patient_id === requestedPatientId
        );

        setPatientId(
          requestedPatient?.patient_id || data[0]?.patient_id || ""
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load patients.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingPatients(false);
        }
      }
    }

    loadPatients();

    return () => controller.abort();
  }, [requestedPatientId]);

  useEffect(() => {
    if (!patientId) {
      setPatientDetails(null);
      return;
    }

    const controller = new AbortController();

    async function loadPatientDetails() {
      try {
        setLoadingDetails(true);
        setError("");
        setPatientDetails(null);

        const response = await fetch(
          `${API_BASE}/api/patients/${encodeURIComponent(patientId)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load this patient's medical history.");
        }

        const data = await response.json();
        setPatientDetails(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load patient details.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingDetails(false);
        }
      }
    }

    loadPatientDetails();

    return () => controller.abort();
  }, [patientId]);

  const patient = patients.find(
    (item) => item.patient_id === patientId
  );

  function updateField(setter, value) {
    setter(value);
    setSaved(false);
    setReviewed(false);
  }

  
function handlePatientChange(event) {
  const nextPatientId = event.target.value;

  setPatientId(nextPatientId);

  // Clear the previous patient's consultation notes.
  setComplaint("");
  setHistory("");
  setObservations("");
  setAssessment("");
  setPlan("");

  // Reset draft status for the newly selected patient.
  setSaved(false);
  setReviewed(false);
}


  function handleSave() {
    setSaved(true);
    setReviewed(false);
  }

  function handleReview() {
    setReviewed(true);
    setSaved(false);
  }

  function formatDate(value) {
    if (!value) return "Not recorded";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString();
  }

  if (loadingPatients) {
    return (
      <div className="summary-page">
        <p>Loading patient records...</p>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="summary-page">
        <h1>Consultation Summary</h1>
        <p role="alert">
          {error || "No patient records were returned by the backend."}
        </p>
        <p>Make sure the FastAPI backend is running and try again.</p>
      </div>
    );
  }

  return (
    <div className="summary-page">
      <header className="summary-header">
        <div>
          <p className="summary-eyebrow">CLINICAL WORKSPACE</p>
          <h1>Consultation Summary</h1>
          <p className="summary-subtitle">
            Review and organize consultation information in one place.
          </p>
        </div>
      </header>

      <div className="summary-notice">
        <span>ⓘ</span>
        <p>
          This workspace does not generate AI recommendations or save drafts
          to the server. Verify all clinical information before use.
        </p>
      </div>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <section className="summary-card">
        <div className="summary-card-heading">
          <span className="summary-number">01</span>
          <div>
            <h2>Patient and visit details</h2>
            <p>Select a patient from the available clinical records.</p>
          </div>
        </div>

        <label className="summary-label" htmlFor="summary-patient">
          Patient record
        </label>

        <select
          id="summary-patient"
          className="summary-input"
          value={patientId}
          onChange={handlePatientChange}
        >
          {patients.map((item) => (
            <option key={item.patient_id} value={item.patient_id}>
              {item.patient_label} — {item.patient_id}
            </option>
          ))}
        </select>

        {patient && (
          <div className="summary-patient-strip">
            <div className="summary-avatar">
              {patient.patient_label?.slice(-3) || "P"}
            </div>
            <div>
              <strong>{patient.patient_label}</strong>
              <p>
                {patient.age ?? "Age not recorded"} years ·{" "}
                {patient.gender ?? "Gender not recorded"}
              </p>
            </div>
            <span className="summary-status">
              {reviewed ? "Reviewed in session" : "Draft"}
            </span>
          </div>
        )}

        {loadingDetails && <p>Loading medical history...</p>}

        {patientDetails && !loadingDetails && (
          <div className="summary-preview">
            <h3>Available record overview</h3>
            <p>
              <strong>Conditions:</strong>{" "}
              {patientDetails.conditions?.length ?? 0}
            </p>
            <p>
              <strong>Medications:</strong>{" "}
              {patientDetails.medications?.length ?? 0}
            </p>
            <p>
              <strong>Observations:</strong>{" "}
              {patientDetails.observations?.length ?? 0}
            </p>
            <p>
              <strong>Encounters:</strong>{" "}
              {patientDetails.encounters?.length ?? 0}
            </p>
            <p>
              <strong>Allergies:</strong>{" "}
              {patientDetails.allergies?.length ?? 0}
            </p>
          </div>
        )}
      </section>

      <section className="summary-card">
        <div className="summary-card-heading">
          <span className="summary-number">02</span>
          <div>
            <h2>Consultation information</h2>
            <p>Enter or edit information for clinician review.</p>
          </div>
        </div>

        <div className="summary-form-grid">
          <div className="summary-field summary-full-width">
            <label className="summary-label" htmlFor="summary-complaint">
              Chief complaint
            </label>
            <textarea
              id="summary-complaint"
              className="summary-input summary-textarea"
              rows={3}
              placeholder="Enter the patient's presenting concern..."
              value={complaint}
              onChange={(event) =>
                updateField(setComplaint, event.target.value)
              }
            />
          </div>

          <div className="summary-field summary-full-width">
            <label className="summary-label" htmlFor="summary-history">
              Relevant medical history
            </label>
            <textarea
              id="summary-history"
              className="summary-input summary-textarea"
              rows={4}
              placeholder="Enter relevant history, conditions, allergies, or medications..."
              value={history}
              onChange={(event) =>
                updateField(setHistory, event.target.value)
              }
            />
          </div>

          <div className="summary-field summary-full-width">
            <label className="summary-label" htmlFor="summary-observations">
              Observations and examination
            </label>
            <textarea
              id="summary-observations"
              className="summary-input summary-textarea"
              rows={3}
              placeholder="Enter observations and examination findings..."
              value={observations}
              onChange={(event) =>
                updateField(setObservations, event.target.value)
              }
            />
          </div>

          <div className="summary-field">
            <label className="summary-label" htmlFor="summary-assessment">
              Assessment notes
            </label>
            <textarea
              id="summary-assessment"
              className="summary-input summary-textarea"
              rows={4}
              placeholder="Clinician-entered assessment..."
              value={assessment}
              onChange={(event) =>
                updateField(setAssessment, event.target.value)
              }
            />
          </div>

          <div className="summary-field">
            <label className="summary-label" htmlFor="summary-plan">
              Proposed plan
            </label>
            <textarea
              id="summary-plan"
              className="summary-input summary-textarea"
              rows={4}
              placeholder="Clinician-entered follow-up or care plan..."
              value={plan}
              onChange={(event) =>
                updateField(setPlan, event.target.value)
              }
            />
          </div>
        </div>
      </section>

      <section className="summary-card">
        <div className="summary-card-heading">
          <span className="summary-number">03</span>
          <div>
            <h2>Review and status</h2>
            <p>Review the draft before marking it reviewed in this session.</p>
          </div>
        </div>

        <div className="summary-preview">
          <div className="summary-preview-heading">
            <h3>Draft overview</h3>
            <span>{reviewed ? "Reviewed in session" : "Pending review"}</span>
          </div>

          <p>
            <strong>Patient:</strong>{" "}
            {patient?.patient_label || "Not selected"}
          </p>
          <p>
            <strong>Patient ID:</strong> {patientId || "Not selected"}
          </p>
          <p>
            <strong>Draft date:</strong> {formatDate(draftDate)}
          </p>
          <p><strong>Chief complaint:</strong> {complaint || "Not entered"}</p>
          <p><strong>Medical history:</strong> {history || "Not entered"}</p>
          <p><strong>Observations:</strong> {observations || "Not entered"}</p>
          <p><strong>Assessment:</strong> {assessment || "Not entered"}</p>
          <p><strong>Plan:</strong> {plan || "Not entered"}</p>
        </div>

        <div className="summary-actions">
          <button
            type="button"
            className="summary-secondary-button"
            onClick={handleSave}
          >
            Mark draft as saved
          </button>
          <button
            type="button"
            className="summary-primary-button"
            onClick={handleReview}
          >
            Mark as reviewed
          </button>
        </div>

        {saved && (
          <p className="summary-feedback" role="status">
            Draft marked as saved for this screen only. It has not been stored
            on the server and may be lost when you leave or refresh this page.
          </p>
        )}

        {reviewed && (
          <p className="summary-feedback" role="status">
            Marked as reviewed for this session only. This does not represent
            clinical approval or a persistent record.
          </p>
        )}
      </section>
    </div>
  );
}

export default ConsultationSummary;