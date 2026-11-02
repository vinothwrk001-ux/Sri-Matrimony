import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import ProfileCard from '../common/ProfileCard';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ProfileCarousel({
  title,
  subtitle,
  profiles = [],
  loading = false,
  viewAllLink = '/search',
  badgeText = '',
}) {
  const { t } = useLanguage();
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FFFCF7] border-b border-[#D7AD4A]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            {badgeText && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B1718]/10 text-[#4B1718] border border-[#D7AD4A]/40 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-[#D7AD4A]" />
                <span>{badgeText}</span>
              </span>
            )}
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#4B1718]">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#682526] font-medium mt-1">
              {subtitle}
            </p>
          </div>

          {/* Navigation Controls & View All */}
          <div className="flex items-center gap-3">
            <Link
              to={viewAllLink}
              className="text-xs sm:text-sm font-bold text-[#4B1718] hover:text-[#D7AD4A] flex items-center gap-1 transition-colors group"
            >
              <span>{t('btnViewAll')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-1.5 pl-2 border-l border-[#D7AD4A]/30">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full border border-[#D7AD4A]/40 bg-[#F8F1E7] text-[#4B1718] hover:bg-[#4B1718] hover:text-[#F0D69C] transition-colors flex items-center justify-center shadow-sm cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full border border-[#D7AD4A]/40 bg-[#F8F1E7] text-[#4B1718] hover:bg-[#4B1718] hover:text-[#F0D69C] transition-colors flex items-center justify-center shadow-sm cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Scroll Container */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[3/4] rounded-2xl bg-[#F8F1E7] animate-pulse border border-[#D7AD4A]/20" />
            ))}
          </div>
        ) : profiles.length > 0 ? (
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {profiles.map((profile) => (
              <div
                key={profile.profileId || profile._id}
                className="w-[280px] sm:w-[300px] shrink-0 snap-start"
              >
                <ProfileCard profile={profile} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-sm text-[#682526]">
            No verified profiles currently available in this category.
          </div>
        )}
      </div>
    </section>
  );
}
