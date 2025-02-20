const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to create a new user
router.post('/', (req, res) => {
  userController.createUser(req, res);
});

// Route to get user information
router.get('/:userId', (req, res) => {
  userController.getUser(req, res);
});

module.exports = router;