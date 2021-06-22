const express = require("express")
const router = express.Router()
const passport = require('passport')
const CartItem = require('../models/Cart_Item')

// Add to the cart
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const newCartItem = new CartItem({
            userId: req.body.userId,
            itemId: req.body.itemId
        });

        newCartItem
            .save()
            .then(cartItem => res.json(cartItem));
    })


module.exports = router;