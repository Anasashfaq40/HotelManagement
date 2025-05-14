// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");


// exports.registerUser = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { name, email, password, role } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     // Pehle se user exist na kare
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists!" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ 
//       name, 
//       email, 
//       password: hashedPassword, 
//       role: role || "guest"  
//     });

//     await user.save();
//     res.status(201).json({ message: "User registered successfully!", role: user.role });

//   } catch (error) {
//     console.error("Registration Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
    
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         profileImage: user.profileImage || null
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}, "name email role"); 
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.updateUserRole = async (req, res) => {
//   try {
//     const { role } = req.body;
//     const userId = req.params.id;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.role = role;
//     await user.save();

//     res.json({ message: "User role updated successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     await User.findByIdAndDelete(userId);
//     res.json({ message: "User deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Register User with OTP
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || "guest"
    });

    // Generate and save OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Account Verification',
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ 
      message: "OTP sent to your email for verification!",
      userId: user._id 
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark user as verified and clear OTP
    user.verified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: "Account verified successfully!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login User (simplified - no OTP check)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if user is verified
    if (!user.verified) {
      return res.status(403).json({ 
        message: "Account not verified. Please check your email for verification OTP." 
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage || null
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Remove the requestLoginOTP endpoint since we won't need it anymore

// ✅ Request OTP for login
// exports.requestLoginOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate and save OTP
//     const otp = user.generateOTP();
//     await user.save();

//     // Send OTP email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Your OTP for Login',
//       text: `Your OTP is: ${otp}. It will expire in 10 minutes.`
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ 
//       message: "OTP sent to your email!",
//       userId: user._id 
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// ✅ Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role verified");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update User Role
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "User role updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

