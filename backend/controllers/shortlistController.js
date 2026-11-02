const Shortlist = require('../models/Shortlist');
const MatrimonyProfile = require('../models/MatrimonyProfile');

// POST /api/shortlists/toggle
const toggleShortlist = async (req, res) => {
  try {
    const { targetUserId } = req.body;

    if (!targetUserId) {
      return res.status(400).json({ success: false, message: 'Target user ID is required.' });
    }

    const existing = await Shortlist.findOne({
      user: req.user._id,
      shortlistedUser: targetUserId,
    });

    if (existing) {
      await Shortlist.findByIdAndDelete(existing._id);
      await MatrimonyProfile.findOneAndUpdate(
        { user: targetUserId },
        { $inc: { shortlistsCount: -1 } }
      );
      return res.status(200).json({
        success: true,
        isShortlisted: false,
        message: 'Profile removed from your shortlist.',
      });
    }

    await Shortlist.create({
      user: req.user._id,
      shortlistedUser: targetUserId,
    });

    await MatrimonyProfile.findOneAndUpdate(
      { user: targetUserId },
      { $inc: { shortlistsCount: 1 } }
    );

    res.status(201).json({
      success: true,
      isShortlisted: true,
      message: 'Profile added to your shortlist!',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/shortlists
const getShortlists = async (req, res) => {
  try {
    const shortlists = await Shortlist.find({ user: req.user._id })
      .populate('shortlistedUser', 'fullName gender profileId isVerified')
      .sort({ createdAt: -1 })
      .lean();

    const populated = await Promise.all(
      shortlists.map(async (item) => {
        if (!item.shortlistedUser) return item;
        const profile = await MatrimonyProfile.findOne({ user: item.shortlistedUser._id })
          .select('profileId fullName age height religion caste education occupation workLocation photos')
          .lean();
        return { ...item, profile };
      })
    );

    res.status(200).json({
      success: true,
      count: populated.length,
      shortlists: populated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  toggleShortlist,
  getShortlists,
};
