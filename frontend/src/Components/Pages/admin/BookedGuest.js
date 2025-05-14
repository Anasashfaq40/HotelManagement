import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookedGuest = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/rooms");
      const data = await response.json();
      setRooms(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to fetch rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    const intervalId = setInterval(fetchRooms, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const updateRoomStatus = (roomId, newStatus) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room._id === roomId ? { ...room, status: newStatus } : room
      )
    );
  };

  const handleCheckedIn = async (roomId) => {
    try {
      await fetch(`http://localhost:5000/api/rooms/checked-in/${roomId}`, {
        method: "PUT",
      });
      updateRoomStatus(roomId, "checked-in");
      toast.success("Room marked as Checked-In successfully!");
    } catch (error) {
      console.error("Error checking in room:", error);
      toast.error("Failed to mark room as Checked-In.");
    }
  };
  
  const handleCheckedOut = async (roomId) => {
    try {
      await fetch(`http://localhost:5000/api/rooms/checked-out/${roomId}`, {
        method: "PUT",
      });
      updateRoomStatus(roomId, "checked-out");
      toast.success("Room marked as Checked-Out successfully!");
    } catch (error) {
      console.error("Error checking out room:", error);
      toast.error("Failed to mark room as Checked-Out.");
    }
  };
  

  const bookedRooms = rooms.filter((room) => room.status === "booked");

  return (
    <div className="dashboard-app">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="rec-dashboard-content d-flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`rec-dashboard-dashboard-content ${isSidebarOpen ? "active" : ""} w-100 p-4`}>
          <div className="container-fluid">
            <div className="card shadow-sm border-0 rounded-4 mb-4">
              <div className="card-header bg-white border-bottom-0">
                <h4 className="mb-0">Booked Room Management</h4>
              </div>
              <div className="card-body">
                <p className="text-muted mb-0">View and manage guest bookings here.</p>
              </div>
            </div>

            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-white border-bottom-0">
                <h5 className="mb-0">Booked Rooms</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading rooms...</p>
                  </div>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle text-center">
                      <thead className="table-dark">
                        <tr>
                          <th>Room No</th>
                          <th>Type</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Image</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookedRooms.length > 0 ? (
                          bookedRooms.map((room) => (
                            <tr key={room._id}>
                              <td>{room.roomNumber}</td>
                              <td>{room.type}</td>
                              <td>${room.price}</td>
                              <td>
                                <span className="badge bg-warning text-dark">{room.status}</span>
                              </td>
                              <td>
                                {room.image && (
                                  <img
                                    src={room.image}
                                    alt={room.roomNumber}
                                    className="img-thumbnail"
                                    style={{ width: "70px", height: "50px", objectFit: "cover" }}
                                  />
                                )}
                              </td>
                              <td>
                                <button
                                  onClick={() => handleCheckedIn(room._id)}
                                  className="btn btn-success btn-sm me-2 px-3 rounded-pill"
                                >
                                  Checked-In
                                </button>
                                <button
                                  onClick={() => handleCheckedOut(room._id)}
                                  className="btn btn-danger btn-sm px-3 rounded-pill"
                                >
                                  Checked-Out
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-muted py-3">
                              No booked rooms available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookedGuest;
