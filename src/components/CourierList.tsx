import { useEffect, useState, type ChangeEvent } from "react";
import Dropdown from "./shared/Dropdown";

function CourierList() {
  const [courier, setCourier] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filterText, setFilterText] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  useEffect(() => {
    fetch("http://localhost:8080/courier/allCouriers")
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

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="all-courier-title">All Couriers</h1>

      <div>
        <label className="signup-form-label">Search : </label>
        <input
          className="search-input"
          type="text"
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <p />
      <div className="table-container">
        <table className="courier-table">
          <thead>
            <tr>
              <th>Staff Id</th>
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
            </tr>
          </thead>
          <tbody>
            {currentItems.map((c) => (
              <tr key={c.courierId}>
                <td>{c.staffId}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p />
      <p />
      <p />
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
    </div>
  );
}

export default CourierList;
