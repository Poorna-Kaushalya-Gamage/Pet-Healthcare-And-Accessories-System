const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petRecordSchema = new Schema({
  microchipId: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
    trim: true, // Trim whitespace from the beginning and end of the string
  },
  date: {
    type: String,
    required: true,
   
  },
  diagnosis: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    trim: true,
  },
  treatment: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    trim: true,
  },
  specialNotes: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    trim: true,
  },
});

module.exports = mongoose.model("PetRecordBookModel", petRecordSchema);