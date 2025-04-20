import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../components/Button.jsx"; // Assuming your button component exists
import Styles from "../css modules/CreateProjectPage.module.css";
import axios from "axios";

export default function CreateProjectPage({ onProjectCreated }) {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState(""); // State for estimated budget
  const [actualExpenditure, setActualExpenditure] = useState(""); // State for actual expenditure

  function handleBack() {
    navigate("/ViewProjectPage");
  }

  function handleCreateProject() {
    if (!projectName.trim() || !projectDescription.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    // Post the new project to the API
    axios
      .post(
        "http://127.0.0.1:8000/api/projects", // Make sure this URL matches your backend route
        {
          name: projectName, // Use 'name' here instead of 'title'
          description: projectDescription,
          estimated_budget: estimatedBudget, // Include the estimated budget
          actual_expenditure: actualExpenditure, // Include the actual expenditure
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization-token")}`, // Assuming you're using JWT or token auth
          },
        }
      )
      .then((response) => {
        console.log("Project Created:", response.data);
        // Reset fields
        setProjectName("");
        setProjectDescription("");
        setEstimatedBudget(""); // Reset estimated budget field
        setActualExpenditure(""); // Reset actual expenditure field
        // Update the parent component's state to reflect the new project
        onProjectCreated(response.data);
        // Optionally navigate or stay on the current page
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

      {/* Project Name Input */}
      <label className={Styles.label}>Project Name:</label>
      <input
        type="text"
        className={Styles.input}
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Enter project name"
        required
      />

      {/* Project Description Input */}
      <label className={Styles.label}>Project Description:</label>
      <textarea
        className={Styles.textarea}
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        placeholder="Enter project description"
        required
      />

      {/* Estimated Budget Input */}
      <label className={Styles.label}>Estimated Budget:</label>
      <input
        type="number"
        className={Styles.input}
        value={estimatedBudget}
        onChange={(e) => setEstimatedBudget(e.target.value)}
        placeholder="Enter estimated budget"
        required
      />

      {/* Actual Expenditure Input */}
      <label className={Styles.label}>Actual Expenditure:</label>
      <input
        type="number"
        className={Styles.input}
        value={actualExpenditure}
        onChange={(e) => setActualExpenditure(e.target.value)}
        placeholder="Enter actual expenditure"
        required
      />

      {/* Buttons */}
      <div className={Styles.buttonGroup}>
        <Buttons name="Back" onClick={handleBack} />
        <Buttons name="Create Project" onClick={handleCreateProject} />
      </div>
    </section>
  );
}
