import React from 'react';
import Header from '../Header';
import Footer from '../footer';

function room2columns() {
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
            <h1 className="page-title wow fadeInUp delay-0-2s">Room Two Columns</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                <li className="breadcrumb-item">
                  <a href="index.js">home</a>
                </li>
                <li className="breadcrumb-item active">Room Two Columns</li>
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

      {/* Search Filter and Features Start */}
      <div className="search-and-features-area pb-50 rpb-20 rel z-1">
        <div className="container container-1550">
          <div className="search-filter-inner rel z-2">
            <div className="section-title text-white mb-20 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-5">Booking Your Seat</span>
              <h3>Find & Booked Your Seats</h3>
            </div>
            <div className="filter-item wow fadeInUp delay-0-3s">
              <input
                type="text"
                onFocus={(e) => (e.target.type = 'date')}
                placeholder="Check In"
              />
            </div>
            <div className="filter-item wow fadeInUp delay-0-4s">
              <input
                type="text"
                onFocus={(e) => (e.target.type = 'date')}
                placeholder="Check Out"
              />
            </div>
            <div className="filter-item wow fadeInUp delay-0-5s">
              <select name="adults" id="adults">
                <option value="adults">Adults</option>
                <option value="adults1">1</option>
                <option value="adults2">2</option>
                <option value="adults3">3</option>
              </select>
            </div>
            <div className="filter-item wow fadeInUp delay-0-6s">
              <select name="children" id="children">
                <option value="children">Children</option>
                <option value="children1">1</option>
                <option value="children2">2</option>
                <option value="children3">3</option>
              </select>
            </div>
            <button className="theme-btn style-two wow fadeInUp delay-0-7s">
              Search Now <i className="far fa-angle-right"></i>
            </button>
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
      </div>
      {/* Search Filter and Features End */}

      {/* Rooms Area start */}
      <section className="rooms-2columns-area pb-125 rpb-95 rel z-2">
        <div className="container container-1130">
          <div className="row gap-90">
            <div className="col-md-6">
              <div className="room-item style-three wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/rooms/room2columns1.jpg" alt="Room" />
                  <a className="category" href="room-grid.js">Luxury</a>
                </div>
                <div className="content">
                  <div className="price">$59 Per Night</div>
                  <h4>
                    <a href="room-details.js">Look Our Luxury Rooms</a>
                  </h4>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-drafting-compass"></i>
                      <a href="room-2columns.js#">Size : 80m2</a>
                    </li>
                    <li>
                      <i className="far fa-bed-alt"></i>
                      <a href="room-2columns.js#">Beds : 3</a>
                    </li>
                    <li>
                      <i className="far fa-bath"></i>
                      <a href="room-2columns.js#">Bathrooms : 2</a>
                    </li>
                  </ul>
                  <a className="theme-btn style-two" href="contact.js">
                    Book Now <i className="fal fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="room-item style-three wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/rooms/room2columns2.jpg" alt="Room" />
                  <a className="category" href="room-grid.js">Classic</a>
                </div>
                <div className="content">
                  <div className="price">$59 Per Night</div>
                  <h4>
                    <a href="room-details.js">Classic Luxury Rooms</a>
                  </h4>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-drafting-compass"></i>
                      <a href="room-2columns.js#">Size : 80m2</a>
                    </li>
                    <li>
                      <i className="far fa-bed-alt"></i>
                      <a href="room-2columns.js#">Beds : 3</a>
                    </li>
                    <li>
                      <i className="far fa-bath"></i>
                      <a href="room-2columns.js#">Bathrooms : 2</a>
                    </li>
                  </ul>
                  <a className="theme-btn style-two" href="contact.js">
                    Book Now <i className="fal fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="room-item style-three wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/rooms/room2columns3.jpg" alt="Room" />
                  <a className="category" href="room-grid.js">couple</a>
                </div>
                <div className="content">
                  <div className="price">$59 Per Night</div>
                  <h4>
                    <a href="room-details.js">Double Couple Rooms</a>
                  </h4>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-drafting-compass"></i>
                      <a href="room-2columns.js#">Size : 80m2</a>
                    </li>
                    <li>
                      <i className="far fa-bed-alt"></i>
                      <a href="room-2columns.js#">Beds : 3</a>
                    </li>
                    <li>
                      <i className="far fa-bath"></i>
                      <a href="room-2columns.js#">Bathrooms : 2</a>
                    </li>
                  </ul>
                  <a className="theme-btn style-two" href="contact.js">
                    Book Now <i className="fal fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="room-item style-three wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/rooms/room2columns4.jpg" alt="Room" />
                  <a className="category" href="room-grid.js">family</a>
                </div>
                <div className="content">
                  <div className="price">$59 Per Night</div>
                  <h4>
                    <a href="room-details.js">Family Classic Rooms</a>
                  </h4>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-drafting-compass"></i>
                      <a href="room-2columns.js#">Size : 80m2</a>
                    </li>
                    <li>
                      <i className="far fa-bed-alt"></i>
                      <a href="room-2columns.js#">Beds : 3</a>
                    </li>
                    <li>
                      <i className="far fa-bath"></i>
                      <a href="room-2columns.js#">Bathrooms : 2</a>
                    </li>
                  </ul>
                  <a className="theme-btn style-two" href="contact.js">
                    Book Now <i className="fal fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="room-item style-three wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/rooms/room2columns5.jpg" alt="Room" />
                  <a className="category" href="room-grid.js">single</a>
                </div>
                <div className="content">
                  <div className="price">$59 Per Night</div>
                  <h4>
                    <a href="room-details.js">Luxury Single Rooms</a>
                  </h4>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-drafting-compass"></i>
                      <a href="room-2columns.js#">Size : 80m2</a>
                    </li>
                    <li>
                      <i className="far fa-bed-alt"></i>
                      <a href="room-2columns.js#">Beds : 3</a>
                    </li>
                    <li>
                      <i className="far fa-bath"></i>
                      <a href="room-2columns.js#">Bathrooms : 2</a>
                    </li>
                  </ul>
                  <a className="theme-btn style-two" href="contact.js">
                    Book Now <i className="fal fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="room-item style-three wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/rooms/room2columns6.jpg" alt="Room" />
                  <a className="category" href="room-grid.js">Luxury</a>
                </div>
                <div className="content">
                  <div className="price">$59 Per Night</div>
                  <h4>
                    <a href="room-details.js">Modern Luxury Rooms</a>
                  </h4>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-drafting-compass"></i>
                      <a href="room-2columns.js#">Size : 80m2</a>
                    </li>
                    <li>
                      <i className="far fa-bed-alt"></i>
                      <a href="room-2columns.js#">Beds : 3</a>
                    </li>
                    <li>
                      <i className="far fa-bath"></i>
                      <a href="room-2columns.js#">Bathrooms : 2</a>
                    </li>
                  </ul>
                  <a className="theme-btn style-two" href="contact.js">
                    Book Now <i className="fal fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="room-item style-three wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/rooms/room2columns7.jpg" alt="Room" />
                  <a className="category" href="room-grid.js">Luxury</a>
                </div>
                <div className="content">
                  <div className="price">$59 Per Night</div>
                  <h4>
                    <a href="room-details.js">Modern Luxury Rooms</a>
                  </h4>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-drafting-compass"></i>
                      <a href="room-2columns.js#">Size : 80m2</a>
                    </li>
                    <li>
                      <i className="far fa-bed-alt"></i>
                      <a href="room-2columns.js#">Beds : 3</a>
                    </li>
                    <li>
                      <i className="far fa-bath"></i>
                      <a href="room-2columns.js#">Bathrooms : 2</a>
                    </li>
                  </ul>
                  <a className="theme-btn style-two" href="contact.js">
                    Book Now <i className="fal fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="room-item style-three wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/rooms/room2columns8.jpg" alt="Room" />
                  <a className="category" href="room-grid.js">Classic</a>
                </div>
                <div className="content">
                  <div className="price">$59 Per Night</div>
                  <h4>
                    <a href="room-details.js">Look Our Classic Rooms</a>
                  </h4>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-drafting-compass"></i>
                      <a href="room-2columns.js#">Size : 80m2</a>
                    </li>
                    <li>
                      <i className="far fa-bed-alt"></i>
                      <a href="room-2columns.js#">Beds : 3</a>
                    </li>
                    <li>
                      <i className="far fa-bath"></i>
                      <a href="room-2columns.js#">Bathrooms : 2</a>
                    </li>
                  </ul>
                  <a className="theme-btn style-two" href="contact.js">
                    Book Now <i className="fal fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="room-item style-three wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/rooms/room2columns9.jpg" alt="Room" />
                  <a className="category" href="room-grid.js">Couple</a>
                </div>
                <div className="content">
                  <div className="price">$59 Per Night</div>
                  <h4>
                    <a href="room-details.js">Look Our Couple Rooms</a>
                  </h4>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-drafting-compass"></i>
                      <a href="room-2columns.js#">Size : 80m2</a>
                    </li>
                    <li>
                      <i className="far fa-bed-alt"></i>
                      <a href="room-2columns.js#">Beds : 3</a>
                    </li>
                    <li>
                      <i className="far fa-bath"></i>
                      <a href="room-2columns.js#">Bathrooms : 2</a>
                    </li>
                  </ul>
                  <a className="theme-btn style-two" href="contact.js">
                    Book Now <i className="fal fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <ul className="pagination pt-10 flex-wrap justify-content-center wow fadeInUp delay-0-2s">
            <li className="page-item disabled">
              <span className="page-link">
                <i className="far fa-arrow-left"></i>
              </span>
            </li>
            <li className="page-item active">
              <span className="page-link">
                1
                <span className="sr-only">(current)</span>
              </span>
            </li>
            <li className="page-item">
              <a className="page-link" href="room-2columns.js#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="room-2columns.js#">3</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="room-2columns.js#">
                <i className="far fa-arrow-right"></i>
              </a>
            </li>
          </ul>
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
      {/* Rooms Area end */}

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

export default room2columns;
