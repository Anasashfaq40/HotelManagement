// import React    from 'react';
// import Header from '../Header';
// import Footer from '../footer';

// function IndexThree() {
//     return (
//       <>
//           <div className="page-wrapper">

// <Header/>
//         {/* Hero Section Start */}
//       <section
//         className="hero-area py-80 rel z-1 bgs-cover"
//         style={{ backgroundImage: "url(theme/assets/images/hero/hero-bg.jpg)" }}
//       >
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <div className="hero-content text-white rmb-55 wow fadeInLeft delay-0-2s">
//                 <a
//                   href="https://www.youtube.com/watch?v=9Y7ma241N8k"
//                   className="mfp-iframe style-two video-play"
//                 >
//                   <i className="fas fa-play"></i>
//                 </a>
//                 <h1>
//                   Enjoy Vacations With <i>Luxury Hotel</i>
//                 </h1>
//                 <p>
//                   We’re Awards Winning Hotel Agency &amp; we’ve 25+ Years Of Experience
//                 </p>
//                 <a href="room-grid.js" className="theme-btn mt-30">
//                   Explore Our Rooms <i className="far fa-angle-right"></i>
//                 </a>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="booking-search rel bg-white wow fadeInRight delay-0-2s">
//                 <div className="section-title">
//                   <span className="sub-title mb-5">Food &amp; Drink</span>
//                   <h3>Find &amp; Booked Your Seats</h3>
//                 </div>
//                 <form action="index3.js#" name="booking-form" method="post">
//                   <div className="form-group">
//                     <input
//                       type="text"
//                       id="check-in"
//                       name="check-in"
//                       className="form-control"
//                       value=""
//                       placeholder="Check In"
//                       onFocus={(e) => {
//                         e.target.type = "date";
//                       }}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <input
//                       type="text"
//                       id="check-out"
//                       name="check-out"
//                       className="form-control"
//                       value=""
//                       placeholder="Check Out"
//                       onFocus={(e) => {
//                         e.target.type = "date";
//                       }}
//                       required
//                     />
//                   </div>
//                   <div className="form-group clearfix">
//                     <select name="adults" id="adults" defaultValue="default">
//                       <option value="default">Adults</option>
//                       <option value="01">01</option>
//                       <option value="02">02</option>
//                       <option value="03">03</option>
//                       <option value="04">04</option>
//                       <option value="05">05</option>
//                     </select>
//                   </div>
//                   <div className="form-group clearfix">
//                     <select name="children" id="children" defaultValue="default">
//                       <option value="default">Children</option>
//                       <option value="01">01</option>
//                       <option value="02">02</option>
//                       <option value="03">03</option>
//                       <option value="04">04</option>
//                       <option value="05">05</option>
//                     </select>
//                   </div>
//                   <div className="form-group pt-30 mb-0">
//                     <button type="submit" className="theme-btn">
//                       Search Now <i className="far fa-angle-right"></i>
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-lines">
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </section>
//       {/* Hero Section End */}
//        {/* Activity Area start */}
//        <section className="activity-area pt-130 rpt-100 pb-100 rpb-70 rel z-1">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-xl-6 col-lg-8 col-md-10">
//               <div className="section-title text-center mb-70 rmb-50 wow fadeInUp delay-0-2s">
//                 <span className="sub-title mb-15">Our Activity</span>
//                 <h2>Quality Services & Food Your Trip Are Enjoyable</h2>
//               </div>
//             </div>
//           </div>
//           <div className="row gap-100 align-items-center justify-content-center">
//             <div className="col-xl-4 col-md-6">
//               <div className="activity-item wow fadeInUp delay-0-2s">
//                 <div className="image">
//                   <img src="theme/assets/images/activity/activity1.jpg" alt="Activity" />
//                 </div>
//                 <div className="content">
//                   <div className="icon">
//                     <i className="flaticon-mop"></i>
//                   </div>
//                   <h5>
//                     <a href="room-details.js">Room Cleaning and Guide</a>
//                   </h5>
//                   <a className="theme-btn" href="room-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div className="activity-item wow fadeInUp delay-0-4s">
//                 <div className="image">
//                   <img src="theme/assets/images/activity/activity2.jpg" alt="Activity" />
//                 </div>
//                 <div className="content">
//                   <div className="icon">
//                     <i className="flaticon-food-delivery"></i>
//                   </div>
//                   <h5>
//                     <a href="room-details.js">Quality Foods &amp; kitchen</a>
//                   </h5>
//                   <a className="theme-btn" href="room-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div className="activity-item wow fadeInUp delay-0-6s">
//                 <div className="image">
//                   <img src="theme/assets/images/activity/activity3.jpg" alt="Activity" />
//                 </div>
//                 <div className="content">
//                   <div className="icon">
//                     <i className="flaticon-facial"></i>
//                   </div>
//                   <h5>
//                     <a href="room-details.js">SPA Treatments and GYM</a>
//                   </h5>
//                   <a className="theme-btn" href="room-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-lines for-bg-white">
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </section>
//       {/* Activity Area end */}
//        {/* About Area start */}
//        <section className="about-area-three pb-130 rpb-95 rel">
//         <div className="container">
//           <div className="row align-items-center justify-content-between">
//             <div className="col-xl-5 col-lg-6">
//               <div className="about-content-three rmb-55 wow fadeInLeft delay-0-2s">
//                 <div className="section-title mb-30">
//                   <span className="sub-title mb-15">About Company</span>
//                   <h2>World Class Luxury Hotel &amp; Restaurant Near City</h2>
//                   <p>
//                     We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment
//                   </p>
//                 </div>
//                 <a href="about.js" className="theme-btn">
//                   Learn More Us <i className="far fa-angle-right"></i>
//                 </a>
//               </div>
//             </div>
//             <div className="col-xl-5 col-lg-6">
//               <div className="about-three-right wow fadeInRight delay-0-2s">
//                 <div className="counter-item-two counter-text-wrap">
//                   <span className="count-text" data-speed="3000" data-stop="698">
//                     0
//                   </span>
//                   <div className="content">
//                     <h4>Regular Clients</h4>
//                     <p>
//                       To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain
//                     </p>
//                   </div>
//                 </div>
//                 <div className="counter-item-two counter-text-wrap">
//                   <span className="count-text" data-speed="3000" data-stop="785">
//                     0
//                   </span>
//                   <div className="content">
//                     <h4>Luxury Rooms</h4>
//                     <p>
//                       Nam libero tempore cum soluta nobis est eligeoptioy cumque nihil impedit quo minus quod maxime
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-lines for-bg-white">
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </section>
//       {/* About Area end */}
//         {/* Room Area start */}
//         <section className="room-area-three py-130 rpy-100 rel z-1 bgc-black">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-xl-6 col-lg-8 col-md-10">
//               <div className="section-title text-center text-white mb-60 rmb-40 wow fadeInUp delay-0-2s">
//                 <h2>Explore Our Luxury Trendy Rooms and Suites</h2>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container-fluid">
//           <div className="room-two-active">
//             <div className="room-two-item wow fadeInUp delay-0-2s">
//               <div className="image">
//                 <img src="theme/assets/images/rooms/room-two1.jpg" alt="Room" />
//               </div>
//               <div className="content">
//                 <h3>
//                   <a href="room-details.js">Modern Luxury Rooms</a>
//                 </h3>
//                 <ul className="blog-meta">
//                   <li>
//                     <i className="far fa-bed-alt"></i>
//                     <a href="index3.js#">Adults : 5</a>
//                   </li>
//                   <li>
//                     <i className="far fa-drafting-compass"></i>
//                     <a href="index3.js#">Size : 59ft</a>
//                   </li>
//                 </ul>
//                 <div className="price">
//                   <b>$59</b>/<br /><span>per night</span>
//                 </div>
//               </div>
//             </div>
//             <div className="room-two-item wow fadeInUp delay-0-4s">
//               <div className="image">
//                 <img src="theme/assets/images/rooms/room-two2.jpg" alt="Room" />
//               </div>
//               <div className="content">
//                 <h3>
//                   <a href="room-details.js">Luxury Couple Rooms</a>
//                 </h3>
//                 <ul className="blog-meta">
//                   <li>
//                     <i className="far fa-bed-alt"></i>
//                     <a href="index3.js#">Adults : 5</a>
//                   </li>
//                   <li>
//                     <i className="far fa-drafting-compass"></i>
//                     <a href="index3.js#">Size : 59ft</a>
//                   </li>
//                 </ul>
//                 <div className="price">
//                   <b>$83</b>/<br /><span>per night</span>
//                 </div>
//               </div>
//             </div>
//             <div className="room-two-item wow fadeInUp delay-0-6s">
//               <div className="image">
//                 <img src="theme/assets/images/rooms/room-two3.jpg" alt="Room" />
//               </div>
//               <div className="content">
//                 <h3>
//                   <a href="room-details.js">Classic Family Rooms</a>
//                 </h3>
//                 <ul className="blog-meta">
//                   <li>
//                     <i className="far fa-bed-alt"></i>
//                     <a href="index3.js#">Adults : 5</a>
//                   </li>
//                   <li>
//                     <i className="far fa-drafting-compass"></i>
//                     <a href="index3.js#">Size : 59ft</a>
//                   </li>
//                 </ul>
//                 <div className="price">
//                   <b>$159</b>/<br /><span>per night</span>
//                 </div>
//               </div>
//             </div>
//             <div className="room-two-item wow fadeInUp delay-0-2s">
//               <div className="image">
//                 <img src="theme/assets/images/rooms/room-two1.jpg" alt="Room" />
//               </div>
//               <div className="content">
//                 <h3>
//                   <a href="room-details.js">Modern Luxury Rooms</a>
//                 </h3>
//                 <ul className="blog-meta">
//                   <li>
//                     <i className="far fa-bed-alt"></i>
//                     <a href="index3.js#">Adults : 5</a>
//                   </li>
//                   <li>
//                     <i className="far fa-drafting-compass"></i>
//                     <a href="index3.js#">Size : 59ft</a>
//                   </li>
//                 </ul>
//                 <div className="price">
//                   <b>$59</b>/<br /><span>per night</span>
//                 </div>
//               </div>
//             </div>
//             <div className="room-two-item wow fadeInUp delay-0-4s">
//               <div className="image">
//                 <img src="theme/assets/images/rooms/room-two2.jpg" alt="Room" />
//               </div>
//               <div className="content">
//                 <h3>
//                   <a href="room-details.js">Luxury Couple Rooms</a>
//                 </h3>
//                 <ul className="blog-meta">
//                   <li>
//                     <i className="far fa-bed-alt"></i>
//                     <a href="index3.js#">Adults : 5</a>
//                   </li>
//                   <li>
//                     <i className="far fa-drafting-compass"></i>
//                     <a href="index3.js#">Size : 59ft</a>
//                   </li>
//                 </ul>
//                 <div className="price">
//                   <b>$83</b>/<br /><span>per night</span>
//                 </div>
//               </div>
//             </div>
//             <div className="room-two-item wow fadeInUp delay-0-6s">
//               <div className="image">
//                 <img src="theme/assets/images/rooms/room-two3.jpg" alt="Room" />
//               </div>
//               <div className="content">
//                 <h3>
//                   <a href="room-details.js">Classic Family Rooms</a>
//                 </h3>
//                 <ul className="blog-meta">
//                   <li>
//                     <i className="far fa-bed-alt"></i>
//                     <a href="index3.js#">Adults : 5</a>
//                   </li>
//                   <li>
//                     <i className="far fa-drafting-compass"></i>
//                     <a href="index3.js#">Size : 59ft</a>
//                   </li>
//                 </ul>
//                 <div className="price">
//                   <b>$159</b>/<br /><span>per night</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-lines">
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </section>
//       {/* Room Area end */}
//        {/* Services Area start */}
//        <section className="services-area pt-130 rpt-100 pb-90 rpb-60 rel z-2">
//         <div className="container">
//           <div className="row justify-content-between align-items-center">
//             <div className="col-xl-5 col-lg-7">
//               <div className="section-title mb-30 wow fadeInLeft delay-0-2s">
//                 <h2>We Provide Amazing Service to Enjoy Your Days</h2>
//               </div>
//             </div>
//             <div className="col-lg-4 text-lg-end">
//               <a
//                 className="theme-btn style-three mb-30 wow fadeInRight delay-0-2s"
//                 href="about.js"
//               >
//                 Explore More <i className="fal fa-angle-right"></i>
//               </a>
//             </div>
//           </div>
//           <div className="row no-gap">
//             <div className="col-xl-4 col-md-6">
//               <div className="service-item wow fadeInUp delay-0-2s">
//                 <div className="icon">
//                   <i className="flaticon-stationary-bike"></i>
//                 </div>
//                 <div className="content">
//                   <h4>
//                     <a href="room-details.js">Fitness Center</a>
//                   </h4>
//                   <p>
//                     Nam libero tempore, cum soluta nobis est eligende optio cumque nihil
//                     impedit quo minus quod
//                   </p>
//                   <a className="read-more" href="room-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div className="service-item wow fadeInUp delay-0-4s">
//                 <div className="icon">
//                   <i className="flaticon-restaurant"></i>
//                 </div>
//                 <div className="content">
//                   <h4>
//                     <a href="room-details.js">Food &amp; Restaurants</a>
//                   </h4>
//                   <p>
//                     Nam libero tempore, cum soluta nobis est eligende optio cumque nihil
//                     impedit quo minus quod
//                   </p>
//                   <a className="read-more" href="room-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div className="service-item wow fadeInUp delay-0-6s">
//                 <div className="icon">
//                   <i className="flaticon-swim"></i>
//                 </div>
//                 <div className="content">
//                   <h4>
//                     <a href="room-details.js">Swimming Pool</a>
//                   </h4>
//                   <p>
//                     Nam libero tempore, cum soluta nobis est eligende optio cumque nihil
//                     impedit quo minus quod
//                   </p>
//                   <a className="read-more" href="room-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div className="service-item wow fadeInUp delay-0-2s">
//                 <div className="icon">
//                   <i className="flaticon-transportation"></i>
//                 </div>
//                 <div className="content">
//                   <h4>
//                     <a href="room-details.js">Transportation</a>
//                   </h4>
//                   <p>
//                     Nam libero tempore, cum soluta nobis est eligende optio cumque nihil
//                     impedit quo minus quod
//                   </p>
//                   <a className="read-more" href="room-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div className="service-item wow fadeInUp delay-0-4s">
//                 <div className="icon">
//                   <i className="flaticon-relax"></i>
//                 </div>
//                 <div className="content">
//                   <h4>
//                     <a href="room-details.js">SPA Treatments</a>
//                   </h4>
//                   <p>
//                     Nam libero tempore, cum soluta nobis est eligende optio cumque nihil
//                     impedit quo minus quod
//                   </p>
//                   <a className="read-more" href="room-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div className="service-item wow fadeInUp delay-0-6s">
//                 <div className="icon">
//                   <i className="flaticon-jacuzzi"></i>
//                 </div>
//                 <div className="content">
//                   <h4>
//                     <a href="room-details.js">Jacuzzi</a>
//                   </h4>
//                   <p>
//                     Nam libero tempore, cum soluta nobis est eligende optio cumque nihil
//                     impedit quo minus quod
//                   </p>
//                   <a className="read-more" href="room-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-lines for-bg-white">
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </section>
//       {/* Services Area end */}

