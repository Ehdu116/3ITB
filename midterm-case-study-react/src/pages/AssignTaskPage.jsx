import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams added
import Buttons from "../components/Button.jsx";
import Styles from "../css modules/CreateProjectPage.module.css"; // Reuse CreateProjectPage CSS
import axios from "axios";

export default function AssignTaskPage() {
  const { projectId } = useParams(); // Get the projectId from the URL params
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false); // Control form visibility
  const [tasks, setTasks] = useState([]); // Store tasks list
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("Not Started"); // Default status
  const [priority, setPriority] = useState("Low"); // Default priority
  const [assignedTo, setAssignedTo] = useState(""); // User assignment
  const [users, setUsers] = useState([]); // Users list for assignment
  
  

  // Fetch tasks and users on component mount
  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [projectId]); // Re-fetch tasks when projectId changes

  // Fetch tasks from the backend
  function fetchTasks() {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${projectId}/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization-token")}`,
        },
      })
      .then((response) => {
        setTasks(response.data); // Update task list
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }

  // Fetch users for task assignment
  function fetchUsers() {
    axios
      .get("http://127.0.0.1:8000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authorization-token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data); // Update users list
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  // Handle task creation
  function handleCreateTask() {
    if (!taskTitle.trim() || !taskDescription.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post(
        `http://127.0.0.1:8000/api/projects/${projectId}/tasks`, // Pass projectId in the URL
        {
          title: taskTitle,
          description: taskDescription,
          status: status,
          priority: priority,
          assigned_to: assignedTo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization-token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Task Created:", response.data);
        setTaskTitle("");
        setTaskDescription("");
        setAssignedTo("");
        setStatus("Not Started");
        setPriority("Low");
        setShowCreateForm(false); // Close the form after creating
        fetchTasks(); // Refresh task list
      })
      .catch((error) => {
        console.error("Error creating task:", error.response?.data || error.message);
        alert(error.response?.data?.errors ? "Validation failed!" : "Failed to create task.");
      });
      
  }

  // Handle form visibility
  function handleBack() {
    setShowCreateForm(false); // Close the form when canceled
  }

  return (
    <section className={Styles.container}>
      <main className={Styles.mainContent}>
      <div className={Styles.buttonGroup}>
        <Buttons name="Back" onClick={() => navigate(-1)} />
      </div>
        <h1 className={Styles.title}>Task Dashboard</h1>

        {/* Dashboard content - list of tasks */}
        {!showCreateForm ? (
          <>
            <div className={Styles.buttonGroup}>
              <Buttons
                name="+ Add Task"
                onClick={() => setShowCreateForm(true)} // Show create form
              />
            </div>

            {/* Display tasks if any */}
            <div className={Styles.taskList}>
              {tasks.length === 0 ? (
                <p>No tasks assigned yet.</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className={Styles.taskCard}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Assigned to: {task.assignedUser?.name || "Unassigned"}</p>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <>
            {/* Task creation form */}
            <label className={Styles.label}>Task Title:</label>
            <input
              type="text"
              className={Styles.input}
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />

            <label className={Styles.label}>Task Description:</label>
            <textarea
              className={Styles.textarea}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
              required
            />

            <label className={Styles.label}>Status:</label>
            <select
              className={Styles.input}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <label className={Styles.label}>Priority:</label>
            <select
              className={Styles.input}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <label className={Styles.label}>Assign to:</label>
            <select
              className={Styles.input}
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {/* Buttons for form actions */}
            <div className={Styles.buttonGroup}>
              <Buttons name="Create Task" onClick={handleCreateTask} />
            </div>
          </>
        )}
      </main>
    </section>
  );
}
