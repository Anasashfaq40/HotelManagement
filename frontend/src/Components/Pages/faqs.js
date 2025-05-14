import React from 'react';
import Header from '../Header';
import Footer from '../footer';

function faqs() {
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
            <h1 className="page-title wow fadeInUp delay-0-2s">Faq</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                <li className="breadcrumb-item"><a href="index.js">home</a></li>
                <li className="breadcrumb-item active">Faq</li>
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

      {/* FAQ Area start */}
      <section className="faq-area py-130 rpy-100 rel">
        <div className="container">
          <div className="row align-items-center pb-130 rpb-100">
            <div className="col-lg-6">
              <div className="faq-image-part rmb-55 rel wow fadeInRight delay-0-2s">
                <img src="theme/assets/images/faq/faq-page1.jpg" alt="FAQs" />
                <div className="faq-counter-part">
                  <div className="row gap-20">
                    <div className="col-6 col-small">
                      <div className="counter-item counter-text-wrap wow fadeInUp delay-0-2s">
                        <i className="flaticon-startup"></i>
                        <span className="count-text" data-speed="3000" data-stop="49">0</span>
                        <span className="counter-title">Luxury Hotels</span>
                      </div>
                    </div>
                    <div className="col-6 col-small">
                      <div className="counter-item counter-text-wrap wow fadeInUp delay-0-3s">
                        <i className="flaticon-startup"></i>
                        <span className="count-text" data-speed="3000" data-stop="68">0</span>
                        <span className="counter-title">Popular Beaches</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 ms-lg-auto">
              <div className="faq-content-part wow fadeInLeft delay-0-2s">
                <div className="section-title mb-30">
                  <span className="sub-title mb-15">FAQs</span>
                  <h2>Learn Something About Our Services And More</h2>
                </div>
                <div className="accordion" id="faq-accordion">
                  <div className="accordion-item">
                    <h5 className="accordion-header">
                      <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        01. What Services Do We Provides?
                      </button>
                    </h5>
                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                      <div className="accordion-body">
                        <p>To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h5 className="accordion-header">
                      <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                        02. How Must Cost Our Rooms?
                      </button>
                    </h5>
                    <div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#faq-accordion">
                      <div className="accordion-body">
                        <p>We denounce with righteous indignation and dislike men beguiledey and demoralized by the charms of pleasure of the moment</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h5 className="accordion-header">
                      <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                        03. Experience Team Member?
                      </button>
                    </h5>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                      <div className="accordion-body">
                        <p>To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h5 className="accordion-header">
                      <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                        04. Are You Awards Winning Company?
                      </button>
                    </h5>
                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                      <div className="accordion-body">
                        <p>To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6 me-lg-auto">
              <div className="faq-content-part rmb-55 wow fadeInLeft delay-0-2s">
                <div className="section-title mb-30">
                  <span className="sub-title mb-15">FAQs</span>
                  <h2>Learn Something About Our Services And More</h2>
                </div>
                <div className="accordion" id="faq-accordion-two">
                  <div className="accordion-item">
                    <h5 className="accordion-header">
                      <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwoOne">
                        01. What Services Do We Provides?
                      </button>
                    </h5>
                    <div id="collapseTwoOne" className="accordion-collapse collapse" data-bs-parent="#faq-accordion-two">
                      <div className="accordion-body">
                        <p>To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h5 className="accordion-header">
                      <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseTwoTwo">
                        02. How Must Cost Our Rooms?
                      </button>
                    </h5>
                    <div id="collapseTwoTwo" className="accordion-collapse collapse show" data-bs-parent="#faq-accordion-two">
                      <div className="accordion-body">
                        <p>We denounce with righteous indignation and dislike men beguiledey and demoralized by the charms of pleasure of the moment</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h5 className="accordion-header">
                      <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwoThree">
                        03. Experience Team Member?
                      </button>
                    </h5>
                    <div id="collapseTwoThree" className="accordion-collapse collapse" data-bs-parent="#faq-accordion-two">
                      <div className="accordion-body">
                        <p>To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h5 className="accordion-header">
                      <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwoFour">
                        04. Are You Awards Winning Company?
                      </button>
                    </h5>
                    <div id="collapseTwoFour" className="accordion-collapse collapse" data-bs-parent="#faq-accordion-two">
                      <div className="accordion-body">
                        <p>To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-image-part rel wow fadeInRight delay-0-2s">
                <img src="theme/assets/images/faq/faq-page2.jpg" alt="FAQs" />
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
      {/* FAQ Area end */}

      {/* Testimonials Area start */}
      <section className="testimonials-area py-130 rpy-100 rel z-1 bgc-lighter">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 wow fadeInLeft delay-0-2s">
              <div className="booking-search rmb-75 rel bg-white">
                <div className="section-title">
                  <span className="sub-title mb-5">Food & Drink</span>
                  <h3>Find & Booked Your Seats</h3>
                </div>
                <form action="faqs.js#" name="booking-form" method="post">
                  <div className="form-group">
                    <input
                      type="text"
                      id="check-in"
                      name="check-in"
                      className="form-control"
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
              <div className="testimonial-right wow fadeInRight delay-0-2s">
                <div className="section-title mb-65 rmb-45">
                  <span className="sub-title mb-15">Our Testimonials</span>
                  <h2>What Our Customer Say Us</h2>
                </div>
                <div className="testimonial-four-content">
                  <div className="testimonials-four-slider">
                    <div className="testimonial-item">
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores qua molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga
                      </p>
                      <div className="testi-author">
                        <img src="theme/assets/images/testimonials/testi-thumb1.jpg" alt="Testi Thumb" />
                        <div className="testi-des">
                          <h5>Diane C. Valentine</h5>
                          <span>CEO &amp; Founder</span>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-item">
                      <p>
                        Praesentium voluptatum deleniti atque corrupti quos dolores qua molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
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
                        Molestias excepturi sint occaecati cupiditate non provident At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores qua similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga
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
                        Officia deserunt mollitia animi, id est laborum et dolorum fuga At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores qua molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa qui
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
                        Cupiditate non provident similique sunt in culpa At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores qua molestias excepturi sint occaecati qui officia deserunt mollitia animi, id est laborum et dolorum fuga
                      </p>
                      <div className="testi-author">
                        <img src="theme/assets/images/testimonials/testi-thumb3.jpg" alt="Testi Thumb" />
                        <div className="testi-des">
                          <h5>Diane C. Valentine</h5>
                          <span>CEO &amp; Founder</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="testimonial-four-dots"></div>
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
      {/* Testimonials Area end */}

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

    </>
  );
}

export default faqs;
