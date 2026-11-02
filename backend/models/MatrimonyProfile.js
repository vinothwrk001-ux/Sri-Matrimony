const mongoose = require('mongoose');

const matrimonyProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  profileId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Bride', 'Groom'],
    required: true,
    index: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    index: true,
  },
  height: {
    type: String, // e.g. "5 ft 4 in / 162 cm"
    default: "5 ft 4 in",
  },
  maritalStatus: {
    type: String,
    enum: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'],
    default: 'Never Married',
    index: true,
  },
  physicalStatus: {
    type: String,
    default: 'Normal',
  },
  motherTongue: {
    type: String,
    default: 'Tamil',
  },
  // Religious details
  religion: {
    type: String,
    default: 'Hindu',
    index: true,
  },
  caste: {
    type: String,
    default: 'Vanniyar',
    index: true,
  },
  subCaste: {
    type: String,
    default: '',
  },
  gothram: {
    type: String,
    default: '',
  },
  dosham: {
    type: String,
    enum: ['No Dosham', 'Chevvai Dosham', 'Sarpa Dosham', 'Kala Sarpa Dosham', 'Don\'t Know'],
    default: 'No Dosham',
  },
  raasi: {
    type: String,
    default: '',
  },
  nakshatra: {
    type: String,
    default: '',
  },
  // Education & Career
  education: {
    type: String,
    default: 'B.E / B.Tech',
    index: true,
  },
  educationDetails: {
    type: String,
    default: '',
  },
  college: {
    type: String,
    default: '',
  },
  occupation: {
    type: String,
    default: 'Software Engineer',
    index: true,
  },
  company: {
    type: String,
    default: '',
  },
  annualIncome: {
    type: String,
    default: '8 - 12 Lakhs P.A.',
  },
  workLocation: {
    type: String,
    default: 'Chennai, Tamil Nadu',
    index: true,
  },
  citizenship: {
    type: String,
    default: 'India',
  },
  // Family Information
  fatherName: { type: String, default: '' },
  fatherOccupation: { type: String, default: 'Business' },
  motherName: { type: String, default: '' },
  motherOccupation: { type: String, default: 'Homemaker' },
  brothers: { type: Number, default: 0 },
  sisters: { type: Number, default: 0 },
  familyType: {
    type: String,
    enum: ['Nuclear Family', 'Joint Family'],
    default: 'Nuclear Family',
  },
  familyStatus: {
    type: String,
    enum: ['Middle Class', 'Upper Middle Class', 'Affluent', 'Rich'],
    default: 'Upper Middle Class',
  },
  familyLocation: {
    type: String,
    default: 'Chennai',
  },
  familyValues: {
    type: String,
    enum: ['Traditional', 'Moderate', 'Liberal'],
    default: 'Moderate',
  },
  // Lifestyle
  foodHabits: {
    type: String,
    enum: ['Vegetarian', 'Non-Vegetarian', 'Eggetarian'],
    default: 'Vegetarian',
  },
  smoking: {
    type: String,
    enum: ['No', 'Occasionally', 'Yes'],
    default: 'No',
  },
  drinking: {
    type: String,
    enum: ['No', 'Occasionally', 'Yes'],
    default: 'No',
  },
  hobbies: [{ type: String }],
  aboutMe: {
    type: String,
    default: 'Welcome to my profile. I am a warm, family-oriented professional looking for a compatible companion.',
  },
  aboutFamily: {
    type: String,
    default: 'We are a close-knit and respected family based in Tamil Nadu.',
  },
  // Partner Preferences
  partnerPreferences: {
    ageMin: { type: Number, default: 22 },
    ageMax: { type: Number, default: 32 },
    heightMin: { type: String, default: "5 ft 0 in" },
    heightMax: { type: String, default: "6 ft 2 in" },
    maritalStatus: [{ type: String, default: 'Never Married' }],
    religion: [{ type: String, default: 'Hindu' }],
    caste: [{ type: String }],
    casteNoBar: { type: Boolean, default: false },
    education: [{ type: String }],
    occupation: [{ type: String }],
    incomeMin: { type: String, default: '5 Lakhs+' },
    locations: [{ type: String, default: 'Tamil Nadu' }],
    foodHabits: [{ type: String }],
  },
  // Photos
  photos: [
    {
      url: { type: String, required: true },
      isPrimary: { type: Boolean, default: false },
      caption: { type: String, default: '' },
      uploadedAt: { type: Date, default: Date.now },
    }
  ],
  horoscopeUrl: {
    type: String,
    default: '',
  },
  // Verification & Trust
  isVerified: {
    type: Boolean,
    default: false,
    index: true,
  },
  verificationBadge: {
    type: String,
    default: 'Basic Verified',
  },
  verificationDetails: {
    idType: { type: String, default: 'Aadhaar' },
    verifiedAt: { type: Date },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['unverified', 'pending', 'verified', 'rejected'],
      default: 'unverified',
    }
  },
  // Metrics & Privacy
  completionPercentage: {
    type: Number,
    default: 85,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  shortlistsCount: {
    type: Number,
    default: 0,
  },
  interestsReceivedCount: {
    type: Number,
    default: 0,
  },
  privacySettings: {
    showMobileTo: {
      type: String,
      enum: ['paid_only', 'interests_accepted', 'nobody'],
      default: 'paid_only',
    },
    showEmailTo: {
      type: String,
      enum: ['paid_only', 'interests_accepted', 'nobody'],
      default: 'paid_only',
    },
    photoVisibility: {
      type: String,
      enum: ['all', 'paid_only', 'accepted_only'],
      default: 'all',
    },
    hideProfile: {
      type: Boolean,
      default: false,
    }
  }
}, {
  timestamps: true,
});

// Indexes for fast partner search
matrimonyProfileSchema.index({ gender: 1, age: 1, religion: 1, caste: 1 });
matrimonyProfileSchema.index({ isVerified: 1, createdAt: -1 });

module.exports = mongoose.model('MatrimonyProfile', matrimonyProfileSchema);
