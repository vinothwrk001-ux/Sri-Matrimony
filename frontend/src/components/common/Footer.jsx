import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Footer() {
  const { t, lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#150305] text-[#FAF6F0] border-t border-[#D4AF37]/30 relative overflow-hidden">
      {/* Subtle lattice watermark */}
      <div className="absolute inset-0 opacity-10 bg-jali-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Col 1: Brand & Editorial Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37] bg-gradient-to-br from-[#2D0B0E] to-[#150305] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 100 100" className="w-7 h-7 fill-[#D4AF37]">
                  <path d="M50,15 C45,28 32,38 32,54 C32,68 40,78 50,78 C60,78 68,68 68,54 C68,38 55,28 50,15 Z" fill="#D4AF37" />
                  <circle cx="50" cy="52" r="6" fill="#150305" />
                </svg>
              </div>
              <div>
                <span className="font-editorial text-2xl sm:text-3xl font-light text-[#FAF6F0] tracking-wider block">
                  SRI MATRIMONY
                </span>
                <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.25em] font-semibold">
                  Where Tradition Meets Modern Love
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#F6ECCB]/75 leading-relaxed font-light max-w-sm">
              The premier digital matrimonial sanctuary for Tamil families. Dedicated to honoring Vedic cultural traditions while empowering modern brides and grooms with authentic, verified connections.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium">100% ID Verified Tamil Profiles &bull; Strict Anti-Screening Privacy</span>
            </div>
          </div>

          {/* Col 2: Matrimony Sanctuary Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-editorial text-lg text-[#F6ECCB] font-normal mb-5 flex items-center gap-1.5">
              <span>Sanctuary</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6F0]/80">
              <li>
                <Link to="/" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>{t('navHome')}</span>
                </Link>
              </li>
              <li>
                <Link to="/search?lookingFor=Bride" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>Tamil Brides</span>
                </Link>
              </li>
              <li>
                <Link to="/search?lookingFor=Groom" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>Tamil Grooms</span>
                </Link>
              </li>
              <li>
                <Link to="/search?isVerified=true" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>Verified Profiles</span>
                </Link>
              </li>
              <li>
                <Link to="/plans" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>Membership Suites</span>
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>Sacred Unions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-editorial text-lg text-[#F6ECCB] font-normal mb-5">
              <span>Legal &amp; Trust</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6F0]/80">
              <li>
                <Link to="/privacy-policy" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>Privacy Charter</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>Terms of Honor</span>
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>Cancellation Terms</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>Matrimony Guidelines</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Concierge & Headquarters (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-editorial text-lg text-[#F6ECCB] font-normal mb-5">
              <span>Concierge Office</span>
            </h4>
            <div className="space-y-3 text-xs text-[#FAF6F0]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="leading-relaxed">No. 42, Anna Salai, Near Panagal Park, T. Nagar, Chennai - 600017</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+919840012345" className="hover:text-[#D4AF37] transition-colors font-medium">
                  +91 98400 12345
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:support@srimatrimony.com" className="hover:text-[#D4AF37] transition-colors font-medium">
                  concierge@srimatrimony.com
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#23080A] border border-[#D4AF37]/30 text-[11px] text-[#F6ECCB]/80">
              <p className="font-semibold text-[#D4AF37] mb-1">Assisted Matrimony Desk</p>
              <p className="text-[10px] text-[#FAF6F0]/70">
                Monday – Saturday: 9:00 AM – 7:30 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Architectural Gold Divider & Copyright */}
        <div className="pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6F0]/60 gap-4">
          <p>
            &copy; {currentYear} <strong className="text-[#D4AF37] font-normal">Sri Matrimony</strong>. All Rights Reserved. Crafted for Tamil brides and grooms globally.
          </p>
          <div className="flex items-center gap-1.5 text-[#F6ECCB]">
            <span>Where Tradition Meets Modern Love</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
