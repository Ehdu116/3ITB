import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateTaskForm from "./CreateTaskForm";

const TaskList = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`/projects/${projectId}/tasks`)
      .then(res => setTasks(res.data));
  }, [projectId]);

  return (
    <div>
      <h2>Tasks</h2>
      <CreateTaskForm projectId={projectId} onTaskCreated={() => {
        axios.get(`/projects/${projectId}/tasks`)
          .then(res => setTasks(res.data));
      }} />
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title} - {t.status} - {t.priority}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
