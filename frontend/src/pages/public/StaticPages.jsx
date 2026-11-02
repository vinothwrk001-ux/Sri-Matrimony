import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ShieldCheck, HelpCircle, FileText, ArrowLeft } from 'lucide-react';

export function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does Sri Matrimony verify bride and groom profiles?',
      a: 'We verify each member via government-issued photo ID (Aadhaar, Passport, or Driving License) alongside active phone verification. Our team manually reviews photographs and documentation before granting the Verified Badge.'
    },
    {
      q: 'Can unauthenticated visitors view my mobile number or email address?',
      a: 'No. Sri Matrimony strictly conceals contact details on both frontend and backend. Only verified paid members with available contact credits can unlock contact information, and your privacy settings dictate visibility.'
    },
    {
      q: 'How does the Matchmaking Compatibility Score work?',
      a: 'Our matchmaking algorithm dynamically computes compatibility based on mutual age preference, religious and caste background, educational and professional standing, native location, and dietary lifestyles.'
    },
    {
      q: 'What payment options are supported for membership plans?',
      a: 'We accept all major Indian payment methods through Razorpay, including UPI (Google Pay, PhonePe, Paytm), Debit Cards, Credit Cards, and NetBanking.'
    },
    {
      q: 'Can I upload my horoscope chart on Sri Matrimony?',
      a: 'Yes! Members can upload digital horoscopes or enter their birth star (Nakshatram), Raasi, and Dosham details for astrological matching.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFCF7] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D7AD4A] bg-[#4B1718] px-3.5 py-1 rounded-full shadow-sm">
            Frequently Asked Questions
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#4B1718] mt-3">
            Matrimony Guidelines &amp; FAQs
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#FFFCF7] rounded-2xl border border-[#D7AD4A]/30 shadow-md overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#4B1718] flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#D7AD4A] shrink-0 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#321C1C]/80 leading-relaxed border-t border-[#D7AD4A]/20 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF7] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-xs sm:text-sm text-[#321C1C]/85 leading-relaxed bg-[#FFFCF7] rounded-3xl p-8 sm:p-12 border border-[#D7AD4A]/30 shadow-xl">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#4B1718] mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#682526] font-semibold">
          Last updated: October 2026 &bull; Compliant with Indian Digital Personal Data Protection Act
        </p>

        <h2 className="font-heading font-bold text-lg text-[#4B1718] pt-2">
          1. Information We Collect
        </h2>
        <p>
          Sri Matrimony collects personal and matrimonial information including your name, gender, contact number, date of birth, education, occupation, community background, lifestyle preferences, and photographs provided voluntarily during registration.
        </p>

        <h2 className="font-heading font-bold text-lg text-[#4B1718] pt-2">
          2. How We Protect Your Sensitive Details
        </h2>
        <p>
          We employ end-to-end access authorization. Unregistered visitors cannot view phone numbers or private emails. Contact numbers are revealed exclusively through credit-deducted server validation for verified, active paid subscribers.
        </p>

        <h2 className="font-heading font-bold text-lg text-[#4B1718] pt-2">
          3. Your Privacy Controls
        </h2>
        <p>
          Members can control photograph visibility, hide their profile temporarily from search results, and delete or export their account data upon request by contacting support@srimatrimony.com.
        </p>
      </div>
    </div>
  );
}

export function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF7] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-xs sm:text-sm text-[#321C1C]/85 leading-relaxed bg-[#FFFCF7] rounded-3xl p-8 sm:p-12 border border-[#D7AD4A]/30 shadow-xl">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#4B1718] mb-4">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-[#682526] font-semibold">
          Effective from 2026 &bull; Terms of Matrimonial Service
        </p>

        <h2 className="font-heading font-bold text-lg text-[#4B1718] pt-2">
          1. Eligibility
        </h2>
        <p>
          You must be at least 18 years of age (for females) or 21 years of age (for males) as prescribed under Indian law to register and utilize matrimonial matchmaking on Sri Matrimony.
        </p>

        <h2 className="font-heading font-bold text-lg text-[#4B1718] pt-2">
          2. Genuine Profile Intent
        </h2>
        <p>
          Sri Matrimony is strictly for marriage-oriented connections. Commercial solicitation, dating, harassment, or providing fraudulent identity documents constitutes immediate permanent account suspension.
        </p>
      </div>
    </div>
  );
}

export function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF7] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-xs sm:text-sm text-[#321C1C]/85 leading-relaxed bg-[#FFFCF7] rounded-3xl p-8 sm:p-12 border border-[#D7AD4A]/30 shadow-xl">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#4B1718] mb-4">
          Refund &amp; Cancellation Policy
        </h1>
        <p className="text-xs text-[#682526] font-semibold">
          Consumer Payment Policy
        </p>
        <p>
          Membership plans grant instant digital access to verified member contacts and proprietary matchmaking features. Once contact credits are consumed, fees are non-refundable. If a duplicate transaction occurs due to banking connectivity errors, full refunds are processed within 5-7 business days.
        </p>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF7] flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md">
        <h1 className="font-heading font-extrabold text-6xl text-[#4B1718] mb-2">404</h1>
        <p className="font-heading font-bold text-xl text-[#682526] mb-3">Page Not Found</p>
        <p className="text-xs sm:text-sm text-[#321C1C]/80 mb-6">
          The matrimonial page or profile you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4B1718] text-[#F0D69C] text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#351011]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
