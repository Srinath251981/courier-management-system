import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffFp() {
  const [pwd1, setpwd1] = useState("");
  const [pwd2, setpwd2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    staffUsername: "",
    staffEmail: "",
    staffPwd: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (pwd1 != pwd2) {
      setLoading(false);
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/staff/updatePassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.staffUsername,
            email: formData.staffEmail,
            password: pwd1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(data.message || "Something went wrong!");
        return;
      }

      console.log("Password updated :", response.json);
      alert("Password updated successfully!!");
      setLoading(false);
      navigate("/staff");
    } catch (err) {
      console.error("Error updating staff password!: ", err);
      setLoading(false);
      setError("Server not reachable!");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="login-title">Update Password</h2>

      {loading ? (
        <div className="loader"></div>
      ) : (
        error && <p className="error-message">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="signup-form-group">
          <label className="signup-form-label">Username : </label>
          <input
            type="text"
            name="staffUsername"
            className="signup-form-input"
            value={formData.staffUsername}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Email : </label>
          <input
            type="email"
            name="staffEmail"
            className="signup-form-input"
            value={formData.staffEmail}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">New Password : </label>
          <input
            value={pwd1}
            type="Password"
            className="signup-form-input"
            onChange={(e) => setpwd1(e.target.value)}
            required
          ></input>
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Confirm Password : </label>
          <input
            value={pwd2}
            type="Password"
            className="signup-form-input"
            onChange={(e) => setpwd2(e.target.value)}
            required
          ></input>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
