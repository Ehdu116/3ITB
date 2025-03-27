import React from "react";

export default function ProjectList({ projects }) {
  return (
    <div>
      <h3>Project List</h3>
      <ul>
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project.id}>
              <strong>{project.name}</strong> - {project.description} (Budget: ${project.budget})
            </li>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </ul>
    </div>
  );
}
