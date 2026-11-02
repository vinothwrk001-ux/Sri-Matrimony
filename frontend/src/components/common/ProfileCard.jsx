import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Briefcase, GraduationCap, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../api/client';

export default function ProfileCard({ profile, variant = 'standard' }) {
  const { isAuthenticated } = useAuth();
  const { openAuth, showToast } = useApp();
  const { t } = useLanguage();
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const primaryPhoto =
    profile?.photos?.find((p) => p.isPrimary)?.url ||
    profile?.photos?.[0]?.url ||
    (profile?.gender === 'Bride'
      ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
      : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80');

  const handleShortlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openAuth('login');
      return;
    }

    try {
      setIsLiking(true);
      const res = await api.post('/shortlists/toggle', { targetUserId: profile.user || profile._id });
      if (res.success) {
        setIsShortlisted(res.isShortlisted);
        showToast(res.message, 'success');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative bg-[#FDFBF7] rounded-lg overflow-hidden border border-[#D4AF37]/35 shadow-[0_6px_20px_rgba(25,5,7,0.06)] hover:shadow-[0_16px_36px_rgba(45,11,14,0.16)] transition-all duration-350 flex flex-col h-full"
    >
      {/* Compact Landscape/Square Photograph Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#23080A]">
        <img
          src={primaryPhoto}
          alt={profile.fullName}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-500 ease-out"
        />

        {/* Soft Luxury Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#190507]/90 via-[#190507]/20 to-transparent" />

        {/* Top Floating Badge Bar */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          {/* Profile ID Pill */}
          <span className="px-2 py-0.5 rounded-md glass-wine text-[9px] tracking-widest font-semibold text-[#F6ECCB] border border-[#D4AF37]/40 shadow-sm uppercase">
            {profile.profileId || 'SM-ID'}
          </span>

          {/* Shortlist Heart Icon */}
          <button
            onClick={handleShortlist}
            disabled={isLiking}
            className={`w-7 h-7 rounded-md flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer shadow-md ${
              isShortlisted
                ? 'bg-[#8B1E26] border-[#D4AF37] text-white'
                : 'glass-wine border-[#D4AF37]/35 text-[#FAF6F0] hover:text-[#D4AF37]'
            }`}
            title="Shortlist Profile"
          >
            <Heart className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Floating Badges inside Image */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between z-10">
          {profile.isVerified ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md glass-wine text-[#F6ECCB] text-[9px] font-semibold border border-[#D4AF37]/40 backdrop-blur-md">
              <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
              <span>Verified</span>
            </div>
          ) : <div />}

          {profile.compatibilityScore && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#F6ECCB] text-[#190507] text-[9px] font-extrabold shadow-md uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5 text-[#190507]" />
              <span>{profile.compatibilityScore}% Match</span>
            </div>
          )}
        </div>
      </div>

      {/* Editorial Information Details - Compact */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between bg-gradient-to-b from-[#FDFBF7] to-[#FAF6F0]">
        <div>
          {/* Name & Age */}
          <div className="flex items-baseline justify-between mb-0.5">
            <h3 className="font-editorial text-lg sm:text-xl font-normal text-[#1A1616] truncate group-hover:text-[#2D0B0E] transition-colors">
              {profile.fullName}
            </h3>
            <span className="text-[11px] font-semibold text-[#5A191E] shrink-0 ml-1.5 tracking-wider">
              {profile.age} Yrs &bull; {profile.height?.split('/')[0] || profile.height}
            </span>
          </div>

          {/* Religion & Community Foil Tag */}
          <p className="text-[10px] font-semibold tracking-wider text-[#2D0B0E] bg-[#FAF4F0] border border-[#D4AF37]/30 px-2 py-0.5 rounded-md inline-block mb-2">
            {profile.religion} &bull; {profile.caste || 'Tamil Heritage'}
          </p>

          {/* Details Grid */}
          <div className="space-y-1 text-[11px] text-[#1A1616]/75">
            <div className="flex items-center gap-1.5 truncate">
              <Briefcase className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">{profile.occupation}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">{profile.education}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">{profile.workLocation || 'Tamil Nadu'}</span>
            </div>
          </div>
        </div>

        {/* View Profile Action Link */}
        <div className="pt-2.5 mt-2.5 border-t border-[#D4AF37]/25">
          <Link
            to={`/profile/${profile.profileId || profile._id}`}
            className="w-full py-2 px-3 rounded-md bg-gradient-to-r from-[#2D0B0E] to-[#1E0709] text-[#F6ECCB] text-[11px] font-semibold tracking-[0.15em] text-center block uppercase shadow-md hover:brightness-110 active:scale-98 transition-all border border-[#D4AF37]/30 flex items-center justify-center gap-1.5 group-hover:border-[#D4AF37]"
          >
            <span>{t('btnViewProfile')}</span>
            <ArrowRight className="w-3 h-3 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
