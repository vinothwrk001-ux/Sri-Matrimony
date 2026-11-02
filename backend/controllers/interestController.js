const Interest = require('../models/Interest');
const User = require('../models/User');
const MatrimonyProfile = require('../models/MatrimonyProfile');
const Notification = require('../models/Notification');
const Membership = require('../models/Membership');

// POST /api/interests/send
const sendInterest = async (req, res) => {
  try {
    const { targetUserId, message } = req.body;

    if (!targetUserId) {
      return res.status(400).json({ success: false, message: 'Target user ID is required.' });
    }

    if (targetUserId.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot send an interest request to yourself.' });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'Target member profile not found.' });
    }

    // Check if already sent
    const existing = await Interest.findOne({
      sender: req.user._id,
      receiver: targetUserId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: `You have already sent an interest to this profile (Status: ${existing.status}).`,
      });
    }

    // Check membership credits
    const membership = await Membership.findOne({ user: req.user._id, status: 'active' });
    if (membership && membership.remainingInterests !== undefined) {
      if (membership.remainingInterests <= 0) {
        return res.status(403).json({
          success: false,
          code: 'INSUFFICIENT_INTEREST_CREDITS',
          message: 'You have exhausted your daily/monthly interest request quota. Please upgrade your plan.',
        });
      }
      membership.remainingInterests -= 1;
      await membership.save();
    }

    const interest = await Interest.create({
      sender: req.user._id,
      receiver: targetUserId,
      message: message || 'I am interested in your profile. Please review and connect.',
      status: 'pending',
    });

    // Increment target profile count
    await MatrimonyProfile.findOneAndUpdate(
      { user: targetUserId },
      { $inc: { interestsReceivedCount: 1 } }
    );

    // Create Notification for receiver
    await Notification.create({
      recipient: targetUserId,
      sender: req.user._id,
      type: 'interest_received',
      title: 'New Interest Request!',
      message: `${req.user.fullName} expressed interest in your matrimony profile.`,
      link: '/dashboard/interests',
    });

    res.status(201).json({
      success: true,
      message: 'Interest request sent successfully!',
      interest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/interests
const getInterests = async (req, res) => {
  try {
    const [sentInterests, receivedInterests] = await Promise.all([
      Interest.find({ sender: req.user._id })
        .populate({
          path: 'receiver',
          select: 'fullName gender profileId isVerified',
        })
        .sort({ createdAt: -1 })
        .lean(),
      Interest.find({ receiver: req.user._id })
        .populate({
          path: 'sender',
          select: 'fullName gender profileId isVerified',
        })
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    // Attach profile photos
    const populateProfiles = async (items, userKey) => {
      return Promise.all(
        items.map(async (item) => {
          if (!item[userKey]) return item;
          const prof = await MatrimonyProfile.findOne({ user: item[userKey]._id })
            .select('profileId fullName age height religion caste education occupation workLocation photos')
            .lean();
          return { ...item, profile: prof };
        })
      );
    };

    const populatedSent = await populateProfiles(sentInterests, 'receiver');
    const populatedReceived = await populateProfiles(receivedInterests, 'sender');

    res.status(200).json({
      success: true,
      sent: populatedSent,
      received: populatedReceived,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/interests/:id/respond
const respondInterest = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'accepted' or 'declined'

    if (!['accepted', 'declined'].includes(action)) {
      return res.status(400).json({ success: false, message: 'Action must be accepted or declined.' });
    }

    const interest = await Interest.findOne({
      _id: id,
      receiver: req.user._id,
    });

    if (!interest) {
      return res.status(404).json({ success: false, message: 'Interest request not found.' });
    }

    interest.status = action;
    interest.respondedAt = new Date();
    await interest.save();

    // Create Notification for original sender
    await Notification.create({
      recipient: interest.sender,
      sender: req.user._id,
      type: action === 'accepted' ? 'interest_accepted' : 'interest_declined',
      title: action === 'accepted' ? 'Interest Accepted!' : 'Interest Update',
      message: `${req.user.fullName} has ${action} your interest request.`,
      link: '/dashboard/interests',
    });

    res.status(200).json({
      success: true,
      message: `Interest request marked as ${action}.`,
      interest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  sendInterest,
  getInterests,
  respondInterest,
};
