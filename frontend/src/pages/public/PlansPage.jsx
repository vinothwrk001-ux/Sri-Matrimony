import React from 'react';
import { Check, Sparkles, ShieldCheck, Crown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import MembershipPlansSection from '../../components/home/MembershipPlansSection';

export default function PlansPage() {
  const { t } = useLanguage();
  const { bootstrapData } = useApp();

  const comparisonFeatures = [
    { name: 'Profile Registration & Listing', free: true, std: true, prem: true, plat: true },
    { name: 'Browse Search Profiles', free: true, std: true, prem: true, plat: true },
    { name: 'Verified Contact Views', free: '0', std: '10', prem: '20', plat: '50' },
    { name: 'Express Interest Requests', free: '5', std: '10', prem: '20', plat: '50' },
    { name: 'Direct Member Messaging', free: 'None', std: '10 Credits', prem: '20 Credits', plat: '50 Credits' },
    { name: 'Priority Search Placement', free: false, std: false, prem: true, plat: true },
    { name: 'Horoscope Compatibility Match', free: false, std: true, prem: true, plat: true },
    { name: 'Dedicated Matrimony Relationship Advisor', free: false, std: false, prem: false, plat: true },
    { name: 'Membership Duration', free: 'Lifetime', std: '3 Months', prem: '6 Months', plat: '12 Months' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFCF7] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D7AD4A] bg-[#4B1718] px-3.5 py-1 rounded-full shadow-sm">
            Membership Plans
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#4B1718] mt-3">
            Choose Your Matrimonial Membership
          </h1>
          <p className="text-xs sm:text-base text-[#682526] font-medium mt-2">
            Transparent pricing designed for Tamil families. Upgrade anytime with secure Razorpay checkout.
          </p>
        </div>

        {/* 4 Cards Grid Component */}
        <MembershipPlansSection plans={bootstrapData?.plans || []} />

        {/* Comparison Table */}
        <div className="mt-16 bg-[#FFFCF7] rounded-3xl p-6 sm:p-10 border-2 border-[#D7AD4A]/30 shadow-xl overflow-x-auto">
          <h2 className="font-heading font-bold text-2xl text-[#4B1718] mb-6">
            Detailed Plan Feature Comparison
          </h2>
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-[#D7AD4A]/40 text-[#4B1718]">
                <th className="py-3 px-4 font-bold">Feature</th>
                <th className="py-3 px-4 font-bold">Free</th>
                <th className="py-3 px-4 font-bold text-[#D7AD4A]">Standard (₹999)</th>
                <th className="py-3 px-4 font-bold">Premium (₹1,999)</th>
                <th className="py-3 px-4 font-bold text-[#4B1718]">Platinum (₹3,499)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D7AD4A]/20">
              {comparisonFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8F1E7]/50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-[#321C1C]">{row.name}</td>
                  <td className="py-3.5 px-4">
                    {typeof row.free === 'boolean' ? (
                      row.free ? <Check className="w-4 h-4 text-emerald-600" /> : <span className="text-gray-400">&mdash;</span>
                    ) : (
                      <span className="font-semibold text-[#682526]">{row.free}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#4B1718]">
                    {typeof row.std === 'boolean' ? (
                      row.std ? <Check className="w-4 h-4 text-emerald-600" /> : <span className="text-gray-400">&mdash;</span>
                    ) : (
                      row.std
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#4B1718]">
                    {typeof row.prem === 'boolean' ? (
                      row.prem ? <Check className="w-4 h-4 text-emerald-600" /> : <span className="text-gray-400">&mdash;</span>
                    ) : (
                      row.prem
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#4B1718]">
                    {typeof row.plat === 'boolean' ? (
                      row.plat ? <Check className="w-4 h-4 text-emerald-600" /> : <span className="text-gray-400">&mdash;</span>
                    ) : (
                      row.plat
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
