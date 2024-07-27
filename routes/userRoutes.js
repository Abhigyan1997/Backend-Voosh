const express = require('express');
const { register, login, googleLogin,getUser } = require('../controllers/userController');
const { validateRegistration, validateLogin } = require('../validators/userValidator');
const authenticate = require('../middleware/auth'); 

const router = express.Router();

// Registration route with validation
router.post('/register', validateRegistration, register);

// Login route with validation
router.post('/login', validateLogin, login);

// Google login route
router.post('/google-login', googleLogin);

// Route to get user details (protected)
router.get('/me', authenticate, getUser); // Protected route


module.exports = router;
