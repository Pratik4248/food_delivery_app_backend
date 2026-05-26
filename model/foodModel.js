const mongoose = require('mongoose');

const foodSchmea = new mongoose.Schema({

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },

    name: String,
    price: Number,
    image: String,
    category: String

},
    {
        timestamps: true
    });

module.exports = mongoose.model('Food', foodSchema);
