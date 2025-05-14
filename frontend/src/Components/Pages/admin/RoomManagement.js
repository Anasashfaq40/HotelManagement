import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";


const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("available");
  const [image, setImage] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6); // Number of rooms per page
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Fetch rooms from backend
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Add/Update Room
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomNumber", roomNumber);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("status", status);
    if (image) formData.append("image", image);

    try {
      if (editingRoom) {
        // ✅ Update existing room
        const response = await axios.put(`http://localhost:5000/api/rooms/${editingRoom._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setRooms(rooms.map((room) => (room._id === editingRoom._id ? response.data : room)));
        alert("Room updated successfully!");
      } else {
        // ✅ Add new room
        const response = await axios.post("http://localhost:5000/api/rooms", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setRooms([...rooms, response.data]);
        alert("Room added successfully!");
      }

      // ✅ Reset form
      setRoomNumber("");
      setType("");
      setPrice("");
      setStatus("available");
      setImage(null);
      setEditingRoom(null);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  // ✅ Handle Delete Room
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`http://localhost:5000/api/rooms/${id}`);
        setRooms(rooms.filter((room) => room._id !== id));
        alert("Room deleted successfully!");
      } catch (error) {
        console.error("Error deleting room:", error.response?.data || error.message);
      }
    }
  };

  // ✅ Handle Edit Room
  const handleEdit = (room) => {
    setEditingRoom(room);
    setRoomNumber(room.roomNumber);
    setType(room.type);
    setPrice(room.price);
    setStatus(room.status || "available");
  };

  // ✅ Pagination Logic
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-app">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-content">
        <Sidebar isOpen={isSidebarOpen}  />
        <div className={`dashboard-room-management ${isSidebarOpen ? "active" : ""}`}>
          <h2 className="room-head">Room Management</h2>

          <form onSubmit={handleSubmit} className="dashboard-room-form">
            <input
              type="text"
              placeholder="Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="cleaning">Cleaning</option>
              <option value="vacant">Vacant</option>
            </select>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit" className="dashboard-submit-button">
              {editingRoom ? "Update Room" : "Add Room"}
            </button>
          </form>

          {loading ? (
            <div className="dashboard-loading-spinner">
              <div className="dashboard-spinner"></div>
              <p>Loading rooms...</p>
            </div>
          ) : (
            <>
              <div className="dashboard-room-list">
                {currentRooms.map((room) => (
                  <div key={room._id} className="dashboard-room-card">
                    <div className="dashboard-room-image">
                      {room.image && <img src={`http://localhost:5000/uploads/${room.image}`} alt="Room" />}
                    </div>
                    <div className="dashboard-room-details">
                      <h3>Room {room.roomNumber}</h3>
                      <p><strong>Type:</strong> {room.type}</p>
                      <p><strong>Price:</strong> ${room.price}</p>
                      <p><strong>Status:</strong> {room.status}</p>
                    </div>
                    <div className="dashboard-room-actions">
                      <button onClick={() => handleEdit(room)} className="dashboard-edit-button">
                        <i className="dashboard-fas fa-edit"></i> Edit
                      </button>
                      <button onClick={() => handleDelete(room._id)} className="dashboard-delete-button">
                        <i className="dashboard-fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="dashboard-pagination">
                {Array.from({ length: Math.ceil(rooms.length / roomsPerPage) }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`dashboard-page-button ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomManagement;