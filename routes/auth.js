// auth routes for CPlanify
const express = require('express');
const router = express.Router();

// for debugging
console.log("auth routes loaded");

// for login page debugging 
router.get('/login', (req, res) => {
  console.log("LOGIN ROUTE HIT");
  res.render('auth/login', { title: 'Login' });
});

// dependencies that are needed
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');


// Registration page
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Create Account' });
});

// Registration handler
router.post('/register', async (req, res) => {
  const { email, password, password2, displayName } = req.body;
  let errors = [];

  //if mot correctly filled
  if (!email || !password || !password2) {
    errors.push({ msg: 'Fill all details to continue' });
  }

  //if incorrect password match
  if (password !== password2) {
    errors.push({ msg: 'Passwords not matching!' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password too short, requires atleast 6 characters.' });
  }

  if (errors.length > 0) {
    return res.render('auth/register', {
      errors,
      email,
      displayName
    });
  }

  //if user already exists
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      req.flash('error_msg', 'Email already registered. Try logging in.');
      return res.redirect('/auth/register');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPass,
      displayName
    });

    await newUser.save();

    //successful registration
    req.flash('success_msg', 'Account creation successful. Log in...');
    res.redirect('/auth/login');

  } catch (err) {
    console.log(err);
    req.flash('error_msg', 'Something went wrong');
    res.redirect('/auth/register');
  }
});



router.post('/login', (req, res, next) => {

  console.log("Login attempt:", req.body);

  passport.authenticate('local', {
    successRedirect: '/events/calendar',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});


// logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'Logged out successfully');
    res.redirect('/auth/login');
  });
});

module.exports = router;
