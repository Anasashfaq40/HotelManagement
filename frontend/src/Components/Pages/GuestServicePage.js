import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../Header';
import Footer from '../footer';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Alexo Rowles',
    email: 'aisuorowles@gmail.com',
    profileImage: '',
    contact: '+1234567890',
    address: 'Toronto Street No. 87, CA',
    city: 'Toronto',
    country: 'Canada',
    postalCode: '',
    preferences: '',
    role: 'UI/UX Designer'
  });
  
  const [previewImage, setPreviewImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState([]);
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
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser(response.data);
        if (response.data.profileImage) {
          setPreviewImage(`http://localhost:5000/uploads/${response.data.profileImage}`);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Fetch bookings
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setUser(prev => ({ ...prev, profileImage: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      Object.keys(user).forEach(key => {
        if (key !== 'profileImage') {
          formData.append(key, user[key]);
        }
      });

      if (user.profileImage instanceof File) {
        formData.append('profileImage', user.profileImage);
      }

      const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Profile updated successfully!');
      setUser(response.data);
      setIsEditing(false);
      
      if (response.data.profileImage) {
        setPreviewImage(`http://localhost:5000/uploads/${response.data.profileImage}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

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
      
      const response = await axios.put(
        `http://localhost:5000/api/bookingsuser/${currentBooking._id}`,
        {
          ...editFormData,
          status: 'pending'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setBookings(prev => prev.map(b => 
        b._id === currentBooking._id ? response.data : b
      ));
      setShowEditModal(false);
      toast.success('Booking updated successfully!');
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error.response?.data?.message || 'Failed to update booking');
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
        console.log(data);
        // Update status to cancelled
        setBookings(bookings.map(booking => 
          booking._id === bookingId ? {
            ...booking,
            status: 'cancelled',
            room: { ...booking.room, status: 'available' }
          } : booking
        ));
  
        // Remove after 30 seconds
        setTimeout(() => {
          setBookings(prevBookings => prevBookings.filter(b => b._id !== bookingId));
        }, 30000);
  
        toast.success('Booking cancelled successfully!');
      } catch (error) {
        console.error("Error cancelling booking:", error);
        toast.error(error.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  const handleCheckOut = async (bookingId) => {
    if (window.confirm("Are you sure you want to check out?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `http://localhost:5000/api/bookingsuser/${bookingId}/checkout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log(response);
        
        setBookings(prev => prev.map(b => 
          b._id === bookingId ? {
            ...b,
            room: { ...b.room, status: 'checked-out' }
          } : b
        ));
        toast.success("Checked out successfully!");
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to check out');
      }
    }
  };

  const handleReportIssue = (bookingId) => {
    navigate(`/report-issue/${bookingId}`);
  };

  const handleLeaveReview = (bookingId) => {
    navigate(`/leave-review/${bookingId}`);
  };

  // Fetch services
useEffect(() => {
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services/');
      setServices(response.data);
    } catch (error) {
      setServicesError(error.response?.data?.message || 'Failed to fetch services');
    } finally {
      setServicesLoading(false);
    }
  };

  fetchServices();
}, []);

  return (
    <>
    <div className="page-wrapper">
    <Header/>
    <div className="use-profile-container">
      <div className="use-profile-sidebar">
        <div className="use-sidebar-header">
          <h4>Welcome to the Hotel Management</h4>
          <p className="use-sidebar-date">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'short', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>
        
        <nav className="use-sidebar-nav">
          <NavLink to="/dashboard" className="use-nav-link" activeClassName="use-active">
            <strong>Dashboard</strong>
          </NavLink>
          <NavLink to="/projects" className="use-nav-link" activeClassName="use-active">
            Project
          </NavLink>
          <NavLink to="/team" className="use-nav-link" activeClassName="use-active">
            Team
          </NavLink>
          <NavLink to="/reviews" className="use-nav-link" activeClassName="use-active">
            Review
          </NavLink>
          <NavLink to="/messages" className="use-nav-link" activeClassName="use-active">
            Message
          </NavLink>
          <NavLink to="/settings" className="use-nav-link" activeClassName="use-active">
            Settings
          </NavLink>
        </nav>
      </div>

      <div className="use-profile-content">
        <div className="use-profile-header">
          <h2>Profile</h2>
          <button 
            className="use-btn btn-primary edit-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'View Profile' : 'Edit Profile'}
          </button>
        </div>

        <div className="use-profile-grid">
          <div className="use-profile-card">
            <div className="use-profile-image-container">
              {user.profileImage ? (
                <img 
                  src={previewImage || `http://localhost:5000/uploads/${user.profileImage}`} 
                  alt="Profile" 
                  className="use-profile-image"
                />
              ) : (
                <div className="use-profile-image-placeholder">
                  <span className="use-initials">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            <h4 className="use-profile-name">{user.name}</h4>
            <p className="use-profile-role">{user.role}</p>
            
            <div className="use-profile-details">
              <h5>Profile Details</h5>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.contact}</p>
              <p><strong>Address:</strong> {user.address}</p>
            </div>
          </div>

          <div className="use-profile-main-content">
            {isEditing ? (
              <div className="use-edit-profile-form">
                <form onSubmit={handleSubmit}>
                  <div className="use-form-image-upload">
                    <label htmlFor="profileImage" className="use-image-upload-label">
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt="Profile" 
                          className="use-profile-image-edit"
                        />
                      ) : (
                        <div className="use-profile-image-placeholder-edit">
                          <span className="use-initials">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="use-image-upload-input"
                      />
                      <div className="use-upload-text">
                        <small>Click to change photo</small>
                      </div>
                    </label>
                  </div>
                  
                  <div className="use-form-row">
                    <div className="use-form-group">
                      <label className="use-form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="use-form-control"
                        required
                      />
                    </div>
                    <div className="use-form-group">
                      <label className="use-form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        className="use-form-control"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="use-form-row">
                    <div className="use-form-group">
                      <label className="use-form-label">Contact</label>
                      <input
                        type="text"
                        name="contact"
                        value={user.contact}
                        onChange={handleInputChange}
                        className="use-form-control"
                      />
                    </div>
                    <div className="use-form-group">
                      <label className="use-form-label">Role</label>
                      <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={handleInputChange}
                        className="use-form-control"
                      />
                    </div>
                  </div>
                  
                  <div className="use-form-group">
                    <label className="use-form-label">Address</label>
                    <textarea
                      name="address"
                      value={user.address}
                      onChange={handleInputChange}
                      className="use-form-control"
                      rows="2"
                    />
                  </div>
                  
                  <div className="use-form-actions">
                    <button 
                      type="button" 
                      className="use-btn btn-outline-secondary cancel-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="use-btn btn-primary save-btn">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="use-bookings-card">
                  <h5 className="use-card-title">Your Bookings</h5>
                  
                  {loading ? (
                    <div className="use-loading-state">
                      <div className="use-spinner"></div>
                      <p>Loading your bookings...</p>
                    </div>
                  ) : error ? (
                    <div className="use-error-state">
                      {error}
                    </div>
                  ) : bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <div key={booking._id} className="use-booking-item">
                        <div className="use-booking-info">
                          <p><strong>Room:</strong> {booking.room?.roomNumber || 'N/A'}</p>
                          <p><strong>Type:</strong> {booking.room?.type || 'N/A'}</p>
                          <p>
                            <strong>Booking Status:</strong> 
                            <span className={`use-badge ${
                              booking.status === 'confirmed' ? 'use-bg-success' : 
                              booking.status === 'cancelled' ? 'use-bg-danger' : 
                              booking.status === 'pending' ? 'use-bg-warning' : 'use-bg-info'
                            }`}>
                              {booking.status || 'N/A'}
                            </span>
                          </p>
                          <p>
                            <strong>Room Status:</strong> 
                            <span className={`use-badge ${
                              booking.room.status === 'available' ? 'use-bg-success' : 
                              booking.room.status === 'booked' ? 'use-bg-warning' : 
                              booking.room.status === 'checked-in' ? 'use-bg-success' : 
                              booking.room.status === 'checked-out' ? 'use-bg-secondary' : 'use-bg-dark'
                            }`}>
                              {booking.room.status || 'N/A'}
                            </span>
                          </p>
                          <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                          <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                          <p><strong>Guests:</strong> {booking.room.status} adults, {booking.children} children</p>
                          
                          <div className="use-booking-actions">
  {/* Show Edit & Cancel only if booking is pending/confirmed */}
  {(booking.status === 'pending' ||  booking.room.status === 'booked') && (
    <>
      <button 
        onClick={() => handleEditClick(booking)}
        className="use-btn use-btn-primary"
      >
        Edit
      </button>
      <button 
        onClick={() => handleCancelBooking(booking._id)}
        className="use-btn use-btn-danger"
      >
        Cancel
      </button>
    </>
  )}

  {/* Show Check-out & Report Issue only if room is checked-in */}
  {booking.room?.status === 'checked-in' && (
    <>
      <button 
        onClick={() => handleCheckOut(booking._id)}
        className="use-btn use-btn-warning"
      >
        Check-out
      </button>
      <button 
        onClick={() => handleReportIssue(booking._id)}
        className="use-btn use-btn-secondary"
      >
        Report Issue
      </button>
    </>
  )}

  {/* Show Leave Review only if room is checked-out */}
  {booking.room?.status === 'checked-out' && (
    <button 
      onClick={() => handleLeaveReview(booking._id)}
      className="use-btn use-btn-info"
    >
      Leave Review
    </button>
  )}
</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="use-no-bookings">
                      No bookings found. <NavLink to="/rooms">Book a room</NavLink> to see your reservations here.
                    </div>
                  )}
                </div>
                
                <div className="use-upcoming-task-card">
  <h5 className="use-card-title">Hotel Services</h5>
  
  {servicesLoading ? (
    <div className="use-loading-state">
      <div className="use-spinner"></div>
      <p>Loading services...</p>
    </div>
  ) : servicesError ? (
    <div className="use-error-state">
      {servicesError}
    </div>
  ) : services.length > 0 ? (
    <div className="use-services-list">
      {services.filter(service => service.isActive).map(service => (
        <div key={service._id} className="use-service-item">
          <div className="use-service-image-container">
            {service.image && (
              <img 
                src={`http://localhost:5000/${service.image}`} 
                alt={service.name}
                className="use-service-image"
              />
            )}
          </div>
          <div className="use-service-details">
            <h6>{service.name}</h6>
            <p className="use-service-price">${service.price}</p>
            <p className="use-service-time">
              {service.availableTimes && 
                `${service.availableTimes.start} - ${service.availableTimes.end}`}
            </p>
            <p className="use-service-description">
              {service.description || 'No description available'}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="use-no-services">
      No active services available
    </div>
  )}
</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Booking Modal */}
      {showEditModal && currentBooking && (
        <div className="use-modal-overlay">
          <div className="use-modal-content">
            <div className="use-modal-header">
              <h5>Edit Booking</h5>
              <button onClick={() => setShowEditModal(false)} className="use-close-btn">
                &times;
              </button>
            </div>
            <div className="use-modal-body">
              <form onSubmit={handleEditSubmit}>
                <div className="use-form-group">
                  <label>Check-in Date</label>
                  <input
                    type="date"
                    value={editFormData.checkInDate}
                    onChange={(e) => setEditFormData({...editFormData, checkInDate: e.target.value})}
                    required
                  />
                </div>
                <div className="use-form-group">
                  <label>Check-out Date</label>
                  <input
                    type="date"
                    value={editFormData.checkOutDate}
                    onChange={(e) => setEditFormData({...editFormData, checkOutDate: e.target.value})}
                    required
                  />
                </div>
                <div className="use-form-group">
                  <label>Adults</label>
                  <input
                    type="number"
                    value={editFormData.adults}
                    onChange={(e) => setEditFormData({...editFormData, adults: e.target.value})}
                    min="1"
                    required
                  />
                </div>
                <div className="use-form-group">
                  <label>Children</label>
                  <input
                    type="number"
                    value={editFormData.children}
                    onChange={(e) => setEditFormData({...editFormData, children: e.target.value})}
                    min="0"
                    required
                  />
                </div>
                <div className="use-modal-footer">
                  <button 
                    type="button" 
                    onClick={() => setShowEditModal(false)}
                    className="use-btn use-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="use-btn use-btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </div>
    </>
  );
};

export default Profile;