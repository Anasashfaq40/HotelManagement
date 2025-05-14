import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Reporting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [staffBookings, setStaffBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch staff booking counts from the backend
  const fetchStaffBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:5000/api/staff-counts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStaffBookings(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching staff booking counts:", error);
      if (error.response && error.response.status === 401) {
        setError("Please login to view reports.");
      } else {
        setError("Failed to fetch staff booking data.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchStaffBookings();
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
                <h4 className="mb-0">Staff Booking Reports</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>Staff Name</th>
                        <th>Total Bookings</th>
                        <th>Confirmed</th>
                        <th>Checked-In</th>
                        <th>Checked-Out</th>
                        <th>Cancelled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffBookings.length > 0 ? (
                        staffBookings.map((staff) => (
                          <tr key={staff._id}>
                            <td>{staff._id || "Unassigned"}</td>
                            <td>{staff.total}</td>
                            <td>{staff.confirmed}</td>
                            <td>{staff.checkedIn}</td>
                            <td>{staff.checkedOut}</td>
                            <td>{staff.cancelled}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-muted text-center py-4">
                            No booking data available
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

export default Reporting;