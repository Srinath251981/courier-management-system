import { type FormEvent } from "react";
import type { Courier } from "../util/Courier";

interface StaffUpdateProps {
  courier: Courier;
  onClose: () => void;
  onRefresh: () => void;
}

const CourierDelete: React.FC<StaffUpdateProps> = ({
  courier,
  onClose,
  onRefresh,
}) => {
  async function handleUpdateButton(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/courier/delete/${courier.courierId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to delete staff");

      console.log("Courier deleted:", response.json);
      alert("Courier removed successfully!");
      onClose(); // close popup after update
      onRefresh(); // refresh courier list
    } catch (error) {
      console.error("Error deleting courier:", error);
      alert("Failed to remove courier !");
    }
  }

  return (
    <div>
      <h3
        style={{
          color: "#240C8EFF",
        }}
      >
        Courier ID: {courier.courierId}
      </h3>

      <p />
      <p />
      <button className="delete-staff-button" onClick={handleUpdateButton}>
        Yes, Delete
      </button>
    </div>
  );
};

export default CourierDelete;
