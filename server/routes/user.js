const express = require('express');
const { registerUser, registerAdmin, loginUser, getProfile, logoutUser } = require('../controllers/user');
const { verify, verifyAdmin, isLoggedIn } = require("../auth");

const router = express.Router();

// Register User
router.post('/register', registerUser);

// Admin registration
router.post('/admin/register', verifyAdmin, registerAdmin);

// Login User
router.post('/login', loginUser);

// Get Profile
router.get('/profile', getProfile);

// Logout User
router.post('/logout', logoutUser);

module.exports = router;
