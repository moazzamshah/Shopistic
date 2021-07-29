const express = require('express')
const router = express.Router()
const passport = require('passport')
const OrderController = require('../Controllers/orderController')

// find my orders
router.get('/mine', passport.authenticate('jwt', { session: false }), OrderController.myOrders);

router.post('/shipping', OrderController.shipping)

// create a new order  
router.post('/', passport.authenticate('jwt', { session: false }), OrderController.createOrder);


// get order details by users
router.get('/:id', passport.authenticate('jwt', { session: false }),OrderController.orderDetails);

// payment process 
router.put('/:id/pay', passport.authenticate('jwt', { session: false }), OrderController.paymentProcess);


module.exports = router;