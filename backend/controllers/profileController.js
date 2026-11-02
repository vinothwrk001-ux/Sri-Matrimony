const MatrimonyProfile = require('../models/MatrimonyProfile');
const User = require('../models/User');
const ContactView = require('../models/ContactView');
const { calculateCompatibility } = require('../services/matchingService');

// Mask phone: +91 98400 12345 -> +91 98400 •••••
const maskPhone = (phone) => {
  if (!phone) return '••••••••••';
  return phone.slice(0, 7) + ' •••••';
};

// Mask email: raghavan@gmail.com -> r•••••@gmail.com
const maskEmail = (email) => {
  if (!email) return '•••••@••••.com';
  const parts = email.split('@');
  return parts[0].slice(0, 2) + '•••••@' + (parts[1] || 'email.com');
};

// Calculate completion percentage based on filled fields
const calculateProfileCompletion = (profile) => {
  let score = 30; // base for registration
  if (profile.aboutMe && profile.aboutMe.length > 20) score += 10;
  if (profile.education && profile.occupation) score += 15;
  if (profile.annualIncome) score += 10;
  if (profile.fatherOccupation || profile.familyLocation) score += 10;
  if (profile.photos && profile.photos.length > 0) score += 15;
  if (profile.partnerPreferences?.ageMin) score += 10;
  return Math.min(score, 100);
};

// GET /api/profiles/me
const getMyProfile = async (req, res) => {
  try {
    let profile = await MatrimonyProfile.findOne({ user: req.user._id });
    if (!profile) {
      profile = await MatrimonyProfile.create({
        user: req.user._id,
        profileId: req.user.profileId || `SM${Math.floor(10000 + Math.random() * 90000)}`,
        fullName: req.user.fullName,
        gender: req.user.gender,
        dateOfBirth: req.user.dateOfBirth,
        age: 26,
      });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/profiles/me
const updateMyProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData.user;
    delete updateData.profileId; // Cannot change assigned ID

    let profile = await MatrimonyProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    Object.assign(profile, updateData);
    profile.completionPercentage = calculateProfileCompletion(profile);

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/profiles/:id
const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    // Find by either profileId (SM1001) or MongoDB _id
    const query = id.startsWith('SM') ? { profileId: id } : { _id: id };

    const profile = await MatrimonyProfile.findOne(query).populate('user', 'fullName email mobile isVerified role');
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Matrimonial profile not found.' });
    }

    // Increment profile views count
    profile.viewsCount = (profile.viewsCount || 0) + 1;
    await profile.save();

    let isContactUnlocked = false;
    let revealedContact = null;
    let compatibility = { score: 75, reasons: ['Common cultural roots'] };

    // Check if viewer is logged in
    if (req.user) {
      // If viewer is viewing their own profile
      if (profile.user._id.toString() === req.user._id.toString()) {
        isContactUnlocked = true;
        revealedContact = {
          mobile: req.user.mobile,
          email: req.user.email,
        };
      } else {
        // Check if contact view record exists
        const contactView = await ContactView.findOne({
          viewer: req.user._id,
          viewedProfile: profile.user._id,
        });

        if (contactView) {
          isContactUnlocked = true;
          revealedContact = {
            mobile: contactView.revealedPhone,
            email: contactView.revealedEmail,
          };
        }

        // Calculate dynamic compatibility with viewer
        const viewerProfile = await MatrimonyProfile.findOne({ user: req.user._id });
        if (viewerProfile) {
          compatibility = calculateCompatibility(viewerProfile, profile);
        }
      }
    }

    const responseProfile = profile.toObject();

    // If contact is not authorized/unlocked, strictly mask contact details!
    if (!isContactUnlocked) {
      responseProfile.contact = {
        isUnlocked: false,
        mobile: maskPhone(profile.user?.mobile),
        email: maskEmail(profile.user?.email),
      };
    } else {
      responseProfile.contact = {
        isUnlocked: true,
        mobile: revealedContact?.mobile || profile.user?.mobile,
        email: revealedContact?.email || profile.user?.email,
      };
    }

    // Remove user sensitive data
    delete responseProfile.user;

    res.status(200).json({
      success: true,
      profile: responseProfile,
      compatibility,
      isContactUnlocked,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/profiles/request-verification
const requestVerification = async (req, res) => {
  try {
    const { idType, documentUrl } = req.body;
    const profile = await MatrimonyProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

    profile.verificationDetails = {
      idType: idType || 'Aadhaar Card',
      status: 'pending',
      verifiedAt: null,
    };
    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Verification request submitted. Our team will verify your document within 24 hours.',
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/profiles/privacy-settings
const updatePrivacySettings = async (req, res) => {
  try {
    const { showMobileTo, showEmailTo, photoVisibility, hideProfile } = req.body;
    const profile = await MatrimonyProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

    profile.privacySettings = {
      showMobileTo: showMobileTo || profile.privacySettings.showMobileTo,
      showEmailTo: showEmailTo || profile.privacySettings.showEmailTo,
      photoVisibility: photoVisibility || profile.privacySettings.photoVisibility,
      hideProfile: typeof hideProfile === 'boolean' ? hideProfile : profile.privacySettings.hideProfile,
    };

    await profile.save();
    res.status(200).json({ success: true, message: 'Privacy settings updated successfully.', privacySettings: profile.privacySettings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  getProfileById,
  requestVerification,
  updatePrivacySettings,
};
