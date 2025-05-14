import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../footer';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('userData'));
    
    if (token && user) {
      setIsLoggedIn(true);
      // Pre-fill user data if available
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ 
        success: false, 
        message: 'Please fill in all required fields.' 
      });
      setIsLoading(false);
      return;
    }
  
    if (!isLoggedIn) {
      setSubmitStatus({ 
        success: false, 
        message: 'Please login to submit feedback.' 
      });
      navigate('/login');
      setIsLoading(false);
      return;
    }
  
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Check if token exists
    if (!token) {
      setSubmitStatus({ 
        success: false, 
        message: 'Authentication token missing. Please login again.' 
      });
      setIsLoading(false);
      navigate('/login');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Changed from 'x-auth-token' to standard 'Authorization' header
        },
        body: JSON.stringify(formData)
      });
  
      // Handle unauthorized response
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setSubmitStatus({ 
          success: false, 
          message: 'Session expired. Please login again.' 
        });
        navigate('/login');
        return;
      }
  
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({ success: true, message: data.message });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({ success: false, message: data.message });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({ 
        success: false, 
        message: 'Failed to submit form. Please try again later.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <Header/>
        {/* Page Banner Start */}
        <section
          className="page-banner-area pt-170 rpt-110 pb-190 rpb-125 rel z-1 bgs-cover bgc-black text-center"
          style={{ backgroundImage: "url(theme/assets/images/background/banner-two.jpg)" }}
        >
          <div className="container">
            <div className="banner-inner text-white rpb-25">
              <h1 className="page-title wow fadeInUp delay-0-2s">Contact</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                  <li className="breadcrumb-item">
                    <a href="index.js">home</a>
                  </li>
                  <li className="breadcrumb-item active">Contact</li>
                </ol>
              </nav>
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
        </section>
        {/* Page Banner End */}

        {/* Contact Form Area start */}
        <section className="contact-page-area py-130 rpy-100 rel z-1">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <div className="our-location-part rmb-55 wow fadeInUp delay-0-2s">
                  <div className="row">
                    <div className="col-xl-10">
                      <div className="section-title mb-60">
                        <span className="sub-title mb-15">Contact Us</span>
                        <h2>Need Any Consultations to Booked your Seat</h2>
                      </div>
                    </div>
                  </div>
                  <ul className="nav location-tab mb-40 wow fadeInUp delay-0-2s">
                    <li>
                      <a href="contact.js#australia" data-bs-toggle="tab" className="active show">
                        Pakistan
                      </a>
                    </li>
                    <li>
                      <a href="contact.js#newyork" data-bs-toggle="tab">
                        Karachi
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content wow fadeInUp delay-0-2s">
                    <div className="tab-pane fade active show" id="australia">
                      <div className="contact-info-item">
                        <div className="icon">
                          <i className="flaticon-location-1"></i>
                        </div>
                        <div className="content">
                          <span className="title">Locations</span>
                          <span className="text">Pakistan, Karachi, Garden</span>
                        </div>
                      </div>
                      <div className="contact-info-item">
                        <div className="icon">
                          <i className="flaticon-email-marketing"></i>
                        </div>
                        <div className="content">
                          <span className="title">Email Address</span>
                          <span className="text">
                            <a href="mailto:support@gmail.com">hotelmanagement@gmail.com</a>,
                            <a href="mailto:infohotel.net">hotelmanagment.net</a>
                          </span>
                        </div>
                      </div>
                      <div className="contact-info-item">
                        <div className="icon">
                          <i className="flaticon-call"></i>
                        </div>
                        <div className="content">
                          <span className="title">Make A Call</span>
                          <span className="text">
                            <a href="calto:+0001234568899">03022587244</a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="newyork">
                      <div className="contact-info-item">
                        <div className="icon">
                          <i className="flaticon-location-1"></i>
                        </div>
                        <div className="content">
                          <span className="title">Locations</span>
                          <span className="text">Pakistan, Karachi, Garden</span>
                        </div>
                      </div>
                      <div className="contact-info-item">
                        <div className="icon">
                          <i className="flaticon-email-marketing"></i>
                        </div>
                        <div className="content">
                          <span className="title">Email Address</span>
                          <span className="text">
                            <a href="mailto:support@gmail.com">hotelmanagment@gmail.com</a>,
                            <a href="mailto:infohotel.net">hotelmanagment.net</a>
                          </span>
                        </div>
                      </div>
                      <div className="contact-info-item">
                        <div className="icon">
                          <i className="flaticon-call"></i>
                        </div>
                        <div className="content">
                          <span className="title">Make A Call</span>
                          <span className="text">
                            <a href="calto:+0001234568899">03022587244</a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-page-form wow fadeInUp delay-0-2s">
                  <div className="section-title mb-15">
                    <h3>Send Us Message</h3>
                    <p>Your email address will not be published. Required fields are marked *</p>
                    {!isLoggedIn && (
                      <div className="alert alert-warning">
                        You need to <a href="/login">login</a> to submit feedback.
                      </div>
                    )}
                  </div>
                  {submitStatus && (
                    <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="row gap-20 pt-15">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Full name *"
                            required
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="Phone *"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Email *"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="form-control"
                            placeholder="Subject *"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            name="message"
                            id="message"
                            className="form-control"
                            rows="3"
                            placeholder="Message *"
                            required
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group pt-5 mb-0">
                          <button 
                            type="submit" 
                            className="theme-btn"
                            disabled={!isLoggedIn || isLoading}
                          >
                            {isLoading ? 'Sending...' : 'Send Message'}
                            <i className="far fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-lines for-bg-white">
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
        {/* Contact Form Area end */}

        {/* Location Map Area Start */}
        <div className="contact-page-map pb-120 rpb-90 wow fadeInUp delay-0-2s">
          <div className="container-fluid">
            <div className="our-location">
              {/* Map iframe can be uncommented and used when needed */}
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m12!1m10!1m3!1d142190.2862584524!2d-74.01298319978558!3d40.721725351435126!2m1!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1663473911885!5m2!1sen!2sbd"
                style={{ border: 0, width: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe> */}
            </div>
          </div>
        </div>
        {/* Location Map Area End */}

        {/* Instagram Area start */}
        <section className="instagram-area">
          <div className="instagram-item wow fadeInUp delay-0-2s">
            <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram1.jpg">
              <img src="theme/assets/images/instagrams/instagram1.jpg" alt="instagram" />
            </a>
          </div>
          <div className="instagram-item wow fadeInUp delay-0-3s">
            <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram2.jpg">
              <img src="theme/assets/images/instagrams/instagram2.jpg" alt="instagram" />
            </a>
          </div>
          <div className="instagram-item wow fadeInUp delay-0-4s">
            <div className="content text-white">
              <div className="icon">
                <i className="fab fa-instagram"></i>
              </div>
              <h2>
                <a href="https://www.instagram.com">Follow Our Instagram</a>
              </h2>
              <hr />
              <div className="call-text">Make A Call</div>
              <a className="h2" href="callto:+000(123)45688">
                +000 (123) 456 88
              </a>
            </div>
          </div>
          <div className="instagram-item wow fadeInUp delay-0-5s">
            <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram3.jpg">
              <img src="theme/assets/images/instagrams/instagram3.jpg" alt="instagram" />
            </a>
          </div>
          <div className="instagram-item wow fadeInUp delay-0-6s">
            <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram4.jpg">
              <img src="theme/assets/images/instagrams/instagram4.jpg" alt="instagram" />
            </a>
          </div>
        </section>
        {/* Instagram Area end */}
        
        <Footer/>
      </div>
    </>
  );
}

export default Contact;