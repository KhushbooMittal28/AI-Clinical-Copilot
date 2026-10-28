
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import Layout from "./components/Layout";
import "./App.css";
import AICopilot from "./pages/AICopilot";
import ConsultationSummary from "./pages/ConsultationSummary";
import { useEffect, useState } from "react";


function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPatients() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/patients",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load patient records.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected patient data received.");
        }

        setPatients(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to connect to the backend.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPatients();

    return () => controller.abort();
  }, []);

  const recentPatients = patients.slice(0, 4);

  return (
    <>
      <header className="topbar">
        <div>
          <p className="welcome">Good morning, Doctor</p>
          <h1>Dashboard</h1>
        </div>

        <div className="doctor-profile">
          <div className="avatar">DR</div>
          <div>
            <strong>Dr. Sharma</strong>
            <span>Primary Care</span>
          </div>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">♙</div>
          <div>
            <span>Total Patients</span>
            <h2>{loading ? "—" : error ? "—" : patients.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">▤</div>
          <div>
            <span>Consultations</span>
            <h2>—</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">✧</div>
          <div>
            <span>AI Summaries</span>
            <h2>—</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">◷</div>
          <div>
            <span>Pending Reviews</span>
            <h2>—</h2>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel patients-panel">
          <div className="panel-header">
            <div>
              <h2>Patient Records</h2>
              <p>Recently listed patient records</p>
            </div>

            <Link to="/patients" className="view-button">
              View All
            </Link>
          </div>

          <div className="patient-list">
            {loading && <p>Loading patient records...</p>}

            {error && (
              <p className="error-message" role="alert">
                {error} Check that the FastAPI backend is running.
              </p>
            )}

            {!loading && !error && recentPatients.length === 0 && (
              <p>No patient records found.</p>
            )}

            {!loading &&
              !error &&
              recentPatients.map((patient) => (
                <Link
                  to={`/patients/${encodeURIComponent(patient.patient_id)}`}
                  className="patient-row"
                  key={patient.patient_id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="patient-avatar">
                    {patient.patient_label?.slice(-3) || "—"}
                  </div>

                  <div className="patient-info">
                    <strong>
                      {patient.patient_label || "Unnamed patient"}
                    </strong>
                    <span>
                      Age: {patient.age ?? "—"} · Gender:{" "}
                      {patient.gender ?? "—"}
                    </span>
                  </div>

                  <span className="status stable">View record</span>
                </Link>
              ))}
          </div>
        </div>

        <div className="panel copilot-panel">
          <div className="copilot-icon">✧</div>
          <h2>AI Clinical Copilot</h2>
          <p>
            Review patient history, retrieve relevant clinical
            information, and prepare structured consultation summaries.
          </p>

          <Link to="/copilot" className="copilot-button">
            Open AI Copilot →
          </Link>

          <div className="copilot-note">
            <span>●</span> Clinician review required
          </div>
        </div>
      </section>
    </>
  );
}


function PatientsPage() {
  return <Patients />;
}

function PatientProfilePage() {
  return <PatientProfile />;
}

function CopilotPage() {
  return <AICopilot />;
}

function ConsultationsPage() {
  return (
    <section className="panel">
      <h1>Consultation Summary</h1>
      <p>
        This page will display structured consultation summaries for
        clinician review. AI generation is not connected yet.
      </p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/patients" element={<Layout><PatientsPage /></Layout>} />
        <Route path="/patients/:id" element={<Layout><PatientProfilePage /></Layout>} />
        <Route path="/copilot" element={<Layout><CopilotPage /></Layout>} />
        <Route path="/consultations" element={<Layout><ConsultationSummary /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
