import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MapPin, Briefcase, GraduationCap, Heart, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import ProfileCard from '../common/ProfileCard';
import { mockBrides, mockGrooms } from '../../api/mockData';

export default function EditorialShowcase({
  gender = 'Bride',
  title,
  subtitle,
  badgeText,
  profiles = [],
  viewAllLink = '/search',
}) {
  const { t, lang } = useLanguage();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [satellitePage, setSatellitePage] = useState(0);

  const fallbackProfiles = gender === 'Bride' ? mockBrides : mockGrooms;
  const activeProfiles = profiles && profiles.length > 0 ? profiles : fallbackProfiles;

  const featured = activeProfiles[featuredIndex] || activeProfiles[0] || fallbackProfiles[0];
  const otherProfiles = activeProfiles.filter((_, idx) => idx !== featuredIndex);

  // Show exactly 2 companion cards per view (1 clean matching row)
  const itemsPerPage = 2;
  const maxPage = Math.max(0, Math.ceil(otherProfiles.length / itemsPerPage) - 1);
  const safePage = Math.min(satellitePage, maxPage);
  const displayedSatellites = otherProfiles.slice(safePage * itemsPerPage, (safePage + 1) * itemsPerPage);

  const prevSatellites = () => setSatellitePage((p) => Math.max(0, p - 1));
  const nextSatellites = () => setSatellitePage((p) => Math.min(maxPage, p + 1));

  const isBride = gender === 'Bride';

  return (
    <section className={`py-12 sm:py-20 relative overflow-hidden border-b border-[#D4AF37]/20 ${
      isBride
        ? 'bg-gradient-to-b from-[#FDFBF7] via-[#FAF4F0] to-[#FAF6F0]'
        : 'bg-gradient-to-b from-[#190507] via-[#23080A] to-[#1E0709] text-[#FAF6F0]'
    }`}>
      {/* Decorative Jali / Lattice background */}
      <div className={`absolute inset-0 pointer-events-none ${isBride ? 'opacity-10 bg-jali-pattern' : 'opacity-15 bg-jali-pattern'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-2.5 shadow-sm border border-[#D4AF37]/40 ${
              isBride ? 'bg-[#FAF4F0] text-[#2D0B0E]' : 'bg-[#2D0B0E] text-[#F6ECCB]'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{badgeText || (isBride ? 'Brides of Sri Matrimony' : 'Grooms of Sri Matrimony')}</span>
            </div>
            <h2 className={`font-editorial text-3xl sm:text-5xl font-light tracking-wide ${
              isBride ? 'text-[#1A1616]' : 'text-[#FAF6F0]'
            }`}>
              {title}
            </h2>
            <p className={`text-xs sm:text-sm font-light mt-1.5 ${
              isBride ? 'text-[#5A191E]' : 'text-[#F6ECCB]/80'
            }`}>
              {subtitle}
            </p>
          </div>

          <Link
            to={viewAllLink}
            className={`text-xs sm:text-sm tracking-widest font-bold uppercase flex items-center gap-2 transition-colors group ${
              isBride ? 'text-[#2D0B0E] hover:text-[#D4AF37]' : 'text-[#F6ECCB] hover:text-[#D4AF37]'
            }`}
          >
            <span>{t('btnViewAll')} {isBride ? 'Brides' : 'Grooms'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
          </Link>
        </div>

        {/* Editorial Composition: Large Spotlight on Left + 1 Balanced Row of 2 Companion Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Spotlight Hero Profile (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`rounded-xl p-5 sm:p-7 gold-foil-border shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-5 sm:gap-7 h-full ${
              isBride
                ? 'bg-[#FDFBF7] text-[#1A1616]'
                : 'bg-[#2D0B0E]/85 text-[#FAF6F0] backdrop-blur-md'
            }`}>
              {/* Photograph - Squarer rounded-lg container (no arch-frame clipping!) */}
              <div className="w-full md:w-5/12 aspect-[3/4] md:aspect-auto rounded-lg overflow-hidden relative shadow-md bg-[#23080A] shrink-0 border border-[#D4AF37]/40 min-h-[260px] md:min-h-[340px]">
                <img
                  src={featured.photos?.[0]?.url || (isBride ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600' : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600')}
                  alt={featured.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md glass-wine text-[10px] text-[#F6ECCB] font-bold border border-[#D4AF37]/40 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Featured Profile</span>
                </div>
              </div>

              {/* Spotlight Editorial Narrative */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      {featured.profileId}
                    </span>
                    <span className={`text-xs font-semibold ${isBride ? 'text-[#5A191E]' : 'text-[#F6ECCB]'}`}>
                      {featured.age} Yrs &bull; {featured.height}
                    </span>
                  </div>

                  <h3 className={`font-editorial text-2xl sm:text-3xl font-light leading-snug ${isBride ? 'text-[#1A1616]' : 'text-[#FAF6F0]'}`}>
                    {featured.fullName}
                  </h3>

                  <p className="text-xs font-semibold text-[#D4AF37] mt-0.5 mb-2">
                    {featured.religion} &bull; {featured.caste || 'Tamil Community'}
                  </p>

                  <p className={`text-xs font-light leading-relaxed italic border-l-2 border-[#D4AF37] pl-3 mb-3.5 line-clamp-2 ${
                    isBride ? 'text-[#321C1C]/80' : 'text-[#FAF6F0]/80'
                  }`}>
                    &ldquo;{featured.aboutMe || 'Looking for an ambitious, family-oriented life companion rooted in Tamil tradition.'}&rdquo;
                  </p>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="font-medium truncate">{featured.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="font-medium truncate">{featured.occupation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="font-medium truncate">{featured.workLocation || 'Tamil Nadu'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 mt-3 border-t border-[#D4AF37]/20 flex items-center gap-3">
                  <Link
                    to={`/profile/${featured.profileId || featured._id}`}
                    className="flex-1 py-2.5 px-4 rounded-md bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] text-xs font-bold uppercase tracking-wider text-center shadow hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 border border-[#D4AF37]/50"
                  >
                    <span>View Spotlight Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#190507]" />
                  </Link>

                  <div className="flex gap-1.5 items-center">
                    {profiles.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFeaturedIndex(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          featuredIndex === idx ? 'w-5 bg-[#D4AF37]' : 'w-2 bg-[#D4AF37]/35 hover:bg-[#D4AF37]/60'
                        }`}
                        title={`Select profile ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Satellite Profiles (5 cols - Exactly 1 Row of 2 Matching Cards with Slide Navigation) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                isBride ? 'text-[#5A191E]' : 'text-[#D4AF37]'
              }`}>
                Featured {isBride ? 'Brides' : 'Grooms'} ({safePage * itemsPerPage + 1}-{Math.min((safePage + 1) * itemsPerPage, otherProfiles.length)} of {otherProfiles.length})
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevSatellites}
                  disabled={safePage === 0}
                  className={`w-7 h-7 rounded-md flex items-center justify-center border transition-all cursor-pointer ${
                    safePage === 0
                      ? 'opacity-35 cursor-not-allowed border-gray-400/30 text-gray-400'
                      : isBride
                        ? 'border-[#D4AF37]/40 bg-[#FAF4F0] text-[#2D0B0E] hover:border-[#D4AF37] hover:bg-[#F2E8DC]'
                        : 'border-[#D4AF37]/40 bg-[#2D0B0E] text-[#F6ECCB] hover:border-[#D4AF37] hover:bg-[#3B0D11]'
                  }`}
                  title="Previous profiles"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSatellites}
                  disabled={safePage >= maxPage}
                  className={`w-7 h-7 rounded-md flex items-center justify-center border transition-all cursor-pointer ${
                    safePage >= maxPage
                      ? 'opacity-35 cursor-not-allowed border-gray-400/30 text-gray-400'
                      : isBride
                        ? 'border-[#D4AF37]/40 bg-[#FAF4F0] text-[#2D0B0E] hover:border-[#D4AF37] hover:bg-[#F2E8DC]'
                        : 'border-[#D4AF37]/40 bg-[#2D0B0E] text-[#F6ECCB] hover:border-[#D4AF37] hover:bg-[#3B0D11]'
                  }`}
                  title="Next profiles"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {displayedSatellites.map((p) => (
                <div key={p.profileId || p._id} className="h-full">
                  <ProfileCard profile={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
