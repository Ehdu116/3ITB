// React
import React, { useState, useEffect } from "react";
// CSS style
import Style from "../css modules/LoginPage.module.css";
// React router dom
import { useNavigate, Link } from "react-router-dom";
// Axios
import axios from "../api/axios";
// Bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To disable button during login attempt
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            response.statusText +
            " " +
            response.status +
            " The server has not found anything matching the Request-URI"
          );
        }
      })
      .then((data) => setUsers(data))
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = users.find((user) => user.email === email);
      if (user) {
        // User exists, get the user ID
        const userId = user.id;
        const response = await axios.post("/login", { email, password });
        // store the autorization token
        if (response.status === 200) {
          localStorage.setItem("authorization-token", response.data.token)
          console.table("userId got from the email: ", userId);
          setEmail("");
          setPassword("");
          navigate("/ViewProjectPage", {
            state: {
              isUserAdmin: response.data.role === "admin",
              userId: user.id,
            },
            replace: true,
          });
        }
      } else {
        // User does not exist, display error message
        setError("Email does not exist");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }
    setLoading(false);
  };

  function handleNavigateRegister() {
    navigate("/RegisterPage", { replace: true });
  }

  return (
    <div className={Style.loginContainer}>
      <div className={Style.loginForm}>
        <h2 className={Style.header}>Login</h2>
        {error && <p className={Style.textDanger}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label d-flex">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Reset error when email changes
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label d-flex">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Reset error when password changes
              }}
              required
            />
          </div>
          <Button
            type="submit"
            className="btn btn-primary w-50 mt-2"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </form>
        <Container fluid className="d-flex mt-3 justify-content-center">
          <p>Don't have an account?</p>
          <Button
            variant="link"
            className="p-0 m-0 align-text-top"
            onClick={handleNavigateRegister}
          >
            <p>Register</p>
          </Button>
        </Container>
      </div>
    </div>
  );
}
