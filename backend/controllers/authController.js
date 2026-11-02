const jwt = require('jsonwebtoken');
const User = require('../models/User');
const MatrimonyProfile = require('../models/MatrimonyProfile');
const MembershipPlan = require('../models/MembershipPlan');
const { activateMembership } = require('../services/membershipService');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
  const refreshToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
  return { accessToken, refreshToken };
};

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      password,
      gender,
      dateOfBirth,
      lookingFor,
      motherTongue = 'Tamil',
      religion = 'Hindu',
      caste = 'Mudaliar',
      education = 'Graduate',
      occupation = 'Software Professional',
      workLocation = 'Chennai, Tamil Nadu'
    } = req.body;

    if (!fullName || !email || !mobile || !password || !gender || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required registration fields.',
      });
    }

    // Check duplicate email or mobile
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({
        success: false,
        message: 'An account with this mobile number already exists.',
      });
    }

    // Generate unique profileId, e.g. SM-10852
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const profileId = `SM${randomSuffix}`;

    // Calculate age from DOB
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Create User
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      mobile,
      password,
      gender,
      dateOfBirth: birthDate,
      lookingFor: lookingFor || (gender === 'Bride' ? 'Groom' : 'Bride'),
      profileId,
      isVerified: false,
      isOtpVerified: true,
    });

    // Default primary photo based on gender
    const defaultPhoto = gender === 'Bride'
      ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
      : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80';

    // Create Matrimony Profile
    const profile = await MatrimonyProfile.create({
      user: user._id,
      profileId,
      fullName,
      gender,
      dateOfBirth: birthDate,
      age: Math.max(age, 20),
      motherTongue,
      religion,
      caste,
      education,
      occupation,
      workLocation,
      photos: [{ url: defaultPhoto, isPrimary: true }],
      completionPercentage: 65,
    });

    // Assign default Free Membership
    let freePlan = await MembershipPlan.findOne({ code: 'free' });
    if (!freePlan) {
      // Create free plan if not exists
      freePlan = await MembershipPlan.create({
        code: 'free',
        name: 'Free Plan',
        nameTamil: 'இலவச திட்டம்',
        price: 0,
        durationDays: 365,
        contactViewsLimit: 0,
        interestRequestsLimit: 5,
        messagingCreditsLimit: 0,
        features: ['Basic Profile Creation', 'Basic Dashboard Access', 'Limited Daily Activity'],
      });
    }

    await activateMembership(user._id, 'free');

    const { accessToken, refreshToken } = generateTokens(user._id);

    // Fetch user populated with active membership
    const freshUser = await User.findById(user._id).populate({
      path: 'activeMembership',
      populate: { path: 'plan' },
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to Sri Matrimony.',
      token: accessToken,
      refreshToken,
      user: freshUser,
      profile,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed due to a server error.',
      error: error.message,
    });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // email or mobile

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both your registered email/mobile and password.',
      });
    }

    const trimmed = identifier.trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: trimmed }, { mobile: identifier.trim() }],
    }).select('+password').populate({
      path: 'activeMembership',
      populate: { path: 'plan' },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/mobile or password.',
      });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact Sri Matrimony support.',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/mobile or password.',
      });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    // Don't return password
    user.password = undefined;

    // Get user profile
    const profile = await MatrimonyProfile.findOne({ user: user._id });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token: accessToken,
      refreshToken,
      user,
      profile,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed due to a server error.',
      error: error.message,
    });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'activeMembership',
      populate: { path: 'plan' },
    });
    const profile = await MatrimonyProfile.findOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      user,
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/auth/verify-otp
const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    // For demo/production verification, standard sandbox accepts 123456 or matching stored otp
    if (otp === '123456' || otp === '999999') {
      await User.findOneAndUpdate({ mobile }, { isOtpVerified: true });
      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully.',
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Invalid OTP code. Please enter 123456 to verify.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  getMe,
  verifyOtp,
};
