import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Styles from "../css modules/ProjectListComponents.module.css"; // Import the CSS module

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0); // Initialize total budget state

  useEffect(() => {
    // Fetch projects along with tasks
    axios.get("http://127.0.0.1:8000/api/projects", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authorization-token")}`,
      }
    }).then(res => {
      setProjects(res.data);
      // Calculate the sum of all estimated budgets
      const total = res.data.reduce((sum, project) => {
        return sum + (parseFloat(project.estimated_budget) || 0); // Ensuring that it's a valid number
      }, 0);
      setTotalBudget(total); // Update the total budget state
    }).catch(error => console.error("Error fetching projects:", error));
  }, []);

  const handleDeleteProject = (projectId) => {
    // Confirm the delete action
    if (window.confirm("Are you sure you want to delete this project?")) {
      // Send the delete request to the API
      axios
        .delete(`http://127.0.0.1:8000/api/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization-token")}`,
          },
        })
        .then(() => {
          // Filter out the deleted project from the state
          setProjects(projects.filter((p) => p.id !== projectId));
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
          alert("Failed to delete project.");
        });
    }
  };

  return (
    <div className={Styles.container}> {/* Apply the container style */}
      <h2 className={Styles.heading}>All Projects</h2> {/* Apply heading style */}
      
      {/* Total Budget Display */}
      <div className={Styles.totalBudget}>
        <h3>Total Estimated Budget: ${totalBudget.toFixed(2)}</h3> {/* Displaying the sum of estimated budgets */}
      </div>

      <table className={Styles.projectTable}> {/* Apply table style */}
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th> {/* Keep the Description column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className={Styles.projectItem}> {/* Apply project-item style */}
              <td>
                <Link to={`/projects/${p.id}`} className={Styles.projectLink}>{p.name}</Link> {/* View the project */}
              </td>
              <td>
                <p className={Styles.projectDescription}>{p.description}</p> {/* Display project description */}
              </td>
              <td>
                <div className={Styles.actionButtons}>
                  <Link to={`/projects/${p.id}/edit`} className={Styles.updateLink}>Update</Link> {/* Update link */}
                  <Link 
                    to="#" 
                    className={Styles.deleteLink} 
                    onClick={() => handleDeleteProject(p.id)} // Directly delete on click
                  >
                    Delete
                  </Link> {/* Delete link */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
