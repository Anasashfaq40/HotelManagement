import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Feedback = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch feedback from the backend
  const fetchFeedback = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:5000/api/contact/admin/feedback", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setFeedbackData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      if (error.response && error.response.status === 401) {
        setError("Please login to view feedback.");
      } else {
        setError("Failed to fetch feedback data.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch feedback on component mount
  useEffect(() => {
    fetchFeedback();
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
                <h4 className="mb-0">User Feedback</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Submitted At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbackData.length > 0 ? (
                        feedbackData.map((feedback) => (
                          <tr key={feedback._id}>
                            <td>{feedback.user?.name || feedback.name || "Unknown User"}</td>
                            <td>{feedback.user?.email || feedback.email}</td>
                            <td>{feedback.phone}</td>
                            <td>{feedback.subject}</td>
                            <td className="text-truncate" style={{maxWidth: '200px'}} title={feedback.message}>
                              {feedback.message}
                            </td>
                            <td>{new Date(feedback.createdAt).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-muted text-center py-4">
                            No feedback available
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

export default Feedback;