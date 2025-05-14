import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Updated import statement
import Header from "../Header";
import Footer from "../footer";

function RoomDetails() {
  const { id } = useParams(); // Get room ID from the URL
  const [room, setRoom] = useState(null); // State to store room details
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
    children: 0,
  });

  // Fetch room details based on the ID
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/api/roo/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not logged in.");
      return;
    }

    // Decode the token to get userId
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken); 
    const userId = decodedToken.id; // Extract userId from the decoded token
    console.log("User ID from token:", userId);

    if (!userId) {
      alert("Invalid token. User ID not found.");
      return;
    }

    // Prepare booking data
    const bookingData = {
      userId: userId, // Use the logged-in user's ID
      roomId: id, // Room ID from the URL
      ...formData,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/api/bookings", bookingData);
      console.log("Booking created:", response.data);
      alert("Booking successful!");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Room is already booked for the selected dates." );
    }
  };

  if (!room) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <>
      <div className="page-wrapper">
        <Header />
        {/* Page Banner Start */}
        <section
          className="page-banner-area pt-170 rpt-110 pb-190 rpb-125 rel z-1 bgs-cover bgc-black text-center"
          style={{ backgroundImage: "url(theme/assets/images/background/banner-two.jpg)" }}
        >
          <div className="container">
            <div className="banner-inner text-white rpb-25">
              <h1 className="page-title wow fadeInUp delay-0-2s">Room Details</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                  <li className="breadcrumb-item">
                    <a href="index.js">home</a>
                  </li>
                  <li className="breadcrumb-item active">Room Details</li>
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

        {/* Room Details Area start */}
        <section className="room-details-area py-130 rpy-100 rel z-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="room-details-content rmb-55">
                  <div className="section-title wow fadeInUp delay-0-2s">
                    <h2>Description</h2>
                  </div>
                  <ul className="blog-meta wow fadeInUp delay-0-3s">
                    <li>
                      <i className="far fa-drafting-compass"></i>
                      <a href="room-details.js#">Size : {room.size || "80m2"}</a>
                    </li>
                    <li>
                      <i className="far fa-bed-alt"></i>
                      <a href="room-details.js#">Beds : {room.beds || "3"}</a>
                    </li>
                    <li>
                      <i className="far fa-bath"></i>
                      <a href="room-details.js#">Bathrooms : {room.bathrooms || "2"}</a>
                    </li>
                    <li>
                      <div className="ratting">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </li>
                  </ul>
                  <div className="price mb-35">${room.price || "59"} Per Night</div>
                  <p>{room.description || "No description available."}</p>
                  <div className="room-details-images mt-45 wow fadeInUp delay-0-2s">
                    <img src={`http://localhost:5000/uploads/${room.image}`} alt="Room" />
                  </div>
                  <div className="section-title mt-35">
                    <h2>Room Facilities</h2>
                  </div>
                  <p>
                    Aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo
                    nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  </p>
                  <ul className="list-style-two three-column pt-10 wow fadeInUp delay-0-2s">
                    <li>Breakfast Included</li>
                    <li>Flat Screen TV</li>
                    <li>Hairdryer</li>
                    <li>Writing Desk</li>
                    <li>Towel Warmer</li>
                    <li>Shower bathtub</li>
                    <li>Balcony or Terrace</li>
                    <li>Ironing Board</li>
                    <li>Kettle Tea</li>
                    <li>Telephone</li>
                    <li>Saving Safe</li>
                    <li>Transportations</li>
                  </ul>
                  <div className="section-title my-40">
                    <h2>Availability</h2>
                  </div>
                  <div className="room-calendar wow fadeInUp delay-0-2s" id="calendar"></div>
                  <div className="room-location mt-70 wow fadeInUp delay-0-2s">
                    {/* <iframe
                      src="https://www.google.com/maps/embed?pb=!1m12!1m10!1m3!1d142190.2862584524!2d-74.01298319978558!3d40.721725351435126!2m1!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1663473911885!5m2!1sen!2sbd"
                      style={{ border: 0, width: "100%" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe> */}
                  </div>
                  <div className="section-title mt-45">
                    <h2>Rules & Regulations</h2>
                  </div>
                  <p>
                    To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage avoids a pain that produces no resultant pleasure
                  </p>
                  <ul className="list-style-two pt-10 wow fadeInUp delay-0-2s">
                    <li>Check-in: After 02:00pm</li>
                    <li>Checkout: Before 11:00am</li>
                    <li>Late Checkout: Additional charge 50% of the room rate.</li>
                    <li>No smoking in side the room</li>
                    <li>No pets</li>
                    <li>Identification document is must for hotel registration.</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="room-details-sidebar bgc-lighter p-50 rp-40">
                  <form className="widget-search-filter wow fadeInUp delay-0-4s" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="checkin">Check In</label>
                      <input
                        type="date"
                        id="checkin"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="checkout">Check Out</label>
                      <input
                        type="date"
                        id="checkout"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="adults">Adults</label>
                      <select
                        name="adults"
                        id="adults"
                        value={formData.adults}
                        onChange={handleChange}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="children">Children</label>
                      <select
                        name="children"
                        id="children"
                        value={formData.children}
                        onChange={handleChange}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                    <button type="submit" className="theme-btn w-100">
                      Book Now <i className="far fa-angle-right"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Room Details Area end */}

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

        <Footer />
      </div>
    </>
  );
}

export default RoomDetails;