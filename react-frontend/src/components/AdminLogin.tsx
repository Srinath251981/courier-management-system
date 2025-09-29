import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  message: string;
}

export default function AdminLogin() {
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
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data: LoginResponse = await response.json();
      if (response.ok) {
        console.log(data.message);
        navigate("/adminDashboard");
      } else {
        setError(data.message || "Invalid login");
      }
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>

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
        <div className="admin-button-group">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
