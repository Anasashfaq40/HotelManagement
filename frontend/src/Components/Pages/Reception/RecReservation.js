import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const RecReservation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch bookings from the backend
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

  // Initial fetch and set up auto-refresh
  useEffect(() => {
    fetchBookings();
    
    // Set up interval for auto-refresh every 3 seconds
    const intervalId = setInterval(fetchBookings, 3000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handle Confirm Booking
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
      alert("Booking confirmed successfully!");
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking. Please try again.");
    }
  };

  // Handle Cancel Booking
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
      alert("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  if (loading) {
    return <div className="dashboard-loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-error-message">{error}</div>;
  }

  return (
    <div className="dashboard-app">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="rec-dashboard-content">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`rec-dashboard-dashboard-content ${isSidebarOpen ? "active" : ""}`}>
          <h2 className="adm-heading">Reservation</h2>
          <p className="adm-para">Welcome to the Hotel Management System Dashboard.</p>

          <h3 className="adm-heading">Pending Bookings with Available Rooms</h3>

          <div className="table-responsive">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Room</th>
                  <th>Check-In Date</th>
                  <th>Check-Out Date</th>
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
                    <td>{booking.user?.name}</td>
                    <td>{booking.room?.roomNumber}</td>
                    <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                    <td>{booking.adults}</td>
                    <td>{booking.children}</td>
                    <td>{booking.status}</td>
                    <td>{booking.room?.status}</td>
                    <td className="action-buttons">
                      <button
                        onClick={() => handleConfirm(booking._id)}
                        className="dashboard-confirm-button"
                        disabled={booking.status === "confirmed"}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="dashboard-cancel-button"
                        disabled={booking.status === "cancelled"}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecReservation;