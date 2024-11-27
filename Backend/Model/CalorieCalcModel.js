const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const caloriecalcSchema = new Schema({
  microchipId: {
    type: String,
  },

  date: {
    type: String,
    required: true,
  },

  activityType: {
    type: String,
    enum: ["running", "walking"],
    required: true,
  },

  weight: {
    type: Number,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  caloriesBurned: {
    type: Number,
    required: true,
  },

})

module.exports = mongoose.model(
    "CalorieCalculator",
    caloriecalcSchema
)
