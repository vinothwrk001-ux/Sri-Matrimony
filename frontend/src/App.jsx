import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context Providers
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';

// Common Components
import SplashScreen from './components/common/SplashScreen';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/Toast';

// Modals
import AuthModal from './components/modals/AuthModal';
import PaymentModal from './components/modals/PaymentModal';
import ContactRevealModal from './components/modals/ContactRevealModal';
import ExpressInterestModal from './components/modals/ExpressInterestModal';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import SearchPage from './pages/public/SearchPage';
import PlansPage from './pages/public/PlansPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import SuccessStoriesPage from './pages/public/SuccessStoriesPage';
import ContactPage from './pages/public/ContactPage';
import ProfileDetailsPage from './pages/public/ProfileDetailsPage';
import {
  FAQPage,
  PrivacyPolicyPage,
  TermsConditionsPage,
  RefundPolicyPage,
  NotFoundPage,
} from './pages/public/StaticPages';
import { LoginPage, RegisterPage } from './pages/auth/AuthPages';

// User Dashboard
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverview from './pages/user/DashboardOverview';
import EditProfilePage from './pages/user/EditProfilePage';
import {
  InterestsPage,
  ShortlistsPage,
  ContactViewsPage,
  MessagesPage,
  MembershipPage,
  PrivacySettingsPage,
} from './pages/user/UserSubPages';

// Admin Page
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// Public Layout Wrapper with Sticky Header and Footer
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <LanguageProvider>
      <AuthProvider>
        <AppProvider>
          {/* Welcome Cinematic Splash Screen with concurrent initialization */}
          <AnimatePresence mode="wait">
            {showSplash && (
              <SplashScreen onFinish={() => setShowSplash(false)} />
            )}
          </AnimatePresence>

          <BrowserRouter>
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/success-stories" element={<SuccessStoriesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-conditions" element={<TermsConditionsPage />} />
                <Route path="/refund-policy" element={<RefundPolicyPage />} />
                <Route path="/cancellation-policy" element={<RefundPolicyPage />} />
                <Route path="/profile/:id" element={<ProfileDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Protected User Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="profile" element={<ProfileDetailsPage />} />
                <Route path="edit-profile" element={<EditProfilePage />} />
                <Route path="suggested" element={<DashboardOverview />} />
                <Route path="shortlists" element={<ShortlistsPage />} />
                <Route path="interests" element={<InterestsPage />} />
                <Route path="contact-views" element={<ContactViewsPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="membership" element={<MembershipPage />} />
                <Route path="privacy" element={<PrivacySettingsPage />} />
              </Route>

              {/* Admin Console Route */}
              <Route path="/admin" element={<PublicLayout />}>
                <Route index element={<AdminDashboardPage />} />
              </Route>
            </Routes>

            {/* Global Modals and Notification Toasts */}
            <AuthModal />
            <PaymentModal />
            <ContactRevealModal />
            <ExpressInterestModal />
            <ToastContainer />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
