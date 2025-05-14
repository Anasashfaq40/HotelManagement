import React  from 'react';
import Header from '../Header';
import Footer from '../footer';


function About() {
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
            <h1 className="page-title wow fadeInUp delay-0-2s">About</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                <li className="breadcrumb-item">
                  <a href="index.js">home</a>
                </li>
                <li className="breadcrumb-item active">About</li>
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

      {/* About Page Area Start */}
      <section className="about-page-area py-130 rpy-100 rel z-2">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-5">
              <div className="about-page-content rmb-55 wow fadeInUp delay-0-2s">
                <div className="section-title mb-35">
                  <span className="sub-title mb-15">About Company</span>
                  <h2>We Help to Provide Quality Hotel Services &amp; Foods</h2>
                  <p>
                    Sed ut perspiciatis unde omniste natus voluptatem accusantiume
                    doloremque laudantium, totam rem aperiam inventore
                  </p>
                </div>
                <a className="theme-btn" href="room-grid.js">
                  Explore Our Rooms <i className="fal fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <div className="about-page-right bgc-lighter">
                <div className="feature-item style-two wow fadeInUp delay-0-2s">
                  <div className="icon">
                    <i className="flaticon-mission"></i>
                  </div>
                  <div className="content">
                    <h3>Company Mission</h3>
                    <p>
                      Quis autem vel eum iure reprehenderit quie voluptate velite esse
                      quam nihil molestiae consequatur eumey
                    </p>
                  </div>
                </div>
                <div className="feature-item style-two wow fadeInUp delay-0-4s">
                  <div className="icon">
                    <i className="flaticon-mission"></i>
                  </div>
                  <div className="content">
                    <h3>Hotel &amp; Suites</h3>
                    <p>
                      Quis autem vel eum iure reprehenderit quie voluptate velite esse
                      quam nihil molestiae consequatur eumey
                    </p>
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
      {/* About Page Area End */}

      {/* Who We Are Area Start */}
      <section className="who-we-are-area pb-130 rpy-100 rel z-1">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-6 col-lg-7">
              <div className="who-we-are-image rmb-55 wow fadeInUp delay-0-2s">
                <img src="theme/assets/images/about/who-we-are.jpg" alt="Who We Are" />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="who-we-are-content wow fadeInUp delay-0-4s">
                <div className="section-title mb-35">
                  <span className="sub-title mb-15">Who We Are</span>
                  <h2>Start Your Amazing Adventure!</h2>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus blanditiis
                    praesentium voluptatum deleniti atque corrupti quose dolores et quas
                    molestias cupiditate non similique
                  </p>
                </div>
                <a className="theme-btn style-two" href="about.js">
                  Get Started Us <i className="fal fa-angle-right"></i>
                </a>
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
      {/* Who We Are Area End */}

      {/* History Area Start */}
      <section className="history-area pt-130 rpt-100 pb-100 rpb-70 bgc-lighter rel z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-11">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-15">Company History</span>
                <h2>Learn Something Company Hisotry</h2>
              </div>
            </div>
          </div>
          <div className="history-slider-active">
            <div className="history-slide-item wow fadeInUp delay-0-2s">
              <div className="image">
                <img src="theme/assets/images/about/history1.jpg" alt="History" />
              </div>
              <div className="year">1993</div>
              <div className="content">
                <h5>When We Started</h5>
                <p>
                  Sit voluptatem accusantium doloremque laudantium totae aperiam eaque
                  inventore
                </p>
              </div>
            </div>
            <div className="history-slide-item wow fadeInUp delay-0-3s">
              <div className="image">
                <img src="theme/assets/images/about/history2.jpg" alt="History" />
              </div>
              <div className="year">1995</div>
              <div className="content">
                <h5>Join <span>100+</span> Employee</h5>
                <p>
                  Ut ad minima veniam quis nostrum exercitatione corporis suscipit laboriosam
                  aliquid
                </p>
              </div>
            </div>
            <div className="history-slide-item wow fadeInUp delay-0-4s">
              <div className="image">
                <img src="theme/assets/images/about/history3.jpg" alt="History" />
              </div>
              <div className="year">1998</div>
              <div className="content">
                <h5>Awards Winning</h5>
                <p>
                  Quis autem vel eurep ehende qui voluptate quam molestiaey consequatur dolorem
                  eum
                </p>
              </div>
            </div>
            <div className="history-slide-item wow fadeInUp delay-0-5s">
              <div className="image">
                <img src="theme/assets/images/about/history4.jpg" alt="History" />
              </div>
              <div className="year">2001</div>
              <div className="content">
                <h5>Best Dream Company</h5>
                <p>
                  Sit voluptatem accusantium doloremque laudantium totae aperiam eaque inventore
                </p>
              </div>
            </div>
            <div className="history-slide-item wow fadeInUp delay-0-6s">
              <div className="image">
                <img src="theme/assets/images/about/history2.jpg" alt="History" />
              </div>
              <div className="year">2005</div>
              <div className="content">
                <h5>Join <span>50+</span> Employee</h5>
                <p>
                  Ut ad minima veniam quis nostrum exercitatione corporis suscipit laboriosam
                  aliquid
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* History Area End */}

      {/* Team Area Start */}
      <section className="team-area pt-130 rpt-100 pb-70 rpb-40 rel z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-11">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-15">Meet Our Team</span>
                <h2>We Have Professional Team Member Let’s Talk Our Experience</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="team-member wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/team/member1.jpg" alt="Member" />
                  <div className="social-links">
                    <a href="about.js#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
                <div className="content">
                  <h4>Michael S. Stewart</h4>
                  <span className="designation">CEO &amp; Founder</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="team-member wow fadeInUp delay-0-3s">
                <div className="image">
                  <img src="theme/assets/images/team/member2.jpg" alt="Member" />
                  <div className="social-links">
                    <a href="about.js#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
                <div className="content">
                  <h4>Jackie D. McGahey</h4>
                  <span className="designation">Senior Manager</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="team-member wow fadeInUp delay-0-4s">
                <div className="image">
                  <img src="theme/assets/images/team/member3.jpg" alt="Member" />
                  <div className="social-links">
                    <a href="about.js#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
                <div className="content">
                  <h4>Richard A. Brooks</h4>
                  <span className="designation">Junior Manager</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="team-member wow fadeInUp delay-0-5s">
                <div className="image">
                  <img src="theme/assets/images/team/member4.jpg" alt="Member" />
                  <div className="social-links">
                    <a href="about.js#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="about.js#">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
                <div className="content">
                  <h4>Victoria K. Velasquez</h4>
                  <span className="designation">Business Consultant</span>
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
      {/* Team Area End */}

      {/* Counter Section Start */}
      <div className="counter-area rel z-1">
        <div className="container">
          <div className="bgc-lighter pt-15">
            <div className="row gap-70">
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="counter-item style-three counter-text-wrap wow fadeInUp delay-0-2s">
                  <span className="count-text" data-speed="3000" data-stop="49">
                    0
                  </span>
                  <span className="counter-title">Projects complete</span>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="counter-item style-three counter-text-wrap wow fadeInUp delay-0-3s">
                  <span className="count-text" data-speed="3000" data-stop="305">
                    0
                  </span>
                  <span className="counter-title">Luxury Rooms</span>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="counter-item style-three counter-text-wrap wow fadeInUp delay-0-4s">
                  <span className="count-text" data-speed="3000" data-stop="68">
                    0
                  </span>
                  <span className="counter-title">Beaches</span>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="counter-item style-three counter-text-wrap wow fadeInUp delay-0-5s">
                  <span className="count-text" data-speed="3000" data-stop="385">
                    0
                  </span>
                  <span className="counter-title">Regular Guests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Counter Section End */}

      {/* Services Area Start */}
      <section className="services-area-four pt-130 rpt-100 pb-90 rpb-60 rel z-2">
        <div className="container">
          <div className="row gap-80 justify-content-between align-items-center">
            <div className="col-lg-5">
              <div className="activity-left-content mb-40 rmb-55 wow fadeInUp delay-0-2s">
                <div className="section-title mb-35">
                  <span className="sub-title mb-15">Our Activity</span>
                  <h2>Quality Services &amp; Food Your Trip Are Enjoyable</h2>
                  <p>
                    Sed ut perspiciatis unde omniste natus voluptatem accusantiume doloremque laudantium, totam rem aperiam inventore
                  </p>
                </div>
                <a className="theme-btn" href="room-grid.js">
                  Explore Our Rooms <i className="fal fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row gap-50">
                <div className="col-lg-4 col-6 col-small">
                  <div className="service-item style-two wow fadeInUp delay-0-3s">
                    <div className="icon">
                      <i className="flaticon-mop"></i>
                    </div>
                    <div className="content">
                      <h4>
                        <a href="room-details.js">Room Cleaning and Guide</a>
                      </h4>
                      <p>To take a trivial example which of ever undertakes laborious exerc obtain</p>
                      <a className="read-more" href="room-details.js">
                        Read More <i className="fal fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-6 col-small">
                  <div className="service-item style-two wow fadeInUp delay-0-4s">
                    <div className="icon">
                      <i className="flaticon-food-delivery"></i>
                    </div>
                    <div className="content">
                      <h4>
                        <a href="room-details.js">Quality Foods &amp; kitchen</a>
                      </h4>
                      <p>Quis autem vel eum iure repreh enderit voluptatey velit esse molestiae</p>
                      <a className="read-more" href="room-details.js">
                        Read More <i className="fal fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-6 col-small">
                  <div className="service-item style-two wow fadeInUp delay-0-5s">
                    <div className="icon">
                      <i className="flaticon-treadmill"></i>
                    </div>
                    <div className="content">
                      <h4>
                        <a href="room-details.js">SPA Treatments and GYM</a>
                      </h4>
                      <p>Quis autem vel eum iure repreh enderit voluptatey velit esse molestiae</p>
                      <a className="read-more" href="room-details.js">
                        Read More <i className="fal fa-angle-right"></i>
                      </a>
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
      {/* Services Area End */}

      {/* Testimonials Area Start */}
      <section className="testimonials-area-two py-130 rpy-100 mb-130 rmb-100">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-5 col-lg-6 wow fadeInLeft delay-0-2s">
              <div className="testimonial-two-active rmb-55">
                <div className="testimonial-item-two">
                  <div className="testi-author">
                    <img src="theme/assets/images/testimonials/testi-thumb5.jpg" alt="Testi Thumb" />
                    <div className="testi-des">
                      <h5>Nicholas J. England</h5>
                      <span>Junior Manager</span>
                    </div>
                  </div>
                  <div className="testi-speech">
                    At vero eoset accusamus ustodio dignissimos ducimus quiebla nditiis praesentium voluptatu deleniti atque corrupti quolores mole sintocc
                  </div>
                  <div className="ratting">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="testimonial-item-two">
                  <div className="testi-author">
                    <img src="theme/assets/images/testimonials/testi-thumb1.jpg" alt="Testi Thumb" />
                    <div className="testi-des">
                      <h5>Nicholas J. England</h5>
                      <span>Junior Manager</span>
                    </div>
                  </div>
                  <div className="testi-speech">
                    At vero eoset accusamus ustodio dignissimos ducimus quiebla nditiis praesentium voluptatu deleniti atque corrupti quolores mole sintocc
                  </div>
                  <div className="ratting">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="testimonial-two-right rel wow fadeInRight delay-0-2s">
                <img src="theme/assets/images/testimonials/testimonial-two.jpg" alt="Testimonials" />
                <div className="testimonial-two-dots"></div>
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
      {/* Testimonials Area End */}

      {/* Instagram Area Start */}
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
      {/* Instagram Area End */}
<Footer/>
</div>
</>
);
}
export default About;