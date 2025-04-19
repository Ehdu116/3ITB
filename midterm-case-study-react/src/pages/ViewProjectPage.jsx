import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// CSS styles
import Style from "../css modules/ProjectDashboard.module.css";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChartBar, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// Components
import ProjectList from "../components/ProjectList.jsx";

export default function ViewProjectPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  // ✅ Grab userId from router state (kept)
  useEffect(() => {
    setUserId(location.state?.userId);
  }, [location]);

  // ✅ Fetch project list with auth (kept and clarified)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects", {
      headers: { Authorization: `Bearer ${localStorage.getItem("authorization-token")}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Projects fetched:", data);
        setProjects(data);
      })
      .catch((error) => console.error("❌ Error fetching projects:", error));
  }, []);

  function handleLogout() {
    navigate("/", { replace: true });
  }

  function handleNavigation(route) {
    navigate(route);
  }

  return (
    <section className={Style.container}>
      {/* Sidebar */}
      <aside className={Style.sidebar}>
        <h2>Dashboard</h2>
        <ul className={Style.sidebarMenu}>
          <li onClick={() => handleNavigation("/create-project")}>
            <FontAwesomeIcon icon={faPlus} /> Create Project
          </li>
          <li onClick={() => handleNavigation("/track-progress")}>
            <FontAwesomeIcon icon={faChartBar} /> Track Progress
          </li>
          <li onClick={() => handleNavigation("/reports")}>
            <FontAwesomeIcon icon={faChartBar} /> View Reports
          </li>
          <li onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className={Style.mainContent}>
        <header className={Style.header}>
          <h1>Project Management System</h1>
        </header>

        <div className={Style.projectList}>
          <ProjectList projects={projects} />
        </div>
      </main>
    </section>
  );
}
