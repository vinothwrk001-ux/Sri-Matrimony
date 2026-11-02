const Membership = require('../models/Membership');
const MembershipPlan = require('../models/MembershipPlan');
const User = require('../models/User');

/**
 * Activates or upgrades a user's membership after payment confirmation
 */
const activateMembership = async (userId, planCode, paymentId = null) => {
  const plan = await MembershipPlan.findOne({ code: planCode });
  if (!plan) {
    throw new Error(`Membership plan "${planCode}" not found.`);
  }

  const durationDays = plan.durationDays || 90;
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);

  // Expire any existing active membership
  await Membership.updateMany(
    { user: userId, status: 'active' },
    { status: 'expired' }
  );

  const newMembership = await Membership.create({
    user: userId,
    plan: plan._id,
    planCode: plan.code,
    startDate,
    endDate,
    status: 'active',
    totalContactViews: plan.contactViewsLimit,
    remainingContactViews: plan.contactViewsLimit,
    totalInterests: plan.interestRequestsLimit,
    remainingInterests: plan.interestRequestsLimit,
    totalMessages: plan.messagingCreditsLimit,
    remainingMessages: plan.messagingCreditsLimit,
    payment: paymentId,
  });

  // Attach to User document
  await User.findByIdAndUpdate(userId, { activeMembership: newMembership._id });

  return newMembership;
};

/**
 * Validates and consumes contact view credit
 */
const deductContactCredit = async (userId) => {
  const membership = await Membership.findOne({ user: userId, status: 'active' });
  if (!membership) {
    return { success: false, reason: 'NO_ACTIVE_MEMBERSHIP' };
  }

  if (new Date() > new Date(membership.endDate)) {
    membership.status = 'expired';
    await membership.save();
    return { success: false, reason: 'MEMBERSHIP_EXPIRED' };
  }

  if (membership.remainingContactViews <= 0) {
    return { success: false, reason: 'INSUFFICIENT_CREDITS', remaining: 0 };
  }

  membership.remainingContactViews -= 1;
  await membership.save();

  return {
    success: true,
    remainingCredits: membership.remainingContactViews,
    planCode: membership.planCode,
  };
};

module.exports = {
  activateMembership,
  deductContactCredit,
};
