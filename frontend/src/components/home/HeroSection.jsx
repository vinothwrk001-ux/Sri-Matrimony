import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, ChevronRight, ArrowUpRight, Compass, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const { openAuth } = useApp();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#190507] text-[#FAF6F0] pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 overflow-hidden border-b border-[#D4AF37]/30">
      {/* Background Cinematic Radial Gradients & Jali Texture */}
      <div className="absolute inset-0 bg-wine-gradient opacity-95 pointer-events-none" />
      <div className="absolute inset-0 opacity-15 bg-jali-pattern pointer-events-none" />

      {/* Ambient Champagne Gold Lighting Accents */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#C48B8B]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Eyebrow Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-wine border border-[#D4AF37]/40 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#F6ECCB] font-medium">
              {lang === 'ta' ? 'புனித தமிழ் இல்லற சங்கமம்' : 'A Sanctuary For Sacred Tamil Unions'}
            </span>
          </motion.div>
        </div>

        {/* Central Asymmetrical Editorial Split: Typography on Left & Curved Photography on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 sm:mb-20">
          {/* Left Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-[#FAF6F0]"
            >
              <span className="block font-normal champagne-gradient-text drop-shadow">
                Somewhere,
              </span>
              <span className="italic text-[#F6ECCB] font-light">
                Your Forever
              </span>{' '}
              <span>Begins.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-xs sm:text-base font-light text-[#FAF6F0]/85 max-w-xl mx-auto lg:mx-0 leading-relaxed tracking-wide"
            >
              {t('heroDesc')}
            </motion.p>

            {/* CTAs with Gold Line Accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {!isAuthenticated ? (
                <button
                  onClick={() => openAuth('register')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-[#D4AF37]/60"
                >
                  <span>{t('heroCtaRegister')}</span>
                  <ChevronRight className="w-4 h-4 text-[#190507]" />
                </button>
              ) : (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-[#D4AF37]/60"
                >
                  <span>Enter My Matchmaking Salon</span>
                  <ChevronRight className="w-4 h-4 text-[#190507]" />
                </button>
              )}

              <button
                onClick={() => navigate('/search')}
                className="w-full sm:w-auto px-7 py-4 rounded-full glass-wine hover:bg-[#3B0D11] text-[#FAF6F0] hover:text-[#D4AF37] text-xs font-semibold tracking-widest uppercase transition-all border border-[#D4AF37]/35 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('heroCtaBrowse')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </motion.div>

            {/* 3 Refined Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#D4AF37]/20 max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2 text-xs font-light text-[#FAF6F0]/80">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{t('badgeVerified')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-light text-[#FAF6F0]/80">
                <Heart className="w-4 h-4 text-rose-300 shrink-0" />
                <span>{t('badgeFamilies')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-light text-[#FAF6F0]/80">
                <Compass className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{t('badgeSecure')}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Editorial Photography Collage (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Primary Traditional Tamil Wedding Portrait in Refined Frame */}
            <div className="relative w-64 sm:w-72 lg:w-80 aspect-[9/14] rounded-2xl overflow-hidden gold-foil-border shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#23080A]">
              <img
                src="/assets/tamil_wedding_couple.jpg"
                alt="Tamil Wedding"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85';
                }}
                className="w-full h-full object-cover object-top scale-105 hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#190507]/90 via-transparent to-[#190507]/20" />

              {/* Floating Editorial Label - Protected with Glass Panel */}
              <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 p-3 rounded-xl glass-wine border border-[#D4AF37]/35 text-center backdrop-blur-md shadow-lg z-10">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  Tamil Nadu Traditions
                </p>
                <p className="font-editorial text-base sm:text-lg text-[#FAF6F0] italic">
                  Authentic Matrimonial Unions
                </p>
              </div>
            </div>

            {/* Satellite Secondary Photo with Floating Stamp - Offset so it never covers text */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-5 sm:-left-8 w-28 sm:w-36 aspect-[4/5] rounded-xl overflow-hidden gold-foil-border shadow-2xl hidden sm:block bg-[#2D0B0E] z-20">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80"
                alt="Verified Bride"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#190507]/85 via-transparent to-transparent" />
              <div className="absolute bottom-2 inset-x-1.5 text-center text-[10px] font-medium tracking-wider text-[#F6ECCB] flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span className="truncate">SM1001 &bull; Verified</span>
              </div>
            </div>

            {/* Rotating Sacred Seal Badge */}
            <div className="absolute -top-4 -right-4 sm:-right-8 w-20 sm:w-24 h-20 sm:h-24 rounded-full border border-[#D4AF37]/50 glass-wine flex items-center justify-center p-2 shadow-2xl z-20">
              <div className="w-full h-full rounded-full border border-dashed border-[#F6ECCB]/40 animate-[spin_20s_linear_infinite] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
