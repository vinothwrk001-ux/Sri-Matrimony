import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Crown,
  Phone,
  Heart,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck,
  ShieldAlert,
  Edit3,
  Calendar,
  Lock,
  ChevronRight
} from 'lucide-react';
import ProfileCard from '../../components/common/ProfileCard';
import api from '../../api/client';

export default function DashboardOverview() {
  const { user, profile, isPaidMember } = useAuth();
  const { openPayment } = useApp();
  const { t } = useLanguage();

  const [suggestedMatches, setSuggestedMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get('/matches/recommended');
        if (res.success) {
          setSuggestedMatches(res.matches || []);
        }
      } catch (err) {
        console.error('Failed to load recommended matches:', err);
      } finally {
        setLoadingMatches(false);
      }
    };

    fetchMatches();
  }, []);

  const completion = profile?.completionPercentage || 75;
  const plan = user?.activeMembership;
  const remainingContacts = plan?.remainingContactViews || 0;
  const remainingInterests = plan?.remainingInterests || 0;

  return (
    <div className="space-y-8">
      {/* Editorial Welcome Salon Card */}
      <div className="rounded-[36px] p-8 sm:p-10 bg-gradient-to-r from-[#2D0B0E] via-[#23080A] to-[#1C0608] text-[#FAF6F0] gold-foil-border shadow-2xl relative overflow-hidden">
        {/* Lattice watermark */}
        <div className="absolute inset-0 opacity-10 bg-jali-pattern pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] shadow-sm border border-[#D4AF37]/40 bg-[#190507] text-[#F6ECCB]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Vanakkam &bull; Private Matrimony Salon</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#FAF6F0] tracking-wide">
              Welcome Back, {user?.fullName}
            </h1>

            <p className="text-xs sm:text-sm text-[#F6ECCB]/80 font-light leading-relaxed">
              Your profile is active in our sacred registry. Astrological compatibility algorithms are continuously pairing your horoscope with verified Tamil matches.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#23080A] border border-[#D4AF37]/30 text-[#D4AF37] font-semibold">
                ID: {profile?.profileId || user?.profileId}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#23080A] border border-[#D4AF37]/30 text-[#F6ECCB]">
                Seeking: {user?.lookingFor || (profile?.gender === 'Female' ? 'Groom' : 'Bride')}
              </span>
              {profile?.isVerified ? (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6ECCB] text-[#190507] font-bold flex items-center gap-1 shadow">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Govt ID Verified</span>
                </span>
              ) : (
                <Link
                  to="/dashboard/privacy"
                  className="px-3 py-1 rounded-full bg-amber-900/60 border border-amber-500/50 text-amber-200 font-semibold hover:underline flex items-center gap-1"
                >
                  <ShieldAlert className="w-3 h-3" />
                  <span>Verify Govt ID</span>
                </Link>
              )}
            </div>
          </div>

          {/* Profile Completion Circular Dial / Progress Card */}
          <div className="bg-[#190507]/90 rounded-3xl p-6 gold-foil-border w-full lg:w-80 shrink-0 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F6ECCB]">
                Profile Integrity
              </span>
              <span className="font-editorial text-2xl font-light text-[#D4AF37]">
                {completion}%
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-[#2D0B0E] overflow-hidden border border-[#D4AF37]/30 mb-4">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] rounded-full transition-all duration-700"
                style={{ width: `${completion}%` }}
              />
            </div>

            <p className="text-[11px] text-[#FAF6F0]/70 font-light leading-relaxed mb-4">
              Complete your horoscope chart and ancestral village to unlock highest priority matching.
            </p>

            <Link
              to="/dashboard/edit-profile"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow hover:brightness-105 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Update Details</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Sanctuary Privileges & Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Membership Tier */}
        <div className="rounded-3xl p-6 bg-[#FDFBF7] gold-foil-border shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2D0B0E] to-[#1C0608] text-[#F6ECCB] flex items-center justify-center shadow">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D1F]">
                Active Tier
              </span>
            </div>

            <h3 className="font-editorial text-2xl font-light text-[#2D0B0E] uppercase mb-1">
              {plan?.planCode || 'FREE'} SUITE
            </h3>
            <p className="text-xs text-[#321C1C]/70 font-light">
              {isPaidMember ? 'Full Verified Access Active' : 'Complimentary Browsing Plan'}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
            <button
              onClick={() => openPayment()}
              className="text-xs font-bold uppercase tracking-wider text-[#2D0B0E] hover:text-[#D4AF37] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{isPaidMember ? 'Renew or Upgrade' : 'Unlock Paid Privileges'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        </div>

        {/* Card 2: Contact Views Remaining */}
        <div className="rounded-3xl p-6 bg-[#FDFBF7] border border-[#D4AF37]/30 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2D0B0E] to-[#1C0608] text-[#F6ECCB] flex items-center justify-center shadow">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D1F]">
                Balance
              </span>
            </div>

            <div className="font-editorial text-3xl font-light text-[#2D0B0E] mb-1">
              {remainingContacts}
            </div>
            <p className="text-xs text-[#321C1C]/70 font-light">
              Verified phone reveals remaining
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
            <Link
              to="/dashboard/contact-views"
              className="text-xs font-bold uppercase tracking-wider text-[#2D0B0E] hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
            >
              <span>View History</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>
          </div>
        </div>

        {/* Card 3: Interests Balance */}
        <div className="rounded-3xl p-6 bg-[#FDFBF7] border border-[#D4AF37]/30 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2D0B0E] to-[#1C0608] text-[#F6ECCB] flex items-center justify-center shadow">
                <Heart className="w-5 h-5 text-red-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D1F]">
                Requests
              </span>
            </div>

            <div className="font-editorial text-3xl font-light text-[#2D0B0E] mb-1">
              {remainingInterests}
            </div>
            <p className="text-xs text-[#321C1C]/70 font-light">
              Express interests credits left
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
            <Link
              to="/dashboard/interests"
              className="text-xs font-bold uppercase tracking-wider text-[#2D0B0E] hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
            >
              <span>Inbox &bull; Requests</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>
          </div>
        </div>

        {/* Card 4: Astrological Compatibility Matchmaker */}
        <div className="rounded-3xl p-6 bg-[#FDFBF7] border border-[#D4AF37]/30 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2D0B0E] to-[#1C0608] text-[#F6ECCB] flex items-center justify-center shadow">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D1F]">
                Astrology
              </span>
            </div>

            <div className="font-editorial text-3xl font-light text-[#2D0B0E] mb-1">
              {suggestedMatches.length}
            </div>
            <p className="text-xs text-[#321C1C]/70 font-light">
              Curated compatible souls ready
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
            <Link
              to="/dashboard/suggested"
              className="text-xs font-bold uppercase tracking-wider text-[#2D0B0E] hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
            >
              <span>Inspect Matches</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Suggested Astrological Matches Showcase */}
      <div className="rounded-[36px] p-8 sm:p-10 bg-[#FDFBF7] gold-foil-border shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#D4AF37]/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-[#D4AF37]/40 bg-[#F5EAE4] text-[#2D0B0E]">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Personalized Recommendations</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-light text-[#1A1616]">
              Astrologically Compatible Profiles
            </h2>
            <p className="text-xs text-[#5A191E] font-light mt-1">
              Filtered based on 10 Porutham astrology matching and your community preferences.
            </p>
          </div>

          <Link
            to="/dashboard/suggested"
            className="text-xs font-bold uppercase tracking-wider text-[#2D0B0E] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors"
          >
            <span>View All ({suggestedMatches.length})</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </Link>
        </div>

        {loadingMatches ? (
          <div className="py-12 text-center">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="font-editorial text-sm text-[#2D0B0E]">Consulting Tamil planetary positions...</p>
          </div>
        ) : suggestedMatches.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#321C1C]/70">
            No compatible matches found yet. Update your partner preferences in Edit Profile.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedMatches.slice(0, 3).map((match) => (
              <ProfileCard key={match.profileId || match._id} profile={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
