const express = require("express")
const router = express.Router()
const passport = require('passport')
const UserController = require('../Controllers/userController')

router.post("/register", UserController.register);
router.post("/login", UserController.Login);
router.post('/forgetpassword', UserController.ForgetPassword)

// forget password : compare the token
router.get('/resetPassword/:token', UserController.CompareToken)

// change the password in the database
router.post('/resetPassword/password/:id', UserController.ResetPassword)

// user Profile details
router.get('/profile/:id', UserController.ProfileDetails);

// update profile
router.put('/profile', passport.authenticate('jwt', { session: false }), UserController.UpdateProfile);

// details
router.get('/:id', passport.authenticate('jwt', { session: false }), UserController.Details);


module.exports = router
