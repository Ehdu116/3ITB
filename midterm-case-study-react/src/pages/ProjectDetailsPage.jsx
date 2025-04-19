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
      <p className={Styles.text}>{project.description}</p>

      {/* Task List */}
      <label className={Styles.label}>Tasks:</label>
      <div className={Styles.taskList}>
        {project.tasks?.length > 0 ? (
          project.tasks.map((task) => (
            <div key={task.id} className={Styles.taskCard}>
              <p className={Styles.taskTitle}>Title: {task.title}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
            </div>
          ))
        ) : (
          <p className={Styles.text}>No tasks available.</p>
        )}
      </div>

      {/* Buttons */}
      <div className={Styles.buttonGroup}>
      <Buttons name="Back" onClick={handleBack} className={Styles.projectButton} />
      </div>
    </section>
  );
}
