const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },

    items: [
        {
            foodId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food'
            },

            quantity: Number,

            price: Number
        }
    ],

    totalAmount: Number,

    orderStatus: String

}, {
    timestamps: true
});

module.exports = mongoose.model(
    'Order',
    orderSchema
);