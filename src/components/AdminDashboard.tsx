import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffList from "./StaffList";
import Dropdown from "./shared/Dropdown";
import MyCouriersList from "./MyCouriersList";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [showAllCouriers, setShowAllCouriers] = useState(false);

  useEffect(() => {
    const onPopState = () => {
      console.log("Back navigation triggered");
      // Prevent or manipulate here
      alert("Logout to exit the page!!");
      window.history.pushState(null, "", window.location.pathname);
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Welcome Admin</h1>

      <button className="staff-logout-button" onClick={handleLogout}>
        Logout
      </button>

      <div
        style={{
          marginLeft: 20,
        }}
      >
        <Dropdown
          label="Manage : "
          options={["Couriers", "Staffs"]}
          onSelect={function (value: string): void {
            if (value == "Staffs") setShowAllCouriers(false);
            else setShowAllCouriers(true);
          }}
          defaultValue={"Staffs"}
        ></Dropdown>
      </div>

      <p></p>
      {showAllCouriers && (
        <div>
          <MyCouriersList staffID={1} isAdmin={true} />
        </div>
      )}

      {!showAllCouriers && (
        <div>
          <StaffList />
        </div>
      )}

      <p></p>
    </div>
  );
}
