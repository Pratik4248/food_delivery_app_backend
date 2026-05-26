const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },

  razorpayPaymentId: String,

  amount: Number,

  paymentStatus: String

}, {
  timestamps: true
});

module.exports = mongoose.model(
  'Payment',
  paymentSchema
);