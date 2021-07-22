const express = require("express")
const router = express.Router()
const {protect, admin} = require("../middlewares/authMiddleware");
const Item = require("../models/Item");
const Order = require('../models/Order');

// Create Item
router.post('/items', protect, admin, async (req, res) => {
  const { title , description, price, category } = req.body;

  const item = await Item.create({ title, description, price, category });

  if(item) {
    res.status(200).json({success: true, message: 'Item created.'});
  } else {
    if (item) {
      res.status(400).json({ success: false, message: 'Problem creating item.' });
    }
  }
});

// Update Item
router.put('/items/:id', protect, admin, async (req, res) => {
});

// All orders
router.get('/orders', protect, admin, async (req, res) => {
  res.json(await Order.find({}));
});
router.put('/orders/:id', protect, admin, async (req, res) => {});

// Only users orders
router.get('/orders', protect, async (req, res) => {});

module.exports = router;
