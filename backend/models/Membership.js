const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MembershipPlan',
    required: true,
  },
  planCode: {
    type: String,
    enum: ['free', 'standard', 'premium', 'platinum'],
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active',
    index: true,
  },
  totalContactViews: {
    type: Number,
    default: 0,
  },
  remainingContactViews: {
    type: Number,
    default: 0,
  },
  totalInterests: {
    type: Number,
    default: 0,
  },
  remainingInterests: {
    type: Number,
    default: 0,
  },
  totalMessages: {
    type: Number,
    default: 0,
  },
  remainingMessages: {
    type: Number,
    default: 0,
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  }
}, {
  timestamps: true,
});

// Check if membership is currently active
membershipSchema.methods.isValid = function () {
  return this.status === 'active' && new Date() <= new Date(this.endDate);
};

module.exports = mongoose.model('Membership', membershipSchema);
