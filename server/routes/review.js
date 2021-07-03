const express = require("express")
const router = express.Router()
const Review = require('../models/Review')
const passport = require('passport')


// creating a new review by the user
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

// get all the Reviews
router.get("/", (req, res) => {
    Review.find()
        .sort({ date: -1 })
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json({ errorMsg:err }));
});

// get the Reviews for a single product
router.get("/:id", (req, res) => {
    Review.find({ itemId: req.params.id })
        .sort({ date: -1 })
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json({ errorMsg:err }));
});


module.exports = router