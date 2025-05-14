// import React from 'react';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import Header from '../Header';
import Footer from '../footer';
// import Navbar from '../Navbar';
import Header from '../Header';




function Index() {

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
        
      {/* Slider Section Start */}
 <section className="main-slider-area bgc-black-with-lighting rel z-1">
 <div className="main-slider-active">
   <div className="slider-item">
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
             <Link to="/room-grid" className="theme-btn">
               Explore Our Rooms <i className="far fa-angle-right"></i>
             </Link>
           </div>
         </div>
         <div className="col-xl-8">
           <div className="slider-image">
             <img src="theme/assets/images/slider/slide-1.jpg" alt="Slider" />
           </div>
         </div>
       </div>
     </div>
   </div>
   <div className="slider-item">
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
             <Link to="/room-grid" className="theme-btn">
               Explore Our Rooms <i className="far fa-angle-right"></i>
             </Link>
           </div>
         </div>
         <div className="col-xl-8">
           <div className="slider-image">
             <img src="theme/assets/images/slider/slide-2.jpg" alt="Slider" />
           </div>
         </div>
       </div>
     </div>
   </div>
   <div className="slider-item">
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
             <Link to="/room-grid" className="theme-btn">
               Explore Our Rooms <i className="far fa-angle-right"></i>
             </Link>
           </div>
         </div>
         <div className="col-xl-8">
           <div className="slider-image">
             <img src="theme/assets/images/slider/slide-3.jpg" alt="Slider" />
           </div>
         </div>
       </div>
     </div>
   </div>
   <div className="slider-item">
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
             <Link to="/room-grid" className="theme-btn">
               Explore Our Rooms <i className="far fa-angle-right"></i>
             </Link>
           </div>
         </div>
         <div className="col-xl-8">
           <div className="slider-image">
             <img src="theme/assets/images/slider/slide-4.jpg" alt="Slider" />
           </div>
         </div>
       </div>
     </div>
   </div>
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
{/* About Area start */}
<section className="about-area pt-130 rpt-100 rel">
<div className="container">
  <div className="row align-items-center">
    <div className="col-lg-6">
      <div className="about-image-part rmb-55">
        <div className="top-part">
          <img src="theme/assets/images/about/about1.jpg" alt="About" />
          <div className="icon wow fadeInLeft delay-0-2s">
            <i className="flaticon-hotel"></i>
          </div>
        </div>
        <div className="bottom-part">
          <a
            href="https://www.youtube.com/watch?v=9Y7ma241N8k"
            className="mfp-iframe video-play-text wow fadeInRight delay-0-2s"
          >
            <i className="fal fa-play"></i>
            <span>
              <b>Watch Latest</b>
              <br /> <i>Videos</i>
            </span>
          </a>
          <img src="theme/assets/images/about/about2.jpg" alt="About" />
        </div>
      </div>
    </div>
    <div className="col-lg-6">
      <div className="about-content-part">
        <div className="section-title mb-35 wow fadeInUp delay-0-2s">
          <span className="sub-title mb-15">About Company</span>
          <h2>World Class Luxury Hotel & Restaurant Near City</h2>
          <p>
            We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment
          </p>
        </div>
        <div className="feature-list wow fadeInUp delay-0-3s">
          <div className="feature-item">
            <div className="icon">
              <i className="flaticon-check-mark"></i>
            </div>
            <div className="content">
              <h5>Trusted Partners</h5>
              <p>Sed ut perspiciatis omniste natus voluptatem accus</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="icon">
              <i className="flaticon-check-mark"></i>
            </div>
            <div className="content">
              <h5>Luxury Services</h5>
              <p>Quis autem voluptate velise molestiae conse rem</p>
            </div>
          </div>
        </div>
        <div className="about-author wow fadeInUp delay-0-4s">
          <div className="author">
            <img src="theme/assets/images/about/about-author.jpg" alt="Author" />
          </div>
          <div className="description">
            <h5>Robert L. Robinson</h5>
            <span>CEO & Founder</span>
          </div>
          <div className="signature">
            <img src="theme/assets/images/about/signature.png" alt="Signature" />
          </div>
        </div>
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
{/* About Area end */}
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
            <Link className="theme-btn mb-40 wow fadeInRight delay-0-2s" to="room-grid">
              Explore Rooms <i className="fal fa-angle-right"></i>
            </Link>
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
                    <Link className="category" to="room-grid">{room.type}</Link>
                  </div>
                  <div className="content">
                    <h4>
                      <a href={`room-details.js?id=${room._id}`}>{room.type} Room</a>
                    </h4>
                    <ul className="blog-meta">
                      <li>
                        <i className="far fa-bed-alt"></i>
                        <a>{room.status}</a>
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
<div className="for-bg-and-shapes rel z-1">
{/* Counter Section Start */}
<div className="counter-area pb-110 rpb-80 rel z-1">
  <div className="container">
    <div className="row gap-70">
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <div className="counter-item counter-text-wrap wow fadeInUp delay-0-2s">
          <span className="count-text" data-speed="3000" data-stop="49">0</span>
          <span className="counter-title">Projects complete</span>
        </div>
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <div className="counter-item counter-text-wrap wow fadeInUp delay-0-3s">
          <span className="count-text" data-speed="3000" data-stop="305">0</span>
          <span className="counter-title">Luxury Rooms</span>
        </div>
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <div className="counter-item counter-text-wrap wow fadeInUp delay-0-4s">
          <span className="count-text" data-speed="3000" data-stop="68">0</span>
          <span className="counter-title">Beaches</span>
        </div>
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <div className="counter-item counter-text-wrap wow fadeInUp delay-0-5s">
          <span className="count-text" data-speed="3000" data-stop="654">0</span>
          <span className="counter-title">Regular Guests</span>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Counter Section End */}

