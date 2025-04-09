// React
import React, { useState } from "react";
// CSS style
import Style from "../css modules/LoginPage.module.css";
// React router dom
import { useNavigate } from "react-router-dom";
// Axios
import axios from "../api/axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/register", {
        name,
        email,
        contact,
        password,
        password_confirmation: confirmPassword,
      });

      setName("");
      setEmail("");
      setContact("");
      setPassword("");
      navigate("/");
      setError("Registration Successful");
    } catch (error) {
      console.error("Error:", error); // Log the full error for debugging
    
      if (error.response) {
        // Handle different status codes
        if (error.response.status === 400) {
          setError("Invalid username or password");
        } else {
          setError(error.response.data?.message || "Registration failed");
        }
      } else if (error.request) {

        setError("No response from server. Check your API.");
      } else {
        // Other unexpected errors
        setError("An unexpected error occurred.");
      }
    }
    
  };

  const handleBackToLogin = () => {
    navigate("/"); // Navigate back to the Login Page
  };

  return (
    <div className={Style.loginContainer}>
      <div className={Style.loginForm}>
        <h2 className={Style.header}>Register</h2>
        {error && <p className={Style.textDanger}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="contact" className="form-label">
              Contact:
            </label>
            <input
              type="text"
              className="form-control"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-50">
            Register
          </button>
        </form>
        <button
          type="button"
          className="btn btn-secondary mt-3 w-50"
          onClick={handleBackToLogin}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
