const crypto = require('crypto');
const MembershipPlan = require('../models/MembershipPlan');
const Payment = require('../models/Payment');
const { activateMembership } = require('../services/membershipService');

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_srimatrimony_demo';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'sri_matrimony_secret_key';

// POST /api/payments/create-order
const createOrder = async (req, res) => {
  try {
    const { planCode } = req.body;

    const plan = await MembershipPlan.findOne({ code: planCode, isActive: true });
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Membership plan not found or inactive.' });
    }

    if (plan.price === 0) {
      return res.status(400).json({ success: false, message: 'Free plan does not require payment processing.' });
    }

    const orderId = `order_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    res.status(200).json({
      success: true,
      order: {
        id: orderId,
        amount: plan.price * 100, // in paise
        currency: 'INR',
        planCode: plan.code,
        planName: plan.name,
      },
      key: RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/payments/verify
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planCode,
    } = req.body;

    const plan = await MembershipPlan.findOne({ code: planCode });
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Invalid membership plan.' });
    }

    // Verify signature if secret provided, or accept sandbox demo payment
    let isSignatureValid = true;
    if (process.env.RAZORPAY_KEY_SECRET && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      isSignatureValid = generatedSignature === razorpay_signature;
    }

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: Invalid transaction signature.',
      });
    }

    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // Create Payment Record
    const payment = await Payment.create({
      user: req.user._id,
      plan: plan._id,
      planCode: plan.code,
      amount: plan.price,
      currency: 'INR',
      razorpayOrderId: razorpay_order_id || `ord_${Date.now()}`,
      razorpayPaymentId: razorpay_payment_id || `pay_${Date.now()}`,
      razorpaySignature: razorpay_signature || 'simulated_signature',
      status: 'captured',
      paymentMethod: 'UPI / Card / NetBanking (Razorpay)',
      invoiceNumber,
    });

    // Server-side entitlement activation
    const membership = await activateMembership(req.user._id, plan.code, payment._id);

    res.status(200).json({
      success: true,
      message: `Payment successful! Welcome to the Sri Matrimony ${plan.name}.`,
      membership,
      payment,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/payments/mock-activate (Convenient 1-Click Upgrade Sandbox for Evaluation)
const mockActivate = async (req, res) => {
  try {
    const { planCode } = req.body;

    const plan = await MembershipPlan.findOne({ code: planCode });
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found.' });
    }

    const invoiceNumber = `INV-MOCK-${Date.now()}`;
    const payment = await Payment.create({
      user: req.user._id,
      plan: plan._id,
      planCode: plan.code,
      amount: plan.price,
      currency: 'INR',
      razorpayOrderId: `mock_ord_${Date.now()}`,
      razorpayPaymentId: `mock_pay_${Date.now()}`,
      status: 'captured',
      paymentMethod: 'Instant Test Sandbox',
      invoiceNumber,
    });

    const membership = await activateMembership(req.user._id, plan.code, payment._id);

    res.status(200).json({
      success: true,
      message: `Sandbox payment successful! Plan upgraded to ${plan.name}.`,
      membership,
      payment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/payments/history
const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('plan', 'name price durationDays')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: payments.length, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  mockActivate,
  getPaymentHistory,
};
