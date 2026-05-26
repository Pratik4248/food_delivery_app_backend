const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantName: String,

    address: String,
    cuisine: [String],
    rating: Number,
    image: String
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Restaurant', restaurantSchema);