//       {/* Gallery Area start */}
//       <section className="gallery-area mb-130 rmb-100">
//         <div className="gallery-active">
//           <div className="gallery-item wow fadeInUp delay-0-2s">
//             <div className="image">
//               <img src="theme/assets/images/gallery/gallery1.jpg" alt="Gallery" />
//             </div>
//             <div className="over-content">
//               <a href="gallery.js" className="details-btn">
//                 <i className="far fa-arrow-right"></i>
//               </a>
//               <h2>
//                 Swimming
//                 <br /> Pool
//               </h2>
//             </div>
//           </div>
//           <div className="gallery-item wow fadeInUp delay-0-4s">
//             <div className="image">
//               <img src="theme/assets/images/gallery/gallery2.jpg" alt="Gallery" />
//             </div>
//             <div className="over-content">
//               <a href="gallery.js" className="details-btn">
//                 <i className="far fa-arrow-right"></i>
//               </a>
//               <h2>
//                 Swimming
//                 <br /> Pool
//               </h2>
//             </div>
//           </div>
//           <div className="gallery-item wow fadeInUp delay-0-6s">
//             <div className="image">
//               <img src="theme/assets/images/gallery/gallery3.jpg" alt="Gallery" />
//             </div>
//             <div className="over-content">
//               <a href="gallery.js" className="details-btn">
//                 <i className="far fa-arrow-right"></i>
//               </a>
//               <h2>
//                 Swimming
//                 <br /> Pool
//               </h2>
//             </div>
//           </div>
//           <div className="gallery-item wow fadeInUp delay-0-8s">
//             <div className="image">
//               <img src="theme/assets/images/gallery/gallery4.jpg" alt="Gallery" />
//             </div>
//             <div className="over-content">
//               <a href="gallery.js" className="details-btn">
//                 <i className="far fa-arrow-right"></i>
//               </a>
//               <h2>
//                 Swimming
//                 <br /> Pool
//               </h2>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Gallery Area end */}

