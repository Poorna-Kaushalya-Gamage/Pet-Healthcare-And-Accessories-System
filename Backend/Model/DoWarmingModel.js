const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doWarmingSchema = new Schema({
  microchipId: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  date: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200,
  },
  nextDate: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const nextDate = new Date(value);
        const currentDate = new Date(this.date);
        return nextDate > currentDate;
      },
      message: "Next Do-Warming date must be after the Do-Warming Date.",
    },
  },
});

module.exports = mongoose.model("DoWarmingRecords", doWarmingSchema);