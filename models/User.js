// User model for CPlanify
//contains user info like email, password, github id , display name and all

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
  
  email: 
  {
    type: String,
    required: false, 
  },

   password: 
  {
    type: String,
    required: false,
  },

  
  githubId: 
  {
    type: String,
    required: false
  },
  displayName:
{
    type: String,
    required: false
  }

});

module.exports = mongoose.model('User', UserSchema);