//       {/* Pricing Area start */}
//       <section
//         className="pricing-area pt-130 rpt-100 pb-100 rpb-70 rel z-1 bgc-black"
//         style={{ backgroundImage: "url(theme/assets/images/background/pricing-bg.png)" }}
//       >
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-xl-6 col-lg-8 col-md-10">
//               <div className="section-title text-center text-white mb-60 rmb-40 wow fadeInUp delay-0-2s">
//                 <span className="sub-title mb-10">Pricing Package</span>
//                 <h2>Corporate Pricing Package For Luxury Hotel &amp; Suites</h2>
//               </div>
//             </div>
//           </div>
//           <div className="row gap-90 justify-content-center">
//             <div className="col-xl-4 col-md-6 wow fadeInUp delay-0-2s">
//               <div
//                 className="pricing-item"
//                 style={{
//                   backgroundImage:
//                     "url(theme/assets/images/background/price-item-bg.png)"
//                 }}
//               >
//                 <h4 className="title">Basic Plan</h4>
//                 <span className="price">$19.56</span>
//                 <span className="per-text">per month</span>
//                 <hr />
//                 <ul>
//                   <li>Transportations</li>
//                   <li>SPA Treatment</li>
//                   <li className="unable">Food &amp; Drinks</li>
//                   <li className="unable">GYM &amp; Yoga</li>
//                   <li className="unable">Hotel Guide</li>
//                 </ul>
//                 <a href="contact.js" className="theme-btn">
//                   Choose Package <i className="far fa-angle-right"></i>
//                 </a>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6 wow fadeInUp delay-0-4s">
//               <div
//                 className="pricing-item"
//                 style={{
//                   backgroundImage:
//                     "url(theme/assets/images/background/price-item-bg.png)"
//                 }}
//               >
//                 <h4 className="title">Standard Plan</h4>
//                 <span className="price">$49.56</span>
//                 <span className="per-text">per month</span>
//                 <hr />
//                 <ul>
//                   <li>Transportations</li>
//                   <li>SPA Treatment</li>
//                   <li>Food &amp; Drinks</li>
//                   <li>GYM &amp; Yoga</li>
//                   <li className="unable">Hotel Guide</li>
//                 </ul>
//                 <a href="contact.js" className="theme-btn">
//                   Choose Package <i className="far fa-angle-right"></i>
//                 </a>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6 wow fadeInUp delay-0-6s">
//               <div
//                 className="pricing-item"
//                 style={{
//                   backgroundImage:
//                     "url(theme/assets/images/background/price-item-bg.png)"
//                 }}
//               >
//                 <h4 className="title">Silver Plan</h4>
//                 <span className="price">$98.56</span>
//                 <span className="per-text">per month</span>
//                 <hr />
//                 <ul>
//                   <li>Transportations</li>
//                   <li>SPA Treatment</li>
//                   <li>Food &amp; Drinks</li>
//                   <li>GYM &amp; Yoga</li>
//                   <li>Hotel Guide</li>
//                 </ul>
//                 <a href="contact.js" className="theme-btn">
//                   Choose Package <i className="far fa-angle-right"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-lines">
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </section>
//       {/* Pricing Area end */}
//        {/* FAQ Area start */}
//        <section className="faq-area py-130 rpy-100 rel">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <div className="faq-image-part rmb-55 rel wow fadeInRight delay-0-2s">
//                 <img src="theme/assets/images/faq/faq-left.jpg" alt="FAQs" />
//                 <div className="faq-counter-part">
//                   <div className="row gap-20">
//                     <div className="col-6 col-small">
//                       <div className="counter-item counter-text-wrap wow fadeInUp delay-0-2s">
//                         <i className="flaticon-startup"></i>
//                         <span className="count-text" data-speed="3000" data-stop="49">
//                           0
//                         </span>
//                         <span className="counter-title">Luxury Hotels</span>
//                       </div>
//                     </div>
//                     <div className="col-6 col-small">
//                       <div className="counter-item counter-text-wrap wow fadeInUp delay-0-3s">
//                         <i className="flaticon-startup"></i>
//                         <span className="count-text" data-speed="3000" data-stop="68">
//                           0
//                         </span>
//                         <span className="counter-title">Popular Beaches</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-5 col-lg-6 mx-lg-auto">
//               <div className="faq-content-part wow fadeInLeft delay-0-2s">
//                 <div className="section-title mb-30">
//                   <span className="sub-title mb-15">FAQs</span>
//                   <h2>Learn Something About Our Services And More</h2>
//                 </div>
//                 <div className="accordion" id="faq-accordion">
//                   <div className="accordion-item">
//                     <h5 className="accordion-header">
//                       <button
//                         className="accordion-button collapsed"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#collapseOne"
//                       >
//                         01. What Services Do We Provides?
//                       </button>
//                     </h5>
//                     <div
//                       id="collapseOne"
//                       className="accordion-collapse collapse"
//                       data-bs-parent="#faq-accordion"
//                     >
//                       <div className="accordion-body">
//                         <p>
//                           To take a trivial example which undertakes laborious physical exercise
//                           except to obtain some advantage pleasure annoying consequences
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="accordion-item">
//                     <h5 className="accordion-header">
//                       <button
//                         className="accordion-button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#collapseTwo"
//                       >
//                         02. How Must Cost Our Rooms?
//                       </button>
//                     </h5>
//                     <div
//                       id="collapseTwo"
//                       className="accordion-collapse collapse show"
//                       data-bs-parent="#faq-accordion"
//                     >
//                       <div className="accordion-body">
//                         <p>
//                           We denounce with righteous indignation and dislike men beguiledey and demoralized by the charms of pleasure of the moment
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="accordion-item">
//                     <h5 className="accordion-header">
//                       <button
//                         className="accordion-button collapsed"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#collapseThree"
//                       >
//                         03. Experience Team Member?
//                       </button>
//                     </h5>
//                     <div
//                       id="collapseThree"
//                       className="accordion-collapse collapse"
//                       data-bs-parent="#faq-accordion"
//                     >
//                       <div className="accordion-body">
//                         <p>
//                           To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="accordion-item">
//                     <h5 className="accordion-header">
//                       <button
//                         className="accordion-button collapsed"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#collapseFour"
//                       >
//                         04. Are You Awards Winning Company?
//                       </button>
//                     </h5>
//                     <div
//                       id="collapseFour"
//                       className="accordion-collapse collapse"
//                       data-bs-parent="#faq-accordion"
//                     >
//                       <div className="accordion-body">
//                         <p>
//                           To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-lines for-bg-white">
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </section>
//       {/* FAQ Area end */}

