// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Sending Data:", formData);

//     try {
//       const response = await fetch("http://localhost:5000/api/users/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log("Response Data:", data);

//       if (response.ok) {
//         if (data.role) {
//           localStorage.setItem("token", data.token || "");
//           localStorage.setItem("role", data.role);

//           toast.success("Signup successful! Redirecting...", { autoClose: 2000 });

//           setTimeout(() => {
//             if (data.role === "admin") {
//               navigate("/admin-dashboard");
//             } else if (data.role === "receptionist") {
//               navigate("/reception");
//             } else if (data.role === "housekeeping") {
//               navigate("/housekeeping");
//             } else {
//               navigate("/login");
//             }
//           }, 2000);
//         } else {
//           toast.error("Invalid response from server (Missing role)");
//         }
//       } else {
//         toast.error(data.message || "Signup failed");
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       toast.error("Something went wrong! Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2 className="lo-head">Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Enter your name" required onChange={handleChange} />
//         <input type="email" name="email" placeholder="Enter your email" required onChange={handleChange} />
//         <input type="password" name="password" placeholder="Enter your password" required onChange={handleChange} />
//         <button type="submit" className="btn btn-danger">Signup</button>
//       </form>
//       <p>Already have an account? <Link to="/login">Login</Link></p>

  
//       <ToastContainer />
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [showOTPField, setShowOTPField] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!showOTPField) {
      // First step: Register user and request OTP
      try {
        const response = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setUserId(data.userId);
          setShowOTPField(true);
          toast.success("OTP sent to your email!", {
            autoClose: 2000,
          });
        } else {
          toast.error(data.message || "Signup failed");
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
      }
    } else {
      // Second step: Verify OTP
      try {
        const response = await fetch("http://localhost:5000/api/users/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, otp }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Account verified! Redirecting to login...", {
            autoClose: 2000,
          });
          setTimeout(() => navigate("/login"), 2000);
        } else {
          toast.error(data.message || "OTP verification failed");
        }
      } catch (error) {
        toast.error("Verification error: " + error.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2 className="lo-head">Signup</h2>
      <form onSubmit={handleSubmit}>
        {!showOTPField ? (
          <>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter your name" 
              required 
              onChange={handleChange} 
              value={formData.name}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              onChange={handleChange} 
              value={formData.email}
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              required 
              onChange={handleChange} 
              value={formData.password}
            />
          </>
        ) : (
          <input 
            type="text" 
            placeholder="Enter OTP" 
            required 
            onChange={(e) => setOtp(e.target.value)} 
            value={otp}
          />
        )}
        
        <button type="submit" className="btn btn-danger">
          {showOTPField ? "Verify OTP" : "Signup"}
        </button>
      </form>
      
      <p>
        {showOTPField ? (
          "Check your email for the OTP"
        ) : (
          <p className="login-para">
            Already have an account? <Link className="sign" to="/login">Login</Link>
          </p>
        )}
      </p>

      <ToastContainer />
    </div>
  );
};

export default Signup;
