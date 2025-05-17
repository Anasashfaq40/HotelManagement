import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    profileImage: "/theme/assets/images/users/default-profile.png"
  });
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserData({
      name: "",
      profileImage: "/theme/assets/images/users/default-profile.png"
    });
    toast.success("✅ Logged out successfully!");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");
      
      if (token && userData) {
        try {
          const parsedData = JSON.parse(userData);
          setUserData({
            name: parsedData.name,
            profileImage: parsedData.profileImage || "/theme/assets/images/users/default-profile.png"
          });
          setIsLoggedIn(true);
        } catch (e) {
          handleLogout();
        }
      } else {
        setIsLoggedIn(false);
      }
    };
console.log(userData.profileImage);
    // Check immediately on load
    checkAuth();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "userData") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [handleLogout]);

  return (
    <>
      <header className="main-header header-white">
        <div className="header-upper">
          <div className="container container-1720 clearfix">
            <div className="header-inner rel d-flex align-items-center">
              <div className="logo-outer">
                <div className="logo">
                  <Link to="/">
                    <img src="theme/assets/images/logos/HMS-logo.png" alt="Logo" title="Logo" />
                  </Link>
                </div>
              </div>

              <div className="nav-outer clearfix ms-lg-4">
                <nav className="main-menu navbar-expand-lg">
                  <div className="navbar-header">
                    <div className="mobile-logo my-15">
                      <Link to="/">
                        <img src="themes/assets/images/logos/logo-black.png" alt="Logo" title="Logo" />
                      </Link>
                    </div>
                    <button type="button" className="navbar-toggle" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>

                  <div className="navbar-collapse collapse clearfix">
                    <ul className="navigation clearfix">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/room-grid">Rooms</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/services">Services</Link></li>
                      <li><Link to="/contact">Contact</Link></li>
                    </ul>
                  </div>
                </nav>
              </div>

              <button className="shopping-bag me-auto">
                <i className="fal fa-shopping-bag"></i>
                <span>0</span>
              </button>

              <div className="auth-icons d-flex align-items-center">
                {!isLoggedIn && (
                  <>
                    <Link to="/login" className="auth-icon me-3" title="Login">
                      <i className="far fa-user"></i>
                    </Link>
                    <Link to="/signup" className="auth-icon" title="Signup">
                      <i className="far fa-sign-in"></i>
                    </Link>
                  </>
                )}
              </div>

              <div className="menu-btns">
                <span className="menu-phone-number">
                  <i className="far fa-phone"></i>
                  <a href="tel:+00012345688">+000 (123) 456 88</a>
                </span>
                <Link to="/room" className="theme-btn">
                  Book Now <i className="far fa-angle-right"></i>
                </Link>
                
                {isLoggedIn && (
                  <div className="profile-dropdown ms-3">
                    <div className="dropdown-toggle">
                      <img 
                        src={`http://localhost:5000/uploads/${userData.profileImage}`}  
                        alt="Profile" 
                        className="profile-img rounded-circle"
                        style={{width: '40px', height: '40px', objectFit: 'cover'}}
                      />
                    </div>
                    <div className="dropdown-menu">
                      <div className="dropdown-header">
                        <h6>{userData.name || "User"}</h6>
                        <span>Welcome!</span>
                      </div>
                      <Link to="/profile" className="dropdown-item">
                        <i className="far fa-user me-2"></i> View Profile
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item">
                        <i className="far fa-sign-out me-2"></i> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <ToastContainer />

      <style jsx>{`
        .profile-dropdown {
          position: relative;
          display: inline-block;
        }
        
        .dropdown-toggle {
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        
        .dropdown-menu {
          display: none;
          position: absolute;
          right: 0;
          background: white;
          min-width: 200px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          border-radius: 5px;
          padding: 10px 0;
          z-index: 1000;
        }
        
        .profile-dropdown:hover .dropdown-menu {
          display: block;
          animation: fadeIn 0.3s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .dropdown-header {
          padding: 10px 15px;
          border-bottom: 1px solid #eee;
        }
        
        .dropdown-header h6 {
          margin: 0;
          font-weight: 600;
          color: #333;
        }
        
        .dropdown-header span {
          font-size: 12px;
          color: #777;
        }
        
        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 8px 15px;
          color: #333;
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .dropdown-item:hover {
          background: #f5f5f5;
          color: #000;
        }
        
        .dropdown-item i {
          width: 20px;
          text-align: center;
          margin-right: 8px;
        }
      `}</style>
    </>
  );
};

export default Header;