//       {/* Testimonials Area start */}
//       <section className="testimonials-area-two py-130 rpy-100">
//         <div className="container">
//           <div className="row align-items-center justify-content-between">
//             <div className="col-xl-5 col-lg-6 wow fadeInLeft delay-0-2s">
//               <div className="testimonial-two-active rmb-55">
//                 <div className="testimonial-item-two">
//                   <div className="testi-author">
//                     <img src="theme/assets/images/testimonials/testi-thumb5.jpg" alt="Testi Thumb" />
//                     <div className="testi-des">
//                       <h5>Nicholas J. England</h5>
//                       <span>Junior Manager</span>
//                     </div>
//                   </div>
//                   <div className="testi-speech">
//                     At vero eoset accusamus ustodio dignissimos ducimus quiebla nditiis praesentium voluptatu deleniti atque corrupti quolores mole sintocc
//                   </div>
//                   <div className="ratting">
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                   </div>
//                 </div>
//                 <div className="testimonial-item-two">
//                   <div className="testi-author">
//                     <img src="theme/assets/images/testimonials/testi-thumb1.jpg" alt="Testi Thumb" />
//                     <div className="testi-des">
//                       <h5>Nicholas J. England</h5>
//                       <span>Junior Manager</span>
//                     </div>
//                   </div>
//                   <div className="testi-speech">
//                     At vero eoset accusamus ustodio dignissimos ducimus quiebla nditiis praesentium voluptatu deleniti atque corrupti quolores mole sintocc
//                   </div>
//                   <div className="ratting">
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="testimonial-two-right rel wow fadeInRight delay-0-2s">
//                 <img src="theme/assets/images/testimonials/testimonial-two.jpg" alt="Testimonials" />
//                 <div className="testimonial-two-dots"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-lines for-bg-white">
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </section>
//       {/* Testimonials Area end */}

