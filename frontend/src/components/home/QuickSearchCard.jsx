import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, ChevronRight, SlidersHorizontal, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function QuickSearchCard() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const [lookingFor, setLookingFor] = useState('Bride');
  const [ageMin, setAgeMin] = useState('21');
  const [ageMax, setAgeMax] = useState('30');
  const [religion, setReligion] = useState('Hindu');
  const [caste, setCaste] = useState('All');
  const [location, setLocation] = useState('All');
  const [education, setEducation] = useState('All');

  const religions = ['Hindu', 'Christian', 'Muslim', 'Jain', 'Inter-Religion'];
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
    'Viswakarma',
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
    'Erode',
    'Vellore',
    'Bangalore',
    'NRI / Worldwide'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      lookingFor,
      ageMin,
      ageMax,
      ...(religion !== 'All' && { religion }),
      ...(caste !== 'All' && { caste }),
      ...(location !== 'All' && { location }),
      ...(education !== 'All' && { education }),
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Editorial Luxury Discovery Console */}
      <div className="bg-[#FDFBF7] rounded-xl p-6 sm:p-10 gold-foil-border shadow-xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle Decorative Golden Corner Geometry */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent pointer-events-none rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent pointer-events-none rounded-bl-xl" />

        {/* Discovery Bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#D4AF37]/20 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#2D0B0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-md">
              <Compass className="w-5 h-5 animate-[spin_20s_linear_infinite]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
                Curated Tamil Matchmaking
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#2D0B0E] font-medium tracking-wide">
                Interactive Partner Discovery
              </h2>
            </div>
          </div>

          {/* Looking For Segmented Toggle */}
          <div className="inline-flex p-1 rounded-lg bg-[#FAF6F0] border border-[#D4AF37]/35 self-start sm:self-auto shadow-inner">
            <button
              type="button"
              onClick={() => setLookingFor('Bride')}
              className={`px-5 py-2 rounded-md text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                lookingFor === 'Bride'
                  ? 'bg-gradient-to-r from-[#2D0B0E] to-[#1E0709] text-[#F6ECCB] shadow-md'
                  : 'text-[#1A1616] hover:text-[#2D0B0E]'
              }`}
            >
              Seeking Bride (மணமகள்)
            </button>
            <button
              type="button"
              onClick={() => setLookingFor('Groom')}
              className={`px-5 py-2 rounded-md text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                lookingFor === 'Groom'
                  ? 'bg-gradient-to-r from-[#2D0B0E] to-[#1E0709] text-[#F6ECCB] shadow-md'
                  : 'text-[#1A1616] hover:text-[#2D0B0E]'
              }`}
            >
              Seeking Groom (மணமகன்)
            </button>
          </div>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Age Selection */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#2D0B0E]">
              Age Bracket
            </label>
            <div className="flex items-center gap-2">
              <select
                value={ageMin}
                onChange={(e) => setAgeMin(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#D4AF37]/30 rounded-md px-3 py-2.5 text-xs font-medium text-[#1A1616] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              >
                {[...Array(25)].map((_, i) => (
                  <option key={i + 18} value={i + 18}>{i + 18} Yrs</option>
                ))}
              </select>
              <span className="text-xs font-editorial italic text-[#5A191E]">&amp;</span>
              <select
                value={ageMax}
                onChange={(e) => setAgeMax(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#D4AF37]/30 rounded-md px-3 py-2.5 text-xs font-medium text-[#1A1616] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              >
                {[...Array(25)].map((_, i) => (
                  <option key={i + 22} value={i + 22}>{i + 22} Yrs</option>
                ))}
              </select>
            </div>
          </div>

          {/* Religion Selection */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#2D0B0E]">
              {t('searchReligion')}
            </label>
            <select
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#D4AF37]/30 rounded-md px-3.5 py-2.5 text-xs font-medium text-[#1A1616] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            >
              {religions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Caste / Community */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#2D0B0E]">
              {t('searchCaste')}
            </label>
            <select
              value={caste}
              onChange={(e) => setCaste(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#D4AF37]/30 rounded-md px-3.5 py-2.5 text-xs font-medium text-[#1A1616] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            >
              {castes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#2D0B0E]">
              {t('searchLocation')}
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#D4AF37]/30 rounded-md px-3.5 py-2.5 text-xs font-medium text-[#1A1616] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Explore Action Button */}
          <div className="sm:col-span-2 lg:col-span-4 pt-3">
            <button
              type="submit"
              className="w-full py-4 px-8 rounded-md bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer border border-[#D4AF37]/60"
            >
              <Search className="w-4 h-4 text-[#190507]" />
              <span>Explore Compatible Verified Matches</span>
              <ChevronRight className="w-4 h-4 text-[#190507]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
