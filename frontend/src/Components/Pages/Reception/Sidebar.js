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

  // Improved active link check
  const isActive = (path) => {
    return location.pathname.startsWith(path);
    // Or for exact matching: return location.pathname === path;
  };

  return (
    <div className={`rec-sidebar ${isOpen ? "active" : ""}`}>
      <div className="rec-sidebar-header">
        <h2 className="admin-head">Hotel M</h2>
      </div>
      <div className="rec-sidebar-profile">
        <img
          src={userData.profileImage.includes('http') ?
            userData.profileImage :
            `http://localhost:5000/uploads/${userData.profileImage}`}
          alt="Profile"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
        <div>
          <h3>{userData.name}</h3>
          <p>{userData.role}</p>
        </div>
      </div>
      <ul>
        <li className={isActive('/reception') ? 'active' : ''}>
          <Link to="/reception">Dashboard</Link>
        </li>
        <li className={isActive('/bookeduser') ? 'active' : ''}>
          <Link to="/bookeduser">Booked Users</Link>
        </li>
        <li className={isActive('/recreservation') ? 'active' : ''}>
          <Link to="/recreservation">Reservation System</Link>
        </li>
        <li className={isActive('/reccheckedin') ? 'active' : ''}>
          <Link to="/reccheckedin">Checked-in Guest</Link>
        </li>
        <li className={isActive('/reccheckedout') ? 'active' : ''}>
          <Link to="/reccheckedout">Checked-out Guest</Link>
        </li>
    
        <li className={isActive('/servicerequest') ? 'active' : ''}>
          <Link to="/servicerequest">Service Request</Link>
        </li>
        <li className={isActive('/housekeeping') ? 'active' : ''}>
          <Link to="/housekeeping">Housekeeping</Link>
        </li>
        <li className={isActive('/reportingissue') ? 'active' : ''}>
          <Link to="/reportingissue">Reporting Issues</Link>
        </li>
        <li className={isActive('/recmaintenence') ? 'active' : ''}>
          <Link to="/recmaintenence">Maintenence Rooms</Link>
        </li>
       
      </ul>

      <style jsx>{`
        .rec-sidebar {
          width: 250px;
          background: #2c3e50;
          color: white;
          height: 100vh;
          position: fixed;
          transition: transform 0.3s ease;
          z-index: 100;
        }
        
        .rec-sidebar.active {
          transform: translateX(0);
        }
        
        .rec-sidebar-header {
          padding: 20px;
          border-bottom: 1px solid #34495e;
        }
        
        .rec-sidebar-profile {
          padding: 20px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #34495e;
        }
        
        .rec-sidebar-profile img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 15px;
        }
        
        .rec-sidebar-profile h3 {
          margin: 0;
          font-size: 1rem;
        }
        
        .rec-sidebar-profile p {
          margin: 5px 0 0;
          font-size: 0.8rem;
          color: #bdc3c7;
        }
        
        .rec-sidebar ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .rec-sidebar li {
          padding: 12px 20px;
          transition: background 0.3s;
        }
        
        .rec-sidebar li:hover {
          background: #34495e;
        }
        
        .rec-sidebar li.active {
          background: #3498db;
        }
        
        .rec-sidebar li a {
          color: white;
          text-decoration: none;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;