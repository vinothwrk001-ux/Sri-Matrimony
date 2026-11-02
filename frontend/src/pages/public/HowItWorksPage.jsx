import React from 'react';
import HowItWorksSection from '../../components/home/HowItWorksSection';
import { ShieldCheck, Heart, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF7] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D7AD4A] bg-[#4B1718] px-3.5 py-1 rounded-full shadow-sm">
            Step by Step Guide
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#4B1718] mt-3">
            How Sri Matrimony Works
          </h1>
          <p className="text-xs sm:text-base text-[#682526] font-medium mt-2">
            A secure, traditional, and effortless journey towards finding your compatible Tamil life partner.
          </p>
        </div>

        {/* 4 Animated Steps */}
        <HowItWorksSection />

        {/* Tips for Matrimonial Success */}
        <div className="mt-16 bg-[#F8F1E7] rounded-3xl p-8 sm:p-12 border border-[#D7AD4A]/30">
          <h2 className="font-heading font-bold text-2xl text-[#4B1718] mb-6">
            Helpful Tips For Brides &amp; Grooms
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#321C1C]">
            <div className="bg-[#FFFCF7] p-5 rounded-2xl border border-[#D7AD4A]/20 shadow-sm space-y-2">
              <h3 className="font-bold text-[#4B1718] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Upload Clear, Recent Photographs</span>
              </h3>
              <p className="text-[#321C1C]/80">
                Profiles with genuine studio or traditional family photographs receive 5x more interest requests from verified families.
              </p>
            </div>

            <div className="bg-[#FFFCF7] p-5 rounded-2xl border border-[#D7AD4A]/20 shadow-sm space-y-2">
              <h3 className="font-bold text-[#4B1718] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Complete Government ID Verification</span>
              </h3>
              <p className="text-[#321C1C]/80">
                A verified badge signifies authenticity, builds instant family trust, and promotes your profile to the top of matching searches.
              </p>
            </div>

            <div className="bg-[#FFFCF7] p-5 rounded-2xl border border-[#D7AD4A]/20 shadow-sm space-y-2">
              <h3 className="font-bold text-[#4B1718] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Detail Your Family &amp; Native Roots</span>
              </h3>
              <p className="text-[#321C1C]/80">
                Sharing your ancestral town, family values, and parental occupation helps Tamil families find common ground and cultural harmony.
              </p>
            </div>

            <div className="bg-[#FFFCF7] p-5 rounded-2xl border border-[#D7AD4A]/20 shadow-sm space-y-2">
              <h3 className="font-bold text-[#4B1718] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>State Clear Partner Expectations</span>
              </h3>
              <p className="text-[#321C1C]/80">
                Specify your preferred age range, education criteria, and food habits transparently to connect with genuinely compatible suitors.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/search"
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D7AD4A] via-[#F0D69C] to-[#D7AD4A] text-[#4B1718] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105"
            >
              Start Browsing Profiles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
