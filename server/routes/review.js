const express = require("express")
const router = express.Router()
const Review = require('../models/Review')
const passport = require('passport')


// creating a new review
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newReview = new Review({
        userId: req.user.id,
        itemId: req.body.itemId,
        rating: req.body.rating,
        title: req.body.title,
        comment: req.body.comment
    });

    newReview
        .save()
        .then(review => res.json(review))
});


module.exports = router