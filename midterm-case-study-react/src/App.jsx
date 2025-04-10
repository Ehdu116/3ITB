// App.jsx
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ViewProjectPage from "./pages/ViewProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/ViewProjectPage" element={<ViewProjectPage />} />
        <Route
          path="/create-project"
          element={
            <CreateProjectPage
              onProjectCreated={() => console.log("Hurray! project is created")}
            />
          }
        />
      </Routes>
    </div>
  );
}
