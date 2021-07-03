const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'items'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('review', ReviewSchema);