const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  otp: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, 'OTP must be at least 6 characters long'],
    maxlength: [6, 'OTP cannot be more than 6 characters long']
  },
  createdAt: {
    type: Date,
    expires: "1m",
    default: Date.now
  }
});

module.exports = mongoose.model("User_OTPS_Details", otpSchema);
