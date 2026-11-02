import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Award, FileCheck2, ArrowRight, Sparkles, Lock, ChevronLeft, ChevronRight, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockBrides, mockGrooms } from '../../api/mockData';

const defaultFallbackVerified = [...mockBrides.slice(0, 4), ...mockGrooms.slice(0, 4)];

export default function VerifiedProfilesShowcase({ profiles = [], loading = false }) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeProfiles = (profiles && profiles.length > 0) ? profiles : defaultFallbackVerified;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= activeProfiles.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, activeProfiles.length - 3) : prev - 1));
  };

  const trustMetrics = [
    {
      icon: ShieldCheck,
      title: 'Govt. ID Authenticated',
      desc: 'Aadhaar & Passport verification before profile public activation.',
    },
    {
      icon: FileCheck2,
      title: 'Original Horoscopes',
      desc: 'Rasi & Navamsa verified by Tamil astrologer consensus.',
    },
    {
      icon: Award,
      title: 'Direct Family Connect',
      desc: 'Parent or self-managed verified contact details.',
    },
    {
      icon: Lock,
      title: 'Bank-Grade Privacy',
      desc: 'Full photo masking and watermarked contact reveals.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#190507] via-[#24080B] to-[#1A0507] text-[#FAF6F0] relative overflow-hidden border-b border-[#D4AF37]/25">
      {/* Subtle gold ornamentation watermark */}
      <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-lg border border-[#D4AF37]/50 bg-[#2D0B0E] text-[#F6ECCB]">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>The Gold Standard of Authenticity</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#FAF6F0] tracking-wide mb-4">
            Curated &amp; 100% Verified Profiles
          </h2>

          <p className="text-xs sm:text-sm text-[#F6ECCB]/80 font-light leading-relaxed">
            Every matrimonial profile showcased here has completed rigorous government identity verification, academic authentication, and family background validation.
          </p>
        </div>

        {/* 4 Trust Pillars Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {trustMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#2D0B0E]/60 border border-[#D4AF37]/25 backdrop-blur-md flex items-start gap-3.5 hover:border-[#D4AF37]/60 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] flex items-center justify-center shrink-0 shadow text-[#190507]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-[#F6ECCB] font-normal leading-snug group-hover:text-[#FAF6F0] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#FAF6F0]/70 font-light mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Profiles Editorial Gallery */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Showing Verified Profiles ({profiles.length})
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#2D0B0E] text-[#F6ECCB] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#190507] transition-all cursor-pointer shadow"
                aria-label="Previous verified profiles"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#2D0B0E] text-[#F6ECCB] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#190507] transition-all cursor-pointer shadow"
                aria-label="Next verified profiles"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {activeProfiles.slice(currentIndex, currentIndex + 3).map((profile) => {
              const photoUrl =
                profile.photos?.[0]?.url ||
                (profile.gender === 'Female'
                  ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'
                  : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600');

              return (
                <div
                  key={profile.profileId || profile._id}
                  className="rounded-3xl p-6 gold-foil-border bg-[#23080A]/85 backdrop-blur-md shadow-2xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div>
                    {/* Arched Top Photograph */}
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden relative mb-5 bg-[#190507] border border-[#D4AF37]/30">
                      <img
                        src={photoUrl}
                        alt={profile.fullName}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = profile.gender === 'Female'
                            ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'
                            : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600';
                        }}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Golden Verification Seal */}
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Govt. ID Verified</span>
                      </div>

                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full glass-wine text-[10px] text-[#F6ECCB] font-semibold border border-[#D4AF37]/30">
                        {profile.profileId}
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-editorial text-2xl font-light text-[#FAF6F0] tracking-wide group-hover:text-[#F6ECCB] transition-colors">
                        {profile.fullName}
                      </h3>
                      <span className="text-xs font-semibold text-[#D4AF37]">
                        {profile.age} Yrs &bull; {profile.height}
                      </span>
                    </div>

                    <p className="text-xs text-[#F6ECCB]/80 font-medium mb-3">
                      {profile.religion} &bull; {profile.caste || 'Tamil Community'}
                    </p>

                    <div className="space-y-1.5 text-xs text-[#FAF6F0]/80 mb-5">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{profile.occupation || 'Professional'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{profile.workLocation || 'Tamil Nadu, India'}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/profile/${profile.profileId || profile._id}`}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#D4AF37] text-[#F6ECCB] hover:bg-[#D4AF37] hover:text-[#190507] text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                  >
                    <span>Inspect Verified Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/search?isVerified=true"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#190507] bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] px-8 py-3.5 rounded-full shadow-xl hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Explore All Verified Tamil Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
