import React from 'react';
import Header from '../Header';
import Footer from '../footer';

function services() {
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
            <h1 className="page-title wow fadeInUp delay-0-2s">Service</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                <li className="breadcrumb-item">
                  <a href="index.js">home</a>
                </li>
                <li className="breadcrumb-item active">Service</li>
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

      {/* What We Do Area start */}
      <section className="what-we-do-area pt-130 rpt-95 rel">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-5 col-lg-6">
              <div className="what-we-do-content rmb-55 wow fadeInLeft delay-0-2s">
                <div className="section-title mb-30">
                  <span className="sub-title mb-15">What We Do</span>
                  <h2>Quality Hotel & Suites Services Providing by Professionals</h2>
                  <p>
                    Sed ut perspiciatis unde omniste natus voluptatem accusantiume doloremque laudantium, totam rem aperiam inventore
                  </p>
                </div>
                <a href="room-grid.js" className="theme-btn">
                  Explore Our Rooms <i className="far fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="what-we-do-images wow fadeInRight delay-0-2s">
                <div className="row gap-50">
                  <div className="col-6">
                    <div className="image">
                      <img src="theme/assets/images/about/what-we-do1.jpg" alt="What We Do" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="image mt-40">
                      <img src="theme/assets/images/about/what-we-do2.jpg" alt="What We Do" />
                    </div>
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
      {/* What We Do Area end */}

      {/* Services Area start */}
      <section className="services-area-three pt-130 rpt-100 pb-100 rpb-70 rel z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-7 col-md-9">
              <div className="section-title text-center mb-50 rmb-40 wow fadeInUp delay-0-2s">
                <h2>We Provide Amazing Service to Enjoy Your Days</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="service-item-two wow fadeInUp delay-0-2s">
                <span className="number">01</span>
                <h4>
                  <a href="room-details.js">Fitness Center</a>
                </h4>
                <p>At vero eos accusamus simos blande praesente tatum</p>
                <div className="icon">
                  <i className="flaticon-stationary-bike"></i>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="service-item-two wow fadeInUp delay-0-3s">
                <span className="number">02</span>
                <h4>
                  <a href="room-details.js">Jacuzzi</a>
                </h4>
                <p>Libero tempore cum soluta to eligende optio cumque</p>
                <div className="icon">
                  <i className="flaticon-jacuzzi"></i>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="service-item-two wow fadeInUp delay-0-4s">
                <span className="number">03</span>
                <h4>
                  <a href="room-details.js">Swimming Pool</a>
                </h4>
                <p>Blinded by desirec that cannot foresies trouble bounde</p>
                <div className="icon">
                  <i className="flaticon-swim"></i>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="service-item-two wow fadeInUp delay-0-5s">
                <span className="number">04</span>
                <h4>
                  <a href="room-details.js">SPA Treatments</a>
                </h4>
                <p>At vero eos accusamus simos blande praesente tatum</p>
                <div className="icon">
                  <i className="flaticon-relax"></i>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="service-item-two wow fadeInUp delay-0-2s">
                <span className="number">05</span>
                <h4>
                  <a href="room-details.js">Restaurants</a>
                </h4>
                <p>Nam libero tempores eligende optio cumque impedit quo</p>
                <div className="icon">
                  <i className="flaticon-restaurant"></i>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="service-item-two wow fadeInUp delay-0-3s">
                <span className="number">06</span>
                <h4>
                  <a href="room-details.js">Transportation</a>
                </h4>
                <p>Libero tempore cum soluta to eligende optio cumque</p>
                <div className="icon">
                  <i className="flaticon-restaurant"></i>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="service-item-two wow fadeInUp delay-0-4s">
                <span className="number">07</span>
                <h4>
                  <a href="room-details.js">Lounge bar</a>
                </h4>
                <p>Blinded by desirec that cannot foresies trouble bounde</p>
                <div className="icon">
                  <i className="flaticon-champagne"></i>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="service-item-two wow fadeInUp delay-0-5s">
                <span className="number">08</span>
                <h4>
                  <a href="room-details.js">Laundry Services</a>
                </h4>
                <p>At vero eos accusamus simos blande praesente tatum</p>
                <div className="icon">
                  <i className="flaticon-laundry-machine"></i>
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
      {/* Services Area end */}

      {/* Pricing Area start */}
      <section
        className="pricing-area pt-130 rpt-100 pb-100 rpb-70 rel z-1 bgc-black"
        style={{ backgroundImage: "url(theme/assets/images/background/pricing-bg.png)" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="section-title text-center text-white mb-60 rmb-40 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-10">Pricing Package</span>
                <h2>Corporate Pricing Package For Luxury Hotel & Suites</h2>
              </div>
            </div>
          </div>
          <div className="row gap-90 justify-content-center">
            <div className="col-xl-4 col-md-6 wow fadeInUp delay-0-2s">
              <div
                className="pricing-item"
                style={{ backgroundImage: "url(theme/assets/images/background/price-item-bg.png)" }}
              >
                <h4 className="title">Basic Plan</h4>
                <span className="price">$19.56</span>
                <span className="per-text">per month</span>
                <hr />
                <ul>
                  <li>Transportations</li>
                  <li>SPA Treatment</li>
                  <li className="unable">Food & Drinks</li>
                  <li className="unable">GYM & Yoga</li>
                  <li className="unable">Hotel Guide</li>
                </ul>
                <a href="contact.js" className="theme-btn">
                  Choose Package <i className="far fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 wow fadeInUp delay-0-4s">
              <div
                className="pricing-item"
                style={{ backgroundImage: "url(theme/assets/images/background/price-item-bg.png)" }}
              >
                <h4 className="title">Standard Plan</h4>
                <span className="price">$49.56</span>
                <span className="per-text">per month</span>
                <hr />
                <ul>
                  <li>Transportations</li>
                  <li>SPA Treatment</li>
                  <li>Food & Drinks</li>
                  <li>GYM & Yoga</li>
                  <li className="unable">Hotel Guide</li>
                </ul>
                <a href="contact.js" className="theme-btn">
                  Choose Package <i className="far fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 wow fadeInUp delay-0-6s">
              <div
                className="pricing-item"
                style={{ backgroundImage: "url(theme/assets/images/background/price-item-bg.png)" }}
              >
                <h4 className="title">Silver Plan</h4>
                <span className="price">$98.56</span>
                <span className="per-text">per month</span>
                <hr />
                <ul>
                  <li>Transportations</li>
                  <li>SPA Treatment</li>
                  <li>Food & Drinks</li>
                  <li>GYM & Yoga</li>
                  <li>Hotel Guide</li>
                </ul>
                <a href="contact.js" className="theme-btn">
                  Choose Package <i className="far fa-angle-right"></i>
                </a>
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
      </section>
      {/* Pricing Area end */}

      {/* Hotel Area start */}
      <section className="hotel-area py-130 rpy-100 rel z-1">
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
                  <div className="price">From <span>$185</span>/per night</div>
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
                  <div className="price">From <span>$173</span>/per night</div>
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
                  <div className="price">From <span>$185</span>/per night</div>
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
                  <div className="price">From <span>$173</span>/per night</div>
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
      </section>
      {/* Hotel Area end */}

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

export default services;
