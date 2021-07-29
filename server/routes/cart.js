const express = require("express")
const router = express.Router()
const passport = require('passport');
const { addToCart, getItems, deleteCart } = require("../Controllers/cartController");

// Add the products to the cart
router.post('/', passport.authenticate('jwt', { session: false }), addToCart)


// get the saved products in the cart
router.get('/getItems/:id',
    // passport.authenticate('jwt', { session: false }),
    getItems);

// delete a product from the cart
router.delete("/:cart_item_id",
    passport.authenticate('jwt', { session: false }),
    deleteCart);


module.exports = router;