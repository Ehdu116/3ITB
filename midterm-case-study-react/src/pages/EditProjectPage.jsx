import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Buttons from "../components/Button.jsx"; // Assuming you have a Button component
import Styles from "../css modules/EditProjectPage.module.css"; // Assuming this CSS file exists
import axios from "axios";

export default function EditProjectPage({ onProjectUpdated }) {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [actualExpenditure, setActualExpenditure] = useState('');

  // Fetch the existing project data to pre-fill the form
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization-token")}`,
        },
      })
      .then((response) => {
        const project = response.data;
        setProjectName(project.name);
        setProjectDescription(project.description);
        setEstimatedBudget(project.estimated_budget || '');  // Pre-fill estimated budget
        setActualExpenditure(project.actual_expenditure || '');  // Pre-fill actual expenditure
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });
  }, [projectId]);

  function handleBack() {
    navigate("/ViewProjectPage"); // Navigate to the project view page
  }

  function handleUpdateProject() {
    if (!projectName.trim() || !projectDescription.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    // Send the update request to the API
    axios
      .put(
        `http://127.0.0.1:8000/api/projects/${projectId}`, // Update the project by ID
        {
          name: projectName,
          description: projectDescription,
          estimated_budget: estimatedBudget,  // Send the updated budget
          actual_expenditure: actualExpenditure,  // Send the updated actual expenditure
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization-token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Project Updated:", response.data);
        // Update the parent component's state with the updated project
        onProjectUpdated(response.data);
        // Navigate to the project view page
        navigate("/ViewProjectPage");
      })
      .catch((error) => {
        console.error("Error updating project:", error);
        alert("Failed to update project.");
      });
  }

  return (
    <section className={Styles.container}>
      <h1 className={Styles.title}>Edit Project</h1>

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
        <Buttons name="Update Project" onClick={handleUpdateProject} />
      </div>
    </section>
  );
}
