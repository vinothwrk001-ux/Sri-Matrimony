import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Sparkles, HeartHandshake, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function HowItWorksSection() {
  const { t, lang } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Create Your Profile',
      titleTamil: 'சுயவிவரம் உருவாக்குதல்',
      subtitle: 'Complete Cultural & Horoscope Registry',
      desc: 'Craft your verified matrimonial profile with personal aspirations, academic credentials, and traditional Tamil astrological data (Rasi, Nakshatram, and Dosham).',
      highlight: 'Aadhaar ID verification + photo privacy protection',
      icon: UserPlus,
    },
    {
      num: '02',
      title: 'Discover Meaningful Matches',
      titleTamil: 'பொருத்தமான வரன் கண்டறிதல்',
      subtitle: 'Curated Cultural Compatibility',
      desc: 'Explore refined profiles matched by horoscope compatibility, values, lifestyle, and community preferences using our editorial search filters.',
      highlight: '10 Porutham astrology matching engine',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Connect With Interest',
      titleTamil: 'விருப்பத்தை வெளிப்படுத்துதல்',
      subtitle: 'Private & Secure Communication',
      desc: 'Send personalized interest requests. Once accepted, start private conversations and request verified parent or guardian phone contacts.',
      highlight: 'Mutual consent contact reveals with watermarking',
      icon: HeartHandshake,
    },
    {
      num: '04',
      title: 'Begin Your Journey Together',
      titleTamil: 'திருமண வாழ்வின் தொடக்கம்',
      subtitle: 'Tradition Meets Lifelong Love',
      desc: 'Introduce families, arrange traditional horoscope consultations, and take the auspicious step toward an unforgettable Tamil wedding.',
      highlight: 'Dedicated matrimonial relationship counselors',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#FAF6F0] via-[#FDFBF7] to-[#FAF6F0] relative overflow-hidden border-b border-[#D4AF37]/20">
      {/* Background kolam flourish */}
      <div className="absolute inset-0 opacity-5 bg-kolam-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm border border-[#D4AF37]/40 bg-[#F5EAE4] text-[#2D0B0E]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Sacred Path</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#1A1616] tracking-wide mb-3">
            How Sri Matrimony Unites Souls
          </h2>

          <p className="text-xs sm:text-sm text-[#5A191E] font-light leading-relaxed">
            A serene, four-step journey designed to honor Tamil heritage while giving modern couples the freedom of authentic choice.
          </p>
        </div>

        {/* Milestone Steps with Connected Golden Line */}
        <div className="relative mb-16">
          {/* Desktop Connected Golden Line */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`relative rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#2D0B0E] to-[#1C0608] text-[#FAF6F0] shadow-2xl scale-102 gold-foil-border -translate-y-2'
                      : 'bg-[#FDFBF7] text-[#1A1616] border border-[#D4AF37]/30 shadow-md hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Step Number & Icon Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507]'
                          : 'bg-[#FAF6F0] text-[#2D0B0E] border border-[#D4AF37]/40'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <span className={`font-editorial text-3xl font-light tracking-widest ${
                        isSelected ? 'text-[#D4AF37]' : 'text-[#D4AF37]/50'
                      }`}>
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title & Subtitle */}
                    <span className={`text-[10px] font-bold uppercase tracking-widest block mb-1 ${
                      isSelected ? 'text-[#D4AF37]' : 'text-[#8C6D1F]'
                    }`}>
                      {step.subtitle}
                    </span>

                    <h3 className={`font-editorial text-2xl font-light mb-3 leading-snug ${
                      isSelected ? 'text-[#FAF6F0]' : 'text-[#2D0B0E]'
                    }`}>
                      {lang === 'ta' && step.titleTamil ? step.titleTamil : step.title}
                    </h3>

                    <p className={`text-xs leading-relaxed font-light mb-5 ${
                      isSelected ? 'text-[#FAF6F0]/80' : 'text-[#321C1C]/80'
                    }`}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Step Feature Highlight */}
                  <div className={`pt-4 border-t flex items-center gap-2 text-[11px] font-semibold ${
                    isSelected
                      ? 'border-[#D4AF37]/30 text-[#F6ECCB]'
                      : 'border-[#D4AF37]/20 text-[#5A191E]'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="leading-tight">{step.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="rounded-3xl p-8 sm:p-10 bg-[#2D0B0E] text-[#FAF6F0] gold-foil-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#FAF6F0] mb-1">
              Begin Your Tamil Matrimonial Journey Today
            </h3>
            <p className="text-xs sm:text-sm text-[#F6ECCB]/80 font-light">
              Registration is confidential, verified, and takes less than 3 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/how-it-works"
              className="text-xs font-semibold uppercase tracking-wider text-[#F6ECCB] hover:text-[#D4AF37] transition-colors"
            >
              Explore Full Process
            </Link>

            <Link
              to="/search"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#190507] bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] px-6 py-3 rounded-full shadow hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Discover Matches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
