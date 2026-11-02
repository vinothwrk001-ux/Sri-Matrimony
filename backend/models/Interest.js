const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    default: 'I am interested in your profile. Please review my profile and let me know your response.',
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'cancelled'],
    default: 'pending',
    index: true,
  },
  respondedAt: {
    type: Date,
  }
}, {
  timestamps: true,
});

interestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

module.exports = mongoose.model('Interest', interestSchema);
