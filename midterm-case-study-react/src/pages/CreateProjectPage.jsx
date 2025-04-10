import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../components/Button.jsx"; // Assuming your button component exists
import Styles from "../css modules/CreateProjectPage.module.css";
import axios from "axios";

export default function CreateProjectPage({ onProjectCreated }) {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  function handleBack() {
    navigate("/ViewProjectPage");
  }

  function handleCreateProject() {
    if (!projectName.trim() || !projectDescription.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/api/projects",
        {
          name: projectName,
          description: projectDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization-token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Project Created:", response.data);
        setProjectName("");
        setProjectDescription("");
        onProjectCreated(response.data);
        navigate("/ViewProjectPage");
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        alert("Failed to create project.");
      });
  }

  return (
    <section className={Styles.container}>
      <h1 className={Styles.title}>Create Project</h1>

      <label className={Styles.label}>Project Name:</label>
      <input
        type="text"
        className={Styles.input}
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Enter project name"
        required
      />

      <label className={Styles.label}>Project Description:</label>
      <textarea
        className={Styles.textarea}
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        placeholder="Enter project description"
        required
      />

      <div className={Styles.buttonGroup}>
        <Buttons name="Back" onClick={handleBack} />
        <Buttons name="Create Project" onClick={handleCreateProject} />
      </div>
    </section>
  );
}
