
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Patients.css";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/patients")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch patient records.");
        }
        return response.json();
      })
      .then((data) => {
        setPatients(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPatients = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return patients;

    return patients.filter((patient) => {
      return (
        patient.patient_label?.toLowerCase().includes(term) ||
        patient.patient_id?.toLowerCase().includes(term)
      );
    });
  }, [patients, search]);

  return (
    <div className="patients-page">
      <div className="page-header">
        <div>
          <p className="page-label">Clinical Records</p>
          <h1>Patients</h1>
          <p className="page-description">
            View patient records and their available medical history.
          </p>
        </div>

        <div className="patient-count">
          <strong>{patients.length}</strong>
          <span>Total Patients</span>
        </div>
      </div>

      <div className="search-bar">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Search patients by ID or label..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading && <p>Loading patient records...</p>}

      {error && (
        <p className="error-message">
          {error} Make sure the FastAPI backend is running.
        </p>
      )}

      {!loading && !error && (
        <div className="patients-table">
          <div className="table-header">
            <span>Patient</span>
            <span>Age</span>
            <span>Gender</span>
            <span>Encounters</span>
            <span>Conditions</span>
            <span>Action</span>
          </div>

          {filteredPatients.map((patient) => (
            <div className="patient-table-row" key={patient.patient_id}>
              <div className="patient-name">
                <div className="small-avatar">
                  {patient.patient_label?.slice(-3) || "—"}
                </div>

                <div>
                  <strong>{patient.patient_label}</strong>
                  <span>{patient.patient_id}</span>
                </div>
              </div>

              <span>{patient.age ?? "—"}</span>
              <span>{patient.gender ?? "—"}</span>
              <span>{patient.encounters_count}</span>
              <span>{patient.conditions_count}</span>

              <Link
                className="view-patient"
                to={`/patients/${encodeURIComponent(patient.patient_id)}`}
              >
                View →
              </Link>
            </div>
          ))}

          {filteredPatients.length === 0 && (
            <p className="empty-message">
              No patients match your search.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Patients;
