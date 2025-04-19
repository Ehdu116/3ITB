import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateTaskForm from "../components/CreateTaskForm";

const TaskList = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state

  // Fetch tasks when the component mounts or projectId changes
  useEffect(() => {
    console.log("Fetching tasks for project:", projectId);
    axios
      .get(`http://127.0.0.1:8000/api/projects/${projectId}/tasks`)
      .then((res) => {
        console.log("Fetched Tasks:", res.data);  // Debugging response
        setTasks(res.data);  // Set tasks state
        setLoading(false);  // Set loading state to false
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);  // Stop loading if there is an error
      });
  }, [projectId]);

  const handleTaskCreated = () => {
    console.log("Re-fetching tasks after task creation");
    // Re-fetch tasks after a task is created
    axios
      .get(`http://127.0.0.1:8000/api/projects/${projectId}/tasks`)
      .then((res) => {
        console.log("Fetched Tasks after creation:", res.data);  // Debugging response
        setTasks(res.data);  // Update tasks state with the new list
      })
      .catch((error) => {
        console.error("Error re-fetching tasks:", error);
      });
  };

  return (
    <div>
      <h2>Tasks</h2>
      <CreateTaskForm projectId={projectId} onTaskCreated={handleTaskCreated} />
      
      {loading ? (
        <div>Loading tasks...</div>  // Loading feedback
      ) : (
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id}>
              <strong>{task.title}</strong> - {task.status} - {task.priority} - Assigned to: {task.assignedUser?.name || "Unassigned"}
            </li>
            
            ))
          ) : (
            <li>No tasks assigned yet.</li>  // Display this message if there are no tasks
          )}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
