import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Briefcase, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockBrides, mockGrooms } from '../../api/mockData';

const defaultFallbackRecent = [
  mockBrides[0], mockGrooms[0],
  mockBrides[1], mockGrooms[1],
  mockBrides[2], mockGrooms[2],
  mockBrides[3], mockGrooms[3],
];

export default function RecentMembersMasonry({ profiles = [], loading = false }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('ALL');
  const [page, setPage] = useState(0);

  const activeProfiles = (profiles && profiles.length > 0) ? profiles : defaultFallbackRecent;

  const filteredProfiles = activeProfiles.filter((p) => {
    if (filter === 'BRIDES') return p.gender === 'Female' || p.gender === 'Bride';
    if (filter === 'GROOMS') return p.gender === 'Male' || p.gender === 'Groom';
    return true;
  });

  const itemsPerPage = 4;
  const maxPage = Math.max(0, Math.ceil(filteredProfiles.length / itemsPerPage) - 1);
  const safePage = Math.min(page, maxPage);
  const displayedProfiles = filteredProfiles.slice(safePage * itemsPerPage, (safePage + 1) * itemsPerPage);

  const prevPage = () => setPage((p) => Math.max(0, p - 1));
  const nextPage = () => setPage((p) => Math.min(maxPage, p + 1));

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6F0] relative overflow-hidden border-b border-[#D4AF37]/20">
      {/* Decorative lattice background watermark */}
      <div className="absolute inset-0 opacity-5 bg-jali-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-2.5 shadow-sm border border-[#D4AF37]/40 bg-[#F5EAE4] text-[#2D0B0E]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>New Arrivals</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#1A1616] tracking-wide">
              Recently Joined Members
            </h2>
            <p className="text-xs sm:text-sm text-[#5A191E] font-light mt-1.5 max-w-xl">
              Fresh beginnings. Discover cultured Tamil individuals who stepped into our matrimonial sanctuary this week.
            </p>
          </div>

          {/* Segmented Filter & View All */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-1 rounded-full bg-[#EFE5D8] border border-[#D4AF37]/30 flex items-center gap-1 shadow-inner">
              {['ALL', 'BRIDES', 'GROOMS'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setFilter(tab);
                    setPage(0);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    filter === tab
                      ? 'bg-[#2D0B0E] text-[#FAF6F0] shadow-md'
                      : 'text-[#321C1C] hover:text-[#2D0B0E]'
                  }`}
                >
                  {tab === 'ALL' ? 'All Members' : tab === 'BRIDES' ? 'Brides' : 'Grooms'}
                </button>
              ))}
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5 ml-1">
              <button
                type="button"
                onClick={prevPage}
                disabled={safePage === 0}
                className={`w-8 h-8 rounded-md flex items-center justify-center border transition-all cursor-pointer ${
                  safePage === 0
                    ? 'opacity-35 cursor-not-allowed border-gray-400/30 text-gray-400'
                    : 'border-[#D4AF37]/40 bg-[#FAF4F0] text-[#2D0B0E] hover:border-[#D4AF37] hover:bg-[#F2E8DC]'
                }`}
                title="Previous members"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextPage}
                disabled={safePage >= maxPage}
                className={`w-8 h-8 rounded-md flex items-center justify-center border transition-all cursor-pointer ${
                  safePage >= maxPage
                    ? 'opacity-35 cursor-not-allowed border-gray-400/30 text-gray-400'
                    : 'border-[#D4AF37]/40 bg-[#FAF4F0] text-[#2D0B0E] hover:border-[#D4AF37] hover:bg-[#F2E8DC]'
                }`}
                title="Next members"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/search"
              className="text-xs tracking-widest font-bold uppercase flex items-center gap-1.5 text-[#2D0B0E] hover:text-[#D4AF37] transition-colors group ml-2"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
            </Link>
          </div>
        </div>

        {/* Balanced, Uniform Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayedProfiles.map((profile, idx) => {
            const photoUrl =
              profile.photos?.[0]?.url ||
              (profile.gender === 'Female' || profile.gender === 'Bride'
                ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'
                : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600');

            return (
              <motion.div
                key={profile.profileId || profile._id || idx}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-400 border border-[#D4AF37]/35 bg-[#23080A] flex flex-col h-[420px] sm:h-[440px]"
              >
                {/* Full-bleed Photo with proper aspect centering */}
                <div className="absolute inset-0 bg-[#23080A] overflow-hidden">
                  <img
                    src={photoUrl}
                    alt={profile.fullName}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = (profile.gender === 'Female' || profile.gender === 'Bride')
                        ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'
                        : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600';
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-600 brightness-[0.93] group-hover:brightness-100"
                  />
                  {/* Subtle Top & Bottom Gradients */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#190507]/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#190507] via-[#190507]/65 to-transparent" />
                </div>

                {/* Top Badges */}
                <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md glass-wine text-[10px] font-bold uppercase tracking-wider text-[#F6ECCB] border border-[#D4AF37]/35 backdrop-blur-md">
                    {profile.gender === 'Female' || profile.gender === 'Bride' ? 'Bride' : 'Groom'}
                  </span>
                  {profile.isVerified && (
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#D4AF37] text-[#190507] text-[10px] font-extrabold shadow">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Bottom Profile Details Overlay */}
                <div className="relative z-10 mt-auto p-4 sm:p-5 text-[#FAF6F0]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-[#D4AF37] tracking-widest uppercase">
                      {profile.profileId}
                    </span>
                    <span className="text-xs text-[#FAF6F0]/85 font-medium">
                      {profile.age} Yrs &bull; {profile.height?.split('/')[0] || profile.height}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl font-normal text-[#FAF6F0] tracking-wide mb-1 leading-snug group-hover:text-[#F6ECCB] transition-colors truncate">
                    {profile.fullName}
                  </h3>

                  <p className="text-xs text-[#F6ECCB]/85 font-medium mb-2 truncate">
                    {profile.religion} &bull; {profile.caste || 'Tamil Community'}
                  </p>

                  <div className="space-y-1 text-[11px] text-[#FAF6F0]/80 mb-3">
                    {profile.occupation && (
                      <div className="flex items-center gap-1.5 truncate">
                        <Briefcase className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{profile.occupation}</span>
                      </div>
                    )}
                    {profile.workLocation && (
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{profile.workLocation}</span>
                      </div>
                    )}
                  </div>

                  {/* Always-visible Luxury CTA Button */}
                  <Link
                    to={`/profile/${profile.profileId || profile._id}`}
                    className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] text-xs font-bold uppercase tracking-wider text-center shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 border border-[#D4AF37]/50"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#190507] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
