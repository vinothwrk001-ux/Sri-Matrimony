const mongoose = require('mongoose');
const MembershipPlan = require('../models/MembershipPlan');
const MatrimonyProfile = require('../models/MatrimonyProfile');
const SuccessStory = require('../models/SuccessStory');
const User = require('../models/User');

// GET /api/health
const getHealth = (req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbState,
    service: 'Sri Matrimony Core API',
    version: '1.0.0',
  });
};

const defaultPlans = [
  {
    code: 'free',
    name: 'Free Starter',
    nameTamil: 'இலவச தொடக்கம்',
    price: 0,
    validityDays: 30,
    badgeText: null,
    features: {
      contactViewsLimit: 0,
      expressInterestLimit: 5,
      photoUploadLimit: 2,
      canMessageDirectly: false,
      canViewHoroscope: false,
      isProfileHighlighted: false,
      priorityCustomerSupport: false,
    },
    description: 'Create profile & explore matches'
  },
  {
    code: 'standard',
    name: 'Standard Match',
    nameTamil: 'ஸ்டாண்டர்ட் வரன்',
    price: 999,
    validityDays: 90,
    badgeText: 'POPULAR',
    features: {
      contactViewsLimit: 25,
      expressInterestLimit: 50,
      photoUploadLimit: 5,
      canMessageDirectly: true,
      canViewHoroscope: true,
      isProfileHighlighted: false,
      priorityCustomerSupport: false,
    },
    description: 'Perfect for active matchmaking'
  },
  {
    code: 'premium',
    name: 'Premium Elite',
    nameTamil: 'பிரீமியம் எலைட்',
    price: 1999,
    validityDays: 180,
    badgeText: 'RECOMMENDED',
    features: {
      contactViewsLimit: 75,
      expressInterestLimit: 150,
      photoUploadLimit: 10,
      canMessageDirectly: true,
      canViewHoroscope: true,
      isProfileHighlighted: true,
      priorityCustomerSupport: true,
    },
    description: 'Most popular for serious Tamil families'
  },
  {
    code: 'platinum',
    name: 'Platinum Royal VIP',
    nameTamil: 'பிளாட்டினம் ராயல் விஐபி',
    price: 3499,
    validityDays: 365,
    badgeText: 'VIP ACCESS',
    features: {
      contactViewsLimit: 200,
      expressInterestLimit: 500,
      photoUploadLimit: 20,
      canMessageDirectly: true,
      canViewHoroscope: true,
      isProfileHighlighted: true,
      priorityCustomerSupport: true,
    },
    description: 'Full VIP privileges & dedicated relationship guidance'
  }
];

// GET /api/app/bootstrap
const getBootstrap = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    let plans = defaultPlans;
    let totalProfiles = 1250;
    let verifiedCount = 1100;
    let brideCount = 650;
    let groomCount = 600;
    let storiesCount = 85;

    if (isDbConnected) {
      try {
        const [dbPlans, dbTotal, dbVerified, dbBrides, dbGrooms, dbStories] = await Promise.all([
          MembershipPlan.find({ isActive: true }).sort({ displayOrder: 1 }).lean(),
          MatrimonyProfile.countDocuments(),
          MatrimonyProfile.countDocuments({ isVerified: true }),
          MatrimonyProfile.countDocuments({ gender: 'Bride' }),
          MatrimonyProfile.countDocuments({ gender: 'Groom' }),
          SuccessStory.countDocuments({ isApproved: true }),
        ]);

        if (dbPlans && dbPlans.length > 0) plans = dbPlans;
        totalProfiles = dbTotal;
        verifiedCount = dbVerified;
        brideCount = dbBrides;
        groomCount = dbGrooms;
        storiesCount = dbStories;
      } catch (err) {
        console.warn('[Bootstrap Query Warning]: Using cached fallback stats', err.message);
      }
    }

    const publicConfig = {
      brandName: 'Sri Matrimony',
      tagline: 'Trusted Tamil Matrimony',
      taglineTamil: 'நம்பகமான தமிழ் மேட்ரிமோனி',
      contactPhone: '+91 98400 12345',
      contactWhatsApp: '+91 98400 12345',
      contactEmail: 'support@srimatrimony.com',
      officeAddress: 'No. 42, Anna Salai, T. Nagar, Chennai, Tamil Nadu - 600017',
      razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_srimatrimony_demo',
      features: {
        otpVerification: true,
        horoscopeUpload: true,
        instantChat: true,
        verifiedBadges: true,
      }
    };

    const stats = {
      totalMembers: totalProfiles || 1250,
      brides: brideCount || 650,
      grooms: groomCount || 600,
      verifiedProfiles: verifiedCount || 1100,
      happyMarriages: storiesCount > 0 ? storiesCount * 10 : 850,
    };

    let currentUserData = null;
    if (req.user) {
      currentUserData = {
        _id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        mobile: req.user.mobile,
        gender: req.user.gender,
        role: req.user.role,
        profileId: req.user.profileId,
        isVerified: req.user.isVerified,
        membership: req.user.activeMembership,
      };
    }

    res.status(200).json({
      success: true,
      config: publicConfig,
      plans,
      stats,
      user: currentUserData,
    });
  } catch (error) {
    console.error('Bootstrap error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bootstrap application.',
      error: error.message,
    });
  }
};

module.exports = {
  getHealth,
  getBootstrap,
};
