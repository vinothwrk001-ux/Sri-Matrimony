const mongoose = require('mongoose');
const SuccessStory = require('../models/SuccessStory');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const MatrimonyProfile = require('../models/MatrimonyProfile');

// GET /api/stories
const getStories = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true, count: 0, stories: [] });
    }
    const stories = await SuccessStory.find({ isApproved: true })
      .sort({ marriageDate: -1 })
      .lean();
    res.status(200).json({ success: true, count: stories.length, stories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/messages/conversations
const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate('participants', 'fullName gender profileId')
      .sort({ lastMessageAt: -1 })
      .lean();

    const populated = await Promise.all(
      conversations.map(async (conv) => {
        const partner = conv.participants.find(
          (p) => p._id.toString() !== req.user._id.toString()
        );
        let partnerProfile = null;
        if (partner) {
          partnerProfile = await MatrimonyProfile.findOne({ user: partner._id })
            .select('profileId fullName photos occupation workLocation isVerified')
            .lean();
        }
        return {
          ...conv,
          partner,
          partnerProfile,
        };
      })
    );

    res.status(200).json({ success: true, conversations: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/messages/:conversationId
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId })
      .sort({ createdAt: 1 })
      .lean();

    // Mark as read
    await Message.updateMany(
      { conversation: conversationId, receiver: req.user._id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/messages/send
const sendMessage = async (req, res) => {
  try {
    const { targetUserId, text } = req.body;

    if (!targetUserId || !text) {
      return res.status(400).json({ success: false, message: 'Target user and message text are required.' });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, targetUserId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, targetUserId],
        lastMessage: text,
        lastMessageSender: req.user._id,
        lastMessageAt: new Date(),
      });
    } else {
      conversation.lastMessage = text;
      conversation.lastMessageSender = req.user._id;
      conversation.lastMessageAt = new Date();
      await conversation.save();
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: req.user._id,
      receiver: targetUserId,
      text,
    });

    res.status(201).json({ success: true, message, conversationId: conversation._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getStories,
  getConversations,
  getMessages,
  sendMessage,
};
