import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    staffName: "",
    staffUsername: "",
    staffMobile: "",
    staffEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password != confirmPassword) {
      setLoading(false);
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/staff/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffName: formData.staffName,
          staffUsername: formData.staffUsername,
          staffMobile: formData.staffMobile,
          staffEmail: formData.staffEmail,
          staffPwd: password,
        }),
      });

      const data = await response.json();

      if (response.status != 201) {
        setLoading(false);
        setError(data.message || "Something went wrong!");
        return;
      }

      alert("Sign Up successfull!");
      setLoading(false);
      navigate("/staff");
    } catch (error) {
      console.log("Error creating staff account:", error);
      setLoading(false);
      setError("Server not reachable!");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="login-title">Staff Sign Up</h2>

      {loading ? (
        <div className="loader"></div>
      ) : (
        error && <p className="error-message">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="signup-form-group">
          <label className="signup-form-label">Name : </label>
          <input
            type="text"
            name="staffName"
            className="signup-form-input"
            value={formData.staffName}
            onChange={handleChange}
            required
          />
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
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Mobile : </label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            name="staffMobile"
            className="signup-form-input"
            value={formData.staffMobile}
            onChange={handleChange}
            title="Enter your 10 digit mobile number"
            required
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Username : </label>
          <input
            type="text"
            name="staffUsername"
            className="signup-form-input"
            value={formData.staffUsername}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Password : </label>
          <input
            type="Password"
            name="pwd1"
            className="signup-form-input"
            value={password}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
            onChange={(e) => setPassword(e.target.value)}
            required
            title="Password must contain :
            Atleast 1 Uppercase letter,
            Atleast 1 Lowercase letter,
            Atleast 1 digit,
            Atleast 1 symbol from : (! @ # $ % ^ & *),
            Minimum length of 8 characters
            "
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Confirm Password : </label>
          <input
            type="Password"
            name="pwd2"
            className="signup-form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
