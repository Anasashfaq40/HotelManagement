// import React from 'react';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import Header from '../Header';
import Footer from '../footer';
// import Navbar from '../Navbar';
import Header from '../Header';




function Room() {

  const [loading, setLoading] = useState(false); // For tracking loading state
  const [rooms, setRooms] = useState([]); // For storing rooms data

  // Fetch rooms from backend
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };
    return (
      <>
      <div className="home-one">
      <div className="page-wrapper">
      
   <Header/>





{/* Rooms Area start */}
<section className="rooms-area pt-130 rpt-100 pb-100 rpb-70 rel z-2">
      <div className="container">
        <div className="row justify-content-between align-items-center pb-20">
          <div className="col-xl-5 col-lg-7">
            <div className="section-title mb-40 wow fadeInLeft delay-0-2s">
              <h2>Take A Look Our Luxury Rooms and Hotel</h2>
            </div>
          </div>
          <div className="col-lg-4 text-lg-end">
            <a className="theme-btn mb-40 wow fadeInRight delay-0-2s" href="room-grid.js">
              Explore Rooms <i className="fal fa-angle-right"></i>
            </a>
          </div>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div> // Show loading spinner or message
        ) : (
          <div className="row">
            {rooms.map((room, index) => (
              <div className="col-xl-4 col-md-6" key={room._id}>
                <div className={`room-item wow fadeInUp delay-0-${(index + 1) * 2}s`}>
                  <div className="image">
                    <img src={`http://localhost:5000/uploads/${room.image}`} alt="Room" />
                    <a className="category" href="room-grid.js">{room.type}</a>
                  </div>
                  <div className="content">
                    <h4>
                      <a href={`room-details.js?id=${room._id}`}>{room.type} Room</a>
                    </h4>
                    <ul className="blog-meta">
                      <li>
                        <i className="far fa-bed-alt"></i>
                        <a href="index.js#">Adults : 5</a>
                      </li>
                      <li>
                        <i className="far fa-drafting-compass"></i>
                        <a href="index.js#">Size : 59ft</a>
                      </li>
                    </ul>
                    <p>
                      At vero eos et accusamus et iustonis simos ducimus blanditiis praesentium tatum
                    </p>
                    <div className="price">
                      Price <span>${room.price}</span>/per night
                    </div>
                  </div>
                  <Link
  to={`/room-details/${room._id}`} // Pass room ID in the URL
  className="theme-btn style-two"
>
  Book Now <i className="fal fa-angle-right"></i>
</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-lines for-bg-white">
        <span></span><span></span>
        <span></span><span></span>
        <span></span><span></span>
        <span></span><span></span>
        <span></span><span></span>
      </div>
    </section>
{/* Rooms Area end */}

<Footer/>
   
       </div>
       </div>
      </>
    );
  }
  
  
export default Room;