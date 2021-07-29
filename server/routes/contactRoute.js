const express = require('express');
const router = express.Router();
const User = require('../models/MyUser');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');


// creating users and saving the data
router.post('/user/create', (req, res) => {
  // const {name, email, message} = req.body
  const newUser = new User(req.body)
  newUser.save((error, doc) => {
    if(error) throw error;
    res.json(doc);
    console.log(doc);
  });
})

// getting all the users
router.get('/users', (req,res) => {
  User.find({}, (err, users) => {
    if(err) throw err;
    res.json(users)
  })
})

// ========= sendGrid route ==============

router.post('/backend/sendEmail', (req, res) => {
  sgMail.setApiKey(process.env.SEND_GRID_API);
  const { name, message, email } = req.body;
  const msg = {
    to: 'a.alghetheth@gmail.com',
    from: `${email}`,
    subject: 'Sending from Send Grid',
    text: 'Just a sample message sending from sendgrid',
    html: ` <h2>Hi Sendding this message from ${name} </h2>
  <p> Message: ${message} </p>
  <h3> user Email: ${email} </h3>
  `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email send successfully');
    })
    .catch((error) => console.log(error));
});






module.exports = router;
