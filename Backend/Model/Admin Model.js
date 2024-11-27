const mongoose = require('mongoose');

// Define the schema for the employee document
const employeeSchema = new mongoose.Schema({
  userimage:{
    type: String,
    default: "",
},
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(value) {
        // Check if the phone number contains only digits and is exactly 10 characters long
        return /^\d{10}$/.test(value);
      },
      message: 'Phone number must be exactly 10 digits long'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  employeeID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  department: {
    type: String,
    enum: ['Veterinary Services', 'Reception', 'Administration'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  employmentStatus: {
    type: String,
    enum: ['Full time', 'Part time', 'Contract'],
    required: true
  },
  password:{
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
  }
});

// Create a model using the schema
module.exports  = mongoose.model('Employee_Details', employeeSchema);
