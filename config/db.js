console.log("db.js loaded");

// database connection file
const mongoose = require('mongoose');

// take the connection string from .env
const mongoLink = process.env.CONNECTION_STRING_MONGODB;

// connect to MongoDB
mongoose.connect(mongoLink)
  .then(() => {
    console.log('MongoDB is connected successfully!');
  })
  .catch((err) => {
    console.log('MongoDB connection problem:', err);
  });

module.exports = mongoose;
