import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    profileImage: "/user-avatar.jpg" // Default image
  });
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast.success("✅ Logged out successfully!");
    navigate("/login");
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // Check for user data on component mount
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData({
          name: parsedData.name || "User",
          profileImage: parsedData.profileImage 
            ? `http://localhost:5000/uploads/${parsedData.profileImage}`
            : "/user-avatar.jpg"
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div className="rec-header">
      <button onClick={toggleSidebar} className="rec-toggle-button">
        ☰
      </button>
      
      <div className="rec-header-icons">
       
        <div 
          className="rec-user-profile" 
          onMouseEnter={toggleDropdown} 
          onMouseLeave={toggleDropdown}
        >
          <span className="rec-username">{userData.name}</span>
          <img 
            src={userData.profileImage} 
            alt="Profile" 
            className="rec-profile-pic" 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "/user-avatar.jpg"
            }}
          />
          {isDropdownOpen && (
            <div className="rec-dropdown-menu">
              <div className="rec-dropdown-item">{userData.name}</div>
              <div className="rec-dropdown-item" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .rec-header {
       
          background: #2c3e50;
          color: white;
          transition: transform 0.3s ease;
  
        }
        
       
      `}</style>
    </div>
  );
};

export default Navbar;