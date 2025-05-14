import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportIssues = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reportedIssues, setReportedIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch issues from the backend
  const fetchReportedIssues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/issues");
      setReportedIssues(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching issues:", error);
      setError("Failed to fetch issues.");
    } finally {
      setLoading(false);
    }
  };

  // Update room status to maintenance and remove from list
  const markAsMaintenance = async (roomNumber, issueId) => {
    try {
      await axios.put(`http://localhost:5000/api/${roomNumber}/status`, {
        status: "maintenance"
      });
      
      // Remove the resolved issue from the list immediately
      setReportedIssues(prevIssues => 
        prevIssues.filter(issue => issue._id !== issueId)
      );
      
      toast.success(`Room ${roomNumber} marked as under maintenance`);
    } catch (error) {
      console.error("Error updating room status:", error);
      toast.error(`Failed to update room ${roomNumber} status`);
    }
  };

  // Fetch issues on component mount
  useEffect(() => {
    fetchReportedIssues();
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
                <h4 className="mb-0">Reported Issues</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>User</th>
                        <th>Room Number</th>
                        <th>Issue</th>
                        <th>Reported At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportedIssues.length > 0 ? (
                        reportedIssues.map((issue) => (
                          <tr key={issue._id}>
                            <td>{issue.userId?.name || "Unknown User"}</td>
                            <td>{issue.roomNumber}</td>
                            <td>{issue.issue}</td>
                            <td>{new Date(issue.createdAt).toLocaleString()}</td>
                            <td>
                              <button 
                                className="btn btn-warning btn-sm"
                                onClick={() => markAsMaintenance(issue.roomNumber, issue._id)}
                              >
                                Mark for Maintenance
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-muted text-center py-4">
                            No reported issues available
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

export default ReportIssues;