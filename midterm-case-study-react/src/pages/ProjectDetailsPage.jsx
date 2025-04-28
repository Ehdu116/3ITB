import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Buttons from "../components/Button.jsx";
import Styles from "../css modules/ProjectDetailsPage.module.css";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization-token")}`,
        },
      })
      .then((response) => setProject(response.data))
      .catch((error) => console.error("Error fetching project:", error));
  }, [projectId]);

  function handleBack() {
    navigate("/ViewProjectPage");
  }

  if (!project) return <div>Loading...</div>;

  return (
    <section className={Styles.container}>
      <h1 className={Styles.title}>Project Details</h1>

      {/* Project Info */}
      <label className={Styles.label}>Project Name:</label>
      <p className={Styles.text}>{project.name}</p>

      <label className={Styles.label}>Description:</label>
      <p className={Styles.text}>{project.description || "No description provided."}</p>

      <label className={Styles.label}>Estimated Budget:</label> {/* NEW */}
      <p className={Styles.text}>
        {project.estimated_budget !== undefined ? `₱${project.estimated_budget.toLocaleString()}` : "Not specified"}
      </p>

      <label className={Styles.label}>Actual Expenditure:</label> {/* NEW */}
      <p className={Styles.text}>
        {project.actual_expenditure !== undefined ? `₱${project.actual_expenditure.toLocaleString()}` : "Not specified"}
      </p>

      {/* Buttons */}
      <div className={Styles.buttonGroup}>
        <Buttons 
          name="Back" 
          onClick={handleBack} 
          className={Styles.projectButton} 
        />
      </div>
    </section>
  );
}

