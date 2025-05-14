import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from '../Header';
import Footer from '../footer';

function RoomGrid() {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);

  // Fetch rooms from backend
  useEffect(() => {
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
    fetchRooms();
  }, []);

  // Get current rooms
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="home-one">
        <div className="page-wrapper">
          <Header />

          {/* Page Banner Start */}
          <section className="page-banner-area pt-170 rpt-110 pb-190 rpb-125 rel z-1 bgs-cover bgc-black text-center" style={{ backgroundImage: "url(theme/assets/images/background/banner-two.jpg)" }}>
            <div className="container">
              <div className="banner-inner text-white rpb-25">
                <h1 className="page-title wow fadeInUp delay-0-2s">Room Grid</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Room Grid</li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="bg-lines">
              {[...Array(10)].map((_, i) => <span key={i}></span>)}
            </div>
          </section>
          {/* Page Banner End */}

          {/* Rooms Area Start */}
          <section className="rooms-area pt-130 rpt-100 pb-100 rpb-70 rel z-2">
            <div className="container">
              <div className="row justify-content-between align-items-center pb-20">
                <div className="col-xl-5 col-lg-7">
                  <div className="section-title mb-40 wow fadeInLeft delay-0-2s">
                    <h2>Take A Look At Our Luxury Rooms</h2>
                  </div>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <Link to="/rooms" className="theme-btn mb-40 wow fadeInRight delay-0-2s">
                    Explore Rooms <i className="fal fa-angle-right"></i>
                  </Link>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="row">
                    {currentRooms.map((room, index) => (
                      <div className="col-xl-4 col-md-6" key={room._id}>
                        <div className={`room-item wow fadeInUp delay-0-${(index % 3) + 2}s`}>
                          <div className="image">
                            <img src={`http://localhost:5000/uploads/${room.image}`} alt={room.type} />
                            <span className="category">{room.type}</span>
                          </div>
                          <div className="content">
                            <h4>
                              <Link to={`/room-details/${room._id}`}>{room.type} Room</Link>
                            </h4>
                            <ul className="blog-meta">
                              <li>
                                <i className="far fa-bed-alt"></i>
                                <span>Adults: {room.adults || 2}</span>
                              </li>
                              <li>
                                <i className="far fa-drafting-compass"></i>
                                <span>Size: {room.size || '30ft'}</span>
                              </li>
                            </ul>
                            <p>{room.description || 'Luxurious accommodation with premium amenities'}</p>
                            <div className="price">
                              Price <span>${room.price}</span>/per night
                            </div>
                          </div>
                          <Link to={`/room-details/${room._id}`} className="theme-btn style-two">
                            Book Now <i className="fal fa-angle-right"></i>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {rooms.length > roomsPerPage && (
                    <div className="row mt-50">
                      <div className="col-lg-12">
                        <div className="pagination-wrap text-center">
                          <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                              <button 
                                className="page-link" 
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                <i className="fas fa-angle-left"></i>
                              </button>
                            </li>
                            
                            {Array.from({ length: totalPages }).map((_, index) => (
                              <li 
                                key={index} 
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                              >
                                <button 
                                  className="page-link" 
                                  onClick={() => paginate(index + 1)}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            ))}
                            
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                              <button 
                                className="page-link" 
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                <i className="fas fa-angle-right"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="bg-lines for-bg-white">
              {[...Array(10)].map((_, i) => <span key={i}></span>)}
            </div>
          </section>
          {/* Rooms Area End */}

          <Footer />
        </div>
      </div>

      {/* Pagination CSS */}
      <style jsx>{`
        .pagination-wrap {
          margin-top: 30px;
        }
        .pagination {
          display: inline-flex;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .page-item {
          margin: 0 5px;
        }
        .page-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid #e1e1e1;
          background: #fff;
          color: #333;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .page-link:hover {
          background: #f8f8f8;
        }
        .page-item.active .page-link {
          background: #4e6bff;
          color: #fff;
          border-color: #4e6bff;
        }
        .page-item.disabled .page-link {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .spinner-border {
          width: 3rem;
          height: 3rem;
        }
      `}</style>
    </>
  );
}

export default RoomGrid;