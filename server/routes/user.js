const express = require("express")
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validateRegisteration = require('../validation/register')
const validateLogin = require('../validation/login')
const sgMail = require('@sendgrid/mail');

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
            if (isMatch) {
                const payload = { id: user.id, email: user.email, name: user.name };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
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
        subject: 'Your password reset Link calid only for 60 minutes ',
        templateId: process.env.templateId,
        dynamicTemplateData: {


            message: resetMessage

        }

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
            res.json({ msg: 'token is correct', token })
        }
        else {
            res.status(500).json({ msg: 'invalid token !!' })
        }

    } catch (error) {
        res.status(500).json({ msg: 'server error !!' })

    }


})




module.exports = router