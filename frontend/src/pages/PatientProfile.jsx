import "./PatientProfile.css";

function PatientProfile() {
  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">

        <div>
          <p className="page-label">Patient Record</p>
          <h1>Patient 001</h1>
          <p className="patient-id">
            Patient ID: P001
          </p>
        </div>

        <button className="copilot-action">
          ✦ Open AI Copilot
        </button>

      </div>


      {/* Basic Information */}
      <section className="profile-grid">

        <div className="profile-card patient-overview">

          <div className="large-avatar">
            P1
          </div>

          <div>
            <h2>Patient 001</h2>
            <p>Male · 46 years</p>
            <span className="stable-badge">
              Stable
            </span>
          </div>

        </div>


        <div className="profile-card">

          <h3>Patient Information</h3>

          <div className="info-grid">

            <div>
              <span>Gender</span>
              <strong>Male</strong>
            </div>

            <div>
              <span>Age</span>
              <strong>46 years</strong>
            </div>

            <div>
              <span>Marital Status</span>
              <strong>Married</strong>
            </div>

            <div>
              <span>Patient ID</span>
              <strong>P001</strong>
            </div>

          </div>

        </div>

      </section>


      {/* Medical History */}
      <section className="profile-card history-card">

        <div className="section-heading">

          <div>
            <h2>Medical History</h2>
            <p>
              Information retrieved from the patient's
              longitudinal record.
            </p>
          </div>

        </div>


        <div className="history-grid">

          {/* Conditions */}
          <div className="history-section">

            <h3>Conditions</h3>

            <div className="history-item">
              <strong>Hypertension</strong>
              <span>Recorded condition</span>
            </div>

            <div className="history-item">
              <strong>Type 2 Diabetes</strong>
              <span>Recorded condition</span>
            </div>

          </div>


          {/* Medications */}
          <div className="history-section">

            <h3>Medications</h3>

            <div className="history-item">
              <strong>Medication record</strong>
              <span>4 medication records available</span>
            </div>

          </div>


          {/* Allergies */}
          <div className="history-section">

            <h3>Allergies</h3>

            <div className="empty-history">
              No recorded allergies
            </div>

          </div>


          {/* Observations */}
          <div className="history-section">

            <h3>Observations</h3>

            <div className="history-item">
              <strong>Clinical observations</strong>
              <span>Recent patient measurements</span>
            </div>

          </div>

        </div>

      </section>


      {/* Encounters */}
      <section className="profile-card">

        <div className="section-heading">

          <div>
            <h2>Recent Encounters</h2>
            <p>
              Recent healthcare encounters associated
              with this patient.
            </p>
          </div>

        </div>


        <div className="encounter-row">

          <div className="encounter-date">
            <strong>Today</strong>
            <span>Primary Care</span>
          </div>

          <div>
            <strong>Clinical consultation</strong>
            <p>Routine patient encounter</p>
          </div>

          <span className="encounter-status">
            Completed
          </span>

        </div>


        <div className="encounter-row">

          <div className="encounter-date">
            <strong>Previous</strong>
            <span>Primary Care</span>
          </div>

          <div>
            <strong>Follow-up consultation</strong>
            <p>Previous medical encounter</p>
          </div>

          <span className="encounter-status">
            Completed
          </span>

        </div>

      </section>

    </div>
  );
}

export default PatientProfile;