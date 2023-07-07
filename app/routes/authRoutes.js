// app/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.renderLoginForm);
router.get('/signup', authController.renderSignupForm);
router.post('/signup', authController.handleSignup);
router.post('/login', authController.handleLogin);
router.get('/logout', authController.handleLogout);

// Add the dashboard route
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard');
});

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
