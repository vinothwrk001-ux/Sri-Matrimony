const mongoose = require('mongoose');

const membershipPlanSchema = new mongoose.Schema({
  code: {
    type: String,
    enum: ['free', 'standard', 'premium', 'platinum'],
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  nameTamil: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: 0,
  },
  durationDays: {
    type: Number,
    required: true,
    default: 90,
  },
  durationLabel: {
    type: String,
    default: '3 Months',
  },
  durationLabelTamil: {
    type: String,
    default: '3 மாதங்கள்',
  },
  contactViewsLimit: {
    type: Number,
    required: true,
    default: 0,
  },
  interestRequestsLimit: {
    type: Number,
    required: true,
    default: 5,
  },
  messagingCreditsLimit: {
    type: Number,
    required: true,
    default: 0,
  },
  features: [{
    type: String,
  }],
  featuresTamil: [{
    type: String,
  }],
  isPopular: {
    type: Boolean,
    default: false,
  },
  badge: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#4B1718',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  displayOrder: {
    type: Number,
    default: 1,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('MembershipPlan', membershipPlanSchema);
