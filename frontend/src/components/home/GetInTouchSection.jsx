import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function GetInTouchSection() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-[#190507] via-[#24080B] to-[#150305] text-[#FAF6F0] relative overflow-hidden border-b border-[#D4AF37]/30">
      {/* Decorative lattice watermark */}
      <div className="absolute inset-0 opacity-10 bg-jali-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl p-8 sm:p-12 lg:p-14 bg-gradient-to-r from-[#2D0B0E]/90 via-[#23080A]/95 to-[#2D0B0E]/90 gold-foil-border shadow-2xl flex flex-col xl:flex-row items-center justify-between gap-8 lg:gap-10 backdrop-blur-md">
          {/* Left Column: Narrative */}
          <div className="max-w-xl text-center xl:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-sm border border-[#D4AF37]/40 bg-[#190507] text-[#F6ECCB]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Personalized Matrimonial Concierge</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#FAF6F0] tracking-wide mb-4">
              Need Guidance Finding Your Sacred Match?
            </h2>

            <p className="text-xs sm:text-sm text-[#F6ECCB]/80 font-light leading-relaxed mb-6">
              Our experienced Tamil matrimonial counselors are available to guide you through horoscope assessments, profile verification, and respectful family introductions.
            </p>

            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 text-xs text-[#FAF6F0]/75">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Mon – Sat: 9:00 AM – 7:30 PM IST</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>T. Nagar, Chennai &bull; Coimbatore</span>
              </span>
            </div>
          </div>

          {/* Right Column: High-conversion actions */}
          <div className="flex flex-col sm:flex-row flex-wrap xl:flex-nowrap items-center justify-center xl:justify-end gap-3 w-full xl:w-auto">
            {/* Phone Call */}
            <a
              href="tel:+919840012345"
              className="h-12 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer w-full sm:w-auto shrink-0"
            >
              <Phone className="w-4 h-4 shrink-0 text-[#190507]" />
              <span>Call (+91 98400 12345)</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919840012345?text=Vanakkam%20Sri%20Matrimony,%20I%20am%20seeking%20a%20Tamil%20match"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-5 rounded-xl bg-[#1E5D38] text-white hover:bg-[#257245] font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer border border-emerald-400/40 w-full sm:w-auto shrink-0"
            >
              <MessageCircle className="w-4 h-4 shrink-0 text-emerald-300" />
              <span>WhatsApp Us</span>
            </a>

            {/* Contact Page */}
            <Link
              to="/contact"
              className="h-12 px-5 rounded-xl bg-[#190507] text-[#F6ECCB] hover:text-[#FAF6F0] hover:border-[#D4AF37] font-bold text-xs uppercase tracking-wider shadow-md border border-[#D4AF37]/40 transition-all flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto shrink-0"
            >
              <Mail className="w-4 h-4 shrink-0 text-[#D4AF37]" />
              <span>Send Inquiry</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
