import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, Star, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../api/client';

export default function SuccessStoriesPage() {
  const { t, lang } = useLanguage();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get('/stories');
        if (res.success) setStories(res.stories);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFCF7] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D7AD4A] bg-[#4B1718] px-3.5 py-1 rounded-full shadow-sm">
            Wedded Bliss
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#4B1718] mt-3">
            Sri Matrimony Success Stories
          </h1>
          <p className="text-xs sm:text-base text-[#682526] font-medium mt-2">
            Read authentic wedding testimonials from Tamil couples whose sacred matrimonial journeys began right here.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => {
            const formattedDate = new Date(story.marriageDate).toLocaleDateString('en-IN', {
              month: 'long',
              year: 'numeric',
            });
            const text = lang === 'ta' && story.storyTamil ? story.storyTamil : story.story;

            return (
              <div
                key={story._id}
                className="bg-[#FFFCF7] rounded-3xl overflow-hidden border border-[#D7AD4A]/30 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-[#351011]">
                  <img
                    src={story.image}
                    alt={`${story.groomName} & ${story.brideName}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#351011]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 bg-[#4B1718]/90 px-3 py-1 rounded-full border border-[#D7AD4A]/40 text-[#F0D69C] text-[11px] font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#D7AD4A]" />
                      <span>{formattedDate}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-[#351011]/80 px-2.5 py-1 rounded-full text-[11px] text-[#F8F1E7]">
                      <MapPin className="w-3.5 h-3.5 text-[#D7AD4A]" />
                      <span>{story.location}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-[#D7AD4A] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D7AD4A]" />
                      ))}
                    </div>

                    <h3 className="font-heading font-bold text-2xl text-[#4B1718] flex items-center gap-2 mb-2">
                      <span>{story.groomName}</span>
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      <span>{story.brideName}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#321C1C]/80 leading-relaxed italic">
                      &ldquo;{text}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D7AD4A]/20 flex items-center justify-between text-xs text-[#682526] font-semibold">
                    <span>Verified Marriage Story</span>
                    <span className="text-[#D7AD4A] font-bold">100% Genuine</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
