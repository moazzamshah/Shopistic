const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const passport = require('passport');
const User = require('../models/User');
const multer = require('multer');
const { allProducts, singleProduct, myProducts, updateProduct, deleteProduct } = require('../Controllers/itemsController');

//============== Settings for multer ===============
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage });

// get all the products
router.get('/', allProducts);

// Create a product by the user
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  upload.single('picture'),
  (req, res) => {
    const { title, description, price, category, countInStock } = req.body;
    if (!title || !price) {
      return res
        .status(422)
        .json({ error: 'please add all the required fields' });
    }
    req.user.password = undefined;

    const newItem = new Item({
      seller: req.user,
      title,
      description,
      price,
      picture: '/images/' + req.file.filename,
      category,
      countInStock,
    });

    newItem
      .save()
      .then((item) => res.json(item))
      .catch((err) => console.log(err));
  }
);

// get a single product
router.get('/:item_id', singleProduct);

// get items of a specific user
router.get('/mine/:userId', myProducts);

// update the products
router.patch('/:id', updateProduct);

// Deleting the product by the User
router.delete(
  '/:item_id',
  passport.authenticate('jwt', { session: false }),
  deleteProduct
);

module.exports = router;