{/* Features Section Start */}
<section className="features-area pb-65 rpb-35 rel z-1">
  <div className="container">
    <div className="row text-white">
      <div className="col-xl-4 col-md-6">
        <div className="feature-item style-two wow fadeInUp delay-0-2s">
          <div className="icon">
            <i className="flaticon-stationary-bike"></i>
          </div>
          <div className="content">
            <h4><a>Fitness Center</a></h4>
            <p>At vero eos accusamus eustonis simos duc blanditiis praesente tatum</p>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="feature-item style-two wow fadeInUp delay-0-4s">
          <div className="icon">
            <i className="flaticon-jacuzzi"></i>
          </div>
          <div className="content">
            <h4><a>Jacuzzi</a></h4>
            <p>Libero tempore cum soluta to eligende optio cumque impedit quo minus</p>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="feature-item style-two wow fadeInUp delay-0-6s">
          <div className="icon">
            <i className="flaticon-swim"></i>
          </div>
          <div className="content">
            <h4><a>Swimming Pool</a></h4>
            <p>Blinded by desirec that cannot foresies the pain and trouble bounde</p>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="feature-item style-two wow fadeInUp delay-0-2s">
          <div className="icon">
            <i className="flaticon-relax"></i>
          </div>
          <div className="content">
            <h4><a>SPA Treatments</a></h4>
            <p>At vero eos accusamus eustonis simos duc blanditiis praesente tatum</p>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="feature-item style-two wow fadeInUp delay-0-4s">
          <div className="icon">
            <i className="flaticon-restaurant"></i>
          </div>
          <div className="content">
            <h4><a>Food & Restaurants</a></h4>
            <p>At vero eos accusamus eustonis simos duc blanditiis praesente tatum</p>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="feature-item style-two wow fadeInUp delay-0-6s">
          <div className="icon">
            <i className="flaticon-restaurant"></i>
          </div>
          <div className="content">
            <h4><a>Transportation</a></h4>
            <p>At vero eos accusamus eustonis simos duc blanditiis praesente tatum</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Features Section End */}

