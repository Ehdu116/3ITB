import { useNavigate } from "react-router-dom";
import Buttons from "../components/Button.jsx"; // Import your button component


export default function CreateProjectPage() {
  const navigate = useNavigate();

  function handleBack() {
    navigate("/ViewProjectPage  "); // Adjust the path if needed
  }

  function handleCreateProject() {
    console.log("Project Created!"); // Replace this with actual logic
  }

  return (
    <section>
      <h1>Create Project</h1>
      
      {/* Back Button */}
      <Buttons name="Back" onClick={handleBack} />

      {/* Create Project Button (optional) */}
      <Buttons name="Create Project" onClick={handleCreateProject} />
    </section>
  );
}
