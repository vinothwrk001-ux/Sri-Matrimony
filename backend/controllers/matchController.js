const mongoose = require('mongoose');
const MatrimonyProfile = require('../models/MatrimonyProfile');
const { calculateCompatibility } = require('../services/matchingService');

// Fields to select for carousel and showcase cards
const CARD_FIELDS = 'profileId fullName gender age height maritalStatus religion caste education occupation workLocation photos isVerified completionPercentage';

// Helper to check DB readiness
const isDbReady = () => mongoose.connection.readyState === 1;

// GET /api/matches/brides - Newly Joined Brides Carousel
const getRecentBrides = async (req, res) => {
  try {
    if (!isDbReady()) {
      return res.status(200).json({ success: true, count: 0, profiles: [] });
    }
    const limit = Number(req.query.limit) || 10;
    const brides = await MatrimonyProfile.find({
      gender: 'Bride',
      'privacySettings.hideProfile': { $ne: true },
    })
      .select(CARD_FIELDS)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.status(200).json({ success: true, count: brides.length, profiles: brides });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/matches/grooms - Newly Joined Grooms Carousel
const getRecentGrooms = async (req, res) => {
  try {
    if (!isDbReady()) {
      return res.status(200).json({ success: true, count: 0, profiles: [] });
    }
    const limit = Number(req.query.limit) || 10;
    const grooms = await MatrimonyProfile.find({
      gender: 'Groom',
      'privacySettings.hideProfile': { $ne: true },
    })
      .select(CARD_FIELDS)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.status(200).json({ success: true, count: grooms.length, profiles: grooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/matches/recent - Recently Joined Members Carousel
const getRecentMembers = async (req, res) => {
  try {
    if (!isDbReady()) {
      return res.status(200).json({ success: true, count: 0, profiles: [] });
    }
    const limit = Number(req.query.limit) || 12;
    const members = await MatrimonyProfile.find({
      'privacySettings.hideProfile': { $ne: true },
    })
      .select(CARD_FIELDS)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.status(200).json({ success: true, count: members.length, profiles: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/matches/verified - Verified Profiles Showcase
const getVerifiedProfiles = async (req, res) => {
  try {
    if (!isDbReady()) {
      return res.status(200).json({ success: true, count: 0, profiles: [] });
    }
    const limit = Number(req.query.limit) || 10;
    const verified = await MatrimonyProfile.find({
      isVerified: true,
      'privacySettings.hideProfile': { $ne: true },
    })
      .select(CARD_FIELDS)
      .sort({ updatedAt: -1 })
      .limit(limit)
      .lean();

    res.status(200).json({ success: true, count: verified.length, profiles: verified });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/matches/recommended - Logged-in Personalized Recommendations
const getRecommendedMatches = async (req, res) => {
  try {
    const myProfile = await MatrimonyProfile.findOne({ user: req.user._id });
    const targetGender = req.user.lookingFor || (req.user.gender === 'Bride' ? 'Groom' : 'Bride');

    const candidates = await MatrimonyProfile.find({
      user: { $ne: req.user._id },
      gender: targetGender,
      'privacySettings.hideProfile': { $ne: true },
    })
      .select(CARD_FIELDS + ' partnerPreferences foodHabits')
      .sort({ isVerified: -1, createdAt: -1 })
      .limit(20)
      .lean();

    // Attach dynamic compatibility score to each candidate
    const matchesWithScores = candidates.map(candidate => {
      const compatibility = calculateCompatibility(myProfile, candidate);
      return {
        ...candidate,
        compatibilityScore: compatibility.score,
        matchReasons: compatibility.reasons,
      };
    });

    // Sort descending by compatibility score
    matchesWithScores.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    res.status(200).json({
      success: true,
      count: matchesWithScores.length,
      matches: matchesWithScores,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getRecentBrides,
  getRecentGrooms,
  getRecentMembers,
  getVerifiedProfiles,
  getRecommendedMatches,
};
