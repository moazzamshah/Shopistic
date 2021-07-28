const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderItems: [{
            qty: {
                type: Number,
                required: true
            },
            product: {
                type: Schema.Types.ObjectId,
                ref: 'items',
                required: true
            },
        }],
        shippingAddress: {
            fullName: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            zipcode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
        },
        paymentMethod: {
            type: String,
            required: true
        },


        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
        itemsPrice: {
            type: Number,
            required: true
        },
        shippingPrice: {
            type: Number,
            required: true
        },
        taxPrice: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: false
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        paidAt: {
            type: Date
        },
        isDelivered: {
            type: Boolean,
            default: false
        },
        deliveredAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }

);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;