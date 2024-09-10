// Import required modules
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

// Export the router
module.exports = router;