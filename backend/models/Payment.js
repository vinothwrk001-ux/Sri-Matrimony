const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MembershipPlan',
    required: true,
  },
  planCode: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    default: '',
  },
  razorpaySignature: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'captured', 'failed', 'refunded'],
    default: 'pending',
    index: true,
  },
  paymentMethod: {
    type: String,
    default: 'Razorpay / UPI / Card',
  },
  invoiceNumber: {
    type: String,
    unique: true,
    required: true,
  },
  notes: {
    type: Object,
    default: {},
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Payment', paymentSchema);
