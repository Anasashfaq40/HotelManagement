import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    profileImage: "/user-avatar.jpg"
  });
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast.success("✅ Logged out successfully!");
    navigate("/login");
    setIsDropdownOpen(false);
  }, [navigate]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const storedUserData = localStorage.getItem("userData");
      
      if (token && storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData);
          setUserData({
            name: parsedData.name || "User",
            profileImage: parsedData.profileImage || "/user-avatar.jpg"
          });
        } catch (e) {
          handleLogout();
        }
      }
    };

    checkAuth();

    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "userData") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [handleLogout]);

  return (
    <div className="adm-header">
      <button onClick={toggleSidebar} className="adm-toggle-button">
        ☰
      </button>
      
      <div className="adm-header-icons">
     
        <div 
          className="adm-user-profile" 
          onClick={toggleDropdown}
        >
          <span className="adm-username username">{userData.name}</span>
          <img 
            src={userData.profileImage.includes('http') ? 
                 userData.profileImage : 
                 `http://localhost:5000/uploads/${userData.profileImage}`} 
            alt="Profile" 
            className="adm-profile-pic" 
          />
          {isDropdownOpen && (
            <div className="adm-dropdown-menu">
              <div className="adm-dropdown-item">{userData.name}</div>
              <div className="adm-dropdown-item" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Navbar;