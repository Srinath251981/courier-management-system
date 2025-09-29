import { type FormEvent } from "react";
import type { Staff } from "../util/Staff";

interface StaffUpdateProps {
  staff: Staff;
  onClose: () => void;
  onRefresh: () => void;
}

const StaffDelete: React.FC<StaffUpdateProps> = ({
  staff,
  onClose,
  onRefresh,
}) => {
  async function handleUpdateButton(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/staff/delete/${staff.staffId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to delete staff");

      console.log("Staff deleted:", response.json);
      alert("Staff removed successfully!");
      onClose(); // close popup after update
      onRefresh(); // refresh staff list
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to remove Staff !");
    }
  }

  return (
    <div>
      <h3
        style={{
          color: "#240C8EFF",
        }}
      >
        Staff ID: {staff.staffId}
      </h3>

      <p />
      <p />
      <button className="delete-staff-button" onClick={handleUpdateButton}>
        Yes, Remove
      </button>
    </div>
  );
};

export default StaffDelete;
