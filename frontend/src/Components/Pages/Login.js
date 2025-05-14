import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));

        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });

        setTimeout(() => {
          if (data.user.role === "admin") {
            navigate("/dashboard");
          } else if (data.user.role === "receptionist") {
            navigate("/reception");
          } else if (data.user.role === "housekeeping") {
            navigate("/housekeeping");
          } else {
            navigate("/");
          }
        }, 2000);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="lo-head">Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          required 
          onChange={handleChange} 
          value={formData.email}
        />
        
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          required
          onChange={handleChange}
          value={formData.password}
        />

        <button type="submit" className="btn btn-danger">
          Login
        </button>
      </form>
      
      <p className="login-para">Don't have an account? <Link className="sign"  to="/signup">Sign up</Link></p>
      <ToastContainer />
    </div>
  );
};

export default Login;