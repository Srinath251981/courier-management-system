import { useEffect, useState, type ChangeEvent } from "react";
import type { Courier } from "../util/Courier";
import { MdDelete, MdEdit } from "react-icons/md";
import Popup from "./shared/Popup";
import CourierUpdate from "./CourierUpdate";
import CourierDelete from "./CourierDelete";
import { useNavigate } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import Dropdown from "./shared/Dropdown";

interface MyCourierProps {
  staffID: number;
  isAdmin: boolean;
}

function MyCouriersList({ staffID, isAdmin }: MyCourierProps) {
  const [courier, setCourier] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [filterText, setFilterText] = useState("");
  const [editClicked, setEditClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null);

  const navigate = useNavigate();
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const loadCourier = () => {
    setLoading(true);
    fetch(
      isAdmin
        ? "http://localhost:8080/courier/allCouriers"
        : `http://localhost:8080/courier/staff?staffId=${staffID}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setCourier(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCourier();
  }, []);

  const filteredProducts = courier.filter(
    (product) =>
      (product.senderName &&
        product.senderName.toLowerCase().includes(filterText.toLowerCase())) ||
      (product.recipientName &&
        product.recipientName
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (product.senderAddress &&
        product.senderAddress
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (product.recipientAddress &&
        product.recipientAddress
          .toLowerCase()
          .includes(filterText.toLowerCase()))
  );

  // Pagination slice
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>): void {
    setFilterText(event.target.value);
    setCurrentPage(1); // reset to first page when filtering
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

  if (currentItems.length == 0) {
    return (
      <>
        <h1 className="my-courier-title">
          {isAdmin ? "All Couriers" : "My Couriers List"}
        </h1>
        <p />
        <p />
        <p />
        <p className="empty-courier-data">No Couriers Added!!!</p>
        <p />
        <p />
        <p />
        <button
          className="add-courier-button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/newCourier", { state: { staffID, isAdmin } });
          }}
        >
          <span className="add-courier-label">Add Courier</span>
          <FaRegPlusSquare className="add-courier-icon" />
        </button>
      </>
    );
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1 className="my-courier-title">
          {isAdmin ? "All Couriers" : "My Couriers List"}
        </h1>
        <div className="my-courier-header">
          <div className="search-group">
            <label className="signup-form-label">Search : </label>
            <input
              className="search-input"
              type="text"
              value={filterText}
              onChange={handleFilterChange}
            />
          </div>

          <button
            className="add-courier-button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/newCourier", { state: { staffID, isAdmin } });
            }}
          >
            <span className="add-courier-label">Add Courier</span>
            <FaRegPlusSquare className="add-courier-icon" />
          </button>
        </div>
        <p />
        <p />
        <div className="table-container">
          <table className="courier-table">
            <thead>
              <tr>
                {isAdmin && <th>Staff Id</th>}
                <th>Courier Id</th>
                <th>Sender Name</th>
                <th>Sender Address</th>
                <th>Sender Mobile</th>
                <th>Recipient Name</th>
                <th>Recipient Address</th>
                <th>Recipient Mobile</th>
                <th>Courier Date</th>
                <th>Courier Time</th>
                <th>Courier Type</th>
                <th>Weight (in kg)</th>
                <th>Status</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((c) => (
                <tr key={c.courierId}>
                  {isAdmin && <td>{c.staffId}</td>}
                  <td>{c.courierId}</td>
                  <td>{c.senderName}</td>
                  <td>{c.senderAddress}</td>
                  <td>{c.senderMobile}</td>
                  <td>{c.recipientName}</td>
                  <td>{c.recipientAddress}</td>
                  <td>{c.recipientMobile}</td>
                  <td>{c.courierDate}</td>
                  <td>{c.courierTime}</td>
                  <td>{c.courierType}</td>
                  <td>{c.weight}</td>
                  <td>{c.status}</td>
                  <td>
                    <div className="action-icons">
                      <span title="Update">
                        <MdEdit
                          className="edit-icon"
                          onClick={() => {
                            setEditClicked(true);
                            setSelectedCourier(c);
                          }}
                        />
                      </span>
                      <span title="Delete">
                        {" "}
                        <MdDelete
                          className="delete-icon"
                          onClick={() => {
                            setDeleteClicked(true);
                            setSelectedCourier(c);
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
        {/* Pagination Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <div>
            <Dropdown
              label="Rows per page: "
              options={[4, 8, 12]}
              onSelect={(e) => {
                setRowsPerPage(Number(e));
                setCurrentPage(1);
              }}
              defaultValue={rowsPerPage}
            ></Dropdown>
          </div>

          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="pagination-span">
              Page {currentPage} of{" "}
              {Math.ceil(filteredProducts.length / rowsPerPage)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredProducts.length / rowsPerPage)
                  )
                )
              }
              disabled={
                currentPage === Math.ceil(filteredProducts.length / rowsPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
        {/* Popup for editing */}
        <Popup
          show={editClicked && !!selectedCourier}
          onClose={() => {
            setEditClicked(false);
            setSelectedCourier(null);
          }}
          title="Update your Courier status"
        >
          {editClicked && selectedCourier && (
            <CourierUpdate
              courier={selectedCourier}
              onClose={() => {
                setEditClicked(false);
                setSelectedCourier(null);
              }}
              onRefresh={loadCourier} // 🔄 refresh table after update
            />
          )}
        </Popup>

        {/* Popup for deleting */}
        <Popup
          show={deleteClicked && !!selectedCourier}
          onClose={() => {
            setDeleteClicked(false);
            setSelectedCourier(null);
          }}
          title="Are you sure you want to delete this courier?"
        >
          {deleteClicked && selectedCourier && (
            <CourierDelete
              courier={selectedCourier}
              onClose={() => {
                setDeleteClicked(false);
                setSelectedCourier(null);
              }}
              onRefresh={loadCourier} // 🔄 refresh table after update
            />
          )}
        </Popup>
      </div>
    </>
  );
}

export default MyCouriersList;
