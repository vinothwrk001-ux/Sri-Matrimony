const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
  groomName: {
    type: String,
    required: true,
  },
  brideName: {
    type: String,
    required: true,
  },
  marriageDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  storyTamil: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: 'Chennai, Tamil Nadu',
  },
  rating: {
    type: Number,
    default: 5,
  },
  isFeatured: {
    type: Boolean,
    default: true,
  },
  isApproved: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('SuccessStory', successStorySchema);
