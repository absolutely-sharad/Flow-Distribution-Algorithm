// src/models/userModel.js

const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  preferences: {
    type: String, // You can adjust the type of preferences based on your requirements
    default: null
  }
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;