//       {/* Blog Area start */}
//       <section className="blog-area pt-130 rpt-100 pb-100 rpb-70 rel z-1">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-xl-6 col-lg-8 col-md-10">
//               <div className="section-title text-center mb-70 rmb-50 wow fadeInUp delay-0-2s">
//                 <h2>Stay With Us &amp; Get More Updates Latest News &amp; Blog</h2>
//               </div>
//             </div>
//           </div>
//           <div className="row justify-content-center">
//             <div className="col-xl-4 col-md-6">
//               <div className="blog-grid-item wow fadeInUp delay-0-2s">
//                 <div className="image">
//                   <img src="theme/assets/images/blog/blog1.jpg" alt="Blog" />
//                   <ul className="blog-meta">
//                     <li>
//                       <i className="far fa-user"></i>
//                       <a href="index3.js#">Diann W. Gaddis</a>
//                     </li>
//                     <li>
//                       <i className="far fa-calendar-alt"></i>
//                       <a href="index3.js#">25 June 2023</a>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="blog-content">
//                   <h4>
//                     <a href="blog-details.js">Knowing Business &amp; Priorities</a>
//                   </h4>
//                   <p>
//                     Perspiciatis omniste voluptate accusantiume doloremque laudantium, totam aperiam
//                   </p>
//                   <a className="read-more" href="blog-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div className="blog-grid-item wow fadeInUp delay-0-3s">
//                 <div className="image">
//                   <img src="theme/assets/images/blog/blog2.jpg" alt="Blog" />
//                   <ul className="blog-meta">
//                     <li>
//                       <i className="far fa-user"></i>
//                       <a href="index3.js#">Diann W. Gaddis</a>
//                     </li>
//                     <li>
//                       <i className="far fa-calendar-alt"></i>
//                       <a href="index3.js#">25 June 2023</a>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="blog-content">
//                   <h4>
//                     <a href="blog-details.js">Considered Making Decisions</a>
//                   </h4>
//                   <p>
//                     Perspiciatis omniste voluptate accusantiume doloremque laudantium, totam aperiam
//                   </p>
//                   <a className="read-more" href="blog-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div className="blog-grid-item wow fadeInUp delay-0-4s">
//                 <div className="image">
//                   <img src="theme/assets/images/blog/blog3.jpg" alt="Blog" />
//                   <ul className="blog-meta">
//                     <li>
//                       <i className="far fa-user"></i>
//                       <a href="index3.js#">Diann W. Gaddis</a>
//                     </li>
//                     <li>
//                       <i className="far fa-calendar-alt"></i>
//                       <a href="index3.js#">25 June 2023</a>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="blog-content">
//                   <h4>
//                     <a href="blog-details.js">Making Business Ideas Planned</a>
//                   </h4>
//                   <p>
//                     Perspiciatis omniste voluptate accusantiume doloremque laudantium, totam aperiam
//                   </p>
//                   <a className="read-more" href="blog-details.js">
//                     Read More <i className="fal fa-angle-right"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-lines for-bg-white">
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </section>
//       {/* Blog Area end */}

