import React, { useEffect, useState } from 'react';
import HeroSection from '../../components/home/HeroSection';
import QuickSearchCard from '../../components/home/QuickSearchCard';
import EditorialShowcase from '../../components/home/EditorialShowcase';
import RecentMembersMasonry from '../../components/home/RecentMembersMasonry';
import VerifiedProfilesShowcase from '../../components/home/VerifiedProfilesShowcase';
import HowItWorksSection from '../../components/home/HowItWorksSection';
import MembershipPlansSection from '../../components/home/MembershipPlansSection';
import SuccessStoriesSection from '../../components/home/SuccessStoriesSection';
import WhyChooseUsSection from '../../components/home/WhyChooseUsSection';
import GetInTouchSection from '../../components/home/GetInTouchSection';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import api from '../../api/client';
import { mockBrides, mockGrooms, mockStories } from '../../api/mockData';

const defaultRecent = [
  mockBrides[0], mockGrooms[0],
  mockBrides[1], mockGrooms[1],
  mockBrides[2], mockGrooms[2],
  mockBrides[3], mockGrooms[3],
  mockBrides[4], mockGrooms[4],
];
const defaultVerified = [...mockBrides.slice(0, 4), ...mockGrooms.slice(0, 4)];

export default function HomePage() {
  const { t } = useLanguage();
  const { bootstrapData } = useApp();

  const [brides, setBrides] = useState(mockBrides);
  const [grooms, setGrooms] = useState(mockGrooms);
  const [recentMembers, setRecentMembers] = useState(defaultRecent);
  const [verifiedProfiles, setVerifiedProfiles] = useState(defaultVerified);
  const [stories, setStories] = useState(mockStories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const [bridesRes, groomsRes, recentRes, verifiedRes, storiesRes] = await Promise.all([
          api.get('/matches/brides?limit=8').catch(() => null),
          api.get('/matches/grooms?limit=8').catch(() => null),
          api.get('/matches/recent?limit=10').catch(() => null),
          api.get('/matches/verified?limit=8').catch(() => null),
          api.get('/stories').catch(() => null),
        ]);

        if (bridesRes?.success && Array.isArray(bridesRes.profiles) && bridesRes.profiles.length > 0) {
          setBrides(bridesRes.profiles);
        }
        if (groomsRes?.success && Array.isArray(groomsRes.profiles) && groomsRes.profiles.length > 0) {
          setGrooms(groomsRes.profiles);
        }
        if (recentRes?.success && Array.isArray(recentRes.profiles) && recentRes.profiles.length > 0) {
          setRecentMembers(recentRes.profiles);
        }
        if (verifiedRes?.success && Array.isArray(verifiedRes.profiles) && verifiedRes.profiles.length > 0) {
          setVerifiedProfiles(verifiedRes.profiles);
        }
        if (storiesRes?.success && Array.isArray(storiesRes.stories) && storiesRes.stories.length > 0) {
          setStories(storiesRes.stories);
        }
      } catch (err) {
        console.warn('Using verified static feeds for homepage:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6F0] selection:bg-[#D4AF37]/30 selection:text-[#190507]">
      {/* SECTION 01: HERO / HOME BANNER */}
      <HeroSection />

      {/* SECTION 02: INTERACTIVE PARTNER DISCOVERY (Below the Home Banner) */}
      <section className="py-10 sm:py-14 bg-[#FAF6F0] relative z-10 border-b border-[#D4AF37]/25">
        <QuickSearchCard />
      </section>

      {/* SECTION 03: EDITORIAL BRIDE SHOWCASE (Warm Ivory & Blush Magazine Spotlight) */}
      <EditorialShowcase
        gender="Bride"
        badgeText="Brides of Sri Matrimony"
        title="Cultured Tamil Brides"
        subtitle="Elegance, education, and deep-rooted family traditions. Discover brides ready for sacred unions."
        profiles={brides}
        viewAllLink="/search?lookingFor=Bride"
      />

      {/* SECTION 04: EDITORIAL GROOM SHOWCASE (Deep Burgundy & Gold Royal Spotlight) */}
      <EditorialShowcase
        gender="Groom"
        badgeText="Grooms of Sri Matrimony"
        title="Accomplished Tamil Grooms"
        subtitle="Leading professionals, entrepreneurs, and scholars grounded in Tamil heritage."
        profiles={grooms}
        viewAllLink="/search?lookingFor=Groom"
      />

      {/* SECTION 05: RECENTLY JOINED MEMBERS (Asymmetrical Editorial Masonry Gallery) */}
      <RecentMembersMasonry
        profiles={recentMembers}
        loading={loading}
      />

      {/* SECTION 06: VERIFIED PROFILES SHOWCASE (Gold Verification Standard & Trust Pillars) */}
      <VerifiedProfilesShowcase
        profiles={verifiedProfiles}
        loading={loading}
      />

      {/* SECTION 07: HOW SRI MATRIMONY WORKS (Connected Golden Milestone Path) */}
      <HowItWorksSection />

      {/* SECTION 08: MEMBERSHIP SUITES (Reinvented Comparison & Entitlement Showcase) */}
      <MembershipPlansSection
        plans={bootstrapData?.plans || []}
      />

      {/* SECTION 09: SUCCESS STORIES (Cinematic Magazine Storytelling Gallery) */}
      <SuccessStoriesSection
        stories={stories}
      />

      {/* SECTION 10: WHY CHOOSE SRI MATRIMONY (Live Telemetry Statistics & Distinction) */}
      <WhyChooseUsSection />

      {/* SECTION 11: GET IN TOUCH (Rich Burgundy Final Conversion Experience) */}
      <GetInTouchSection />
    </div>
  );
}
