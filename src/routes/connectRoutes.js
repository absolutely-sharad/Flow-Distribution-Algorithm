const express = require('express');
const router = express.Router();
const { connectUser, getConnectUserInfo } = require('../controllers/connectControllerr');

// Define route with callback function for POST method
router.post('/', (req, res) => {
  connectUser(req, res);
});

// Define route with callback function for GET method
router.get('/', (req, res) => {
  getConnectUserInfo(req, res);
});

module.exports = router;