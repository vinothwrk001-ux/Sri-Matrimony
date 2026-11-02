const Membership = require('../models/Membership');
const MembershipPlan = require('../models/MembershipPlan');

// GET /api/membership/me
const getMyMembership = async (req, res) => {
  try {
    const membership = await Membership.findOne({ user: req.user._id, status: 'active' })
      .populate('plan')
      .populate('payment');

    if (!membership) {
      return res.status(200).json({
        success: true,
        membership: null,
        message: 'No active membership found. You are on Free Access.',
      });
    }

    res.status(200).json({
      success: true,
      membership,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/plans
const getPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find({ isActive: true }).sort({ displayOrder: 1 });
    res.status(200).json({ success: true, count: plans.length, plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMyMembership,
  getPlans,
};
