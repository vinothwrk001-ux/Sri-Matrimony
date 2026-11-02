const mongoose = require('mongoose');

const contactViewSchema = new mongoose.Schema({
  viewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  viewedProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planCode: {
    type: String,
    required: true,
  },
  revealedPhone: {
    type: String,
    required: true,
  },
  revealedEmail: {
    type: String,
    required: true,
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

contactViewSchema.index({ viewer: 1, viewedProfile: 1 }, { unique: true });

module.exports = mongoose.model('ContactView', contactViewSchema);
