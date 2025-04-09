import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/projects").then(res => setProjects(res.data));
  }, []);

  return (
    <div>
      <h2>All Projects</h2>
      <Link to="/create-project">➕ Create Project</Link>
      <ul>
        {projects.map(p => (
          <li key={p.id}>
            <Link to={`/projects/${p.id}/tasks`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
