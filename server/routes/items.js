const express = require("express")
const router = express.Router()
const Item = require('../models/Item');
const passport = require('passport')

// get all the products
router.get("/", (req, res) => {
    Item.find()
        .populate('seller', "_id name")
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => res.status(404).json({ noItemsFound: "No items found" }));
});


// Create a product by the user
router.post('/create',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { title, description, price, picture, category } = req.body
        if (!title || !price) {
            return res.status(422).json({ error: "please add all the required fields" })
        }
        req.user.password = undefined
        const newItem = new Item({
            seller: req.user,
            title,
            description,
            price,
            picture,
            category
        });

        newItem
            .save()
            .then(item => res.json(item))
            .catch(err => console.log(err))
    }
);


module.exports = router