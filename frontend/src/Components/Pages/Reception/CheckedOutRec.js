import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecCheckedOut = () => {
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

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-danger">{error}</div>;

  return (
    <div className="dashboard-app">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="rec-dashboard-content">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`rec-dashboard-dashboard-content ${isSidebarOpen ? "active" : ""}`}>
          <h2>Checked-Out Guests</h2>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-dark">
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
                  bookings.map(booking => (
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
                          className="btn btn-sm btn-info"
                          onClick={() => handleCleaning(booking.room._id)}
                        >
                          Mark as Cleaning
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No checked-out guests</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecCheckedOut;
