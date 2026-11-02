const User = require('../models/User');
const MatrimonyProfile = require('../models/MatrimonyProfile');
const Membership = require('../models/Membership');
const MembershipPlan = require('../models/MembershipPlan');
const Payment = require('../models/Payment');
const { ContactMessage, AuditLog } = require('../models/SupportModels');

// GET /api/admin/metrics
const getDashboardMetrics = async (req, res) => {
  try {
    const [
      totalMembers,
      totalBrides,
      totalGrooms,
      verifiedProfiles,
      pendingVerifications,
      activePaidMembers,
      freeMembers,
      totalRevenueResult,
      paymentsCount,
      inquiriesCount,
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      MatrimonyProfile.countDocuments({ gender: 'Bride' }),
      MatrimonyProfile.countDocuments({ gender: 'Groom' }),
      MatrimonyProfile.countDocuments({ isVerified: true }),
      MatrimonyProfile.countDocuments({ 'verificationDetails.status': 'pending' }),
      Membership.countDocuments({ status: 'active', planCode: { $ne: 'free' } }),
      Membership.countDocuments({ status: 'active', planCode: 'free' }),
      Payment.aggregate([
        { $match: { status: 'captured' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Payment.countDocuments(),
      ContactMessage.countDocuments({ status: 'new' }),
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;

    res.status(200).json({
      success: true,
      metrics: {
        totalMembers,
        totalBrides,
        totalGrooms,
        verifiedProfiles,
        pendingVerifications,
        activePaidMembers,
        freeMembers,
        totalRevenue,
        paymentsCount,
        inquiriesCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/members
const getMembers = async (req, res) => {
  try {
    const { page = 1, limit = 15, search = '', gender, status, isVerified } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { fullName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { mobile: new RegExp(search, 'i') },
        { profileId: new RegExp(search, 'i') },
      ];
    }

    if (gender) query.gender = gender;
    if (status) query.status = status;
    if (isVerified !== undefined) query.isVerified = isVerified === 'true';

    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
      User.find(query)
        .populate({
          path: 'activeMembership',
          populate: { path: 'plan' },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      User.countDocuments(query),
    ]);

    // Attach basic profile data
    const populated = await Promise.all(
      users.map(async (u) => {
        const profile = await MatrimonyProfile.findOne({ user: u._id })
          .select('religion caste education occupation workLocation isVerified verificationDetails photos')
          .lean();
        return { ...u, profile };
      })
    );

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      members: populated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/members/:id/verify
const verifyMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, badge = 'Official Verified' } = req.body; // status: 'verified' or 'rejected'

    const isVerified = status === 'verified';

    const user = await User.findByIdAndUpdate(id, { isVerified }, { new: true });
    const profile = await MatrimonyProfile.findOneAndUpdate(
      { user: id },
      {
        isVerified,
        verificationBadge: isVerified ? badge : 'Basic Verified',
        'verificationDetails.status': isVerified ? 'verified' : 'rejected',
        'verificationDetails.verifiedAt': isVerified ? new Date() : null,
      },
      { new: true }
    );

    await AuditLog.create({
      actor: req.user._id,
      actorRole: req.user.role,
      action: `Profile Verification: ${status}`,
      entityType: 'User',
      entityId: id,
      details: { badge, isVerified },
    });

    res.status(200).json({
      success: true,
      message: `Member profile verification marked as ${status}.`,
      user,
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/members/:id/status
const toggleMemberStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'active' or 'suspended'

    const user = await User.findByIdAndUpdate(id, { status }, { new: true });

    await AuditLog.create({
      actor: req.user._id,
      actorRole: req.user.role,
      action: `Account Status changed to ${status}`,
      entityType: 'User',
      entityId: id,
    });

    res.status(200).json({ success: true, message: `User status changed to ${status}`, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'fullName email mobile profileId')
      .populate('plan', 'name code price')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    res.status(200).json({ success: true, count: payments.length, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/plans/:code
const updatePlan = async (req, res) => {
  try {
    const { code } = req.params;
    const updated = await MembershipPlan.findOneAndUpdate({ code }, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Plan updated successfully', plan: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/inquiries
const getContactInquiries = async (req, res) => {
  try {
    const inquiries = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardMetrics,
  getMembers,
  verifyMember,
  toggleMemberStatus,
  getPayments,
  updatePlan,
  getContactInquiries,
};
