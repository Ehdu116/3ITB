import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { Link } from "react-router-dom";
import Styles from "../css modules/ProjectListComponents.module.css"; // Import the CSS module
import CreateTaskForm from "./CreateTaskForm"; // Import the task creation form

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects along with tasks
    axios.get("http://127.0.0.1:8000/api/projects", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authorization-token")}`,
      }
    }).then(res => setProjects(res.data));
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
        .then((response) => {
          console.log("Project Deleted:", response.data);
          setProjects(projects.filter((p) => p.id !== projectId)); // Remove the deleted project from the list
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
          alert("Failed to delete project.");
        });
    }
  };

  // Handle task creation for a specific project
  const handleTaskCreated = (projectId) => {
    // Refresh the project list with updated tasks after a task is created
    axios.get("http://127.0.0.1:8000/api/projects", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authorization-token")}`,
      }
    }).then(res => setProjects(res.data));
  };

  return (
    <div className={Styles.container}> {/* Apply the container style */}
      <h2 className={Styles.heading}>All Projects</h2> {/* Apply heading style */}
    
      <table className={Styles.projectTable}> {/* Apply table style */}
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Actions</th>
            <th>Tasks</th> {/* Add a column for tasks */}
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className={Styles.projectItem}> {/* Apply project-item style */}
              <td>
                <Link to={`/projects/${p.id}`} className={Styles.projectLink}>{p.name}</Link> {/* View the project */}
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
              <td>
                <ul>
                  {p.tasks && p.tasks.length > 0 ? (
                    p.tasks.map((task) => (
                      <li key={task.id}>
                        <div>{task.title}</div>
                        <div>Status: {task.status}</div>
                        <div>Priority: {task.priority}</div>
                      </li>
                    ))
                  ) : (
                    <div>No tasks assigned yet</div>
                  )}
                </ul>
                {/* Create Task Form */}
                <CreateTaskForm projectId={p.id} onTaskCreated={() => handleTaskCreated(p.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
