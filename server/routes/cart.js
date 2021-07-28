const express = require("express")
const router = express.Router()
const passport = require('passport')
const CartItem = require('../models/Cart_Item')

// Add the products to the cart
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.body, "req.body")
    const newCartItem = new CartItem({
        userId: req.body.userId,
        itemId: req.body.productId,
        qty: req.body.qty
    });

    newCartItem
        .save()
        .then(cartItem => res.json(cartItem));
})


// get the saved products in the cart
router.get('/getItems/:id', 
// passport.authenticate('jwt', { session: false }),
 (req, res) => {
    CartItem.find({ userId: req.params.id })
        .populate("itemId")
        .then(cartItems => res.json(cartItems))
        .catch(err =>
            res.status(404).json({ noCartItemFound: 'No Items found from this user' })
        );
});

// delete a product from the cart
router.delete("/:cart_item_id",
 passport.authenticate('jwt', { session: false }), 
 (req, res) => {
    CartItem.findByIdAndRemove(req.params.cart_item_id, err => {
        if (err) res.json(err);
        else res.json({
            message: "the item has been deleted from cart"
        });
    });
});


module.exports = router;