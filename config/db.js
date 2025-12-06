//This is the database connection file
// connecting my app to MongoDB 

const mongoose = require('mongoose');

// taking the connection string from .env
const mongoLink = process.env.MONGO_URI;

// trying to connect to mongo
mongoose.connect(mongoLink)
  .then(() => {
    //confirmation message
    console.log('MongoDB is connected successfully!');
  })
  .catch((err) => {
    //error message
    console.log('MongoDB connection problem:', err);
  });

module.exports = mongoose;
