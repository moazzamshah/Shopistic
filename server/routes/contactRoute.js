const express = require('express');
const { contact } = require('../Controllers/contactController');
const router = express.Router();

// ========= sendGrid route ==============

router.post('/backend/sendEmail', contact);


module.exports = router;
