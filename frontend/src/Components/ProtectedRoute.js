import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  // Get the user's data from localStorage
  const userData = localStorage.getItem("userData");
  
  // Parse the userData if it exists
  let role = null;
  try {
    const parsedData = userData ? JSON.parse(userData) : null;
    role = parsedData?.role; // Using optional chaining in case parsedData is null
  } catch (error) {
    console.error("Error parsing userData from localStorage", error);
  }

  // Check if the user's role is allowed to access the route
  if (!role || !allowedRoles.includes(role)) {
    // If not, redirect to the login page
    return <Navigate to="/login" replace />;
  }
    // Check if the user's role is allowed to access the route
    if (!role || !allowedRoles.includes(role)) {
      // If not, redirect to the login page
      return <Navigate to="/login" replace />;
    }

  // If the role is allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;