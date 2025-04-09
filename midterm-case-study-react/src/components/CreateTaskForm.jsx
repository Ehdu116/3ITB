import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateTaskForm = ({ projectId, onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users").then(res => setUsers(res.data));
  }, []);

  function handleCreateTask(e) {
    e.preventDefault();

    axios.post("/tasks", {
      title,
      status,
      priority,
      assigned_to: assignedTo,
      project_id: projectId
    }).then(() => {
      setTitle("");
      setStatus("todo");
      setPriority("medium");
      setAssignedTo("");
      onTaskCreated();
    });
  }

  return (
    <form onSubmit={handleCreateTask}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" required />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="todo">To do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
        <option value="">Unassigned</option>
        {users.map(user => (
          <option value={user.id} key={user.id}>{user.name}</option>
        ))}
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTaskForm;
