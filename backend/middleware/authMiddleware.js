const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Membership = require('../models/Membership');

const JWT_SECRET = process.env.JWT_SECRET || 'sri_matrimony_super_secure_jwt_secret_2026';

// Authenticate JWT Token
const authenticateUser = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in to access this resource.',
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).populate({
      path: 'activeMembership',
      populate: { path: 'plan' },
    });

    if (!user || user.status === 'suspended') {
      return res.status(401).json({
        success: false,
        message: 'Account is suspended or invalid.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please log in again.',
    });
  }
};

// Optional authentication for public browsing that enhances experience if logged in
const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id).populate('activeMembership');
      if (user && user.status === 'active') {
        req.user = user;
      }
    }
  } catch (err) {
    // Silently continue as guest
  }
  next();
};

// Role-based Access Control
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have permission to perform this administrative action.',
      });
    }
    next();
  };
};

// Strictly enforce Active Paid Membership on backend
const requireActiveMembership = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  // Admins bypass
  if (req.user.role === 'admin') {
    return next();
  }

  const membership = req.user.activeMembership;
  if (!membership) {
    return res.status(403).json({
      success: false,
      code: 'MEMBERSHIP_REQUIRED',
      message: 'This feature requires an active paid membership plan. Please upgrade to continue.',
    });
  }

  const isExpired = new Date() > new Date(membership.endDate);
  if (membership.status !== 'active' || isExpired) {
    return res.status(403).json({
      success: false,
      code: 'MEMBERSHIP_EXPIRED',
      message: 'Your membership has expired. Please renew your plan to continue accessing matches and contacts.',
    });
  }

  if (membership.planCode === 'free') {
    return res.status(403).json({
      success: false,
      code: 'UPGRADE_REQUIRED',
      message: 'This feature is available exclusively to Standard, Premium, or Platinum members.',
    });
  }

  next();
};

module.exports = {
  authenticateUser,
  optionalAuth,
  requireRole,
  requireActiveMembership,
  JWT_SECRET,
};
