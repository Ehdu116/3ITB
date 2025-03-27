//imports
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//pages

//GlobalPages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ViewProjectPage from "./pages/ViewProjectPage";

export default function App() {
  return (
    <div className="App">
      <Routes>



        {/*GlobalPages*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/ViewProjectPage" element={<ViewProjectPage />} />
      </Routes>
    </div>
  );
}
