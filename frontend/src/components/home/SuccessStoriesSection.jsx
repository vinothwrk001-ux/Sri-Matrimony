import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, MapPin, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function SuccessStoriesSection({ stories = [] }) {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const displayStories = stories.length > 0 ? stories : [
    {
      _id: '1',
      groomName: 'Raghavan Sundararajan',
      brideName: 'Soundarya Natarajan',
      marriageDate: '2025-11-24',
      location: 'Mylapore, Chennai',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      story: 'We met through Sri Matrimony in March 2025. Both our families found mutual alignment in traditions, values, and horoscope matching. The verified profile gave our parents the peace of mind they needed.',
      storyTamil: 'ஸ்ரீ மேட்ரிமோனி மூலமாக நாங்கள் சந்தித்தோம். இரு குடும்பங்களின் பண்பாடும் ஜாதகப் பொருத்தமும் அருமையாக அமைந்தது. நம்பகமான சுயவிவரங்கள் எங்கள் பெற்றோருக்கு முழு மனநிறைவை தந்தன.',
    },
    {
      _id: '2',
      groomName: 'Kavin Kumar',
      brideName: 'Nandhini Devi',
      marriageDate: '2026-01-18',
      location: 'Coimbatore, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      story: 'Sri Matrimony’s verified profile system gave our parents complete confidence. We spoke, discovered shared aspirations for our careers, and tied the knot in our ancestral temple in Coimbatore.',
      storyTamil: 'சரிபார்க்கப்பட்ட வரன்கள் எங்கள் பெற்றோருக்கு மிகுந்த நம்பிக்கையைத் தந்தன. இருமனம் இணைந்து திருமண பந்தத்தில் இணைந்தோம்.',
    },
    {
      _id: '3',
      groomName: 'Sridhar Venkatesh',
      brideName: 'Vidhya Ramachandran',
      marriageDate: '2026-02-14',
      location: 'Madurai, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      story: 'Finding a partner within our cultural community who also shared progressive lifestyle thoughts felt like a blessing. The horoscope consultation feature was exceptionally accurate.',
      storyTamil: 'எங்கள் பாரம்பரிய பின்னணியிலும் நவீன சிந்தனையிலும் ஒத்த துணையை ஸ்ரீ மேட்ரிமோனியில் கண்டறிந்தோம்.',
    },
  ];

  const current = displayStories[activeIndex] || displayStories[0];

  const formattedDate = new Date(current.marriageDate).toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0] relative overflow-hidden border-b border-[#D4AF37]/20">
      {/* Background ornamental lattice watermark */}
      <div className="absolute inset-0 opacity-5 bg-kolam-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-2.5 shadow-sm border border-[#D4AF37]/40 bg-[#F5EAE4] text-[#2D0B0E]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Sacred Unions</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#1A1616] tracking-wide">
              Where Destiny Found Its Voice
            </h2>
            <p className="text-xs sm:text-sm text-[#5A191E] font-light mt-1.5 max-w-xl">
              Authentic stories of Tamil souls who discovered mutual values, respect, and lifelong love through Sri Matrimony.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveIndex((prev) => (prev === 0 ? displayStories.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#FDFBF7] text-[#2D0B0E] flex items-center justify-center hover:bg-[#2D0B0E] hover:text-[#FAF6F0] transition-all cursor-pointer shadow-sm"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev === displayStories.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#FDFBF7] text-[#2D0B0E] flex items-center justify-center hover:bg-[#2D0B0E] hover:text-[#FAF6F0] transition-all cursor-pointer shadow-sm"
                aria-label="Next story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              to="/success-stories"
              className="text-xs tracking-widest font-bold uppercase flex items-center gap-1.5 text-[#2D0B0E] hover:text-[#D4AF37] transition-colors group"
            >
              <span>All Stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
            </Link>
          </div>
        </div>

        {/* Cinematic Wedding Story Showcase (Magazine-style layout) */}
        <div className="rounded-[36px] bg-[#FDFBF7] gold-foil-border shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Left Column: Full-Height Asymmetrical Wedding Photography (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px] bg-[#23080A] overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={current._id || activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={current.image}
                alt={`${current.groomName} & ${current.brideName}`}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#190507]/80 via-transparent to-transparent pointer-events-none" />

            {/* Badges Over Image */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-white text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-wine border border-[#D4AF37]/40 text-[11px] font-bold text-[#F6ECCB]">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Wedding Date: {formattedDate}</span>
              </span>

              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-wine border border-[#D4AF37]/40 text-[11px] text-[#FAF6F0]">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{current.location}</span>
              </span>
            </div>

            {/* Names floating banner */}
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#FAF6F0] font-light drop-shadow flex items-center gap-3">
                <span>{current.groomName}</span>
                <Heart className="w-5 h-5 text-red-500 fill-red-500 shrink-0" />
                <span>{current.brideName}</span>
              </h3>
            </div>
          </div>

          {/* Right Column: Magazine Story Editorial & Testimonial (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-b from-[#FDFBF7] to-[#FAF6F0]">
            <div>
              <Quote className="w-10 h-10 text-[#D4AF37] mb-6 opacity-60" />

              <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
                Authentic Wedding Chronicle
              </h4>

              <p className="font-editorial text-xl sm:text-2xl font-light text-[#1A1616] leading-relaxed italic mb-6">
                &ldquo;{lang === 'ta' && current.storyTamil ? current.storyTamil : current.story}&rdquo;
              </p>

              <div className="p-4 rounded-2xl bg-[#F5EAE4] border border-[#D4AF37]/30 text-xs text-[#2D0B0E] space-y-1">
                <p className="font-semibold text-[#8C6D1F]">Union Milestones</p>
                <p className="text-[11px] text-[#321C1C]/80">
                  Initial connect via Sri Matrimony &bull; Traditional horoscope consensus &bull; Auspicious Muhurtham completed
                </p>
              </div>
            </div>

            {/* Story Switcher Thumbs */}
            <div className="pt-8 mt-8 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex gap-2">
                {displayStories.map((item, idx) => (
                  <button
                    key={item._id || idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeIndex === idx ? 'border-[#D4AF37] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={item.image} alt={item.groomName} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <Link
                to="/success-stories"
                className="text-xs font-bold uppercase tracking-wider text-[#2D0B0E] hover:text-[#D4AF37] flex items-center gap-1.5"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
