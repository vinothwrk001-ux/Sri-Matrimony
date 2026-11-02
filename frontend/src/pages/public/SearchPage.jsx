import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RefreshCw, Sparkles, CheckCircle2, SlidersHorizontal, ArrowRight } from 'lucide-react';
import ProfileCard from '../../components/common/ProfileCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/client';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const { isPaidMember } = useAuth();

  // Filters
  const [lookingFor, setLookingFor] = useState(searchParams.get('lookingFor') || 'Bride');
  const [ageMin, setAgeMin] = useState(searchParams.get('ageMin') || '20');
  const [ageMax, setAgeMax] = useState(searchParams.get('ageMax') || '35');
  const [religion, setReligion] = useState(searchParams.get('religion') || 'All');
  const [caste, setCaste] = useState(searchParams.get('caste') || 'All');
  const [location, setLocation] = useState(searchParams.get('location') || 'All');
  const [education, setEducation] = useState(searchParams.get('education') || 'All');
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('isVerified') === 'true');

  const [profiles, setProfiles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const religions = ['All', 'Hindu', 'Christian', 'Muslim', 'Jain'];
  const castes = [
    'All',
    'Mudaliar',
    'Brahmin Iyer',
    'Brahmin Iyengar',
    'Kongu Vellalar',
    'Chettiar',
    'Nadar',
    'Vanniyar',
    'Naidu',
    'Pillai',
    'Thevar / Mukkulathor',
    'Caste No Bar'
  ];
  const locations = [
    'All',
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Trichy',
    'Salem',
    'Tirunelveli',
    'Bangalore'
  ];

  const fetchResults = async () => {
    setLoading(true);
    try {
      const params = {
        lookingFor,
        ageMin,
        ageMax,
        page,
        limit: 12,
      };
      if (religion !== 'All') params.religion = religion;
      if (caste !== 'All') params.caste = caste;
      if (location !== 'All') params.location = location;
      if (education !== 'All') params.education = education;
      if (verifiedOnly) params.isVerified = 'true';

      const res = await api.get('/search', { params });
      if (res.success) {
        setProfiles(res.profiles || []);
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 1);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [lookingFor, religion, caste, location, verifiedOnly, page]);

  const handleApplyFilter = (e) => {
    e.preventDefault();
    setPage(1);
    fetchResults();
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-12 sm:py-16 relative overflow-hidden selection:bg-[#D4AF37]/30 selection:text-[#190507]">
      {/* Lattice background */}
      <div className="absolute inset-0 opacity-5 bg-jali-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Page Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm border border-[#D4AF37]/40 bg-[#F5EAE4] text-[#2D0B0E]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Sacred Partner Discovery</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-light text-[#1A1616] tracking-wide mb-2">
            Explore Verified Tamil Matrimony Profiles
          </h1>

          <p className="text-xs sm:text-sm text-[#5A191E] font-light">
            Refine through genuine Tamil horoscopes, community heritage, professional stature, and authentic government identity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Side Filter Column (4 cols) */}
          <div className="lg:col-span-4">
            <form onSubmit={handleApplyFilter} className="bg-[#FDFBF7] rounded-xl p-6 sm:p-7 gold-foil-border shadow-xl sticky top-24 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                <h3 className="font-editorial text-xl font-light text-[#2D0B0E] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                  <span>Discovery Filters</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setLookingFor('Bride');
                    setAgeMin('20');
                    setAgeMax('35');
                    setReligion('All');
                    setCaste('All');
                    setLocation('All');
                    setVerifiedOnly(false);
                  }}
                  className="text-xs text-[#8C6D1F] hover:underline cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* Looking For Switcher */}
              <div>
                <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-2">
                  I am seeking a
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#FAF6F0] border border-[#D4AF37]/30">
                  <button
                    type="button"
                    onClick={() => setLookingFor('Bride')}
                    className={`py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      lookingFor === 'Bride'
                        ? 'bg-[#2D0B0E] text-[#FAF6F0] shadow'
                        : 'text-[#321C1C] hover:text-[#2D0B0E]'
                    }`}
                  >
                    Bride (மணமகள்)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLookingFor('Groom')}
                    className={`py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      lookingFor === 'Groom'
                        ? 'bg-[#2D0B0E] text-[#FAF6F0] shadow'
                        : 'text-[#321C1C] hover:text-[#2D0B0E]'
                    }`}
                  >
                    Groom (மணமகன்)
                  </button>
                </div>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1.5">
                  Age Range
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={ageMin}
                    onChange={(e) => setAgeMin(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-md px-3 py-2 text-xs font-medium text-[#2D0B0E]"
                  >
                    {[...Array(25)].map((_, i) => (
                      <option key={i + 18} value={i + 18}>{i + 18} Yrs</option>
                    ))}
                  </select>
                  <span className="text-xs text-[#8C6D1F] font-semibold">to</span>
                  <select
                    value={ageMax}
                    onChange={(e) => setAgeMax(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-md px-3 py-2 text-xs font-medium text-[#2D0B0E]"
                  >
                    {[...Array(25)].map((_, i) => (
                      <option key={i + 22} value={i + 22}>{i + 22} Yrs</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Religion */}
              <div>
                <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1.5">
                  Faith &amp; Religion
                </label>
                <select
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-md px-3 py-2 text-xs font-medium text-[#2D0B0E]"
                >
                  {religions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Caste */}
              <div>
                <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1.5">
                  Community Heritage
                </label>
                <select
                  value={caste}
                  onChange={(e) => setCaste(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-md px-3 py-2 text-xs font-medium text-[#2D0B0E]"
                >
                  {castes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1.5">
                  Location / City
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-md px-3 py-2 text-xs font-medium text-[#2D0B0E]"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Verified Only Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer p-3 rounded-lg bg-[#FAF6F0] border border-[#D4AF37]/30">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2D0B0E] focus:ring-[#D4AF37] accent-[#2D0B0E]"
                  />
                  <span className="text-xs font-bold text-[#2D0B0E] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Government ID Verified Only</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-md bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                Apply Criteria
              </button>
            </form>
          </div>

          {/* Results Grid Column (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#D4AF37]/20">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D1F]">
                Showing {profiles.length} of {total} Eligible Matches
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="aspect-[4/3] rounded-lg bg-[#FAF6F0] animate-pulse border border-[#D4AF37]/20" />
                ))}
              </div>
            ) : profiles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {profiles.map((profile) => (
                    <div key={profile.profileId || profile._id}>
                      <ProfileCard profile={profile} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-12">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                      className="px-5 py-2.5 rounded-md border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider disabled:opacity-40 hover:bg-[#2D0B0E] hover:text-[#FAF6F0] transition-all cursor-pointer"
                    >
                      Previous
                    </button>
                    <span className="text-xs font-bold text-[#2D0B0E] px-4 font-editorial text-base">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      disabled={page >= totalPages}
                      onClick={() => setPage(page + 1)}
                      className="px-5 py-2.5 rounded-md border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider disabled:opacity-40 hover:bg-[#2D0B0E] hover:text-[#FAF6F0] transition-all cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-[#FDFBF7] rounded-xl p-12 text-center gold-foil-border shadow-xl">
                <Search className="w-12 h-12 text-[#D4AF37] mx-auto mb-3" />
                <h3 className="font-editorial text-2xl font-light text-[#2D0B0E] mb-2">
                  No Matching Profiles in Registry
                </h3>
                <p className="text-xs sm:text-sm text-[#5A191E] font-light max-w-md mx-auto mb-6">
                  Try broadening your age span or community filters to view more eligible Tamil brides and grooms.
                </p>
                <button
                  onClick={() => {
                    setCaste('All');
                    setLocation('All');
                    setAgeMin('18');
                    setAgeMax('45');
                  }}
                  className="px-8 py-3 rounded-full bg-[#2D0B0E] text-[#F6ECCB] hover:text-[#FAF6F0] text-xs font-bold tracking-widest uppercase shadow transition-all cursor-pointer"
                >
                  Broaden Registry Criteria
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
