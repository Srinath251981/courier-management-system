import { useNavigate } from "react-router-dom";
import CourierList from "./CourierList";
import { useEffect, useState } from "react";
import MyCouriersList from "./MyCouriersList";
import Dropdown from "./shared/Dropdown";

export default function Dashboard() {
  const navigate = useNavigate();
  const [staffName, setStaffName] = useState<string>("");
  const [staffId, setStaffId] = useState<number>(0);
  const [showAllCouriers, setShowAllCouriers] = useState(true);

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

  useEffect(() => {
    const storedId = localStorage.getItem("StaffID");
    const storedName = localStorage.getItem("StaffName");
    if (storedId) {
      setStaffId(Number(storedId));
    } else {
      navigate("/");
    }
    if (storedName) {
      setStaffName(storedName);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear session/token if you use authentication
    localStorage.removeItem("StaffName");
    navigate("/");
  };

  return (
    <div className="staff-dashboard">
      <h1 className="staff-title">Welcome {staffName}</h1>

      <button className="staff-logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div
        style={{
          marginLeft: 20,
        }}
      >
        <Dropdown
          label="View : "
          options={["All Couriers", "My Couriers"]}
          onSelect={function (value: string): void {
            if (value == "My Couriers") setShowAllCouriers(false);
            else setShowAllCouriers(true);
          }}
          defaultValue={"All Couriers"}
        ></Dropdown>
      </div>

      <p></p>
      {showAllCouriers && (
        <div>
          <CourierList />
        </div>
      )}

      {!showAllCouriers && (
        <div>
          <MyCouriersList staffID={staffId} isAdmin={false}></MyCouriersList>
        </div>
      )}

      <p></p>
    </div>
  );
}
