import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const BookedUser = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch rooms data from the backend API
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

  // Initial fetch and set up auto-refresh
  useEffect(() => {
    fetchRooms();
    
    // Set up interval for auto-refresh every 3 seconds
    const intervalId = setInterval(fetchRooms, 3000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to update room status in the frontend
  const updateRoomStatus = (roomId, newStatus) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room._id === roomId ? { ...room, status: newStatus } : room
      )
    );
  };

  // Handle Checked-In button click
  const handleCheckedIn = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/rooms/checked-in/${roomId}`, {
        method: "PUT",
      });
      const updatedRoom = await response.json();
      console.log("Room checked-in:", updatedRoom);
      updateRoomStatus(roomId, "checked-in");
      alert("Room marked as Checked-In successfully!");
    } catch (error) {
      console.error("Error checking in room:", error);
      alert("Failed to mark room as Checked-In. Please try again.");
    }
  };

  // Handle Checked-Out button click
  const handleCheckedOut = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/rooms/checked-out/${roomId}`, {
        method: "PUT",
      });
      const updatedRoom = await response.json();
      console.log("Room checked-out:", updatedRoom);
      updateRoomStatus(roomId, "checked-out");
      alert("Room marked as Checked-Out successfully!");
    } catch (error) {
      console.error("Error checking out room:", error);
      alert("Failed to mark room as Checked-Out. Please try again.");
    }
  };

  // Filter rooms to show only those with status "booked"
  const bookedRooms = rooms.filter((room) => room.status === "booked");

  if (loading) {
    return <div className="dashboard-loading-spinner">Loading rooms...</div>;
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
          <h2 className="adm-heading">Dashboard</h2>
          <p className="adm-para">Welcome to the Hotel Management System Dashboard.</p>

          <h3 className="adm-heading">Booked Rooms</h3>

          <div className="table-responsive">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Room Number</th>
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
                      <td>{room.status}</td>
                      <td>
                        {room.image && (
                          <img
                            src={room.image}
                            alt={room.roomNumber}
                            className="room-image"
                          />
                        )}
                      </td>
                      <td className="action-buttons">
                        <button
                          onClick={() => handleCheckedIn(room._id)}
                          className="dashboard-checkin-button"
                        >
                          Checked-In
                        </button>
                        <button
                          onClick={() => handleCheckedOut(room._id)}
                          className="dashboard-checkout-button"
                        >
                          Checked-Out
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-rooms">
                      No booked rooms available
                    </td>
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

export default BookedUser;