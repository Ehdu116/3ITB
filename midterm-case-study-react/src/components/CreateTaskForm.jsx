import React, { useState } from "react";
import axios from "axios";
import Styles from "../css modules/CreateTaskFormComponents.module.css"; // Import the correct CSS module

const CreateTaskForm = ({ projectId, onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const taskData = {
      title,
      status,
      priority,
      project_id: projectId,
    };

    axios
      .post("http://127.0.0.1:8000/api/tasks", taskData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authorization-token")}`,
        },
      })
      .then((response) => {
        console.log("Task Created:", response.data);
        onTaskCreated(projectId); // Notify parent to refresh tasks
        setTitle(""); // Clear the form
        setStatus("Not Started");
        setPriority("Low");
      })
      .catch((error) => {
        console.error("Error creating task:", error);
        alert("Failed to create task.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.formContainer}>
      <div className={Styles.formGroup}>
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={Styles.formInput}
        />
      </div>

      <div className={Styles.formGroup}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={Styles.formInput}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className={Styles.formGroup}>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={Styles.formInput}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button type="submit" className={Styles.submitButton}>Create Task</button>
    </form>
  );
};

export default CreateTaskForm;
