import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ViewProjectPage from "./pages/ViewProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import DeleteProjectPage from "./pages/DeleteProjectPage";
import EditProjectPage from "./pages/EditProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

export default function App() {
  // Define the handleProjectCreated callback
  const handleProjectCreated = () => {
    console.log("Hurray! project is created");
  };

  // Define the handleProjectDeleted callback
  const handleProjectDeleted = (projectId) => {
    console.log(`Project with ID ${projectId} deleted`);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/ViewProjectPage" element={<ViewProjectPage />} />
        <Route path="/create-project" element={<CreateProjectPage onProjectCreated={handleProjectCreated} />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} /> {/* Add this route */}
        <Route
          path="/delete-project/:id"
          element={<DeleteProjectPage onProjectDeleted={handleProjectDeleted} />}
        />
        <Route path="/projects/:id/edit"
          element={<EditProjectPage onProjectUpdated={() => console.log("Project updated!")} />}
        />

      </Routes>
    </div>
  );
}
