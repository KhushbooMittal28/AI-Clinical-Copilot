import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import "./App.css";


// =========================
// DASHBOARD
// =========================

function Dashboard() {
  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            +
          </div>

          <div>
            <h2>Clinical Copilot</h2>
            <span>Primary Care AI</span>
          </div>

        </div>


        <nav>

          <Link
            to="/"
            className="nav-item active"
          >
            <span>⌂</span>
            Dashboard
          </Link>


          <Link
            to="/patients"
            className="nav-item"
          >
            <span>♙</span>
            Patients
          </Link>


          <button className="nav-item">
            <span>✦</span>
            AI Copilot
          </button>


          <button className="nav-item">
            <span>▣</span>
            Consultations
          </button>

        </nav>


        <div className="sidebar-bottom">

          <button className="nav-item">
            <span>⚙</span>
            Settings
          </button>

        </div>

      </aside>


      {/* Main Content */}
      <main className="main-content">

        <header className="topbar">

          <div>
            <p className="welcome">
              Good morning, Doctor
            </p>

            <h1>
              Dashboard
            </h1>
          </div>


          <div className="doctor-profile">

            <div className="avatar">
              DR
            </div>

            <div>
              <strong>
                Dr. Sharma
              </strong>

              <span>
                Primary Care
              </span>
            </div>

          </div>

        </header>


        {/* Statistics */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon blue">
              ♙
            </div>

            <div>
              <span>
                Total Patients
              </span>

              <h2>
                108
              </h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              ▣
            </div>

            <div>
              <span>
                Consultations
              </span>

              <h2>
                24
              </h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon purple">
              ✦
            </div>

            <div>
              <span>
                AI Summaries
              </span>

              <h2>
                18
              </h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              ◷
            </div>

            <div>
              <span>
                Pending Reviews
              </span>

              <h2>
                5
              </h2>
            </div>

          </div>

        </section>


        {/* Dashboard Content */}

        <section className="dashboard-grid">


          {/* Recent Patients */}

          <div className="panel patients-panel">

            <div className="panel-header">

              <div>

                <h2>
                  Recent Patients
                </h2>

                <p>
                  Recently accessed patient records
                </p>

              </div>


              <Link
                to="/patients"
                className="view-button"
              >
                View All
              </Link>

            </div>


            <div className="patient-list">


              <div className="patient-row">

                <div className="patient-avatar">
                  JD
                </div>

                <div className="patient-info">

                  <strong>
                    Patient 001
                  </strong>

                  <span>
                    Last visit · Today
                  </span>

                </div>

                <span className="status stable">
                  Stable
                </span>

              </div>


              <div className="patient-row">

                <div className="patient-avatar">
                  AS
                </div>

                <div className="patient-info">

                  <strong>
                    Patient 002
                  </strong>

                  <span>
                    Last visit · Yesterday
                  </span>

                </div>

                <span className="status review">
                  Review
                </span>

              </div>


              <div className="patient-row">

                <div className="patient-avatar">
                  RK
                </div>

                <div className="patient-info">

                  <strong>
                    Patient 003
                  </strong>

                  <span>
                    Last visit · 2 days ago
                  </span>

                </div>

                <span className="status stable">
                  Stable
                </span>

              </div>


              <div className="patient-row">

                <div className="patient-avatar">
                  NM
                </div>

                <div className="patient-info">

                  <strong>
                    Patient 004
                  </strong>

                  <span>
                    Last visit · 3 days ago
                  </span>

                </div>

                <span className="status pending">
                  Pending
                </span>

              </div>


            </div>

          </div>


          {/* AI Copilot */}

          <div className="panel copilot-panel">

            <div className="copilot-icon">
              ✦
            </div>

            <h2>
              AI Clinical Copilot
            </h2>

            <p>
              Review patient history, retrieve relevant
              clinical information, and generate structured
              consultation summaries.
            </p>

            <button className="copilot-button">
              Open AI Copilot →
            </button>

            <div className="copilot-note">

              <span>
                ●
              </span>

              Clinician review required

            </div>

          </div>


        </section>

      </main>

    </div>
  );
}



// =========================
// PATIENTS PAGE
// =========================

function PatientsPage() {
  return (
    <div className="app">

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            +
          </div>

          <div>
            <h2>
              Clinical Copilot
            </h2>

            <span>
              Primary Care AI
            </span>
          </div>

        </div>


        <nav>

          <Link
            to="/"
            className="nav-item"
          >
            <span>⌂</span>
            Dashboard
          </Link>


          <Link
            to="/patients"
            className="nav-item active"
          >
            <span>♙</span>
            Patients
          </Link>


          <button className="nav-item">

            <span>
              ✦
            </span>

            AI Copilot

          </button>


          <button className="nav-item">

            <span>
              ▣
            </span>

            Consultations

          </button>

        </nav>


        <div className="sidebar-bottom">

          <button className="nav-item">

            <span>
              ⚙
            </span>

            Settings

          </button>

        </div>

      </aside>


      <main className="main-content">

        <Patients />

      </main>

    </div>
  );
}



// =========================
// PATIENT PROFILE PAGE
// =========================

function PatientProfilePage() {
  return (
    <div className="app">

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            +
          </div>

          <div>
            <h2>
              Clinical Copilot
            </h2>

            <span>
              Primary Care AI
            </span>
          </div>

        </div>


        <nav>

          <Link
            to="/"
            className="nav-item"
          >
            <span>⌂</span>
            Dashboard
          </Link>


          <Link
            to="/patients"
            className="nav-item active"
          >
            <span>♙</span>
            Patients
          </Link>


          <button className="nav-item">

            <span>
              ✦
            </span>

            AI Copilot

          </button>


          <button className="nav-item">

            <span>
              ▣
            </span>

            Consultations

          </button>

        </nav>


        <div className="sidebar-bottom">

          <button className="nav-item">

            <span>
              ⚙
            </span>

            Settings

          </button>

        </div>

      </aside>


      <main className="main-content">

        <PatientProfile />

      </main>

    </div>
  );
}



// =========================
// APP ROUTES
// =========================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />


        {/* Patients */}
        <Route
          path="/patients"
          element={<PatientsPage />}
        />


        {/* Individual Patient */}
        <Route
          path="/patients/:id"
          element={<PatientProfilePage />}
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;