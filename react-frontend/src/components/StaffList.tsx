import { useEffect, useState, type ChangeEvent } from "react";
import type { Staff } from "../util/Staff";
import { MdEdit, MdDelete } from "react-icons/md";
import StaffUpdate from "./StaffUpdate";
import Popup from "./shared/Popup";
import StaffDelete from "./StaffDelete";

function StaffList() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filterText, setFilterText] = useState("");
  const [editClicked, setEditClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const loadStaff = () => {
    setLoading(true);
    fetch("http://localhost:8080/staff/allStaffs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setStaff(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const filteredProducts = staff.filter(
    (product) =>
      product.staffName &&
      product.staffName.toLowerCase().includes(filterText.toLocaleLowerCase())
  );

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>): void {
    setFilterText(event.target.value);
  }

  if (loading)
    return (
      <>
        <div className="loader"></div>
        <p style={{ textAlign: "center", color: "black" }}>
          Loading Courier data...
        </p>
      </>
    );
  else if (error)
    return <p className="loader-error-message">Error: {error.message}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="my-courier-title">All Staffs</h1>
      <div>
        <label className="signup-form-label">Search by name : </label>
        <input
          className="search-input"
          type="text"
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <p />
      <div className="table-container">
        <table className="staff-table" cellPadding="10" border={1}>
          <thead>
            <tr>
              <th>Staff Id</th>
              <th>Staff Name</th>
              <th>Staff Email</th>
              <th>Staff Mobile</th>
              <th>Username</th>
              <th>Status</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((c) => (
              <tr key={c.staffId}>
                <td>{c.staffId}</td>
                <td>{c.staffName}</td>
                <td>{c.staffEmail}</td>
                <td>{c.staffMobile}</td>
                <td>{c.staffUsername}</td>
                <td>{c.activity}</td>
                <td>
                  <div className="action-icons">
                    <span title="Update">
                      <MdEdit
                        className="edit-icon"
                        onClick={() => {
                          setEditClicked(true);
                          setSelectedStaff(c);
                        }}
                      />
                    </span>
                    <span title="Delete">
                      {" "}
                      <MdDelete
                        className="delete-icon"
                        onClick={() => {
                          setDeleteClicked(true);
                          setSelectedStaff(c);
                        }}
                      />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Popup for editing */}
      <Popup
        show={editClicked && !!selectedStaff}
        onClose={() => {
          setEditClicked(false);
          setSelectedStaff(null);
        }}
        title="Update your staff status"
      >
        {editClicked && selectedStaff && (
          <StaffUpdate
            staff={selectedStaff}
            onClose={() => {
              setEditClicked(false);
              setSelectedStaff(null);
            }}
            onRefresh={loadStaff} // 🔄 refresh table after update
          />
        )}
      </Popup>

      {/* Popup for deleting */}
      <Popup
        show={deleteClicked && !!selectedStaff}
        onClose={() => {
          setDeleteClicked(false);
          setSelectedStaff(null);
        }}
        title="Are you sure you want to remove this staff?"
      >
        {deleteClicked && selectedStaff && (
          <StaffDelete
            staff={selectedStaff}
            onClose={() => {
              setDeleteClicked(false);
              setSelectedStaff(null);
            }}
            onRefresh={loadStaff} // 🔄 refresh table after update
          />
        )}
      </Popup>
    </div>
  );
}

export default StaffList;
