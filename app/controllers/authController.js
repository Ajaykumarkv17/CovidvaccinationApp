// app/controllers/authController.js

const bcrypt = require('bcrypt');
const passport = require('../../config/passport')
const User = require('../models/User');

function renderLoginForm(req, res) {
  res.render('auth/login')
}

function renderSignupForm(req, res) {
  res.render('auth/signup');
}

async function handleSignup(req, res) {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      req.flash('error', 'User with this email already exists');
      return res.redirect('/signup');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const userId = await User.createUser(username, email, hashedPassword);

    // Log in the user
    req.login(userId, (error) => {
      if (error) {
        console.error('Error logging in user:', error);
        req.flash('error', 'Failed to log in');
        return res.redirect('/signup');
      }
      res.redirect('/dashboard');
    });
  } catch (error) {
    console.error('Error signing up:', error);
    req.flash('error', 'Failed to sign up');
    res.redirect('/signup');
  }
}

function handleLogin(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
}

function handleLogout(req, res) {
  req.logout();
  res.redirect('/');
}

module.exports = {
  renderLoginForm,
  renderSignupForm,
  handleSignup,
  handleLogin,
  handleLogout,
};