<div className="bg-color-and-shapes bgc-black">
  <div className="bg-lines">
    <span></span><span></span>
    <span></span><span></span>
    <span></span><span></span>
    <span></span><span></span>
    <span></span><span></span>
  </div>
  <div className="wave-shapes"></div>
  <div className="wave-shapes-two"></div>
</div>
</div>
  {/* Hotel Area start */}
  {/* <section className="hotel-area py-130 rpy-100 rel z-1">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-xl-6 col-lg-8 col-md-10">
        <div className="section-title text-center mb-60 rmb-40 wow fadeInUp delay-0-2s">
          <h2>Explore Luxury Hotel & Suites Are People Choosing</h2>
        </div>
      </div>
    </div>
    <div className="hotel-carousel-active">
      <div className="hotel-item wow fadeInUp delay-0-2s">
        <div className="content">
          <div className="top">
            <h3>
              <a href="room-details.js">Superior Room</a>
            </h3>
            <p>Vero accusamus eustonis simose duc blanditiis praesente tatum</p>
          </div>
          <div className="bottom">
            <div className="price">
              From <span>$185</span>/per night
            </div>
            <a className="theme-btn style-two" href="room-details.js">
              Details <i className="fal fa-angle-right"></i>
            </a>
          </div>
        </div>
        <div className="image">
          <img src="theme/assets/images/hotel/hotel1.jpg" alt="Hotel" />
        </div>
      </div>
      <div className="hotel-item wow fadeInUp delay-0-4s">
        <div className="content">
          <div className="top">
            <h3>
              <a href="room-details.js">Deluxe Suite</a>
            </h3>
            <p>Eos accusamus eustonis simose duc blanditiis praesente tatum</p>
          </div>
          <div className="bottom">
            <div className="price">
              From <span>$173</span>/per night
            </div>
            <a className="theme-btn style-two" href="room-details.js">
              Details <i className="fal fa-angle-right"></i>
            </a>
          </div>
        </div>
        <div className="image">
          <img src="theme/assets/images/hotel/hotel2.jpg" alt="Hotel" />
        </div>
      </div>
      <div className="hotel-item wow fadeInUp delay-0-2s">
        <div className="content">
          <div className="top">
            <h3>
              <a href="room-details.js">Superior Room</a>
            </h3>
            <p>Vero accusamus eustonis simose duc blanditiis praesente tatum</p>
          </div>
          <div className="bottom">
            <div className="price">
              From <span>$185</span>/per night
            </div>
            <a className="theme-btn style-two" href="room-details.js">
              Details <i className="fal fa-angle-right"></i>
            </a>
          </div>
        </div>
        <div className="image">
          <img src="theme/assets/images/hotel/hotel1.jpg" alt="Hotel" />
        </div>
      </div>
      <div className="hotel-item wow fadeInUp delay-0-2s">
        <div className="content">
          <div className="top">
            <h3>
              <a href="room-details.js">Deluxe Suite</a>
            </h3>
            <p>Eos accusamus eustonis simose duc blanditiis praesente tatum</p>
          </div>
          <div className="bottom">
            <div className="price">
              From <span>$173</span>/per night
            </div>
            <a className="theme-btn style-two" href="room-details.js">
              Details <i className="fal fa-angle-right"></i>
            </a>
          </div>
        </div>
        <div className="image">
          <img src="theme/assets/images/hotel/hotel2.jpg" alt="Hotel" />
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
</section> */}
{/* Hotel Area end */}
{/* Video Area start */}
<div className="video-area">
  <div className="container-fluid gap-wide">
    <div className="video-part wow fadeInUp delay-0-2s">
      <img src="theme/assets/images/background/video-bg.jpg" alt="Video" />
      <a
        href="https://www.youtube.com/watch?v=9Y7ma241N8k"
        className="mfp-iframe video-play"
        tabIndex="-1"
      >
        <i className="fas fa-play"></i>
      </a>
    </div>
  </div>
