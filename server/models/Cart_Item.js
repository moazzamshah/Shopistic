const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	itemId: {
		type: Schema.Types.ObjectId,
		ref: 'items'
	},
	qty: {
		type:Number
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('cartItem', CartItemSchema);