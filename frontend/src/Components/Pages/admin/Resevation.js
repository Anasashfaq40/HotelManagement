import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reservation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/api/bookingdata");
      setBookings(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const intervalId = setInterval(fetchBookings, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleConfirm = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/bookingdata/${id}`, {
        status: "confirmed",
      });

      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === id ? response.data : booking
        )
      );
      toast.success("Booking confirmed successfully!");
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Failed to confirm booking.");
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/bookingdata/${id}`, {
        status: "cancelled",
      });

      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === id ? response.data : booking
        )
      );
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking.");
    }
  };

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
                <h4 className="mb-0">Reservation Management</h4>
              </div>
              <div className="card-body">
                <p className="text-muted mb-0">Manage and confirm/cancel hotel room reservations here.</p>
              </div>
            </div>

            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-white border-bottom-0">
                <h5 className="mb-0">Pending Bookings with Available Rooms</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading bookings...</p>
                  </div>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle text-center">
                      <thead className="table-dark">
                        <tr>
                      
                          <th>Room</th>
                          <th>Check-In</th>
                          <th>Check-Out</th>
                          <th>Adults</th>
                          <th>Children</th>
                          <th>Status</th>
                          <th>Room Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking._id}>
                       
                            <td>{booking.room?.roomNumber}</td>
                            <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                            <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                            <td>{booking.adults}</td>
                            <td>{booking.children}</td>
                            <td>
                              <span className={`badge ${booking.status === "confirmed" ? "bg-success" : booking.status === "cancelled" ? "bg-danger" : "bg-warning text-dark"}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${booking.room?.status === "available" ? "bg-success" : "bg-secondary"}`}>
                                {booking.room?.status}
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => handleConfirm(booking._id)}
                                className="btn btn-success btn-sm me-2 px-3 rounded-pill"
                                disabled={booking.status === "confirmed"}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleCancel(booking._id)}
                                className="btn btn-danger btn-sm px-3 rounded-pill"
                                disabled={booking.status === "cancelled"}
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {bookings.length === 0 && (
                      <div className="text-center py-3 text-muted">No bookings found</div>
                    )}
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

export default Reservation;
