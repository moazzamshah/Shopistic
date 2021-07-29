const Order = require('../models/Order')

// find my orders
exports.myOrders =  async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate({ path: "orderItems", populate: { path: "product" } })

    // console.log('orders:', orders);    
    res.json(orders);
}

// shipping 
exports.shipping = (req, res) =>{
    console.log(req.body)
}

// create a new order
exports.createOrder = async (req, res) => {
    if (req.body.orderItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id
    });

    console.log('req.user', req.user);

    const createdOrder = await order.save();
    res.status(201).json({ message: 'New Order Created', order: createdOrder });
}

// get order details by users
exports.orderDetails =  async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order Not Found' });
    }
}


// payment process 
exports.paymentProcess =  async (req, res) => {
    // get the order via orderId in params
    const order = await Order.findById(req.params.id);

    // update order if exists 
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        // add paymentResult field in orderModel
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        //save updated order in db
        const updatedOrder = await order.save();
        // send back updated order 
        res.json({ message: 'Payment processed successfully', order: updatedOrder });
    } else {
        res.status(401).json({ message: 'Order Not Found' });
    }
}