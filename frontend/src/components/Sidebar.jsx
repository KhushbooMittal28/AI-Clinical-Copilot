
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">+</div>

        <div>
          <h2>Clinical Copilot</h2>
          <span>Primary Care AI</span>
        </div>
      </div>

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>⌂</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/patients"
          className={({ isActive }) =>
            `nav-item ${isActive || window.location.pathname.startsWith("/patients/") ? "active" : ""}`
          }
        >
          <span>♙</span>
          Patients
        </NavLink>

        <NavLink
          to="/copilot"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>✧</span>
          AI Copilot
        </NavLink>

        <NavLink
          to="/consultations"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>▤</span>
          Consultations
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button className="nav-item" type="button">
          <span>⚙</span>
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
