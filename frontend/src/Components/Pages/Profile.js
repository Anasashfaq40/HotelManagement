import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../Header';
import Footer from '../footer';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

const Profile = () => {
  const navigate = useNavigate();
  
  // User profile state
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
  
  // Room booking states
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

  // Service states
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    quantity: 1,
    scheduledTime: '',
    specialInstructions: ''
  });

  // Review states
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentReviewBooking, setCurrentReviewBooking] = useState(null);
  const [reviewFormData, setReviewFormData] = useState({
    rating: 5,
    comment: '',
    anonymous: false
  });
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [issueText, setIssueText] = useState("");
    const [selectedRoomNumber, setSelectedRoomNumber] = useState("");

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

  // Fetch room bookings
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
          headers: { Authorization: `Bearer ${token}` }
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

  // Fetch service bookings
  useEffect(() => {
    const fetchServiceBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/services/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setServiceBookings(response.data);
      } catch (error) {
        console.error('Error fetching service bookings:', error);
      }
    };

    fetchServiceBookings();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setReviewsLoading(false);
          return;
        }
  
        const response = await axios.get('http://localhost:5000/api/reviews/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        // Check response structure
        if (response.data && response.data.success) {
          setReviews(response.data.data); // Access the data property
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error(error.response?.data?.message || 'Failed to load reviews');
      } finally {
        setReviewsLoading(false);
      }
    };
  
    fetchReviews();
  }, []);

  // Profile handlers
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

  // Room booking handlers
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
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log(data);
        
        setBookings(bookings.map(booking => 
          booking._id === bookingId ? {
            ...booking,
            status: 'cancelled',
            room: { ...booking.room, status: 'available' }
          } : booking
        ));

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
        
        // 1. First update status to checked-out
        const checkoutResponse = await axios.put(
          `http://localhost:5000/api/bookingsuser/${bookingId}/checkout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (!checkoutResponse.data.success) {
          throw new Error(checkoutResponse.data.message || 'Checkout failed');
        }
  
        // 2. Generate invoice
        const invoiceResponse = await axios.post(
          `http://localhost:5000/api/invoices/generate/${bookingId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        // 3. Validate response
        if (!invoiceResponse.data?.success || !invoiceResponse.data.data) {
          throw new Error('Invalid invoice data received from server');
        }
  
        const invoiceData = invoiceResponse.data.data;
  
        // 4. Safely render invoice HTML with null checks
        const invoiceHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Invoice ${invoiceData.invoiceNumber || ''}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .invoice-container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
              .header { text-align: center; margin-bottom: 30px; }
              .section { margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin: 15px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .text-right { text-align: right; }
              .total { font-weight: bold; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              <div class="header">
                <h1>Hotel Invoice</h1>
                <p>Invoice #${invoiceData.invoiceNumber || ''}</p>
                <p>Date: ${new Date(invoiceData.issueDate || Date.now()).toLocaleDateString()}</p>
              </div>
              
              <div class="section">
                <h3>Guest Details</h3>
                <p><strong>Name:</strong> ${invoiceData.guestDetails?.name || 'Guest'}</p>
                <p><strong>Email:</strong> ${invoiceData.guestDetails?.email || ''}</p>
                <p><strong>Contact:</strong> ${invoiceData.guestDetails?.contact || ''}</p>
                <p><strong>Booking ID:</strong> ${invoiceData.bookingId || ''}</p>
                <p><strong>Check-in:</strong> ${new Date(invoiceData.checkInDate || Date.now()).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> ${new Date(invoiceData.checkOutDate || Date.now()).toLocaleDateString()}</p>
              </div>
              
              <div class="section">
                <h3>Room Charges</h3>
                <table>
                  <tr>
                    <th>Room Number</th>
                    <th>Type</th>
                    <th>Rate/Night</th>
                    <th>Nights</th>
                    <th class="text-right">Total</th>
                  </tr>
                  <tr>
                    <td>${invoiceData.roomCharges?.roomNumber || ''}</td>
                    <td>${invoiceData.roomCharges?.roomType || ''}</td>
                    <td>$${(invoiceData.roomCharges?.ratePerNight || 0).toFixed(2)}</td>
                    <td>${invoiceData.roomCharges?.nights || 0}</td>
                    <td class="text-right">$${(invoiceData.roomCharges?.subtotal || 0).toFixed(2)}</td>
                  </tr>
                </table>
              </div>
              
              ${(invoiceData.serviceCharges?.length || 0) > 0 ? `
              <div class="section">
                <h3>Service Charges</h3>
                <table>
                  <tr>
                    <th>Service</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th class="text-right">Total</th>
                  </tr>
                  ${(invoiceData.serviceCharges || []).map(service => `
                    <tr>
                      <td>${service?.name || 'Service'}</td>
                      <td>${service?.quantity || 1}</td>
                      <td>$${(service?.unitPrice || 0).toFixed(2)}</td>
                      <td class="text-right">$${(service?.total || 0).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
              ` : ''}
              
              <div class="total">
                <p>Subtotal: $${((invoiceData.roomCharges?.subtotal || 0) + (invoiceData.serviceCharges?.reduce((sum, s) => sum + (s?.total || 0), 0) || 0)).toFixed(2)}</p>
                <p>Tax (${((invoiceData.tax?.rate || 0) * 100)}%): $${(invoiceData.tax?.amount || 0).toFixed(2)}</p>
                <p><strong>Grand Total: $${(invoiceData.totalAmount || 0).toFixed(2)}</strong></p>
              </div>
            </div>
          </body>
          </html>
        `;
  
        // 5. Open invoice in new window
        const invoiceWindow = window.open('', '_blank');
        if (invoiceWindow) {
          invoiceWindow.document.open();
          invoiceWindow.document.write(invoiceHtml);
          invoiceWindow.document.close();
        } else {
          throw new Error('Popup window was blocked. Please allow popups for this site.');
        }
  
        // 6. Update state
        setBookings(prev => prev.map(b => 
          b._id === bookingId ? {
            ...b,
            status: 'checked-out',
            room: { ...b.room, status: 'available' },
            invoice: invoiceData
          } : b
        ));
  
        toast.success("Checked out successfully! Invoice generated.");
      } catch (error) {
        console.error('Checkout error:', error);
        toast.error(error.response?.data?.message || error.message || 'Failed to complete checkout');
      }
    }
  };

  // const handleReportIssue = (bookingId) => {
  //   navigate(`/report-issue/${bookingId}`);
  // };

  // Service booking handlers
  const handleServiceBookClick = (service) => {
    setSelectedService(service);
    setServiceFormData({
      quantity: 1,
      scheduledTime: '',
      specialInstructions: ''
    });
    setShowServiceModal(true);
  };

  const handleServiceFormChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('userData'));
      
      const activeBooking = bookings.find(b => 
        ['confirmed', 'checked-in'].includes(b.status)
      );
  
      if (!activeBooking) {
        toast.error('You need an active booking to reserve services');
        return;
      }
  
      // Check if we already have a service booking for this booking ID
      const existingServiceBooking = serviceBookings.find(
        sb => sb.booking === activeBooking._id && sb.status === 'active'
      );
  
      const response = await axios.post(
        'http://localhost:5000/api/services/bookings',
        {
          guest: user._id,
          booking: activeBooking._id,
          services: [{
            service: selectedService._id,
            quantity: serviceFormData.quantity,
            scheduledTime: serviceFormData.scheduledTime || undefined,
            specialInstructions: serviceFormData.specialInstructions || undefined
          }],
          totalServiceAmount: selectedService.price * serviceFormData.quantity
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      toast.success('Service booked successfully!');
      setShowServiceModal(false);
      
      // Update state correctly
      if (existingServiceBooking) {
        setServiceBookings(prev => 
          prev.map(sb => 
            sb._id === response.data._id ? response.data : sb
          )
        );
      } else {
        setServiceBookings([...serviceBookings, response.data]);
      }
    } catch (error) {
      console.error('Error booking service:', error);
      toast.error(error.response?.data?.message || 'Failed to book service');
    }
  };

  // Review handlers
  const handleLeaveReview = (booking) => {
    setCurrentReviewBooking(booking);
    setReviewFormData({
      rating: 5,
      comment: '',
      anonymous: false
    });
    setShowReviewModal(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      // Client-side validation
      if (!currentReviewBooking || !currentReviewBooking._id || !currentReviewBooking.room?._id) {
        toast.error('Invalid booking information');
        return;
      }
  
      if (reviewFormData.rating < 1 || reviewFormData.rating > 5) {
        toast.error('Please select a valid rating (1-5)');
        return;
      }
  
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to submit a review');
        return;
      }
  
      const user = JSON.parse(localStorage.getItem('userData'));
      if (!user?.id) {
        toast.error('User information not found');
        return;
      }
  
      // Prepare payload
      const payload = {
        booking: currentReviewBooking._id,
        room: currentReviewBooking.room._id,
        rating: Number(reviewFormData.rating),
        comment: reviewFormData.comment,
        anonymous: Boolean(reviewFormData.anonymous)
      };
  
      const response = await axios.post(
        'http://localhost:5000/api/reviews',
        payload,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.data?.success) {
        toast.success('Review submitted successfully!');
        setShowReviewModal(false);
        setReviews([...reviews, response.data.data]);
        setReviewFormData({ rating: 5, comment: '', anonymous: false });
      } else {
        throw new Error(response.data?.message || 'Invalid response from server');
      }
    } catch (error) {
      console.error('Review submission error:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to submit review';
      toast.error(errorMessage);
    }
  };

  const handleReviewFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


    const handleIssueSubmit = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userData")); // get the full object
        const userId = user?.id; // extract the id from it
        if (!userId || !selectedRoomNumber || !issueText) {
          toast.error("All fields are required");
          return;
        }
  
        await axios.post("http://localhost:5000/api/issues", {
          userId,
          roomNumber: selectedRoomNumber,
          issue: issueText,
        });
  
        toast.success("Issue reported successfully!");
        setShowIssueModal(false);
        setIssueText("");
        setSelectedRoomNumber("");
      } catch (error) {
        toast.error("Failed to report issue.");
      }
    };

  return (
    <>
      <div className="page-wrapper">
        <Header/>

              {/* Slider Section Start */}
 <section className="main-slider-area bgc-black-with-lighting rel z-1">
 <div className="main-slider-active">
   {/* <div className="slider-item">
     <div className="container">
       <div className="row justify-content-end align-items-center">
         <div className="col-xl-3">
           <div className="slider-content">
             <span className="sub-title">
               <i className="fal fa-arrow-right"></i> Welcome to Hotel Management
             </span>
             <h1>
               Enjoy Vacations With <span>Luxury Hotel</span>
             </h1>
             <a href="room-grid.js" className="theme-btn">
               Explore Our Rooms <i className="far fa-angle-right"></i>
             </a>
           </div>
         </div>
         <div className="col-xl-8">
           <div className="slider-image">
             <img src="theme/assets/images/slider/slide-1.jpg" alt="Slider" />
           </div>
         </div>
       </div>
     </div>
   </div> */}
   {/* <div className="slider-item">
     <div className="container">
       <div className="row justify-content-end align-items-center">
         <div className="col-xl-3">
           <div className="slider-content">
             <span className="sub-title">
               <i className="fal fa-arrow-right"></i> Welcome to Qomfort
             </span>
             <h1>
               Enjoy Vacations With <span>Luxury Hotel</span>
             </h1>
             <a href="room-grid.js" className="theme-btn">
               Explore Our Rooms <i className="far fa-angle-right"></i>
             </a>
           </div>
         </div>
         <div className="col-xl-8">
           <div className="slider-image">
             <img src="theme/assets/images/slider/slide-2.jpg" alt="Slider" />
           </div>
         </div>
       </div>
     </div>
   </div> */}
   {/* <div className="slider-item">
     <div className="container">
       <div className="row justify-content-end align-items-center">
         <div className="col-xl-3">
           <div className="slider-content">
             <span className="sub-title">
               <i className="fal fa-arrow-right"></i> Welcome to Qomfort
             </span>
             <h1>
               Enjoy Vacations With <span>Luxury Hotel</span>
             </h1>
             <a href="room-grid.js" className="theme-btn">
               Explore Our Rooms <i className="far fa-angle-right"></i>
             </a>
           </div>
         </div>
         <div className="col-xl-8">
           <div className="slider-image">
             <img src="theme/assets/images/slider/slide-3.jpg" alt="Slider" />
           </div>
         </div>
       </div>
     </div>
   </div> */}
   {/* <div className="slider-item">
     <div className="container">
       <div className="row justify-content-end align-items-center">
         <div className="col-xl-3">
           <div className="slider-content">
             <span className="sub-title">
               <i className="fal fa-arrow-right"></i> Welcome to Qomfort
             </span>
             <h1>
               Enjoy Vacations With <span>Luxury Hotel</span>
             </h1>
             <a href="room-grid.js" className="theme-btn">
               Explore Our Rooms <i className="far fa-angle-right"></i>
             </a>
           </div>
         </div>
         <div className="col-xl-8">
           <div className="slider-image">
             <img src="theme/assets/images/slider/slide-4.jpg" alt="Slider" />
           </div>
         </div>
       </div>
     </div>
   </div> */}
 </div>
 <div className="container">
   <div className="row justify-content-center">
     <div className="col-xl-10">
       <div className="main-slider-dots"></div>
     </div>
   </div>
 </div>
 <div className="slider-shapes">
   <img className="shape circle-half" src="theme/assets/images/shapes/slider-circle-half.png" alt="Shape" />
   <img className="shape circle" src="theme/assets/images/shapes/slider-circle.png" alt="Shape" />
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
</section>
{/* Slider Section End */}
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
              <NavLink to="/dashboard" className="use-nav-link">
                <strong>Dashboard</strong>
              </NavLink>
              <NavLink to="/projects" className="use-nav-link">
                Project
              </NavLink>
              <NavLink to="/team" className="use-nav-link">
                Team
              </NavLink>
              <NavLink to="/reviews" className="use-nav-link">
                Review
              </NavLink>
              <NavLink to="/messages" className="use-nav-link">
                Message
              </NavLink>
              <NavLink to="/settings" className="use-nav-link">
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
                              <p><strong>Guests:</strong> {booking.adults} adults, {booking.children} children</p>
                              
                              <div className="use-booking-actions">
                                {(booking.status === 'pending' || booking.room.status === 'booked') && (
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

                                {booking.room?.status === 'checked-in' && (
                                  <>
                                    <button 
                                      onClick={() => handleCheckOut(booking._id)}
                                      className="use-btn use-btn-warning"
                                    >
                                      Check-out
                                    </button>
                                    <button
                                className="btn btn-danger btn-sm px-3 py-1 rounded-pill"
                                onClick={() => {
                                  setSelectedRoomNumber(booking.room.roomNumber);
                                  setShowIssueModal(true);
                                }}
                              >
                                Report Issue
                              </button>
                                  </>
                                )}

                                {booking.room?.status === 'checked-out' && (
                                  <button 
                                    onClick={() => handleLeaveReview(booking)}
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
                    
                    <div className="use-reviews-card">
                      <h5 className="use-card-title">Your Reviews</h5>
                      
                      {reviewsLoading ? (
                        <div className="use-loading-state">
                          <div className="use-spinner"></div>
                          <p>Loading your reviews...</p>
                        </div>
                      ) : reviews.length > 0 ? (
                        <div className="use-reviews-table-container">
                          <table className="use-reviews-table">
                            <thead>
                              <tr>
                                <th>Room</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reviews.map(review => (
                                <tr key={review._id}>
                                  <td>{review.room?.roomNumber || 'N/A'}</td>
                                  <td>
                                    <div className="use-rating-stars">
                                      {[...Array(5)].map((_, i) => (
                                        <span 
                                          key={i} 
                                          className={i < review.rating ? 'use-star-filled' : 'use-star-empty'}
                                        >
                                          ★
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="use-review-comment">
                                    {review.comment || 'No comment'}
                                  </td>
                                  <td>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </td>
                                  <td>
                                    <span className={`use-badge ${
                                      review.status === 'approved' ? 'use-bg-success' : 
                                      review.status === 'pending' ? 'use-bg-warning' : 'use-bg-secondary'
                                    }`}>
                                      {review.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="use-no-reviews">
                          You haven't submitted any reviews yet.
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
                                <button 
                                  onClick={() => handleServiceBookClick(service)}
                                  className="use-btn use-btn-primary"
                                >
                                  Book Service
                                </button>
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

          {/* Service Booking Modal */}
          {showServiceModal && selectedService && (
            <div className="use-modal-overlay">
              <div className="use-modal-content">
                <div className="use-modal-header">
                  <h5>Book {selectedService.name}</h5>
                  <button onClick={() => setShowServiceModal(false)} className="use-close-btn">
                    &times;
                  </button>
                </div>
                <div className="use-modal-body">
                  <form onSubmit={handleServiceSubmit}>
                    <div className="use-form-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        value={serviceFormData.quantity}
                        onChange={handleServiceFormChange}
                        min="1"
                        required
                      />
                    </div>
                    
                    {selectedService.requiresTimeSlot && (
                      <div className="use-form-group">
                        <label>Scheduled Time</label>
                        <input
                          type="datetime-local"
                          name="scheduledTime"
                          value={serviceFormData.scheduledTime}
                          onChange={handleServiceFormChange}
                          required
                        />
                      </div>
                    )}
                    
                    <div className="use-form-group">
                      <label>Special Instructions</label>
                      <textarea
                        name="specialInstructions"
                        value={serviceFormData.specialInstructions}
                        onChange={handleServiceFormChange}
                        rows="3"
                      />
                    </div>
                    
                    <div className="use-form-group">
                      <p><strong>Total:</strong> ${selectedService.price * serviceFormData.quantity}</p>
                    </div>
                    
                    <div className="use-modal-footer">
                      <button 
                        type="button" 
                        onClick={() => setShowServiceModal(false)}
                        className="use-btn use-btn-secondary"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="use-btn use-btn-primary"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

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

          {/* Review Modal */}
          {showReviewModal && currentReviewBooking && (
            <div className="use-modal-overlay">
              <div className="use-modal-content">
                <div className="use-modal-header">
                  <h5>Leave a Review</h5>
                  <button onClick={() => setShowReviewModal(false)} className="use-close-btn">
                    &times;
                  </button>
                </div>
                <div className="use-modal-body">
                  <form onSubmit={handleReviewSubmit}>
                    <div className="use-form-group">
                      <label>Room: {currentReviewBooking.room?.roomNumber || 'N/A'}</label>
                    </div>
                    
                    <div className="use-form-group">
                      <label>Rating</label>
                      <div className="use-rating-input">
                        {[1, 2, 3, 4, 5].map(star => (
                          <React.Fragment key={star}>
                            <input
                              type="radio"
                              id={`star-${star}`}
                              name="rating"
                              value={star}
                              checked={reviewFormData.rating === star}
                              onChange={handleReviewFormChange}
                            />
                            <label htmlFor={`star-${star}`}>★</label>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    
                    <div className="use-form-group">
                      <label>Your Review</label>
                      <textarea
                        name="comment"
                        value={reviewFormData.comment}
                        onChange={handleReviewFormChange}
                        rows="4"
                        placeholder="Share your experience..."
                        required
                      />
                    </div>
                    
                    <div className="use-form-group">
                      <label className="use-checkbox-label">
                        <input
                          type="checkbox"
                          name="anonymous"
                          checked={reviewFormData.anonymous}
                          onChange={handleReviewFormChange}
                        />
                        Submit anonymously
                      </label>
                    </div>
                    
                    <div className="use-modal-footer">
                      <button 
                        type="button" 
                        onClick={() => setShowReviewModal(false)}
                        className="use-btn use-btn-secondary"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="use-btn use-btn-primary"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer/>
         {/* Issue Report Modal */}
              <Modal show={showIssueModal} onHide={() => setShowIssueModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Report an Issue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="issueTextArea">
                      <Form.Label>Describe the issue for room {selectedRoomNumber}</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={issueText}
                        onChange={(e) => setIssueText(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowIssueModal(false)}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleIssueSubmit}>
                    Submit Issue
                  </Button>
                </Modal.Footer>
              </Modal>
      </div>
    </>
  );
};

export default Profile;