const express = require("express")
const router = express.Router()
const passport = require('passport')
const UserController = require('../Controllers/userController')
const limitter = require('express-rate-limit')

const loginLimitter = limitter({
    windowMs: 60 * 1000 ,
    max: 1000,
    message:{
        code:429,
        message: 'Too many request !! try later'
    }
})
router.post("/register", UserController.register);
router.post("/login", loginLimitter, UserController.Login);

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
