const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/MyUser');
require('../config/fbStrategy')(passport);

router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:8000/passport/failure',
  }),
  (req, res) => {
    res.send(
      ` <h1> Hello ${req.user.name} 👋🏼  </h1> <p> You are successfully logged in 🎉 </p> `
    );
  }
);

// route for logout function
router.get('/passport/logout', function (req, res) {
  req.logout();
  res.redirect('http://localhost:3000/signinformPassport');
});

//================= GOOGLE ROUTES =============

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/passport/failure' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.send(
      ` <h1> Hello ${req.user.name} 👋🏼  </h1> <p> You are successfully logged in 🎉 </p> `
    );
  }
);

router.get('/failure', (req, res) => {
  res.json(' Login Failed 🙁 ');
});

// creating a user for testing
router.post('/register/user', async (req, res) => {
  const { name, email, password } = req.body;
  let newUser = new User({ name, email, password });
  const result = await newUser.save();
  res.send(result);
});

module.exports = router;
