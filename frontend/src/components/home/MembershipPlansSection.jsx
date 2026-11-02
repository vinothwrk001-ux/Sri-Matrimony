import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Crown, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

export default function MembershipPlansSection({ plans = [] }) {
  const { t, lang } = useLanguage();
  const { openPayment, openAuth } = useApp();
  const { isAuthenticated, user } = useAuth();

  // Fallback plans
  const displayPlans = plans.length > 0 ? plans : [
    {
      code: 'free',
      name: 'Free Sanctuary',
      nameTamil: 'இலவச திட்டம்',
      price: 0,
      durationLabel: 'Free Forever',
      durationLabelTamil: 'எப்போதும் இலவசம்',
      features: ['Basic Profile Creation', 'Browse Verified Profiles', 'Limited Contact Details', 'Standard Support'],
      featuresTamil: ['அடிப்படை சுயவிவர உருவாக்கம்', 'வரையறுக்கப்பட்ட தகவல்'],
      isPopular: false,
      contactLimit: 0,
      interestLimit: 5,
      chatLimit: 0,
    },
    {
      code: 'standard',
      name: 'Standard Heritage',
      nameTamil: 'ஸ்டாண்டர்ட்',
      price: 999,
      durationLabel: '3 Months',
      durationLabelTamil: '3 மாதங்கள்',
      badge: 'POPULAR CHOICE',
      isPopular: false,
      features: ['10 Verified Contact Views', '10 Express Interest Requests', '10 Direct Messaging Credits', 'Profile Visibility Boost', '3 Months Validity'],
      featuresTamil: ['10 சரிபார்க்கப்பட்ட எண்கள்', '10 விருப்பக் கோரிக்கைகள்', '10 செய்திகள்', '3 மாதங்கள் செல்லுபடியாகும்'],
      contactLimit: 10,
      interestLimit: 10,
      chatLimit: 10,
    },
    {
      code: 'premium',
      name: 'Royal Premium',
      nameTamil: 'பிரீமியம்',
      price: 1999,
      durationLabel: '6 Months',
      durationLabelTamil: '6 மாதங்கள்',
      badge: 'MOST RECOMMENDED',
      isPopular: true,
      features: ['20 Verified Contact Views', '20 Express Interest Requests', '20 Direct Messaging Credits', 'Priority Search Placement', 'Horoscope Matching Access', '6 Months Validity'],
      featuresTamil: ['20 சரிபார்க்கப்பட்ட எண்கள்', '20 விருப்பக் கோரிக்கைகள்', '20 செய்திகள்', 'முன்னுரிமை தெரிவுநிலை'],
      contactLimit: 20,
      interestLimit: 20,
      chatLimit: 20,
    },
    {
      code: 'platinum',
      name: 'Platinum Royalty',
      nameTamil: 'பிளாட்டினம்',
      price: 3499,
      durationLabel: '12 Months',
      durationLabelTamil: '12 மாதங்கள்',
      badge: 'VIP CONCIERGE',
      isPopular: false,
      features: ['50 Verified Contact Views', '50 Express Interest Requests', '50 Direct Messaging Credits', 'Dedicated Relationship Advisor', 'Top-Tier Search Highlighting', '1 Full Year Access'],
      featuresTamil: ['50 சரிபார்க்கப்பட்ட எண்கள்', '50 விருப்பங்கள்', 'தனிப்பட்ட மேலாளர் உதவி', '1 முழு ஆண்டு அணுகல்'],
      contactLimit: 50,
      interestLimit: 50,
      chatLimit: 50,
    },
  ];

  const [activePlanCode, setActivePlanCode] = useState('premium');
  const selectedPlan = displayPlans.find((p) => p.code === activePlanCode) || displayPlans[2] || displayPlans[0];

  const handlePlanClick = (plan) => {
    if (plan.code === 'free') {
      if (!isAuthenticated) openAuth('register');
      return;
    }

    if (!isAuthenticated) {
      openAuth('login');
      return;
    }

    openPayment(plan);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#190507] text-[#FAF6F0] relative overflow-hidden border-b border-[#D4AF37]/25">
      {/* Decorative lattice watermark */}
      <div className="absolute inset-0 opacity-10 bg-jali-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-lg border border-[#D4AF37]/50 bg-[#2D0B0E] text-[#F6ECCB]">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span>Curated Membership Suites</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#FAF6F0] tracking-wide mb-3">
            An Auspicious Investment in Forever
          </h2>

          <p className="text-xs sm:text-sm text-[#F6ECCB]/80 font-light leading-relaxed">
            Transparent matrimonial packages crafted to accelerate your partner search with direct contact access, verified horoscopes, and elevated visibility.
          </p>

          {/* Interactive Plan Selector Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-full bg-[#24080B] border border-[#D4AF37]/40 max-w-xl mx-auto">
            {displayPlans.map((plan) => {
              const isActive = activePlanCode === plan.code;
              return (
                <button
                  key={plan.code}
                  onClick={() => setActivePlanCode(plan.code)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] shadow-lg'
                      : 'text-[#F6ECCB]/70 hover:text-[#FAF6F0]'
                  }`}
                >
                  {plan.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reinvented Editorial Comparison Showcase (Large Spotlight Suite + Comparison Matrix) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Spotlight Card of the Selected Plan (5 cols) */}
          <div className="lg:col-span-5">
            <div className="h-full rounded-[36px] p-8 sm:p-10 gold-foil-border bg-gradient-to-b from-[#2D0B0E] to-[#1C0608] shadow-2xl relative overflow-hidden flex flex-col justify-between">
              {/* Gold Flourish Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="px-3.5 py-1 rounded-full bg-[#D4AF37] text-[#190507] text-[10px] font-extrabold uppercase tracking-widest shadow">
                  {selectedPlan.badge || (selectedPlan.price === 0 ? 'COMPLIMENTARY' : 'ACTIVE SUITE')}
                </span>

                <span className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase">
                  {selectedPlan.durationLabel || selectedPlan.durationDays + ' Days'}
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#FAF6F0] mb-2">
                  {selectedPlan.name}
                </h3>

                <p className="text-xs text-[#F6ECCB]/75 font-light leading-relaxed mb-6">
                  {selectedPlan.price === 0
                    ? 'Explore verified profiles and test our platform with basic community search.'
                    : `Full-suite privileges for ${selectedPlan.durationLabel} to connect directly with families.`}
                </p>

                {/* Price Display */}
                <div className="mb-8 pb-8 border-b border-[#D4AF37]/25">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-light text-[#D4AF37]">₹</span>
                    <span className="font-editorial text-5xl sm:text-6xl font-light text-[#FAF6F0] tracking-tight">
                      {selectedPlan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#F6ECCB]/60 font-medium">
                      / {selectedPlan.durationLabel}
                    </span>
                  </div>
                  {selectedPlan.price > 0 && (
                    <p className="text-[11px] text-[#D4AF37] mt-1 font-medium">
                      Inclusive of all GST &bull; Instant activation via Razorpay
                    </p>
                  )}
                </div>

                {/* Core Plan Privileges Checklist */}
                <div className="space-y-3 mb-8">
                  {selectedPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#D4AF37]" />
                      </div>
                      <span className="text-xs font-light text-[#FAF6F0]/90 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handlePlanClick(selectedPlan)}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] text-xs font-bold uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{selectedPlan.price === 0 ? 'Get Started Free' : `Upgrade to ${selectedPlan.name}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Comparative Grid of All 4 Plans (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {displayPlans
                .filter((p) => p.code !== 'free')
                .map((plan) => {
                  const isSelected = plan.code === activePlanCode;
                  return (
                    <div
                      key={plan.code}
                      onClick={() => setActivePlanCode(plan.code)}
                      className={`rounded-2xl p-5 cursor-pointer transition-all duration-300 border ${
                        isSelected
                          ? 'bg-[#2D0B0E] border-[#D4AF37] shadow-xl ring-1 ring-[#D4AF37]'
                          : 'bg-[#23080A]/60 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                          {plan.durationLabel}
                        </span>
                        {plan.badge && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#F6ECCB] font-bold">
                            {plan.badge.split(' ')[0]}
                          </span>
                        )}
                      </div>

                      <h4 className="font-editorial text-xl font-light text-[#FAF6F0] mb-2">
                        {plan.name.split(' ')[0]}
                      </h4>

                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-xs text-[#D4AF37]">₹</span>
                        <span className="font-editorial text-2xl font-light text-[#FAF6F0]">
                          {plan.price.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#F6ECCB]/70 font-light line-clamp-2">
                        {plan.features[0]} &bull; {plan.features[1]}
                      </p>
                    </div>
                  );
                })}
            </div>

            {/* Feature Comparison Table / Matrix */}
            <div className="rounded-3xl p-6 sm:p-7 bg-[#23080A]/80 border border-[#D4AF37]/25 backdrop-blur-md">
              <h4 className="font-editorial text-xl text-[#F6ECCB] font-light mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Feature Entitlement Matrix</span>
              </h4>

              <div className="divide-y divide-[#D4AF37]/15 text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#FAF6F0]/80">Verified Contact Phone Reveals</span>
                  <span className="font-bold text-[#D4AF37]">
                    {selectedPlan.code === 'free'
                      ? '0 Numbers'
                      : selectedPlan.code === 'standard'
                      ? '10 Numbers'
                      : selectedPlan.code === 'premium'
                      ? '20 Numbers'
                      : '50 Numbers'}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#FAF6F0]/80">Express Interest Direct Requests</span>
                  <span className="font-bold text-[#D4AF37]">
                    {selectedPlan.code === 'free'
                      ? '5 Requests'
                      : selectedPlan.code === 'standard'
                      ? '10 Requests'
                      : selectedPlan.code === 'premium'
                      ? '20 Requests'
                      : '50 Requests'}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#FAF6F0]/80">Direct In-App Messaging Credits</span>
                  <span className="font-bold text-[#D4AF37]">
                    {selectedPlan.code === 'free'
                      ? 'None'
                      : selectedPlan.code === 'standard'
                      ? '10 Conversations'
                      : selectedPlan.code === 'premium'
                      ? '20 Conversations'
                      : '50 Conversations'}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#FAF6F0]/80">Search Ranking Placement</span>
                  <span className="font-bold text-[#D4AF37]">
                    {selectedPlan.code === 'free'
                      ? 'Standard'
                      : selectedPlan.code === 'standard'
                      ? 'Elevated'
                      : selectedPlan.code === 'premium'
                      ? 'Priority Placement'
                      : 'Top-Tier Spotlight'}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#FAF6F0]/80">Personal Relationship Manager</span>
                  <span className="font-bold text-[#D4AF37]">
                    {selectedPlan.code === 'platinum' ? 'Included (1-on-1)' : 'Optional Add-on'}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Assurance Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#2D0B0E]/50 border border-[#D4AF37]/20 text-[11px] text-[#F6ECCB]/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>100% Safe 256-bit Razorpay Payments</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#D4AF37]" />
                <span>Instant Credit Allocation to Account</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
