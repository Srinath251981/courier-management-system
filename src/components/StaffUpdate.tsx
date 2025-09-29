import { useState, type FormEvent } from "react";
import type { Staff } from "../util/Staff";
import Dropdown from "./shared/Dropdown";

interface StaffUpdateProps {
  staff: Staff;
  onClose: () => void;
  onRefresh: () => void;
}

const StaffUpdate: React.FC<StaffUpdateProps> = ({
  staff,
  onClose,
  onRefresh,
}) => {
  const [changedStatus, setChangedStatus] = useState<string>("");
  const statusList = ["Active", "Inactive"];

  async function handleUpdateButton(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/staff/update/${staff.staffId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: changedStatus,
        }
      );
      if (!response.ok) throw new Error("Failed to update staff");

      console.log("Staff updated:", response.json);
      alert("Staff activity updated successfully!");
      onClose(); // close popup after update
      onRefresh(); // refresh staff list
    } catch (error) {
      console.error("Error updating activity:", error);
      alert("Failed to update Staff activity!");
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
      <p style={{ color: "black" }}>
        Current status:{" "}
        <span
          style={{
            color: staff.activity == "Active" ? "#0BE333FF" : "red",
          }}
        >
          {staff.activity}
        </span>
      </p>
      <Dropdown
        label="Change status:"
        options={statusList}
        onSelect={(value: string) => setChangedStatus(value)}
        defaultValue={staff.activity}
      />
      <p />
      <p />
      <button className="update-staff-button" onClick={handleUpdateButton}>
        Update
      </button>
    </div>
  );
};

export default StaffUpdate;
