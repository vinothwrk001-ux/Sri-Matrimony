const MatrimonyProfile = require('../models/MatrimonyProfile');

// GET /api/search
const searchProfiles = async (req, res) => {
  try {
    const {
      lookingFor,
      ageMin,
      ageMax,
      religion,
      caste,
      location,
      education,
      occupation,
      maritalStatus,
      isVerified,
      page = 1,
      limit = 12,
    } = req.query;

    const query = { 'privacySettings.hideProfile': { $ne: true } };

    if (lookingFor) {
      query.gender = lookingFor;
    }

    if (ageMin || ageMax) {
      query.age = {};
      if (ageMin) query.age.$gte = Number(ageMin);
      if (ageMax) query.age.$lte = Number(ageMax);
    }

    if (religion && religion !== 'All' && religion !== 'Any') {
      query.religion = new RegExp(religion, 'i');
    }

    if (caste && caste !== 'All' && caste !== 'Any') {
      query.caste = new RegExp(caste, 'i');
    }

    if (location && location !== 'All') {
      query.workLocation = new RegExp(location, 'i');
    }

    if (education && education !== 'All') {
      query.education = new RegExp(education, 'i');
    }

    if (occupation && occupation !== 'All') {
      query.occupation = new RegExp(occupation, 'i');
    }

    if (maritalStatus && maritalStatus !== 'All') {
      query.maritalStatus = maritalStatus;
    }

    if (isVerified === 'true') {
      query.isVerified = true;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [profiles, total] = await Promise.all([
      MatrimonyProfile.find(query)
        .select('profileId fullName gender age height maritalStatus religion caste education occupation workLocation photos isVerified completionPercentage createdAt')
        .sort({ isVerified: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      MatrimonyProfile.countDocuments(query),
    ]);

    // Check membership restrictions:
    // If not authenticated or free member, indicate that full details and contact views are locked behind membership
    const isPaidMember = req.user?.activeMembership?.planCode && req.user?.activeMembership?.planCode !== 'free';

    res.status(200).json({
      success: true,
      count: profiles.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      isPaidMember,
      profiles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  searchProfiles,
};
