// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { 
//     type: String, 
//     enum: ["admin", "receptionist", "housekeeping", "guest"], 
//     default: "guest" 
//   },
//   contact: String,
//   preferences: String,
// }, { timestamps: true });

// module.exports = mongoose.model("User", UserSchema);

// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { 
//     type: String, 
//     enum: ["admin", "receptionist", "housekeeping", "guest"], 
//     default: "guest" 
//   },
//   profileImage: { type: String, default: "" },
//   contact: { type: String, default: "" },
//   address: { type: String, default: "" },
//   city: { type: String, default: "" },
//   country: { type: String, default: "" },
//   postalCode: { type: String, default: "" },
//   preferences: { type: String, default: "" },
// }, { timestamps: true });

// module.exports = mongoose.model("User", UserSchema);   


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "receptionist", "housekeeping", "guest"], 
    default: "guest" 
  },
  otp: { type: String },
  otpExpires: { type: Date },
  verified: { type: Boolean, default: false },
  profileImage: { type: String, default: "" },
  contact: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
  postalCode: { type: String, default: "" },
  preferences: { type: String, default: "" },
}, { timestamps: true });

// Generate OTP method
UserSchema.methods.generateOTP = function() {
  this.otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otpExpires = Date.now() + 600000; // 10 minutes
  return this.otp;
};

module.exports = mongoose.model("User", UserSchema);