const express = require("express")
const router = express.Router()
const passport = require('passport')
const ReviewController = require('../Controllers/reviewController')


// creating a new review by the user
router.post('/', passport.authenticate('jwt', { session: false }), ReviewController.createReview);

// get all the Reviews
router.get("/", ReviewController.getReviews);

// get the Reviews for a single product
router.get("/:id", ReviewController.reviewsSingleProduct);

// update a Review
router.patch("/:id", passport.authenticate('jwt', { session: false }), ReviewController.updateReview);

// Delete the review by the User
router.delete("/:id", passport.authenticate('jwt', { session: false }), ReviewController.deleteReview);

module.exports = router