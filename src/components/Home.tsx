import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SlPeople } from "react-icons/sl";
import { RiAdminFill } from "react-icons/ri";

export default function Home() {
  const navigate = useNavigate();

  function handleStaffButton(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    navigate("/staff");
  }

  function handleAdminButton(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    navigate("/admin");
  }

  return (
    <div className="home-container">
      <h1 className="home-title">COURIER MANAGEMENT SYSTEM</h1>
      <div className="btn-group">
        <button className="home-button admin-btn" onClick={handleAdminButton}>
          <RiAdminFill className="admin-btn-icon" />
          <span className="admin-btn-label">Admin</span>
        </button>
        <button className="home-button staff-btn" onClick={handleStaffButton}>
          <SlPeople className="staff-btn-icon" />
          <span className="staff-btn-label"> Staff</span>
        </button>
      </div>
    </div>
  );
}
