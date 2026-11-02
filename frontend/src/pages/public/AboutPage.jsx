import React from 'react';
import { ShieldCheck, Heart, Users, Sparkles, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AboutPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FFFCF7] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#4B1718] via-[#351011] to-[#4B1718] rounded-3xl p-8 sm:p-14 text-center text-[#FFFCF7] border-2 border-[#D7AD4A]/40 shadow-2xl mb-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-kolam-pattern pointer-events-none" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#F0D69C] bg-[#351011] px-4 py-1 rounded-full border border-[#D7AD4A]/40 shadow-sm inline-block mb-3">
            Our Sacred Mission
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gold-gradient mb-4">
            About Sri Matrimony
          </h1>
          <p className="tamil-text text-sm sm:text-lg text-[#F0D69C] max-w-2xl mx-auto mb-4 font-semibold">
            பாரம்பரிய தமிழ் பண்பாட்டின் தூய்மையுடன் கூடிய திருமண வரன் தளம்
          </p>
          <p className="text-xs sm:text-base text-[#F8F1E7]/85 max-w-2xl mx-auto leading-relaxed">
            Sri Matrimony was founded with a singular, noble vision: to help Tamil brides and grooms discover compatible life partners through verified profiles, genuine family values, and modern privacy protection.
          </p>
        </div>

        {/* Pillars of Sri Matrimony */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#FFFCF7] rounded-3xl p-8 border border-[#D7AD4A]/30 shadow-lg text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#4B1718] text-[#F0D69C] flex items-center justify-center mx-auto mb-4 shadow">
              <ShieldCheck className="w-7 h-7 text-[#D7AD4A]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#4B1718] mb-2">
              100% Verified Profiles
            </h3>
            <p className="text-xs sm:text-sm text-[#321C1C]/80 leading-relaxed">
              Every profile undergoes strict document verification and contact validation to ensure families connect with genuine, verified members only.
            </p>
          </div>

          <div className="bg-[#FFFCF7] rounded-3xl p-8 border border-[#D7AD4A]/30 shadow-lg text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#4B1718] text-[#F0D69C] flex items-center justify-center mx-auto mb-4 shadow">
              <Heart className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#4B1718] mb-2">
              Traditional Family Ethics
            </h3>
            <p className="text-xs sm:text-sm text-[#321C1C]/80 leading-relaxed">
              We respect Tamil customs, horoscope compatibility, and regional cultural expectations while delivering modern convenience and digital ease.
            </p>
          </div>

          <div className="bg-[#FFFCF7] rounded-3xl p-8 border border-[#D7AD4A]/30 shadow-lg text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#4B1718] text-[#F0D69C] flex items-center justify-center mx-auto mb-4 shadow">
              <Sparkles className="w-7 h-7 text-[#D7AD4A]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#4B1718] mb-2">
              Privacy By Design
            </h3>
            <p className="text-xs sm:text-sm text-[#321C1C]/80 leading-relaxed">
              Control who can see your telephone number, photographs, and family background with strict server-side authorization controls.
            </p>
          </div>
        </div>

        {/* Story & Commitment */}
        <div className="bg-[#F8F1E7] rounded-3xl p-8 sm:p-12 border border-[#D7AD4A]/30 text-xs sm:text-sm text-[#321C1C]/85 leading-relaxed space-y-4">
          <h2 className="font-heading font-bold text-2xl text-[#4B1718] mb-2">
            Connecting Tamil Hearts Worldwide
          </h2>
          <p>
            Whether your family is based in Chennai, Madurai, Coimbatore, Tirunelveli, or residing across Singapore, Malaysia, the United Kingdom, or the United States, Sri Matrimony unites Tamil families under one sacred, trusted roof.
          </p>
          <p>
            Our customer relationship team in Chennai works six days a week to assist parents, brides, and grooms with personal attention, horoscope matching guidance, and genuine relationship facilitation.
          </p>
        </div>
      </div>
    </div>
  );
}
