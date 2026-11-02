const express = require('express');
const router = express.Router();

const { getHealth, getBootstrap } = require('../controllers/appController');
const { register, login, getMe, verifyOtp } = require('../controllers/authController');
const {
  getMyProfile,
  updateMyProfile,
  getProfileById,
  requestVerification,
  updatePrivacySettings,
} = require('../controllers/profileController');
const { searchProfiles } = require('../controllers/searchController');
const {
  getRecentBrides,
  getRecentGrooms,
  getRecentMembers,
  getVerifiedProfiles,
  getRecommendedMatches,
} = require('../controllers/matchController');
const {
  sendInterest,
  getInterests,
  respondInterest,
} = require('../controllers/interestController');
const { toggleShortlist, getShortlists } = require('../controllers/shortlistController');
const { revealContact, getContactHistory } = require('../controllers/contactViewController');
const { getMyMembership, getPlans } = require('../controllers/membershipController');
const {
  createOrder,
  verifyPayment,
  mockActivate,
  getPaymentHistory,
} = require('../controllers/paymentController');
const {
  getStories,
  getConversations,
  getMessages,
  sendMessage,
} = require('../controllers/storyAndMessageController');
const {
  getDashboardMetrics,
  getMembers,
  verifyMember,
  toggleMemberStatus,
  getPayments,
  updatePlan,
  getContactInquiries,
} = require('../controllers/adminController');
const { ContactMessage } = require('../models/SupportModels');

const {
  authenticateUser,
  optionalAuth,
  requireRole,
  requireActiveMembership,
} = require('../middleware/authMiddleware');

// 1. App Initialization & Health
router.get('/health', getHealth);
router.get('/app/bootstrap', optionalAuth, getBootstrap);

// 2. Authentication
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', authenticateUser, getMe);
router.post('/auth/verify-otp', verifyOtp);

// 3. Profiles
router.get('/profiles/me', authenticateUser, getMyProfile);
router.put('/profiles/me', authenticateUser, updateMyProfile);
router.post('/profiles/request-verification', authenticateUser, requestVerification);
router.put('/profiles/privacy-settings', authenticateUser, updatePrivacySettings);
router.get('/profiles/:id', optionalAuth, getProfileById);

// 4. Search & Matches
router.get('/search', optionalAuth, searchProfiles);
router.get('/matches/brides', getRecentBrides);
router.get('/matches/grooms', getRecentGrooms);
router.get('/matches/recent', getRecentMembers);
router.get('/matches/verified', getVerifiedProfiles);
router.get('/matches/recommended', authenticateUser, getRecommendedMatches);

// 5. Interests & Shortlists
router.post('/interests/send', authenticateUser, sendInterest);
router.get('/interests', authenticateUser, getInterests);
router.put('/interests/:id/respond', authenticateUser, respondInterest);
router.post('/shortlists/toggle', authenticateUser, toggleShortlist);
router.get('/shortlists', authenticateUser, getShortlists);

// 6. Contact Views (Protected with server-side credits)
router.post('/contact-views/reveal', authenticateUser, revealContact);
router.get('/contact-views/history', authenticateUser, getContactHistory);

// 7. Membership & Plans
router.get('/membership/me', authenticateUser, getMyMembership);
router.get('/plans', getPlans);

// 8. Payments (Razorpay & Sandbox simulator)
router.post('/payments/create-order', authenticateUser, createOrder);
router.post('/payments/verify', authenticateUser, verifyPayment);
router.post('/payments/mock-activate', authenticateUser, mockActivate);
router.get('/payments/history', authenticateUser, getPaymentHistory);

// 9. Stories & Messaging
router.get('/stories', getStories);
router.get('/messages/conversations', authenticateUser, getConversations);
router.get('/messages/:conversationId', authenticateUser, getMessages);
router.post('/messages/send', authenticateUser, sendMessage);

// 10. Public Contact Inquiry Form
router.post('/contact-inquiries', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }
    const inquiry = await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our matrimonial relationship manager will contact you shortly.',
      inquiry,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 11. Admin Protected Routes
router.get('/admin/metrics', authenticateUser, requireRole('admin', 'moderator'), getDashboardMetrics);
router.get('/admin/members', authenticateUser, requireRole('admin', 'moderator'), getMembers);
router.put('/admin/members/:id/verify', authenticateUser, requireRole('admin', 'moderator', 'verification_manager'), verifyMember);
router.put('/admin/members/:id/status', authenticateUser, requireRole('admin'), toggleMemberStatus);
router.get('/admin/payments', authenticateUser, requireRole('admin'), getPayments);
router.put('/admin/plans/:code', authenticateUser, requireRole('admin'), updatePlan);
router.get('/admin/inquiries', authenticateUser, requireRole('admin', 'support_manager'), getContactInquiries);

module.exports = router;
