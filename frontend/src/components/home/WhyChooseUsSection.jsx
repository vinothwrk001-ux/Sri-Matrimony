import React from 'react';
import { ShieldCheck, Lock, Users, Sparkles, HeartHandshake, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export default function WhyChooseUsSection() {
  const { t } = useLanguage();
  const { bootstrapData } = useApp();

  const totalMembers = bootstrapData?.stats?.totalProfiles || '12,500+';
  const verifiedCount = bootstrapData?.stats?.verifiedProfiles || '10,000+';

  const stats = [
    { value: '100%', label: 'ID Verified Profiles', sub: 'Aadhaar & Passport authenticated' },
    { value: '2,800+', label: 'Sacred Marriages', sub: 'United across Tamil Nadu' },
    { value: '38', label: 'Tamil Districts', sub: 'Chennai, CBE, Madurai & Diaspora' },
    { value: '99.4%', label: 'Family Trust Rating', sub: 'Highest privacy compliance' },
  ];

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: 'Stringent Manual Screening',
      desc: 'Every registration undergoes human review to ensure authentic photographs, verified contact coordinates, and genuine matrimony intent.',
    },
    {
      icon: Lock,
      title: 'Watermarked Privacy Safeguards',
      desc: 'Your photos and contact details are shielded with dynamic anti-screenshot watermarks, view limits, and express consent protocols.',
    },
    {
      icon: Users,
      title: 'Authentic 10 Porutham Astrology',
      desc: 'Accurate Vedic astrological compatibility analysis based on traditional Tamil Panchangam, Rasi, Nakshatram, and Navamsa charts.',
    },
    {
      icon: HeartHandshake,
      title: 'Discreet Family Coordination',
      desc: 'Our relationship counselors assist families with horoscope exchanges, virtual meetings, and dignified ancestral inquiries.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0] relative overflow-hidden border-b border-[#D4AF37]/20">
      {/* Decorative lattice watermark */}
      <div className="absolute inset-0 opacity-5 bg-jali-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm border border-[#D4AF37]/40 bg-[#F5EAE4] text-[#2D0B0E]">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Sri Matrimony Distinction</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#1A1616] tracking-wide mb-3">
            Why Discerning Tamil Families Choose Us
          </h2>

          <p className="text-xs sm:text-sm text-[#5A191E] font-light leading-relaxed">
            More than a matchmaking algorithm — an honorable institution grounded in cultural reverence, uncompromising truth, and contemporary dignity.
          </p>
        </div>

        {/* Live Telemetry / Statistics Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FDFBF7] gold-foil-border text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="font-editorial text-4xl sm:text-5xl font-light text-[#2D0B0E] tracking-tight mb-1">
                {stat.value}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8C6D1F] mb-0.5">
                {stat.label}
              </p>
              <p className="text-[11px] text-[#321C1C]/70 font-light">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Editorial Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#FDFBF7] border border-[#D4AF37]/30 shadow-md hover:shadow-xl transition-all duration-300 flex items-start gap-5 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D0B0E] to-[#1C0608] text-[#F6ECCB] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  <Icon className="w-7 h-7 text-[#D4AF37]" />
                </div>

                <div>
                  <h3 className="font-editorial text-2xl font-light text-[#1A1616] mb-2 group-hover:text-[#2D0B0E] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#321C1C]/80 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
