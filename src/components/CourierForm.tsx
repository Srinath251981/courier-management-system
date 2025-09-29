import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "./shared/Dropdown";

interface CourierFormProps {
  staffID: number;
  isAdmin: boolean;
}

const CourierForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { staffID, isAdmin } = location.state as CourierFormProps;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [type, setType] = useState("");

  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    senderMobile: "",
    recipientName: "",
    recipientAddress: "",
    recipientMobile: "",
    courierType: "",
    weight: "",
    staffId: 0,
  });

  const typesList = ["Parcel", "Letter"];

  useEffect(() => {
    setFormData((prev) => ({ ...prev, courierType: type }));
    console.log("Dropdown selected courierType:", type);
  }, [type]);

  useEffect(() => {
    console.log("formData.courierType updated:", formData.courierType);
  }, [formData.courierType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting courierType:", formData.courierType);

    try {
      const response = await fetch("http://localhost:8080/courier/addNew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: formData.senderName,
          senderAddress: formData.senderAddress,
          senderMobile: formData.senderMobile,
          recipientName: formData.recipientName,
          recipientAddress: formData.recipientAddress,
          recipientMobile: formData.recipientMobile,
          courierType: formData.courierType,
          weight: parseFloat(formData.weight), // ensure it's a number
          staffId: staffID,
        }),
      });

      if (response.status != 201) {
        setLoading(false);
        setError("Something went wrong!");
        return;
      }

      alert("Courier added successfully!");
      setLoading(false);
      navigate(isAdmin ? "/adminDashboard" : "/staffDashboard");
    } catch (error) {
      console.log("Error adding courier:", error);
      alert("Failed to add courier!");
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="login-title">Courier Information</h2>

      {loading ? (
        <div className="loader"></div>
      ) : (
        error && <p className="error-message">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="signup-form-group">
          <label className="signup-form-label">Sender Name : </label>
          <input
            type="text"
            name="senderName"
            className="signup-form-input"
            value={formData.senderName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Sender Address : </label>
          <input
            type="text"
            name="senderAddress"
            className="signup-form-input"
            value={formData.senderAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Sender Mobile : </label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            name="senderMobile"
            className="signup-form-input"
            value={formData.senderMobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Recipient Name : </label>
          <input
            type="text"
            name="recipientName"
            className="signup-form-input"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Recipient Address : </label>
          <input
            type="text"
            name="recipientAddress"
            className="signup-form-input"
            value={formData.recipientAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Recipient Mobile : </label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            name="recipientMobile"
            className="signup-form-input"
            value={formData.recipientMobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-form-label">Courier Type : </label>

          <Dropdown
            label=""
            options={typesList}
            onSelect={function (value: string): void {
              setType(value);
            }}
            defaultValue=""
          ></Dropdown>
        </div>

        {type == "Parcel" && (
          <div className="signup-form-group">
            <label className="signup-form-label">Weight :</label>
            <input
              type="text"
              name="weight"
              className="signup-form-input"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Submit Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourierForm;
