import type { Courier } from "../util/Courier";
import Dropdown from "./shared/Dropdown";
import { useState, type FormEvent } from "react";

interface CourierUpdateProps {
  courier: Courier;
  onClose: () => void;
  onRefresh: () => void;
}

const CourierUpdate: React.FC<CourierUpdateProps> = ({
  courier,
  onClose,
  onRefresh,
}) => {
  const [changedStatus, setChangedStatus] = useState<string>("");
  const statusList = [
    "Consignment Booked",
    "In Transit",
    "Out for delivery",
    "Delivered",
  ];

  async function handleUpdateButton(
    e: FormEvent<HTMLButtonElement>
  ): Promise<void> {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/courier/update/${courier.courierId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: changedStatus,
        }
      );
      if (!response.ok) throw new Error("Failed to update courier");

      console.log("Courier updated:", response.json);
      alert("Courier updated successfully!");

      onClose(); // close popup after update
      onRefresh(); // refresh courier list
    } catch (error) {
      console.error("Error updating courier:", error);
      alert("Failed to update courier!");
    }
  }

  return (
    <div>
      <h2
        style={{
          color: "#240C8EFF",
        }}
      >
        Courier ID : {courier.courierId}
      </h2>
      <p style={{ color: "black" }}>
        Current status:{" "}
        <span
          style={{
            color:
              courier.status == "Delivered"
                ? "#0BE333FF"
                : courier.status == "Consignment Booked"
                ? "red"
                : courier.status == "In transit"
                ? "brown"
                : "orange",
          }}
        >
          {courier.status}
        </span>
      </p>
      <Dropdown
        label="Change status:"
        options={statusList}
        onSelect={function (value: string): void {
          setChangedStatus(value);
        }}
        defaultValue={courier.status}
      />
      <p />
      <p />
      <button className="update-staff-button" onClick={handleUpdateButton}>
        Update
      </button>
    </div>
  );
};

export default CourierUpdate;
