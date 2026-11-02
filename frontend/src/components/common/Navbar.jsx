import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import {
  Menu,
  X,
  Globe,
  User as UserIcon,
  Crown,
  LogOut,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { lang, toggleLang, t } = useLanguage();
  const { openAuth } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navSearch'), path: '/search' },
    { name: t('navPlans'), path: '/plans' },
    { name: t('navHowItWorks'), path: '/how-it-works' },
    { name: t('navSuccessStories'), path: '/success-stories' },
    { name: t('navContact'), path: '/contact' },
  ];

  const planBadge = user?.activeMembership?.planCode
    ? user.activeMembership.planCode.toUpperCase()
    : 'FREE';

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#190507]/90 backdrop-blur-xl border-b border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-[#23080A] border-b border-[#D4AF37]/20'
      }`}
    >
      <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-5 lg:px-4 xl:px-8 2xl:px-10">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 lg:gap-2 xl:gap-4">
          {/* Left: Brand Identity */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 group shrink-0">
            {/* Architectural Gold Emblem */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 rounded-full border border-[#D4AF37]/60 bg-gradient-to-br from-[#2D0B0E] to-[#150405] flex items-center justify-center shadow-md group-hover:scale-105 group-hover:border-[#D4AF37] transition-all shrink-0">
              <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 fill-[#D4AF37]">
                <path d="M50,15 C45,28 32,38 32,54 C32,68 40,78 50,78 C60,78 68,68 68,54 C68,38 55,28 50,15 Z" fill="#D4AF37" />
                <path d="M50,30 C45,40 38,48 38,58 C38,67 43,72 50,72 C57,72 62,67 62,58 C62,48 55,40 50,30 Z" fill="#23080A" />
                <circle cx="50" cy="54" r="5" fill="#D4AF37" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-editorial text-xl sm:text-2xl xl:text-3xl font-light tracking-wide champagne-gradient-text drop-shadow-sm leading-tight whitespace-nowrap">
                Sri Matrimony
              </span>
              <p className={`text-[8.5px] sm:text-[9.5px] xl:text-[10px] text-[#F6ECCB]/70 font-light leading-none whitespace-nowrap ${
                lang === 'ta' ? 'tracking-normal' : 'tracking-[0.18em] uppercase'
              }`}>
                {lang === 'ta' ? 'நம்பகமான தமிழ் மேட்ரிமோனி' : 'Where Tradition Meets Modern Love'}
              </p>
            </div>
          </Link>

          {/* Center: Editorial Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 2xl:space-x-2 shrink-0">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-1.5 xl:px-2.5 2xl:px-3 py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                    lang === 'ta'
                      ? 'text-[11.5px] xl:text-xs 2xl:text-[13px] tracking-normal font-medium'
                      : 'text-xs xl:text-[13px] tracking-wide font-medium uppercase'
                  } ${
                    isActive ? 'text-[#D4AF37]' : 'text-[#FAF6F0]/85 hover:text-[#F6ECCB]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navFoilLine"
                      className="absolute -bottom-1 left-1.5 right-1.5 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Language switch & Authentication */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="h-8 xl:h-9 px-2 xl:px-2.5 2xl:px-3 rounded-full border border-[#D4AF37]/35 bg-[#2D0B0E]/80 hover:bg-[#3B0D11] text-[#F6ECCB] text-[11px] xl:text-xs font-medium tracking-wide transition-all cursor-pointer shadow-sm hover:border-[#D4AF37] flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Switch Language / மொழியை மாற்றவும்"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Authenticated State */}
            {isAuthenticated ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="h-9 flex items-center gap-2 pl-2 pr-3.5 rounded-full bg-[#2D0B0E] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#FAF6F0] text-xs font-medium cursor-pointer transition-all shadow-md whitespace-nowrap shrink-0"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6ECCB] text-[#190507] font-bold flex items-center justify-center text-[11px] shadow-inner shrink-0">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:inline-block max-w-[100px] truncate font-light">
                    {user?.fullName?.split(' ')[0]}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-bold uppercase tracking-wider border border-[#D4AF37]/30">
                    {planBadge}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#D4AF37] shrink-0" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-60 rounded-2xl glass-wine border border-[#D4AF37]/40 shadow-2xl overflow-hidden py-2 z-50 text-xs"
                    >
                      <div className="px-5 py-3 border-b border-[#D4AF37]/20">
                        <p className="font-editorial text-base font-semibold text-[#FAF6F0] truncate">{user?.fullName}</p>
                        <p className="text-[11px] text-[#D4AF37] flex items-center gap-1.5 mt-0.5 font-light">
                          <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{planBadge} Member</span>
                        </p>
                      </div>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 px-5 py-2.5 text-[#FAF6F0] hover:bg-[#3B0D11] hover:text-[#D4AF37] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
                        <span>{t('navDashboard')}</span>
                      </Link>

                      <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-2.5 px-5 py-2.5 text-[#FAF6F0] hover:bg-[#3B0D11] hover:text-[#D4AF37] transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                        <span>{t('dashMyProfile')}</span>
                      </Link>

                      <Link
                        to="/plans"
                        className="flex items-center gap-2.5 px-5 py-2.5 text-[#FAF6F0] hover:bg-[#3B0D11] hover:text-[#D4AF37] transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span>Membership Privileges</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-5 py-2.5 text-[#FAF6F0] hover:bg-[#3B0D11] hover:text-[#D4AF37] border-t border-[#D4AF37]/20 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                          <span>{t('navAdmin')}</span>
                        </Link>
                      )}

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-5 py-2.5 text-red-300 hover:bg-[#3B0D11] hover:text-red-200 border-t border-[#D4AF37]/20 cursor-pointer transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('navLogout')}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* When Logged Out */
              <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0">
                <button
                  onClick={() => openAuth('login')}
                  className={`h-8 xl:h-9 px-2.5 xl:px-3.5 rounded-full text-[11px] xl:text-xs font-medium text-[#FAF6F0] hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center justify-center whitespace-nowrap shrink-0 ${
                    lang === 'ta' ? 'tracking-normal' : 'tracking-wider uppercase'
                  }`}
                >
                  {t('navLogin')}
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className={`h-8 xl:h-9 px-3 xl:px-4 2xl:px-5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] text-[11px] xl:text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-[#D4AF37]/60 flex items-center justify-center whitespace-nowrap shrink-0 ${
                    lang === 'ta' ? 'tracking-normal' : 'tracking-wider uppercase'
                  }`}
                >
                  {t('navRegister')}
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-[#FAF6F0] hover:bg-[#2D0B0E] hover:text-[#D4AF37] transition-colors shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1E0709] border-b border-[#D4AF37]/30 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2.5 rounded-xl text-xs font-light text-[#FAF6F0] hover:bg-[#2D0B0E] hover:text-[#D4AF37] ${
                    lang === 'ta' ? 'tracking-normal' : 'uppercase tracking-widest'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="pt-3 border-t border-[#D4AF37]/20 space-y-1">
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-2.5 rounded-xl text-xs font-bold text-[#D4AF37] hover:bg-[#2D0B0E] ${
                      lang === 'ta' ? 'tracking-normal' : 'uppercase tracking-widest'
                    }`}
                  >
                    {t('navDashboard')}
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={`block px-3 py-2.5 rounded-xl text-xs font-bold text-[#F6ECCB] hover:bg-[#2D0B0E] ${
                        lang === 'ta' ? 'tracking-normal' : 'uppercase tracking-widest'
                      }`}
                    >
                      {t('navAdmin')}
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium text-red-300 hover:bg-[#2D0B0E] ${
                      lang === 'ta' ? 'tracking-normal' : 'uppercase tracking-widest'
                    }`}
                  >
                    {t('navLogout')}
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuth('login');
                    }}
                    className={`w-full py-2.5 rounded-full border border-[#D4AF37]/40 text-[#FAF6F0] text-xs font-bold hover:bg-[#2D0B0E] ${
                      lang === 'ta' ? 'tracking-normal' : 'uppercase tracking-widest'
                    }`}
                  >
                    {t('navLogin')}
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuth('register');
                    }}
                    className={`w-full py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6ECCB] text-[#190507] text-xs font-bold shadow-md ${
                      lang === 'ta' ? 'tracking-normal' : 'uppercase tracking-widest'
                    }`}
                  >
                    {t('navRegister')}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
