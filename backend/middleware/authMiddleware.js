const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify JWT token
exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token. User not found." });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// Middleware to check if user is an admin
exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }
  next();
};

// Middleware to check if user is an admin
exports.authorizeStaff = (req, res, next) => {
  if (req.user.role !== "receptionist") {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }
  next();
};