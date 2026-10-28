import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AICopilot.css";

const API_BASE = "http://127.0.0.1:8000";

function formatClinicalDate(value) {
  if (!value) return "Date not recorded";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function AICopilot() {
  const [searchParams] = useSearchParams();
  const patientIdFromUrl = searchParams.get("patientId");

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");

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
          throw new Error("Could not load patients from FastAPI.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected patient list response.");
        }

        setPatients(data);

        const requestedPatient = data.find(
          (item) => item.patient_id === patientIdFromUrl,
        );

        setSelectedPatient(
          requestedPatient?.patient_id || data[0]?.patient_id || "",
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
  }, [patientIdFromUrl]);

  useEffect(() => {
    if (!selectedPatient) {
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
          `${API_BASE}/api/patients/${encodeURIComponent(selectedPatient)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Could not load this patient's details.");
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
  }, [selectedPatient]);

  const selectedPatientRecord = patients.find(
    (item) => item.patient_id === selectedPatient,
  );

  function handlePatientChange(event) {
    setSelectedPatient(event.target.value);
    setShowPreview(false);
  }

  function handlePreview() {
    setShowPreview(true);
  }

  if (loadingPatients) {
    return <div className="copilot-page">Loading patients from FastAPI...</div>;
  }

  if (error && patients.length === 0) {
    return <div className="copilot-page">{error}</div>;
  }

  if (patients.length === 0) {
    return (
      <div className="copilot-page">No patients were returned by FastAPI.</div>
    );
  }

  return (
    <div className="copilot-page">
      <header className="copilot-page-header">
        <div>
          <p className="copilot-eyebrow">CLINICAL WORKSPACE</p>
          <h1>AI Clinical Copilot</h1>
          <p className="copilot-subtitle">
            Review patient context and prepare a structured consultation draft.
          </p>
        </div>
      </header>

      <div className="copilot-safety-banner">
        <span>ⓘ</span>
        <p>
          Demo interface. AI analysis and guideline retrieval are not connected.
          Clinician review is required.
        </p>
      </div>

      {error && <p role="alert">{error}</p>}

      <section className="copilot-card">
        <div className="copilot-section-heading">
          <div className="copilot-step">01</div>
          <div>
            <h2>Select patient</h2>
            <p>Select a patient from the records returned by FastAPI.</p>
          </div>
        </div>

        <label className="copilot-label" htmlFor="patient-select">
          Patient record
        </label>

        <select
          id="patient-select"
          className="copilot-select"
          value={selectedPatient}
          onChange={handlePatientChange}
        >
          {patients.map((item) => (
            <option key={item.patient_id} value={item.patient_id}>
              {item.patient_label} ({item.patient_id})
            </option>
          ))}
        </select>

        {loadingDetails ? (
          <p>Loading patient details...</p>
        ) : patientDetails ? (
          <>
            <div className="copilot-patient-summary">
              <div className="copilot-patient-avatar">
                {selectedPatientRecord?.patient_label?.slice(-3) || "P"}
              </div>
              <div>
                <h3>{selectedPatientRecord?.patient_label || "Patient"}</h3>
                <p>{patientDetails.patient_id}</p>
              </div>
              <span className="copilot-demo-tag">API data</span>
            </div>

            <div className="copilot-detail-grid">
              <div>
                <span>Age</span>
                <strong>
                  {patientDetails.demographics?.age ?? "Not available"}
                  {patientDetails.demographics?.age != null ? " years" : ""}
                </strong>
              </div>
              <div>
                <span>Gender</span>
                <strong>
                  {patientDetails.demographics?.gender ?? "Not available"}
                </strong>
              </div>
              <div>
                <span>Recorded conditions</span>
                <strong>{patientDetails.conditions?.length ?? 0}</strong>
              </div>
              <div>
                <span>Encounters</span>
                <strong>{patientDetails.encounters?.length ?? 0}</strong>
              </div>
            </div>

            <div className="copilot-history">
              <h3>Medical history</h3>

              <div className="copilot-history-section">
                <h4>Conditions</h4>
                {patientDetails.conditions?.length ? (
                  <ul>
                    {patientDetails.conditions.map((item, index) => (
                      <li key={`${item.description}-${index}`}>
                        <strong>
                          {item.description || "Condition not specified"}
                        </strong>
                        {item.start && (
                          <span>
                            {" "}
                            · Started: {formatClinicalDate(item.start)}
                          </span>
                        )}
                        {item.stop && (
                          <span> · Ended: {formatClinicalDate(item.stop)}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No recorded conditions.</p>
                )}
              </div>

              <div className="copilot-history-section">
                <h4>Medications</h4>
                {patientDetails.medications?.length ? (
                  <ul>
                    {patientDetails.medications.map((item, index) => (
                      <li key={`${item.description}-${index}`}>
                        <strong>
                          {item.description || "Medication not specified"}
                        </strong>
                        {item.start && (
                          <span>
                            {" "}
                            · Started: {formatClinicalDate(item.start)}
                          </span>
                        )}
                        {item.stop && (
                          <span> · Ended: {formatClinicalDate(item.stop)}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No recorded medications.</p>
                )}
              </div>

              <div className="copilot-history-section">
                <h4>Allergies</h4>
                {patientDetails.allergies?.length ? (
                  <ul>
                    {patientDetails.allergies.map((item, index) => (
                      <li key={index}>
                        {typeof item === "string"
                          ? item
                          : item.description ||
                            item.display ||
                            JSON.stringify(item)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No allergies listed in this record.</p>
                )}
              </div>

              <div className="copilot-history-section">
                <h4>Recent observations</h4>
                {patientDetails.observations?.length ? (
                  <ul>
                    {patientDetails.observations
                      .slice(-5)
                      .reverse()
                      .map((item, index) => (
                        <li key={`${item.description}-${item.date}-${index}`}>
                          <strong>
                            {item.description || item.category || "Observation"}
                          </strong>
                          {item.value != null && (
                            <span>
                              {" "}
                              · {item.value} {item.units || ""}
                            </span>
                          )}
                          {item.date && (
                            <span> · {formatClinicalDate(item.date)}</span>
                          )}
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p>No recorded observations.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Select a patient to view their details.</p>
        )}
      </section>

      <section className="copilot-card">
        <div className="copilot-section-heading">
          <div className="copilot-step">02</div>
          <div>
            <h2>Consultation notes</h2>
            <p>Enter notes to preview the draft workflow.</p>
          </div>
        </div>

        <label className="copilot-label" htmlFor="clinical-notes">
          Clinical notes
        </label>
        <textarea
          id="clinical-notes"
          className="copilot-textarea"
          placeholder="Enter consultation notes here..."
          value={clinicalNotes}
          onChange={(event) => {
            setClinicalNotes(event.target.value);
            setShowPreview(false);
          }}
          rows={5}
        />

        <button
          className="copilot-primary-button"
          type="button"
          onClick={handlePreview}
          disabled={!patientDetails || loadingDetails}
        >
          Preview consultation draft →
        </button>
      </section>

      <section className="copilot-card">
        <div className="copilot-section-heading">
          <div className="copilot-step">03</div>
          <div>
            <h2>Clinical support</h2>
            <p>Reserved for future guideline retrieval integration.</p>
          </div>
        </div>

        <div className="copilot-placeholder">
          <span>✧</span>
          <div>
            <h3>Guideline references will appear here</h3>
            <p>
              Clinical guideline retrieval is not connected yet. No
              recommendations have been generated.
            </p>
          </div>
        </div>
      </section>

      {showPreview && patientDetails && (
        <section className="copilot-card copilot-preview">
          <div className="copilot-section-heading">
            <div className="copilot-step">04</div>
            <div>
              <h2>Consultation draft preview</h2>
              <p>Locally displayed notes, not an AI-generated summary.</p>
            </div>
          </div>

          <div className="copilot-preview-content">
            <h3>{selectedPatientRecord?.patient_label || "Patient"}</h3>
            <p>
              <strong>Patient ID:</strong> {patientDetails.patient_id}
            </p>
            <p>
              <strong>Recorded conditions:</strong>{" "}
              {patientDetails.conditions?.length ?? 0}
            </p>
            <p>
              <strong>Notes entered:</strong>
            </p>
            <p className="copilot-notes-output">
              {clinicalNotes.trim() || "No notes entered."}
            </p>
          </div>

          <p className="copilot-review-note">
            This preview is not clinically validated and is not a diagnosis or
            treatment recommendation.
          </p>
        </section>
      )}
    </div>
  );
}

export default AICopilot;
