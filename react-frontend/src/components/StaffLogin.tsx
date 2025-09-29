import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  message: string;
  name?: string;
  staffId?: number;
}

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        localStorage.setItem("StaffName", data.name || "");
        localStorage.setItem("StaffID", data.staffId?.toString() ?? "");
        navigate("/staffDashboard");
      } else {
        const data: LoginResponse = await response.json();
        setError(data.message || "Invalid login");
      }
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  function handleButton(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    navigate("/staffRegister");
  }

  function handleClick(e: FormEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    navigate("/staffUpdate");
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Staff Login</h2>

      {loading ? (
        <div className="loader"></div>
      ) : (
        error && <p className="error-message">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <button onClick={handleButton} className="btn btn-secondary">
            Sign Up
          </button>
        </div>
      </form>

      <a href="#" onClick={handleClick} className="forgot-link">
        Forgot Password?
      </a>
    </div>
  );
}