//       {/* Instagram Area start */}
//       <section className="instagram-area">
//         <div className="instagram-item wow fadeInUp delay-0-2s">
//           <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram1.jpg">
//             <img src="theme/assets/images/instagrams/instagram1.jpg" alt="instagram" />
//           </a>
//         </div>
//         <div className="instagram-item wow fadeInUp delay-0-3s">
//           <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram2.jpg">
//             <img src="theme/assets/images/instagrams/instagram2.jpg" alt="instagram" />
//           </a>
//         </div>
//         <div className="instagram-item wow fadeInUp delay-0-4s">
//           <div className="content text-white">
//             <div className="icon">
//               <i className="fab fa-instagram"></i>
//             </div>
//             <h2>
//               <a href="https://www.instagram.com">Follow Our Instagram</a>
//             </h2>
//             <hr />
//             <div className="call-text">Make A Call</div>
//             <a className="h2" href="callto:+000(123)45688">
//               +000 (123) 456 88
//             </a>
//           </div>
//         </div>
//         <div className="instagram-item wow fadeInUp delay-0-5s">
//           <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram3.jpg">
//             <img src="theme/assets/images/instagrams/instagram3.jpg" alt="instagram" />
//           </a>
//         </div>
//         <div className="instagram-item wow fadeInUp delay-0-6s">
//           <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram4.jpg">
//             <img src="theme/assets/images/instagrams/instagram4.jpg" alt="instagram" />
//           </a>
//         </div>
//       </section>
//       {/* Instagram Area end */}
// <Footer/>

//       </div>


// </>
// );
// }
// export default IndexThree;