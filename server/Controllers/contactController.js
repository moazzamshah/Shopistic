const User = require('../models/MyUser');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');


exports.contact = (req, res) => {
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
}