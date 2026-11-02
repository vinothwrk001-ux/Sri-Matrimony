import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import {
  LayoutDashboard,
  User,
  Edit3,
  Search,
  Sparkles,
  Heart,
  Inbox,
  PhoneCall,
  MessageSquare,
  Crown,
  Shield,
  LogOut,
  ChevronRight,
  Menu,
  X,
  CreditCard,
  CheckCircle2,
  Bell
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, profile, logout, isPaidMember } = useAuth();
  const { t, lang, toggleLanguage } = useLanguage();
  const { openPayment } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuSections = [
    {
      label: 'My Matrimony',
      items: [
        { name: 'Sanctuary Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Public Profile', path: '/dashboard/profile', icon: User },
        { name: 'Edit Heritage & Bio', path: '/dashboard/edit-profile', icon: Edit3 },
      ]
    },
    {
      label: 'Compatibility & Matches',
      items: [
        { name: 'Astrological Matches', path: '/dashboard/suggested', icon: Sparkles },
        { name: 'Shortlisted Souls', path: '/dashboard/shortlists', icon: Heart },
      ]
    },
    {
      label: 'Private Communications',
      items: [
        { name: 'Interests & Requests', path: '/dashboard/interests', icon: Inbox },
        { name: 'Revealed Contacts', path: '/dashboard/contact-views', icon: PhoneCall },
        { name: 'Direct Messages', path: '/dashboard/messages', icon: MessageSquare },
      ]
    },
    {
      label: 'Privileges & Trust',
      items: [
        { name: 'Membership Suite', path: '/dashboard/membership', icon: Crown },
        { name: 'Privacy & Verification', path: '/dashboard/privacy', icon: Shield },
      ]
    }
  ];

  const planName = user?.activeMembership?.planCode
    ? user.activeMembership.planCode.toUpperCase()
    : 'FREE';

  const contactCredits = user?.activeMembership?.remainingContactViews || 0;
  const interestCredits = user?.activeMembership?.remainingInterests || 0;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col selection:bg-[#D4AF37]/30 selection:text-[#190507]">
      {/* Top Luxury Concierge Header */}
      <header className="bg-gradient-to-r from-[#190507] via-[#24080B] to-[#190507] text-[#FAF6F0] border-b border-[#D4AF37]/30 py-3.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-[#F6ECCB] hover:bg-[#2D0B0E] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full border border-[#D4AF37] bg-[#2D0B0E] flex items-center justify-center shadow">
              <svg viewBox="0 0 100 100" className="w-5 h-5 fill-[#D4AF37]">
                <path d="M50,15 C45,28 32,38 32,54 C32,68 40,78 50,78 C60,78 68,68 68,54 C68,38 55,28 50,15 Z" fill="#D4AF37" />
              </svg>
            </div>
            <div>
              <span className="font-editorial text-lg sm:text-xl font-light text-[#FAF6F0] tracking-wider block">
                SRI MATRIMONY
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold hidden sm:block">
                Member Sanctuary
              </span>
            </div>
          </Link>
        </div>

        {/* Member Balance Pills & Status */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <div className="px-3.5 py-1 rounded-full glass-wine border border-[#D4AF37]/40 text-[#F6ECCB] flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Contacts: <strong>{contactCredits}</strong></span>
            </div>
            <div className="px-3.5 py-1 rounded-full glass-wine border border-[#D4AF37]/40 text-[#F6ECCB] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-red-400" />
              <span>Interests: <strong>{interestCredits}</strong></span>
            </div>
          </div>

          <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] text-[11px] font-extrabold uppercase tracking-wider shadow">
            {planName}
          </span>

          {!isPaidMember && (
            <button
              onClick={() => openPayment()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8C6D1F] hover:bg-[#D4AF37] hover:text-[#190507] text-[#FAF6F0] text-xs font-bold uppercase transition-all shadow cursor-pointer border border-[#D4AF37]/50"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Upgrade</span>
            </button>
          )}

          <Link
            to="/search"
            className="p-2 rounded-xl bg-[#2D0B0E] border border-[#D4AF37]/30 text-[#F6ECCB] hover:text-[#FAF6F0] transition-colors"
            title="Search Profiles"
          >
            <Search className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Body Grid */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 gap-8">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="bg-[#FDFBF7] rounded-[32px] p-6 gold-foil-border shadow-xl sticky top-24 space-y-6">
            {/* User Mini Profile Overview */}
            <div className="flex items-center gap-3.5 pb-5 border-b border-[#D4AF37]/20">
              <div className="w-13 h-13 rounded-2xl overflow-hidden bg-[#23080A] border-2 border-[#D4AF37] shrink-0 shadow">
                <img
                  src={
                    profile?.photos?.[0]?.url ||
                    (user?.gender === 'Bride'
                      ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'
                      : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80')
                  }
                  alt={user?.fullName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-editorial text-lg text-[#1A1616] font-light truncate">
                  {user?.fullName}
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#D4AF37] tracking-wider uppercase">
                    {profile?.profileId || user?.profileId || 'SM-ID'}
                  </span>
                  {profile?.isVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" title="Verified Profile" />
                  )}
                </div>
              </div>
            </div>

            {/* Categorized Navigation Links */}
            <nav className="space-y-5">
              {menuSections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6D1F] px-3 block mb-1.5">
                    {section.label}
                  </span>
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-[#2D0B0E] to-[#1C0608] text-[#FAF6F0] shadow-md border border-[#D4AF37]/50'
                            : 'text-[#321C1C] hover:bg-[#FAF4F0] hover:text-[#2D0B0E]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-[#8C6D1F]'}`} />
                          <span>{item.name}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />}
                      </Link>
                    );
                  })}
                </div>
              ))}

              <div className="pt-4 border-t border-[#D4AF37]/20">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-rose-800 hover:bg-rose-50 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-700" />
                  <span>Exit Sanctuary</span>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-[#190507]/80 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF6F0] p-6 shadow-2xl overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
                <span className="font-editorial text-xl font-light text-[#2D0B0E]">
                  Member Navigation
                </span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-[#2D0B0E]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {menuSections.map((sec, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D1F] px-2 block mb-1">
                    {sec.label}
                  </span>
                  {sec.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive
                            ? 'bg-[#2D0B0E] text-[#FAF6F0]'
                            : 'text-[#321C1C] hover:bg-[#F5EAE4]'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#D4AF37]" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}

              <div className="pt-4 border-t border-[#D4AF37]/20">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Exit Sanctuary</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Outlet */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
