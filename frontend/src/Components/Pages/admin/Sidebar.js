import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "John Doe",
    profileImage: "https://via.placeholder.com/150",
    role: "Admin"
  });

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast.success("✅ Logged out successfully!");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const storedUserData = localStorage.getItem("userData");
      
      if (token && storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData);
          setUserData(prev => ({
            ...prev,
            name: parsedData.name || prev.name,
            profileImage: parsedData.profileImage || prev.profileImage,
            role: parsedData.role || prev.role
          }));
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

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`adm-sidebar ${isOpen ? "active" : ""}`}>
      <div className="adm-sidebar-header">
        <h2 className="admin-head">Admin panel</h2>
      </div>
      <div className="adm-sidebar-profile">
        <img 
          src={userData.profileImage.includes('http') ? 
               userData.profileImage : 
               `http://localhost:5000/uploads/${userData.profileImage}`} 
          alt="Profile" 
        />
        <div>
          <h3 className="username">{userData.name}</h3>
          <p className="userrole">{userData.role}</p>
        </div>
      </div>
      <ul>
        <li className={isActive('/dashboard') ? 'active' : ''}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={isActive('/usermanagement') ? 'active' : ''}>
          <Link to="/usermanagement">User Management</Link>
        </li>
        <li className={isActive('/room-management') ? 'active' : ''}>
          <Link to="/room-management">Room Management</Link>
        </li>
        <li className={isActive('/reservation') ? 'active' : ''}>
          <Link to="/reservation">Reservation System</Link>
        </li>
        <li className={isActive('/bookedguest') ? 'active' : ''}>
          <Link to="/bookedguest">Booked Users</Link>
        </li>
        <li className={isActive('/checkedin') ? 'active' : ''}>
          <Link to="/checkedin">Checked-in Users</Link>
        </li>
        <li className={isActive('/checked-out') ? 'active' : ''}>
          <Link to="/checked-out">Checked-Out Users</Link>
        </li>
        <li className={isActive('/adminservice') ? 'active' : ''}>
          <Link to="/adminservice">Services</Link>
        </li>
        <li className={isActive('/house') ? 'active' : ''}>
          <Link to="/house">Housekeeping</Link>
        </li>
        <li className={isActive('/adminreview') ? 'active' : ''}>
          <Link to="/adminreview">Guest Review</Link>
        </li>
        <li className={isActive('/reportissues') ? 'active' : ''}>
          <Link to="/reportissues">Report Issues</Link>
        </li>
        <li className={isActive('/maintenance') ? 'active' : ''}>
          <Link to="/maintenance">Maintanance Rooms</Link>
        </li>
        <li className={isActive('/reporting') ? 'active' : ''}>
          <Link to="/reporting">Reporting</Link>
        </li>
        <li className={isActive('/feedback') ? 'active' : ''}>
          <Link to="/feedback">Feedback</Link>
        </li>
        <li className={isActive('/settings') ? 'active' : ''}>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            <i className="far fa-sign-out me-2"></i> Logout
          </button>
        </li>
      </ul>

   
    </div>
  );
};

export default Sidebar;