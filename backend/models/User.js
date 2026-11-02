const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator', 'verification_manager', 'support_manager'],
    default: 'user',
  },
  gender: {
    type: String,
    enum: ['Bride', 'Groom'],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  lookingFor: {
    type: String,
    enum: ['Bride', 'Groom'],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isOtpVerified: {
    type: Boolean,
    default: true, // For demo/sandbox ease
  },
  otpCode: {
    type: String,
    select: false,
  },
  otpExpiresAt: {
    type: Date,
    select: false,
  },
  activeMembership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership',
  },
  refreshToken: {
    type: String,
    select: false,
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'pending_approval'],
    default: 'active',
  },
  profileId: {
    type: String,
    unique: true,
    sparse: true,
  }
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
