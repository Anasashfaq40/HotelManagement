import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminHousekeeping = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cleaningRooms, setCleaningRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueText, setIssueText] = useState("");
  const [selectedRoomNumber, setSelectedRoomNumber] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchCleaningRooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rooms/cleaning");
      setCleaningRooms(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching cleaning rooms:", error);
      setError(error.response?.data?.message || "Failed to fetch cleaning rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteCleaning = async (roomId) => {
    try {
      await axios.put(`http://localhost:5000/api/rooms/${roomId}/available`);
      toast.success("Room marked as available!");
      fetchCleaningRooms();
    } catch (err) {
      console.error("Error updating room status:", err);
      toast.error("Failed to update room status.");
    }
  };

  const handleIssueSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userData")); // get the full object
      const userId = user?.id; // extract the id from it
      if (!userId || !selectedRoomNumber || !issueText) {
        toast.error("All fields are required");
        return;
      }

      await axios.post("http://localhost:5000/api/issues", {
        userId,
        roomNumber: selectedRoomNumber,
        issue: issueText,
      });

      toast.success("Issue reported successfully!");
      setShowIssueModal(false);
      setIssueText("");
      setSelectedRoomNumber("");
    } catch (error) {
      toast.error("Failed to report issue.");
    }
  };

  useEffect(() => {
    fetchCleaningRooms();
    const intervalId = setInterval(fetchCleaningRooms, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-danger">{error}</div>;

  return (
    <div className="dashboard-app">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="rec-dashboard-content d-flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`rec-dashboard-dashboard-content ${isSidebarOpen ? "active" : ""} w-100 p-4`}>
          <div className="container-fluid">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Rooms Being Cleaned</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>Room Number</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cleaningRooms.length > 0 ? (
                        cleaningRooms.map((room) => (
                          <tr key={room._id}>
                            <td>{room.roomNumber}</td>
                            <td>{room.type}</td>
                            <td>${room.price}</td>
                            <td>
                              <span className="badge bg-warning text-dark px-3 py-2">
                                {room.status}
                              </span>
                            </td>
                            <td>
                              {room.image && (
                                <img
                                  src={room.image}
                                  alt={room.roomNumber}
                                  style={{
                                    width: "80px",
                                    height: "auto",
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                            </td>
                            <td>
                              <button
                                className="btn btn-success btn-sm px-3 py-1 rounded-pill me-2"
                                onClick={() => handleCompleteCleaning(room._id)}
                              >
                                Mark as Complete
                              </button>
                              <button
                                className="btn btn-danger btn-sm px-3 py-1 rounded-pill"
                                onClick={() => {
                                  setSelectedRoomNumber(room.roomNumber);
                                  setShowIssueModal(true);
                                }}
                              >
                                Report Issue
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-muted text-center py-4">
                            No rooms under cleaning
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <Footer />

      {/* Issue Report Modal */}
      <Modal show={showIssueModal} onHide={() => setShowIssueModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Report an Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="issueTextArea">
              <Form.Label>Describe the issue for room {selectedRoomNumber}</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowIssueModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleIssueSubmit}>
            Submit Issue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminHousekeeping;
