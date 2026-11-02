import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import {
  User,
  Heart,
  Briefcase,
  Users,
  Coffee,
  Sparkles,
  Camera,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Save,
  ShieldCheck
} from 'lucide-react';
import api from '../../api/client';

export default function EditProfilePage() {
  const { user, profile, updateProfileState, refreshUser } = useAuth();
  const { showToast } = useApp();

  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State initialized from user profile
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Bride',
    dateOfBirth: '',
    age: 26,
    height: '5 ft 4 in / 162 cm',
    maritalStatus: 'Never Married',
    physicalStatus: 'Normal',
    motherTongue: 'Tamil',
    // Religious
    religion: 'Hindu',
    caste: 'Mudaliar',
    subCaste: '',
    gothram: 'Shiva / Siva',
    dosham: 'No Dosham',
    raasi: 'Simham',
    nakshatra: 'Magham',
    // Education & Career
    education: 'B.E. Computer Science',
    college: 'Anna University',
    occupation: 'Senior Software Engineer',
    company: 'Leading MNC',
    annualIncome: '12 - 15 Lakhs P.A.',
    workLocation: 'Chennai, Tamil Nadu',
    // Family
    fatherOccupation: 'Retired Government Officer',
    motherOccupation: 'Homemaker',
    brothers: 0,
    sisters: 1,
    familyType: 'Nuclear Family',
    familyStatus: 'Upper Middle Class',
    familyLocation: 'Chennai',
    // Lifestyle
    foodHabits: 'Vegetarian',
    smoking: 'No',
    drinking: 'No',
    aboutMe: '',
    // Preferences
    partnerPreferences: {
      ageMin: 22,
      ageMax: 32,
      heightMin: '5 ft 0 in',
      heightMax: '6 ft 2 in',
      foodHabits: ['Vegetarian'],
    },
    // Photos
    photos: [],
  });

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        ...profile,
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '1998-05-15',
        partnerPreferences: {
          ...prev.partnerPreferences,
          ...(profile.partnerPreferences || {}),
        },
      }));
    }
  }, [profile]);

  const steps = [
    { num: 1, label: 'Basic Info', icon: User },
    { num: 2, label: 'Religion & Astro', icon: Sparkles },
    { num: 3, label: 'Education & Career', icon: Briefcase },
    { num: 4, label: 'Family', icon: Users },
    { num: 5, label: 'Lifestyle', icon: Coffee },
    { num: 6, label: 'Partner Preferences', icon: Heart },
    { num: 7, label: 'Photos & Verification', icon: Camera },
  ];

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put('/profiles/me', formData);
      if (res.success) {
        updateProfileState(res.profile);
        await refreshUser();
        showToast('Matrimonial profile updated successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    await handleSave();
    if (activeStep < 7) setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const addPhotoUrl = (url) => {
    if (!url) return;
    const current = formData.photos || [];
    setFormData({
      ...formData,
      photos: [...current, { url, isPrimary: current.length === 0 }],
    });
  };

  return (
    <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#D7AD4A]/30 shadow-xl space-y-8">
      {/* Wizard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D7AD4A]/30 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#D7AD4A] bg-[#4B1718] px-3 py-1 rounded-full shadow-sm">
            Step {activeStep} of 7
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#4B1718] mt-2">
            Matrimony Profile Creation Wizard
          </h1>
          <p className="text-xs text-[#682526] font-medium">
            Fill in accurate details to help Tamil families connect with confidence
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D7AD4A] to-[#F0D69C] text-[#4B1718] font-bold text-xs uppercase tracking-wider shadow hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-[#D7AD4A]/50 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : 'Save Draft'}</span>
        </button>
      </div>

      {/* Progress Step Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {steps.map((st) => {
          const Icon = st.icon;
          const isCurrent = activeStep === st.num;
          const isDone = activeStep > st.num;

          return (
            <button
              key={st.num}
              onClick={() => setActiveStep(st.num)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-[#4B1718] text-[#F0D69C] shadow'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-[#F8F1E7] text-[#321C1C]/70 hover:bg-[#D7AD4A]/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{st.num}. {st.label}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {/* Step Form Body */}
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
        {/* STEP 1: BASIC INFORMATION */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#4B1718] border-b border-[#D7AD4A]/20 pb-2">
              1. Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#321C1C]"
                >
                  <option value="Bride">Bride (மணமகள்)</option>
                  <option value="Groom">Groom (மணமகன்)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Height</label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="e.g. 5 ft 4 in / 162 cm"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Marital Status</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#321C1C]"
                >
                  <option value="Never Married">Never Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Awaiting Divorce">Awaiting Divorce</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Mother Tongue</label>
                <input
                  type="text"
                  value={formData.motherTongue}
                  onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: RELIGIOUS INFORMATION */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#4B1718] border-b border-[#D7AD4A]/20 pb-2">
              2. Religious &amp; Astrological Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Religion</label>
                <select
                  value={formData.religion}
                  onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#321C1C]"
                >
                  <option value="Hindu">Hindu</option>
                  <option value="Christian">Christian</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Jain">Jain</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Caste / Community</label>
                <input
                  type="text"
                  value={formData.caste}
                  onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
                  placeholder="e.g. Mudaliar / Brahmin Iyer / Chettiar"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Gothram</label>
                <input
                  type="text"
                  value={formData.gothram}
                  onChange={(e) => setFormData({ ...formData, gothram: e.target.value })}
                  placeholder="e.g. Shiva / Koundinya / Kashyapa"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Dosham</label>
                <select
                  value={formData.dosham}
                  onChange={(e) => setFormData({ ...formData, dosham: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#321C1C]"
                >
                  <option value="No Dosham">No Dosham (தோஷம் இல்லை)</option>
                  <option value="Chevvai Dosham">Chevvai Dosham (செவ்வாய் தோஷம்)</option>
                  <option value="Sarpa Dosham">Sarpa Dosham (சர்ப்ப தோஷம்)</option>
                  <option value="Don't Know">Don't Know</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Raasi</label>
                <input
                  type="text"
                  value={formData.raasi}
                  onChange={(e) => setFormData({ ...formData, raasi: e.target.value })}
                  placeholder="e.g. Mesham, Rishabam, Simham"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Nakshatram (Birth Star)</label>
                <input
                  type="text"
                  value={formData.nakshatra}
                  onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                  placeholder="e.g. Rohini, Ashwini, Magham"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EDUCATION & CAREER */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#4B1718] border-b border-[#D7AD4A]/20 pb-2">
              3. Education &amp; Career
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Education Degree</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  placeholder="e.g. B.E. Computer Science, MBBS, MBA"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">College / University</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. Anna University, PSG Tech, Madras Medical College"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Occupation Title</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  placeholder="e.g. Senior Software Architect, Doctor, CA"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Google, TCS, Apollo Hospital, Business"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Annual Income</label>
                <input
                  type="text"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                  placeholder="e.g. 15 - 20 Lakhs P.A."
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Work Location</label>
                <input
                  type="text"
                  value={formData.workLocation}
                  onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                  placeholder="e.g. Chennai, Tamil Nadu"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: FAMILY INFORMATION */}
        {activeStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#4B1718] border-b border-[#D7AD4A]/20 pb-2">
              4. Family Background
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Father's Occupation</label>
                <input
                  type="text"
                  value={formData.fatherOccupation}
                  onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Mother's Occupation</label>
                <input
                  type="text"
                  value={formData.motherOccupation}
                  onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Family Type</label>
                <select
                  value={formData.familyType}
                  onChange={(e) => setFormData({ ...formData, familyType: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#321C1C]"
                >
                  <option value="Nuclear Family">Nuclear Family</option>
                  <option value="Joint Family">Joint Family</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Family Status</label>
                <select
                  value={formData.familyStatus}
                  onChange={(e) => setFormData({ ...formData, familyStatus: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#321C1C]"
                >
                  <option value="Middle Class">Middle Class</option>
                  <option value="Upper Middle Class">Upper Middle Class</option>
                  <option value="Affluent">Affluent</option>
                  <option value="Rich">Rich</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Native Place / Location</label>
                <input
                  type="text"
                  value={formData.familyLocation}
                  onChange={(e) => setFormData({ ...formData, familyLocation: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#321C1C]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: LIFESTYLE & ABOUT */}
        {activeStep === 5 && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#4B1718] border-b border-[#D7AD4A]/20 pb-2">
              5. Lifestyle &amp; Personal Description
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Food Habits</label>
                <select
                  value={formData.foodHabits}
                  onChange={(e) => setFormData({ ...formData, foodHabits: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#321C1C]"
                >
                  <option value="Vegetarian">Vegetarian (சைவம்)</option>
                  <option value="Non-Vegetarian">Non-Vegetarian (அசைவம்)</option>
                  <option value="Eggetarian">Eggetarian</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Smoking</label>
                <select
                  value={formData.smoking}
                  onChange={(e) => setFormData({ ...formData, smoking: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#321C1C]"
                >
                  <option value="No">No</option>
                  <option value="Occasionally">Occasionally</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Drinking</label>
                <select
                  value={formData.drinking}
                  onChange={(e) => setFormData({ ...formData, drinking: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#321C1C]"
                >
                  <option value="No">No</option>
                  <option value="Occasionally">Occasionally</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">About Myself</label>
              <textarea
                rows={4}
                value={formData.aboutMe}
                onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                placeholder="Write a few warm sentences about your personality, aspirations, values, and what kind of life partner you seek..."
                className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl p-3 text-xs sm:text-sm text-[#321C1C]"
              />
            </div>
          </div>
        )}

        {/* STEP 6: PARTNER PREFERENCES */}
        {activeStep === 6 && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#4B1718] border-b border-[#D7AD4A]/20 pb-2">
              6. Desired Partner Preferences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Preferred Age Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={formData.partnerPreferences.ageMin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        partnerPreferences: {
                          ...formData.partnerPreferences,
                          ageMin: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3 py-2 text-xs"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    value={formData.partnerPreferences.ageMax}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        partnerPreferences: {
                          ...formData.partnerPreferences,
                          ageMax: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Height Range</label>
                <input
                  type="text"
                  value={formData.partnerPreferences.heightMin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      partnerPreferences: {
                        ...formData.partnerPreferences,
                        heightMin: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. 5 ft 2 in onwards"
                  className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: PHOTOS & VERIFICATION */}
        {activeStep === 7 && (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-lg text-[#4B1718] border-b border-[#D7AD4A]/20 pb-2">
              7. Photographs &amp; Verification
            </h3>

            {/* Photos Preview Grid */}
            <div>
              <p className="text-xs font-bold text-[#4B1718] uppercase mb-2">My Profile Photos</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {formData.photos?.map((p, idx) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#D7AD4A]/50 shadow-md">
                    <img src={p.url} alt="" className="w-full h-full object-cover" />
                    {p.isPrimary && (
                      <span className="absolute bottom-2 left-2 bg-[#4B1718] text-[#F0D69C] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Primary Photo
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Demo / Custom Photo URL */}
              <div className="mt-4 flex gap-2">
                <input
                  type="url"
                  id="newPhotoUrl"
                  placeholder="Paste direct image URL (e.g. from Unsplash or Cloudinary)"
                  className="flex-1 bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2 text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('newPhotoUrl');
                    if (input && input.value) {
                      addPhotoUrl(input.value);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#4B1718] text-[#F0D69C] text-xs font-bold cursor-pointer hover:bg-[#351011]"
                >
                  Add Photo
                </button>
              </div>
            </div>

            {/* Identity Verification Request Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#4B1718] to-[#351011] text-[#FFFCF7] border border-[#D7AD4A]/40 shadow-md flex items-center justify-between gap-4">
              <div>
                <h4 className="font-heading font-bold text-sm text-gold-gradient flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D7AD4A]" />
                  <span>Request Official Profile Verification</span>
                </h4>
                <p className="text-xs text-[#F0D69C]/80 mt-1">
                  Submit government ID (Aadhaar or Passport) to earn the Official Verified trust badge.
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await api.post('/profiles/request-verification', { idType: 'Aadhaar Card' });
                    showToast('Verification request submitted successfully!', 'success');
                  } catch (e) {
                    showToast(e.message, 'error');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#D7AD4A] text-[#4B1718] font-bold text-xs uppercase shadow hover:brightness-110 shrink-0 cursor-pointer"
              >
                Request Verification
              </button>
            </div>
          </div>
        )}

        {/* Wizard Bottom Navigation Buttons */}
        <div className="pt-6 border-t border-[#D7AD4A]/30 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeStep === 1}
            className="px-5 py-2.5 rounded-xl border border-[#D7AD4A]/40 text-xs font-bold disabled:opacity-30 flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          {activeStep < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#4B1718] text-[#F0D69C] hover:bg-[#351011] text-xs font-bold uppercase tracking-wider shadow flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#D7AD4A] via-[#F0D69C] to-[#D7AD4A] text-[#4B1718] text-xs font-extrabold uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 cursor-pointer border border-[#D7AD4A]/50"
            >
              Complete &amp; Save Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
