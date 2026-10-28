
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
