import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Maintenance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [maintenanceRooms, setMaintenanceRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch rooms with maintenance status from the backend
  const fetchMaintenanceRooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/maintenance");
      setMaintenanceRooms(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching maintenance rooms:", error);
      setError("Failed to fetch maintenance rooms.");
    } finally {
      setLoading(false);
    }
  };

  // Update room status back to available
  const markAsAvailable = async (roomNumber) => {
    try {
      await axios.put(`http://localhost:5000/api/${roomNumber}/status`, {
        status: "available"
      });
      
      // Remove the room from the maintenance list immediately
      setMaintenanceRooms(prevRooms => 
        prevRooms.filter(room => room.roomNumber !== roomNumber)
      );
      
      toast.success(`Room ${roomNumber} marked as available`);
    } catch (error) {
      console.error("Error updating room status:", error);
      toast.error(`Failed to update room ${roomNumber} status`);
    }
  };

  // Fetch maintenance rooms on component mount
  useEffect(() => {
    fetchMaintenanceRooms();
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
                <h4 className="mb-0">Maintenance Rooms</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>Room Number</th>
                        <th>Room Type</th>
                        <th>Issues</th>
                        <th>Maintenance Since</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenanceRooms.length > 0 ? (
                        maintenanceRooms.map((room) => (
                          <tr key={room._id}>
                            <td>{room.roomNumber}</td>
                            <td>{room.type}</td>
                            <td>{room.issue?.join(", ") || "No specific issues"}</td>
                            <td>{new Date(room.statusUpdatedAt || room.updatedAt).toLocaleString()}</td>
                            <td>
                              <button 
                                className="btn btn-success btn-sm"
                                onClick={() => markAsAvailable(room.roomNumber)}
                              >
                                Mark as Available
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-muted text-center py-4">
                            No rooms currently under maintenance
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
    </div>
  );
};

export default Maintenance;