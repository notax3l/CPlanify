// Event model for CPlanify
// this is the file that will contain event details like title, date, time, description, color, user etc.


const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

  title: 
  {
    type: String,
    required: true
  },

  date: 
  {
    type: String,   // storing as string because it's easier for the forms + calendar
    required: true
  },

  // optional time fields
  startTime: 
  {
    type: String,
    required: false
  },

  endTime: 
  {
    type: String,
    required: false
  },

  description: 
  {
    type: String,
    required: false
  },

  color: 
  {
    type: String,
    default: '#3b82f6' 
  },

  // the user info
  user: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

});

module.exports = mongoose.model('Event', EventSchema);
