// const express = require("express");
// const { registerUser, loginUser, getAllUsers, updateUserRole, deleteUser } = require("../controllers/userController");
// const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");
// const User = require('../models/User');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const router = express.Router();


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//     filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   }
// });


// router.post("/register", registerUser);
// router.post("/login", loginUser);

// router.get("/dashboard", authenticateUser, authorizeAdmin, getAllUsers);
// router.put("/update-role/:id", authenticateUser, authorizeAdmin, updateUserRole);
// router.delete("/delete/:id", authenticateUser, authorizeAdmin, deleteUser);


// router.get('/profile', authenticateUser, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// router.put('/profile', 
//   authenticateUser,
//   upload.single('profileImage'),
//   async (req, res) => {
//     try {
//       const updates = req.body;
      
//       if (req.file) {
//         updates.profileImage = req.file.filename; 
//       }

//       const user = await User.findByIdAndUpdate(
//         req.user._id,
//         { $set: updates },
//         { new: true, runValidators: true }
//       ).select('-password');

//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ message: 'Profile update failed' });
//     }
//   }
// );


// module.exports = router;


const express = require("express");
const { 
  registerUser, 
  loginUser, 
  getAllUsers, 
  updateUserRole, 
  deleteUser,
  verifyOTP,
  requestLoginOTP
} = require("../controllers/userController");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Public routes
router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);


// Protected routes (require authentication)
router.get("/dashboard", authenticateUser, authorizeAdmin, getAllUsers);
router.put("/update-role/:id", authenticateUser, authorizeAdmin, updateUserRole);
router.delete("/delete/:id", authenticateUser, authorizeAdmin, deleteUser);

// Get user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', 
  authenticateUser,
  upload.single('profileImage'),
  async (req, res) => {
    try {
      const updates = req.body;
      
      if (req.file) {
        updates.profileImage = req.file.filename;
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-password');

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Profile update failed' });
    }
  }
);

module.exports = router;