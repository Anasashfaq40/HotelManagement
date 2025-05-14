import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reviews = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Memoized API instance
  const api = useCallback(() => {
    const token = localStorage.getItem('token');
    return axios.create({
      baseURL: 'http://localhost:5000/api',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }, []);

  // Memoized fetch function
  const fetchReviews = useCallback(async () => {
    try {
      const { data } = await api().get("/reviews");
      setReviews(data);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        err.response?.status === 401 
          ? "Please login to view reviews" 
          : "Failed to fetch reviews"
      );
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewAction = async (id, action) => {
    try {
      await api().put(`/reviews/${id}/${action}`);
      await fetchReviews();
      toast.success(`Review ${action}d successfully!`);
    } catch (err) {
      console.error(`${action} error:`, err);
      toast.error(err.response?.data?.message || `Failed to ${action} review`);
    }
  };

  if (loading) return <LoadingView {...{ toggleSidebar, isSidebarOpen }} />;
  if (error) return <ErrorView {...{ error, toggleSidebar, isSidebarOpen }} />;

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
                <h4 className="mb-0">Guest Reviews</h4>
              </div>
              <div className="card-body">
                <p className="text-muted mb-0">Manage guest reviews and feedback</p>
              </div>
            </div>

            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-white border-bottom-0">
                <h5 className="mb-0">Reviews</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading reviews...</p>
                  </div>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle text-center">
                      <thead className="table-dark">
                        <tr>
                          <th>Guest Name</th>
                          <th>Room Number</th>
                          <th>Rating</th>
                          <th>Comment</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.length > 0 ? (
                          reviews.map((review) => (
                            <ReviewRow key={review._id} review={review} onAction={handleReviewAction} />
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-muted py-3">
                              No reviews found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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

// Sub-components for better organization
const LoadingView = ({ toggleSidebar, isSidebarOpen }) => (
  <div className="dashboard-app">
    <Navbar toggleSidebar={toggleSidebar} />
    <div className="rec-dashboard-content d-flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`rec-dashboard-dashboard-content ${isSidebarOpen ? "active" : ""} w-100 p-4`}>
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading reviews...</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const ErrorView = ({ error, toggleSidebar, isSidebarOpen }) => (
  <div className="dashboard-app">
    <Navbar toggleSidebar={toggleSidebar} />
    <div className="rec-dashboard-content d-flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`rec-dashboard-dashboard-content ${isSidebarOpen ? "active" : ""} w-100 p-4`}>
        <div className="text-center py-4">
          <p className="text-danger">{error}</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const ReviewRow = ({ review, onAction }) => (
  <tr>
    <td>{review.user?.name || "Anonymous"}</td>  {/* Ensure we handle the case where user is not populated */}
    <td>{review.room?.roomNumber || "N/A"}</td>
    <td>{'⭐'.repeat(review.rating)}</td>
    <td>{review.comment || "No comment"}</td>
    <td className={`status-${review.status}`}>
      {review.status?.charAt(0).toUpperCase() + review.status?.slice(1) || "N/A"}
    </td>
    <td className="action-buttons">
      {review.status === 'pending' && (
        <>
          <button onClick={() => onAction(review._id, 'approve')} className="btn btn-success btn-sm me-2">
            Approve
          </button>
          <button onClick={() => onAction(review._id, 'reject')} className="btn btn-danger btn-sm">
            Reject
          </button>
        </>
      )}
    </td>
  </tr>
);


export default Reviews;
