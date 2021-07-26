const express = require("express")
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validateRegisteration = require('../validation/register')
const validateLogin = require('../validation/login')
const sgMail = require('@sendgrid/mail');
const passport = require('passport')

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisteration(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email already exist !!";
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            const payload = { id: user.id, email: user.email, name: user.name };

                            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            });
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = "User does not exist !!";
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            console.log(password, "password")
            console.log(user.password, "user password")
            if (isMatch) {
                const payload = { id: user.id, email: user.email, name: user.name };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token,
                        name: user.name,
                        userId: user.id
                    });
                });
            } else {
                errors.password = "Incorrect password";
                return res.status(400).json(errors);
            }
        });
    });
});

// forget password : generate a link and send it by email
router.post('/forgetpassword', async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'user email not found!!' })
    }
    const payload = {
        id: user.id,
        iat: Date.now()
    };
    const token = jwt.sign(payload, process.env.JWT_RESET_SECRET);
    user.passwordResetToken = token;
    user.passwordChangedAt = Date.now() + 60 * 1000 * 60 // expired after one hour
    await user.save();
    const resetUrl = `${req.protocol}://localhost:3000/resetPassword/${token}`;
    const resetMessage = `Forgot your password? Click on the link and submit your new password and password confirmation to ${resetUrl} \n \n if you did not reset your password. Kindly ignore this email`;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: user.email,
        from: 'a.alghetheth@gmail.com',
        subject: 'Your password reset Link valid only for 60 minutes ',
        text: resetMessage

    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email Successfully sent!')
            res.json('Email Successfully sent.')
        })
        .catch(err => console.log(err))

})

// forget password : compare the token
router.get('/resetPassword/:token', async (req, res) => {
    /* res.json(req.params.token) */
    const token = req.params.token;

    try {
        const user = await User.findOne({ passwordResetToken: token });
        if (user) {
            jwt.verify(user.passwordResetToken, process.env.JWT_RESET_SECRET, (err, decode) => {
                console.log(decode)
                User.findById(decode.id, function (err, user) {
                    if (err) {
                        return res.status(500).send("An unexpected error occurred");
                    }

                    if (!user) {
                        return res.status(404).send({ message: `We were unable to find a user for this token.` });
                    }
                    const id = decode.id
                    return res.json({ msg: 'token is correct', token, id })
                })
            })

        }
        else {
            res.status(500).json({ msg: 'invalid token or maybe your token expired!!' })
        }


    } catch (error) {
        res.status(500).json({ msg: 'server error !!' })

    }

})

// change the password in the database
router.post('/resetPassword/password/:id', (req, res) => {
    const id = req.params.id
    User.findById(id, function (err, user) {

        bcrypt.genSalt(10, (err, salt) => {
            console.log(req.body.password)
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                console.log(user.password, " password2")
                User.findByIdAndUpdate(id, { password: hash, passwordResetToken: "" }, (err, user) => {
                    // Send mail confirming password change to the user
                    const msg = {
                        to: user.email,
                        from: 'a.alghetheth@gmail.com',
                        subject: "Your password has been changed",
                        html: `<p>This is a confirmation that the password for your account ${user.email} has just been changed. </p>`,
                    };
                    sgMail.send(msg)
                        .then(() => {
                            res.json('successfully changed the password')
                        })
                        .catch(() => {
                            return res.status(503).send({
                                message: `Can not send an email to ${user.email}, try again!!.`,
                            });
                        });
                })


            })
        })

    })
})

// user Profile details
router.get('/profile/:id', async (req, res) => {
    //get user info from User db
    const user = await User.findById(req.params.id);
    //send user obj backto front end if there is user
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User Not Found' });
    }

});

// update profile
router.put('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password
        });
    }
});

// profile details
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User Not Found' });
    }

});


module.exports = router
