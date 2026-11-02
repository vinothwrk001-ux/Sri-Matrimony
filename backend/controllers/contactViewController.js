const ContactView = require('../models/ContactView');
const User = require('../models/User');
const MatrimonyProfile = require('../models/MatrimonyProfile');
const Notification = require('../models/Notification');
const { deductContactCredit } = require('../services/membershipService');

// POST /api/contact-views/reveal
const revealContact = async (req, res) => {
  try {
    const { targetUserId } = req.body;

    if (!targetUserId) {
      return res.status(400).json({ success: false, message: 'Target user ID is required.' });
    }

    if (targetUserId.toString() === req.user._id.toString()) {
      return res.status(200).json({
        success: true,
        contact: {
          mobile: req.user.mobile,
          email: req.user.email,
        },
        message: 'Your own contact information.',
      });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'Target member not found.' });
    }

    // 1. Check if user has already unlocked this contact before
    const existingView = await ContactView.findOne({
      viewer: req.user._id,
      viewedProfile: targetUserId,
    });

    if (existingView) {
      return res.status(200).json({
        success: true,
        isAlreadyUnlocked: true,
        contact: {
          mobile: existingView.revealedPhone,
          email: existingView.revealedEmail,
        },
        viewedAt: existingView.viewedAt,
        message: 'Contact already unlocked previously. No additional credits deducted.',
      });
    }

    // 2. Not previously unlocked: strictly require Active Paid Membership with credits!
    const deductResult = await deductContactCredit(req.user._id);

    if (!deductResult.success) {
      if (deductResult.reason === 'NO_ACTIVE_MEMBERSHIP') {
        return res.status(403).json({
          success: false,
          code: 'MEMBERSHIP_REQUIRED',
          message: 'Viewing verified phone numbers and emails requires an active paid membership plan. Please choose a plan to continue.',
        });
      }
      if (deductResult.reason === 'MEMBERSHIP_EXPIRED') {
        return res.status(403).json({
          success: false,
          code: 'MEMBERSHIP_EXPIRED',
          message: 'Your membership plan has expired. Please renew your plan to continue viewing contact details.',
        });
      }
      if (deductResult.reason === 'INSUFFICIENT_CREDITS') {
        return res.status(403).json({
          success: false,
          code: 'INSUFFICIENT_CREDITS',
          message: 'You have exhausted your contact view credits for this billing cycle. Please upgrade your membership to view more contacts.',
        });
      }
    }

    // 3. Create ContactView record
    const newContactView = await ContactView.create({
      viewer: req.user._id,
      viewedProfile: targetUserId,
      planCode: deductResult.planCode || 'standard',
      revealedPhone: targetUser.mobile,
      revealedEmail: targetUser.email,
    });

    // 4. Notify target member
    await Notification.create({
      recipient: targetUserId,
      sender: req.user._id,
      type: 'profile_view',
      title: 'Contact Viewed',
      message: `${req.user.fullName} viewed your contact details.`,
      link: '/dashboard/contact-views',
    });

    res.status(200).json({
      success: true,
      message: `Contact successfully unlocked! (${deductResult.remainingCredits} contact view credits remaining).`,
      contact: {
        mobile: targetUser.mobile,
        email: targetUser.email,
      },
      remainingCredits: deductResult.remainingCredits,
      viewedAt: newContactView.viewedAt,
    });
  } catch (error) {
    console.error('Contact reveal error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/contact-views/history
const getContactHistory = async (req, res) => {
  try {
    const views = await ContactView.find({ viewer: req.user._id })
      .populate('viewedProfile', 'fullName gender profileId isVerified')
      .sort({ viewedAt: -1 })
      .lean();

    const populated = await Promise.all(
      views.map(async (v) => {
        if (!v.viewedProfile) return v;
        const profile = await MatrimonyProfile.findOne({ user: v.viewedProfile._id })
          .select('profileId fullName age height religion caste education occupation workLocation photos')
          .lean();
        return {
          ...v,
          profile,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: populated.length,
      history: populated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  revealContact,
  getContactHistory,
};
