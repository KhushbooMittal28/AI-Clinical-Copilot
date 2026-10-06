import { Link } from "react-router-dom";
import "./Patients.css";

function Patients() {
  const patients = [
    {
      id: "P001",
      name: "Patient 001",
      age: 46,
      gender: "Male",
      status: "Stable",
      lastVisit: "Today",
    },
    {
      id: "P002",
      name: "Patient 002",
      age: 34,
      gender: "Female",
      status: "Review",
      lastVisit: "Yesterday",
    },
    {
      id: "P003",
      name: "Patient 003",
      age: 61,
      gender: "Male",
      status: "Stable",
      lastVisit: "2 days ago",
    },
    {
      id: "P004",
      name: "Patient 004",
      age: 29,
      gender: "Female",
      status: "Pending",
      lastVisit: "3 days ago",
    },
  ];

  return (
    <div className="patients-page">

      <div className="page-header">
        <div>
          <p className="page-label">Clinical Records</p>
          <h1>Patients</h1>
          <p className="page-description">
            View and manage patient information and medical history.
          </p>
        </div>

        <div className="patient-count">
          <strong>108</strong>
          <span>Total Patients</span>
        </div>
      </div>

      <div className="search-bar">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Search patients by ID or name..."
        />
      </div>

      <div className="patients-table">

        <div className="table-header">
          <span>Patient</span>
          <span>Age</span>
          <span>Gender</span>
          <span>Last Visit</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {patients.map((patient) => (
          <div className="patient-table-row" key={patient.id}>

            <div className="patient-name">
              <div className="small-avatar">
                {patient.name.slice(-3)}
              </div>

              <div>
                <strong>{patient.name}</strong>
                <span>{patient.id}</span>
              </div>
            </div>

            <span>{patient.age}</span>

            <span>{patient.gender}</span>

            <span>{patient.lastVisit}</span>

            <span>
              <span
                className={`patient-status ${patient.status.toLowerCase()}`}
              >
                {patient.status}
              </span>
            </span>

<Link
  to={`/patients/${patient.id}`}
  className="view-patient"
>
  View →
</Link>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Patients;