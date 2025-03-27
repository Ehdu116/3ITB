import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import Button from "../components/Button.jsx";
// CSS styles
import Style from "../css modules/ProjectDashboard.module.css";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faTasks, faChartBar } from "@fortawesome/free-solid-svg-icons";
// Components
import ProjectList from "../components/ProjectList.jsx";

export default function ViewProjectPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsUserAdmin(location.state?.isUserAdmin);
    setUserId(location.state?.userId);
  }, [location]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  function handleLogout() {
    navigate("/", { replace: true });
  }

  function handleCreateProject() {
    navigate("/create-project");
  }

  function handleAssignTasks() {
    navigate("/assign-tasks");
  }

  function handleTrackProgress() {
    navigate("/track-progress");
  }

  function handleViewReports() {
    navigate("/reports");
  }

  return (
    <section>
      <header>
        <div className={Style.header__Title}>
          <div className={Style.titleLayout}>
            <h1>Project Management System</h1>
          </div>

          <Dropdown className={Style.header__userIcon}>
            <Dropdown.Toggle
              className={Style.iconBorder}
              variant="link"
              id="dropdown-basic"
            >
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                style={{ color: "#4470FE" }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu className="m-0 p-0">
              <Button
                className="d-flex justify-content-center align-items-center dropdown-item m-0 p-0"
                name={"Log Out"}
                onClick={handleLogout}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <h2>{isUserAdmin ? "Admin Dashboard" : "Project List"}</h2>

        {isUserAdmin && (
  <div className={Style.adminActions}>
    <Button name="Create Project" onClick={handleCreateProject} />
    <Button name="Assign Tasks" onClick={handleAssignTasks} />
    <Button name="Track Progress" onClick={handleTrackProgress} />
    <Button name="View Reports" onClick={handleViewReports} />
  </div>
)}


        <ProjectList projects={projects} />
      </header>
    </section>
  );
}
