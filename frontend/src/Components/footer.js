import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Footer() {
  // State for managing bookings
  const [bookingsdata, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [editFormData, setEditFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    adults: 0,
    children: 0
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Please login to view your bookings');
          setLoading(false);
          return;
        }
  
        const response = await axios.get("http://localhost:5000/api/bookingsuser", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        if (error.response?.status === 401) {
          setError('Please login to view your bookings');
        } else {
          setError("Failed to fetch bookings. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookings();
  }, []);

  const handleEditClick = (booking) => {
    setCurrentBooking(booking);
    setEditFormData({
      checkInDate: booking.checkInDate.split('T')[0],
      checkOutDate: booking.checkOutDate.split('T')[0],
      adults: booking.adults,
      children: booking.children
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log("Submitting with status:", 'pending'); // Debug log
      
      const response = await axios.put(
        `http://localhost:5000/api/bookingsuser/${currentBooking._id}`,
        {
          ...editFormData,
          status: 'pending' // Explicitly send status
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      console.log("Server response status:", response.data.status); // Verify
      
      if (response.data.status !== 'pending') {
        throw new Error("Status not updated to pending");
      }
  
      setBookings(prev => prev.map(b => 
        b._id === currentBooking._id ? response.data : b
      ));
      setShowEditModal(false);
      
    } catch (error) {
      console.error("Update failed:", error);
      setError(error.response?.data?.message || error.message);
    }
  };
  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.delete(
          `http://localhost:5000/api/bookingsuser/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        console.log('Cancellation response:', data);
  
        // First update status to cancelled
        setBookings(bookingsdata.map(booking => 
          booking._id === bookingId ? {
            ...booking,
            status: 'cancelled',
            room: { ...booking.room, status: 'available' }
          } : booking
        ));
  
        // Then set timeout to remove after 30 seconds
        setTimeout(() => {
          setBookings(prevBookings => prevBookings.filter(b => b._id !== bookingId));
        }, 30000); // 30 seconds = 30000 milliseconds
  
      } catch (error) {
        console.error("Error cancelling booking:", error);
        setError("Failed to cancel booking. Please try again.");
      }
    }
  };

  // Social media links
  const socialLinks = {
    facebook: 'https://facebook.com/yourpage',
    twitter: 'https://twitter.com/yourpage',
    linkedin: 'https://linkedin.com/company/yourpage',
    behance: 'https://behance.net/yourpage',
    instagram: 'https://instagram.com/yourpage',
    pinterest: 'https://pinterest.com/yourpage'
  };

  return (
    <>
      {/* footer area start */}
      <footer className="main-footer bgc-black-with-lighting pt-100 rel z-1">
        <div className="container">
          <div className="row justify-content-xl-between justify-content-between">
            <div className="col-xl-3 col-lg-5 col-sm-6">
              <div className="footer-widget widget_about wow fadeInUp delay-0-2s">
                <div className="footer-logo mb-25">
                  <Link to="/">
                    <img src="theme/assets/images/logos/logo.png" alt="Logo" />
                  </Link>
                </div>
                <p>
                  Nam libero tempore cum soluta nobis eseligendi optio cumque nihile impedit quo minus maxime
                  placeat facere
                </p>
                <div className="social-style-one pt-10">
                  <a href="index.js#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="index.js#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="index.js#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="index.js#">
                    <i className="fab fa-behance"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="footer-widget widget_nav_menu wow fadeInUp delay-0-4s">
                <h4 className="footer-title">Quick Links</h4>
                <ul className="list-style-one">
                  <li>
                    <Link to="/about">About company</Link>
                  </li>
                  <li>
                    <Link to="/about-history">History</Link>
                  </li>
                  <li>
                    <Link to="/team">Team Member</Link>
                  </li>
                  <li>
                    <Link to="/blog">Latest News</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="footer-widget widget_nav_menu wow fadeInUp delay-0-4s">
                <h4 className="footer-title">Features</h4>
                <ul className="list-style-one">
                  <li>
                    <Link to="/room-details">Free Transportation</Link>
                  </li>
                  <li>
                    <Link to="/room-details">GYM & Fitness Care</Link>
                  </li>
                  <li>
                    <Link to="/room-details">SPA Treatment</Link>
                  </li>
                  <li>
                    <Link to="/room-details">Food & Drinks</Link>
                  </li>
                  <li>
                    <Link to="/room-details">Breakfast</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="footer-widget widget_newsletter wow fadeInUp delay-0-6s">
                <h4 className="footer-title">Newsletter</h4>
                <form action="index.js#">
                  <input type="email" placeholder="Enter Address" required />
                  <button className="theme-btn">
                    Subscribe <i className="far fa-angle-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom bgd-dark mt-40 pt-20 pb-5 rpt-25">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="copyright-text">
                  <p>
                    © 2025 <Link to="/">Qomfort.</Link> All Rights Reserved.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 text-lg-end">
                <ul className="footer-bottom-nav rpb-10">
                  <li>
                    <Link to="/terms">Terms</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/faqs">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/cookie-policy">Cookie Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-lines">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="wave-shapes"></div>
        <div className="wave-shapes-two"></div>
      </footer>
      {/* footer area end */}

      {/* Form Back Drop */}
      <div className="form-back-drop"></div>

      {/* Hidden Booking Sidebar */}
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div className="cross-icon">
            <button className="border-0 bg-transparent">
              <span className="fa fa-times"></span>
            </button>
          </div>
          <div className="title">
            <h4>Your Bookings</h4>
          </div>

          {/* Booking List */}
          <div className="booking-list">
            {loading ? (
              <div className="text-center py-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading your bookings...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : bookingsdata.length > 0 ? (
              bookingsdata.map((booking) => (
                <div key={booking._id} className="booking-item mb-3 p-3 bg-light rounded">
                  <div className="booking-info">
                    <p><strong>Room:</strong> {booking.room?.roomNumber || 'N/A'}</p>
                    <p><strong>Room:</strong> {booking.room?.status || 'N/A'}</p>
                    <p><strong>Status:</strong> 
                      <span className={`badge ${
                        booking.status === 'confirmed' ? 'bg-success' : 
                        booking.status === 'cancelled' ? 'bg-danger' : 'bg-warning'
                      }`}>
                        {booking.status || 'N/A'}
                      </span>
                    </p>
                    <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                    <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                    <p><strong>Guests:</strong> {booking.adults} adults, {booking.children} children</p>
                    
                    {booking.status !== 'cancelled' && (
                      <div className="booking-actions mt-3">
                        <button 
                          onClick={() => handleEditClick(booking)}
                          className="btn btn-primary me-2"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleCancelBooking(booking._id)}
                          className="btn btn-danger"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-info">
                No bookings found. <Link to="/rooms">Book a room</Link> to see your reservations here.
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="social-style-one mt-4">
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Edit Booking Modal */}
      {showEditModal && currentBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit Booking</h5>
              <button onClick={() => setShowEditModal(false)} className="close-btn">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>Check-in Date</label>
                  <input
                    type="date"
                    value={editFormData.checkInDate}
                    onChange={(e) => setEditFormData({...editFormData, checkInDate: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Check-out Date</label>
                  <input
                    type="date"
                    value={editFormData.checkOutDate}
                    onChange={(e) => setEditFormData({...editFormData, checkOutDate: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Adults</label>
                  <input
                    type="number"
                    value={editFormData.adults}
                    onChange={(e) => setEditFormData({...editFormData, adults: e.target.value})}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Children</label>
                  <input
                    type="number"
                    value={editFormData.children}
                    onChange={(e) => setEditFormData({...editFormData, children: e.target.value})}
                    min="0"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="theme-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Top Button */}
      <button className="scroll-top scroll-to-target" data-target="js">
        <span className="fas fa-angle-double-up"></span>
      </button>

      {/* Add this CSS */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          width: 90%;
          max-width: 500px;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .booking-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
        }
        .form-group input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}

export default Footer;