</div>
{/* Video Area end */}
       {/* Food Drink Area start */}
       <section className="food-drink-area pt-130 rpt-100 pb-160 rpb-130">
         <div className="container">
           <div className="row align-items-center">
             <div className="col-lg-5">
               <div className="food-drink-content rmb-55">
                 <div className="section-title mb-40 wow fadeInUp delay-0-2s">
                   <span className="sub-title mb-15">Food & Drink</span>
                   <h2>Quality Food & Drink Your Trip Are Enjoyable</h2>
                   <p>
                     Sed ut perspiciatis unde omniste natus voluptatem accusantiume doloremque laudantium, totam rem aperiam inventore
                   </p>
                 </div>
                 <div className="feature-list">
                   <div className="feature-item wow fadeInUp delay-0-2s">
                     <div className="icon">
                       <i className="flaticon-check-mark"></i>
                     </div>
                     <div className="content">
                       <h5>Free breakfast, tea & coffee</h5>
                       <p>To take a trivial example, which undertakes laborious ways</p>
                     </div>
                   </div>
                   <div className="feature-item wow fadeInUp delay-0-3s">
                     <div className="icon">
                       <i className="flaticon-check-mark"></i>
                     </div>
                     <div className="content">
                       <h5>Quality Foods & kitchen</h5>
                       <p>Sed ut perspiciatis omniste natus voluptatem accusan</p>
                     </div>
                   </div>
                 </div>
                 <a href="about.js" className="theme-btn style-two mt-25 wow fadeInUp delay-0-4s">
                   Learn More Hotel <i className="far fa-angle-right"></i>
                 </a>
               </div>
             </div>
             <div className="col-lg-7">
               <div className="food-drink-image rel wow fadeInUp delay-0-4s">
                 <img src="theme/assets/images/food/food-restaurent.jpg" alt="Food Restaurent" />
                 <div className="popular-clients">
                   <span>Popular Client</span>
                   <img src="theme/assets/images/food/popular-client1.jpg" alt="Client" />
                   <img src="theme/assets/images/food/popular-client2.jpg" alt="Client" />
                   <img src="theme/assets/images/food/popular-client3.jpg" alt="Client" />
                   <img src="theme/assets/images/food/popular-client4.jpg" alt="Client" />
                   <img src="theme/assets/images/food/popular-client5.jpg" alt="Client" />
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
       {/* Food Drink Area end */}
       {/* Testimonials Area start */}
       <section className="testimonials-area py-130 rpy-100 rel z-1 bg-color-and-shapes bgc-black">
         <div className="container">
           <div className="row align-items-center">
             <div className="col-lg-5 wow fadeInLeft delay-0-2s">
               <div className="booking-search rmb-55 rel bg-white">
                 <div className="section-title">
                   <span className="sub-title mb-5">Food & Drink</span>
                   <h3>Find & Booked Your Seats</h3>
                 </div>
                 <form action="index.js#" name="booking-form" method="post">
                   <div className="form-group">
                     <input
                       type="text"
                       id="check-in"
                       name="check-in"
                       className="form-control"
                       value=""
                       placeholder="Check In"
                       onFocus={(e) => (e.target.type = 'date')}
                       required
                     />
                   </div>
                   <div className="form-group">
                     <input
                       type="text"
                       id="check-out"
                       name="check-out"
                       className="form-control"
                       value=""
                       placeholder="Check Out"
                       onFocus={(e) => (e.target.type = 'date')}
                       required
                     />
                   </div>
                   <div className="form-group clearfix">
                     <select name="adults" id="adults">
                       <option value="default" selected>
                         Adults
                       </option>
                       <option value="01">01</option>
                       <option value="02">02</option>
                       <option value="03">03</option>
                       <option value="04">04</option>
                       <option value="05">05</option>
                     </select>
                   </div>
                   <div className="form-group clearfix">
                     <select name="children" id="children">
                       <option value="default" selected>
                         Children
                       </option>
                       <option value="01">01</option>
                       <option value="02">02</option>
                       <option value="03">03</option>
                       <option value="04">04</option>
                       <option value="05">05</option>
                     </select>
                   </div>
                   <div className="form-group pt-30 mb-0">
                     <button type="submit" className="theme-btn">
                       Search Now <i className="far fa-angle-right"></i>
                     </button>
                   </div>
                 </form>
               </div>
             </div>
             <div className="col-lg-7">
               <div className="testimonial-right text-white wow fadeInRight delay-0-2s">
                 <div className="section-title mb-65 rmb-45">
                   <span className="sub-title mb-15">Our Testimonials</span>
                   <h2>What Our Customer Say Us</h2>
                 </div>
                 <div className="testimonial-part">
                   <div className="testimonial-active">
                     <div className="testimonial-item">
                       <p>
                         At vero eos et accusamus et iusto odio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores qua molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa qui officia deserunte
                       </p>
                       <div className="testi-author">
                         <img src="theme/assets/images/testimonials/testi-thumb1.jpg" alt="Testi Thumb" />
                         <div className="testi-des">
                           <h5>Diane C. Valentine</h5>
                           <span>CEO & Founder</span>
                         </div>
                       </div>
                     </div>
                     <div className="testimonial-item">
                       <p>
                         Corrupti quos dolores qua molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa qui officia deserunte At vero eos et accusamus et iusto odio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque
                       </p>
                       <div className="testi-author">
                         <img src="theme/assets/images/testimonials/testi-thumb2.jpg" alt="Testi Thumb" />
                         <div className="testi-des">
                           <h5>Michael A. Braun</h5>
                           <span>UI/UX Designer</span>
                         </div>
                       </div>
                     </div>
                     <div className="testimonial-item">
                       <p>
                         Voluptatum deleniti atque corrupti quos dolores qua molestias excepturi sint occaecati At vero eos et accusamus et iusto odio dignissimos ducimus blanditiis praesentium cupiditate non provident similique sunt in culpa qui officia deserunte
                       </p>
                       <div className="testi-author">
                         <img src="theme/assets/images/testimonials/testi-thumb3.jpg" alt="Testi Thumb" />
                         <div className="testi-des">
                           <h5>James V. Decastro</h5>
                           <span>Senior Marketer</span>
                         </div>
                       </div>
                     </div>
                     <div className="testimonial-item">
                       <p>
                         Similique sunt in culpa qui officia deserunte At vero eos et accusamus et iusto odio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores qua molestias excepturi sint occaecati cupiditate non provident
                       </p>
                       <div className="testi-author">
                         <img src="theme/assets/images/testimonials/testi-thumb4.jpg" alt="Testi Thumb" />
                         <div className="testi-des">
                           <h5>Michael A. Braun</h5>
                           <span>Apps Designer</span>
                         </div>
                       </div>
                     </div>
                     <div className="testimonial-item">
                       <p>
                         At vero eos et accusamus et iusto odio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores qua molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa qui officia deserunte
                       </p>
                       <div className="testi-author">
                         <img src="theme/assets/images/testimonials/testi-thumb3.jpg" alt="Testi Thumb" />
                         <div className="testi-des">
                           <h5>Diane C. Valentine</h5>
                           <span>CEO & Founder</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="testimonial-thums">
                     <div className="testi-thumb-item">
                       <img src="theme/assets/images/testimonials/testi-thumb1.jpg" alt="Testi Thumb" />
                     </div>
                     <div className="testi-thumb-item">
                       <img src="theme/assets/images/testimonials/testi-thumb2.jpg" alt="Testi Thumb" />
                     </div>
                     <div className="testi-thumb-item">
                       <img src="theme/assets/images/testimonials/testi-thumb3.jpg" alt="Testi Thumb" />
                     </div>
                     <div className="testi-thumb-item">
                       <img src="theme/assets/images/testimonials/testi-thumb4.jpg" alt="Testi Thumb" />
                     </div>
                     <div className="testi-thumb-item">
                       <img src="theme/assets/images/testimonials/testi-thumb3.jpg" alt="Testi Thumb" />
                     </div>
                   </div>
                 </div>
                 <div className="testimonial-dots"></div>
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
       </section>
          {/* Testimonials Area end */}
           {/* Blog Area start */}
           <section className="blog-area pt-130 rpt-100 pb-100 rpb-70 rel z-1">
               <div className="container">
                   <div className="row justify-content-center">
                       <div className="col-xl-6 col-lg-8 col-md-10">
                           <div className="section-title text-center mb-70 rmb-50 wow fadeInUp delay-0-2s">
                               <h2>Stay With Us & Get More Updates Latest News & Blog</h2>
                           </div>
                       </div>
                   </div>
                   <div className="row justify-content-center">
                       <div className="col-xl-4 col-md-6">
                           <div className="blog-grid-item wow fadeInUp delay-0-2s">
                               <div className="image">
                                   <img src="theme/assets/images/blog/blog1.jpg" alt="Blog" />
                               </div>
                               <div className="blog-content">
                                   <h4>
                                       <a href="blog-details.js">Knowing Business & Priorities</a>
                                   </h4>
                                   <ul className="blog-meta">
                                       <li>
                                           <i className="far fa-user"></i>
                                           <a href="index.js#">Diann W. Gaddis</a>
                                       </li>
                                       <li>
                                           <i className="far fa-calendar-alt"></i>
                                           <a href="index.js#">25 June 2023</a>
                                       </li>
                                   </ul>
                                   <p>
                                       Perspiciatis omniste voluptate accusantiume doloremque laudantium, totam aperiam
                                   </p>
                                   <a className="read-more" href="blog-details.js">
                                       Read More <i className="fal fa-angle-right"></i>
                                   </a>
                               </div>
                           </div>
                       </div>
                       <div className="col-xl-4 col-md-6">
                           <div className="blog-grid-item wow fadeInUp delay-0-3s">
                               <div className="image">
                                   <img src="theme/assets/images/blog/blog2.jpg" alt="Blog" />
                               </div>
                               <div className="blog-content">
                                   <h4>
                                       <a href="blog-details.js">Be Considered in Decisions</a>
                                   </h4>
                                   <ul className="blog-meta">
                                       <li>
                                           <i className="far fa-user"></i>
                                           <a href="index.js#">Diann W. Gaddis</a>
                                       </li>
                                       <li>
                                           <i className="far fa-calendar-alt"></i>
                                           <a href="index.js#">25 June 2023</a>
                                       </li>
                                   </ul>
                                   <p>
                                       Perspiciatis omniste voluptate accusantiume doloremque laudantium, totam aperiam
                                   </p>
                                   <a className="read-more" href="blog-details.js">
                                       Read More <i className="fal fa-angle-right"></i>
                                   </a>
                               </div>
                           </div>
                       </div>
                       <div className="col-xl-4 col-md-6">
                           <div className="blog-grid-item wow fadeInUp delay-0-4s">
                               <div className="image">
                                   <img src="theme/assets/images/blog/blog3.jpg" alt="Blog" />
                               </div>
                               <div className="blog-content">
                                   <h4>
                                       <a href="blog-details.js">Making Business Ideas Planned</a>
                                   </h4>
                                   <ul className="blog-meta">
                                       <li>
                                           <i className="far fa-user"></i>
                                           <a href="index.js#">Diann W. Gaddis</a>
                                       </li>
                                       <li>
                                           <i className="far fa-calendar-alt"></i>
                                           <a href="index.js#">25 June 2023</a>
                                       </li>
                                   </ul>
                                   <p>
                                       Perspiciatis omniste voluptate accusantiume doloremque laudantium, totam aperiam
                                   </p>
                                   <a className="read-more" href="blog-details.js">
                                       Read More <i className="fal fa-angle-right"></i>
                                   </a>
                               </div>
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
           {/* Blog Area end */}
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
                       <div className="icon"><i className="fab fa-instagram"></i></div>
                       <h2><a href="https://www.instagram.com">Follow Our Instagram</a></h2>
                       <hr />
                       <div className="call-text">Make A Call</div>
                       <a className="h2" href="callto:+000(123)45688">+000 (123) 456 88</a>
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
       </div>
      </>
    );
  }
  
  
export default Index;

