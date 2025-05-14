import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckedOut = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchCheckedOutBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookingdata/checked-out");
      setBookings(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching checked-out bookings:", error);
      setError(error.response?.data?.message || "Failed to fetch checked-out bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCleaning = async (roomId) => {
    try {
      await axios.put(`http://localhost:5000/api/rooms/${roomId}/cleaning`);
      toast.success("Room status updated to cleaning!");
      fetchCheckedOutBookings(); // Refresh the bookings
    } catch (err) {
      console.error("Error updating room status:", err);
      toast.error("Failed to update room status.");
    }
  };

  useEffect(() => {
    fetchCheckedOutBookings();
    const intervalId = setInterval(fetchCheckedOutBookings, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return (
    <div className="text-center py-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading checked-out bookings...</p>
    </div>
  );
  
  if (error) return <div className="text-danger">{error}</div>;

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
                <h4 className="mb-0">Checked-Out Guest Management</h4>
              </div>
              <div className="card-body">
                <p className="text-muted mb-0">Manage bookings of guests who have checked out.</p>
              </div>
            </div>

            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-white border-bottom-0">
                <h5 className="mb-0">Checked-Out Guests</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>Guest</th>
                        <th>Room</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Status</th>
                        <th>Room Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length > 0 ? (
                        bookings.map((booking) => (
                          <tr key={booking._id}>
                            <td>{booking.user?.name || 'N/A'}</td>
                            <td>{booking.room?.roomNumber} ({booking.room?.type})</td>
                            <td>{new Date(booking.checkInDate).toLocaleString()}</td>
                            <td>{new Date(booking.checkOutDate).toLocaleString()}</td>
                            <td>
                              <span className={`badge ${
                                booking.status === 'checked-out' ? 'bg-secondary' : 'bg-success'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${
                                booking.room.status === 'checked-out' ? 'bg-secondary' : 'bg-success'
                              }`}>
                                {booking.room.status}
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => handleCleaning(booking.room._id)}
                                className="btn btn-warning btn-sm me-2 px-3 rounded-pill"
                              >
                                Mark as Cleaning
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-muted py-3">No checked-out guests available</td>
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
    </div>
  );
};

export default CheckedOut;
