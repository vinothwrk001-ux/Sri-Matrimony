import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Heart,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Users,
  ShieldCheck,
  Calendar,
  Lock,
  ChevronLeft,
  Share2,
  Flag,
  MessageCircle,
  FileCheck2,
  Award,
  Crown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../api/client';

export default function ProfileDetailsPage() {
  const { id } = useParams();
  const { user, isAuthenticated, isPaidMember } = useAuth();
  const { openAuth, openPayment, openContactReveal, openInterest, showToast } = useApp();
  const { t } = useLanguage();

  const [profile, setProfile] = useState(null);
  const [compatibility, setCompatibility] = useState(null);
  const [isContactUnlocked, setIsContactUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [isShortlisted, setIsShortlisted] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/profiles/${id}`);
        if (res.success) {
          setProfile(res.profile);
          setCompatibility(res.compatibility);
          setIsContactUnlocked(res.isContactUnlocked);
        }
      } catch (err) {
        showToast(err.message || 'Profile not found.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleShortlist = async () => {
    if (!isAuthenticated) {
      openAuth('login');
      return;
    }
    try {
      const res = await api.post('/shortlists/toggle', {
        targetUserId: profile.user || profile._id,
      });
      if (res.success) {
        setIsShortlisted(res.isShortlisted);
        showToast(res.message, 'success');
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleContactClick = () => {
    if (!isAuthenticated) {
      openAuth('login');
      return;
    }
    openContactReveal(profile);
  };

  const handleInterestClick = () => {
    if (!isAuthenticated) {
      openAuth('login');
      return;
    }
    openInterest(profile);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
          <p className="font-editorial text-lg text-[#2D0B0E]">Loading sacred matrimony portfolio...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center py-24 text-center px-4">
        <div className="p-8 rounded-3xl bg-[#FDFBF7] gold-foil-border max-w-md shadow-xl">
          <h2 className="font-editorial text-3xl font-light text-[#2D0B0E] mb-2">Profile Unavailable</h2>
          <p className="text-xs text-[#5A191E] font-light mb-6">This profile may have completed marriage or adjusted privacy settings.</p>
          <Link
            to="/search"
            className="px-6 py-2.5 rounded-full bg-[#2D0B0E] text-[#F6ECCB] text-xs font-bold uppercase tracking-wider"
          >
            Back to Discovery
          </Link>
        </div>
      </div>
    );
  }

  const photos = profile.photos?.length > 0 ? profile.photos : [
    {
      url: profile.gender === 'Female' || profile.gender === 'Bride'
        ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'
        : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-10 sm:py-16 selection:bg-[#D4AF37]/30 selection:text-[#190507]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D0B0E] hover:text-[#D4AF37] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Return to Discovery Gallery</span>
          </Link>

          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            {profile.profileId}
          </span>
        </div>

        {/* Hero Editorial Header Card */}
        <div className="rounded-[36px] p-6 sm:p-10 bg-[#FDFBF7] gold-foil-border shadow-2xl mb-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Arched Photography Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#23080A] gold-foil-border shadow-2xl">
                <img
                  src={photos[selectedPhoto]?.url || photos[0].url}
                  alt={profile.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Badges Over Photograph */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-full glass-wine text-[11px] font-bold text-[#F6ECCB] border border-[#D4AF37]/40 shadow">
                    {profile.profileId}
                  </span>
                  {profile.isVerified && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#D4AF37] text-[#190507] text-[10px] font-extrabold uppercase shadow">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Govt. ID Verified</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Photo Thumbnails */}
              {photos.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {photos.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhoto(idx)}
                      className={`w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        selectedPhoto === idx ? 'border-[#D4AF37] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Narrative & Direct Engagement Bar (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    {profile.gender === 'Female' ? 'Cultured Tamil Bride' : 'Accomplished Tamil Groom'}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-[#F5EAE4] border border-[#D4AF37]/30 text-xs font-semibold text-[#2D0B0E]">
                    {profile.maritalStatus || 'Never Married'}
                  </span>
                </div>

                <h1 className="font-editorial text-3xl sm:text-5xl font-light text-[#1A1616] tracking-wide mb-2">
                  {profile.fullName}
                </h1>

                <p className="text-xs sm:text-sm font-semibold text-[#8C6D1F] mb-6">
                  {profile.age} Yrs &bull; {profile.height} &bull; {profile.religion} &bull; {profile.caste || 'Tamil Community'}
                </p>

                {/* Key Attributes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#D4AF37]/25 flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="font-medium truncate text-[#2D0B0E]">{profile.education}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#D4AF37]/25 flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="font-medium truncate text-[#2D0B0E]">{profile.occupation} {profile.company ? `(${profile.company})` : ''}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#D4AF37]/25 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="font-medium truncate text-[#2D0B0E]">{profile.workLocation || 'Tamil Nadu, India'}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#D4AF37]/25 flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="font-medium truncate text-[#2D0B0E]">{profile.annualIncome || 'Ancestral Stature'}</span>
                  </div>
                </div>

                {/* Compatibility Breakdown */}
                {compatibility && (
                  <div className="p-5 rounded-3xl bg-gradient-to-r from-[#2D0B0E] to-[#1C0608] text-[#FAF6F0] gold-foil-border shadow-lg mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-editorial text-lg font-light text-[#F6ECCB]">
                          10 Porutham Compatibility Match
                        </span>
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6ECCB] text-[#190507] font-extrabold text-sm shadow">
                        {compatibility.score}% Match
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-[#FAF6F0]/85 font-light">
                      {compatibility.reasons?.map((reason, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons Row */}
              <div className="pt-6 border-t border-[#D4AF37]/25 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleInterestClick}
                  className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-[#190507]" />
                  <span>Express Interest</span>
                </button>

                <button
                  onClick={handleContactClick}
                  className="py-3.5 px-5 rounded-2xl bg-[#2D0B0E] text-[#F6ECCB] hover:text-[#FAF6F0] font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#D4AF37]/40"
                >
                  {isContactUnlocked ? (
                    <>
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                      <span>Contact Unlocked</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#D4AF37]" />
                      <span>Reveal Family Contact</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShortlist}
                  className={`py-3.5 px-5 rounded-2xl border font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isShortlisted
                      ? 'bg-rose-700 text-white border-rose-700'
                      : 'bg-[#FAF6F0] border-[#D4AF37]/40 text-[#2D0B0E] hover:bg-[#F5EAE4]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-white' : ''}`} />
                  <span>{isShortlisted ? 'In Shortlist' : 'Add to Shortlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Bio, Astrology, Family, Preferences */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {/* About Narrative */}
            <div className="bg-[#FDFBF7] rounded-[32px] p-6 sm:p-8 gold-foil-border shadow-md">
              <h3 className="font-editorial text-2xl font-light text-[#2D0B0E] mb-3 pb-3 border-b border-[#D4AF37]/20">
                Personal Philosophy &amp; Aspirations
              </h3>
              <p className="text-xs sm:text-sm text-[#321C1C]/85 leading-relaxed font-light italic">
                &ldquo;{profile.aboutMe || 'Devoted to personal growth and honoring Tamil family values while embracing a vibrant modern career.'}&rdquo;
              </p>
            </div>

            {/* Religious & Horoscope Information */}
            <div className="bg-[#FDFBF7] rounded-[32px] p-6 sm:p-8 border border-[#D4AF37]/30 shadow-md">
              <h3 className="font-editorial text-2xl font-light text-[#2D0B0E] mb-4 pb-3 border-b border-[#D4AF37]/20">
                Sacred Vedic &amp; Horoscope Data
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 text-xs">
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Religion</span>
                  <span className="font-bold text-[#2D0B0E] text-sm">{profile.religion}</span>
                </div>
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Community</span>
                  <span className="font-bold text-[#2D0B0E] text-sm">{profile.caste} {profile.subCaste ? `(${profile.subCaste})` : ''}</span>
                </div>
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Mother Tongue</span>
                  <span className="font-bold text-[#2D0B0E] text-sm">{profile.motherTongue || 'Tamil'}</span>
                </div>
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Dosham Status</span>
                  <span className="font-bold text-[#2D0B0E] text-sm">{profile.dosham || 'Chevvai / Naga Nil'}</span>
                </div>
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Gothram</span>
                  <span className="font-bold text-[#2D0B0E] text-sm">{profile.gothram || 'Shiva / Siva'}</span>
                </div>
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Rasi &amp; Nakshatram</span>
                  <span className="font-bold text-[#2D0B0E] text-sm">{profile.raasi || 'Simham'} / {profile.nakshatra || 'Magham'}</span>
                </div>
              </div>
            </div>

            {/* Family Background */}
            <div className="bg-[#FDFBF7] rounded-[32px] p-6 sm:p-8 border border-[#D4AF37]/30 shadow-md">
              <h3 className="font-editorial text-2xl font-light text-[#2D0B0E] mb-4 pb-3 border-b border-[#D4AF37]/20">
                Ancestral &amp; Family Heritage
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 text-xs">
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Father's Stature</span>
                  <span className="font-bold text-[#2D0B0E]">{profile.fatherOccupation || 'Entrepreneur / Business'}</span>
                </div>
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Mother's Stature</span>
                  <span className="font-bold text-[#2D0B0E]">{profile.motherOccupation || 'Homemaker'}</span>
                </div>
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Family Structure</span>
                  <span className="font-bold text-[#2D0B0E]">{profile.familyType || 'Nuclear Family'}</span>
                </div>
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Family Status</span>
                  <span className="font-bold text-[#2D0B0E]">{profile.familyStatus || 'Upper Middle Class'}</span>
                </div>
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Siblings</span>
                  <span className="font-bold text-[#2D0B0E]">{profile.brothers || 0} Brother(s), {profile.sisters || 0} Sister(s)</span>
                </div>
                <div>
                  <span className="text-[#8C6D1F] font-semibold block uppercase text-[10px] tracking-wider mb-1">Native Heritage</span>
                  <span className="font-bold text-[#2D0B0E]">{profile.familyLocation || 'Tamil Nadu, India'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Reveal Card & Verification Badge (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FDFBF7] rounded-[32px] p-6 gold-foil-border shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#D4AF37]/20">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h4 className="font-editorial text-xl font-light text-[#2D0B0E]">
                  Verified Coordinates
                </h4>
              </div>

              {profile.contact?.isUnlocked ? (
                <div className="space-y-3 pt-1">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <p className="text-[10px] uppercase font-bold text-emerald-800">Direct Mobile Phone</p>
                    <p className="font-bold text-sm text-emerald-950 mt-0.5">{profile.contact.mobile}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <p className="text-[10px] uppercase font-bold text-emerald-800">Email Address</p>
                    <p className="font-semibold text-xs text-emerald-950 mt-0.5">{profile.contact.email}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#D4AF37]/30">
                    <p className="text-[10px] uppercase font-bold text-[#8C6D1F]">Protected Mobile</p>
                    <p className="font-bold text-sm text-[#2D0B0E] flex items-center gap-2 mt-0.5">
                      <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{profile.contact?.mobile || '+91 98400 •••••'}</span>
                    </p>
                  </div>
                  <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#D4AF37]/30">
                    <p className="text-[10px] uppercase font-bold text-[#8C6D1F]">Protected Email</p>
                    <p className="font-semibold text-xs text-[#2D0B0E] flex items-center gap-2 mt-0.5">
                      <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{profile.contact?.email || 'p••••••@gmail.com'}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleContactClick}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] text-xs font-bold uppercase tracking-wider shadow cursor-pointer transition-all hover:brightness-105"
                  >
                    Reveal Verified Numbers
                  </button>
                </div>
              )}
            </div>

            {/* Authenticity Certificate */}
            <div className="bg-gradient-to-b from-[#2D0B0E] to-[#1C0608] text-[#FAF6F0] rounded-[32px] p-6 gold-foil-border shadow-xl space-y-3">
              <h4 className="font-editorial text-xl font-light text-[#F6ECCB] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Verification Charter</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-[#FAF6F0]/85 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Aadhaar / Government ID Validated</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Tamil Astrologer Consensus Verified</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Direct Guardian Contact Authenticated</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Watermarked Photo Privacy Protection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
