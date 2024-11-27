const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  birthday: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        // Check if the value is a valid date and not in the future
        return value instanceof Date && value <= new Date();
      },
      message: "Birthday must be a valid date and cannot be in the future.",
    },
  },
  sex: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(value) {
        return value !== 0; // Check if the value is not exactly 0
      },
      message: "Weight must be greater than 0.",
    },
  },
  microchipId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
  },
  petImage: {
    type: String,
    trim: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pet_details", petSchema);
