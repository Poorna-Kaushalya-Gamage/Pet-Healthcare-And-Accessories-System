const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const trackingSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
},
  status1: {
    type: String,
    enum: ['packed', 'notyet'],
    required: true
  },
  date1: {
    type: Date,
    required: true
    
  },
  status2: {
    type: String,
    enum: ['dispatched', 'notyet'],
    required: true,
    
  },
  date2: {
    type: Date,
    required: true,
    
    
  },
  status3: {
    type: String,
    enum: ['notyet', 'complete'],
    required: true
  },
  date3: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model(
    "tracking", //file name
    trackingSchema //function name
)



