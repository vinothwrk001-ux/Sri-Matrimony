const mongoose = require('mongoose');

const shortlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shortlistedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notes: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

shortlistSchema.index({ user: 1, shortlistedUser: 1 }, { unique: true });

module.exports = mongoose.model('Shortlist', shortlistSchema);
