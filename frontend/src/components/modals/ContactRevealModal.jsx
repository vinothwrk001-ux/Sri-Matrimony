import React, { useState } from 'react';
import { X, Phone, Mail, MessageCircle, AlertCircle, Sparkles, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/client';

export default function ContactRevealModal() {
  const { contactModal, closeContactReveal, openPayment, showToast } = useApp();
  const { user, refreshUser, isPaidMember } = useAuth();
  const [loading, setLoading] = useState(false);
  const [revealedData, setRevealedData] = useState(null);

  if (!contactModal.isOpen) return null;
  const profile = contactModal.profile;

  const remainingCredits = user?.activeMembership?.remainingContactViews || 0;

  const handleReveal = async () => {
    setLoading(true);
    try {
      const res = await api.post('/contact-views/reveal', {
        targetUserId: profile.user?._id || profile.user || profile._id,
      });

      if (res.success) {
        setRevealedData(res.contact);
        await refreshUser();
        showToast(res.message, 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to reveal contact details.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#190507]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md rounded-[32px] bg-[#FDFBF7] gold-foil-border shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D0B0E] via-[#23080A] to-[#1C0608] px-7 py-5 text-[#FAF6F0] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#190507] border border-[#D4AF37]/30 text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">
              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
              <span>Confidential Coordinates</span>
            </div>
            <h3 className="font-editorial text-2xl font-light text-[#FAF6F0] tracking-wide">
              {revealedData ? 'Contact Unlocked' : 'Verified Contact Request'}
            </h3>
            <p className="text-[11px] text-[#F6ECCB]/80 font-light">
              Profile: {profile.fullName} ({profile.profileId})
            </p>
          </div>
          <button
            onClick={closeContactReveal}
            className="w-8 h-8 rounded-full bg-[#190507] text-[#F6ECCB] hover:text-[#FAF6F0] flex items-center justify-center border border-[#D4AF37]/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7">
          {revealedData ? (
            /* UNLOCKED CONTACT NUMBERS */
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-400 shadow">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="text-center">
                <h4 className="font-editorial text-2xl font-light text-[#2D0B0E]">
                  Verified Contact Information
                </h4>
                <p className="text-xs text-[#321C1C]/80 mt-1 font-light">
                  You can now connect directly with {profile.fullName} and family.
                </p>
              </div>

              <div className="bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold text-[#2D0B0E]">Direct Mobile:</span>
                  </div>
                  <a
                    href={`tel:${revealedData.mobile}`}
                    className="font-bold text-sm text-[#2D0B0E] hover:text-[#D4AF37]"
                  >
                    {revealedData.mobile}
                  </a>
                </div>

                <div className="flex items-center justify-between border-t border-[#D4AF37]/20 pt-2.5">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold text-[#2D0B0E]">Email Address:</span>
                  </div>
                  <a
                    href={`mailto:${revealedData.email}`}
                    className="font-semibold text-xs text-[#2D0B0E] hover:text-[#D4AF37]"
                  >
                    {revealedData.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${revealedData.mobile}`}
                  className="py-3 rounded-2xl bg-[#2D0B0E] text-[#F6ECCB] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow hover:bg-[#190507]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Directly</span>
                </a>
                <a
                  href={`https://wa.me/${revealedData.mobile.replace(/\D/g, '')}?text=Vanakkam%20${encodeURIComponent(profile.fullName)},%20I%20am%20interested%20in%20your%20Sri%20Matrimony%20profile.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-2xl bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow hover:bg-emerald-800"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ) : !isPaidMember ? (
            /* FREE USER PROMPT TO UPGRADE */
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-full bg-[#2D0B0E] text-[#D4AF37] flex items-center justify-center mx-auto border border-[#D4AF37]/40 shadow-lg">
                <Lock className="w-6 h-6" />
              </div>

              <div>
                <h4 className="font-editorial text-2xl font-light text-[#2D0B0E]">
                  Membership Suite Required
                </h4>
                <p className="text-xs text-[#321C1C]/80 mt-1 leading-relaxed font-light">
                  Viewing direct mobile coordinates, family details, and horoscopes of verified Tamil members requires an active <strong>Standard, Premium, or Platinum</strong> suite.
                </p>
              </div>

              <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#D4AF37]/30 text-xs text-[#5A191E] font-medium text-left space-y-1">
                <p>✓ Verified contact views with direct family consent</p>
                <p>✓ Express interest privileges &amp; messaging</p>
                <p>✓ Astrological horoscope matching reports</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  closeContactReveal();
                  openPayment({
                    code: 'standard',
                    name: 'Standard Heritage',
                    price: 999,
                    durationLabel: '3 Months',
                    contactViewsLimit: 10,
                  });
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                Upgrade Suite from ₹999
              </button>
            </div>
          ) : (
            /* PAID USER CONFIRMATION TO CONSUME 1 CREDIT */
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#D4AF37]/30 text-xs text-[#321C1C]">
                <p className="font-semibold text-[#2D0B0E] mb-1">
                  Active Suite: <span className="uppercase text-[#D4AF37] font-extrabold">{user?.activeMembership?.planCode}</span>
                </p>
                <p className="font-light">
                  You have <strong>{remainingCredits}</strong> contact view credits remaining in your active suite.
                </p>
              </div>

              {remainingCredits > 0 ? (
                <>
                  <p className="text-xs text-[#321C1C]/80 font-light leading-relaxed">
                    Revealing {profile.fullName}'s verified phone number and email will consume <strong>1 contact credit</strong>. Once revealed, this contact will remain permanently unlocked in your sanctuary history.
                  </p>

                  <button
                    onClick={handleReveal}
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {loading ? 'Unlocking Coordinates...' : 'Confirm & Reveal Contact (1 Credit)'}
                  </button>
                </>
              ) : (
                <div className="space-y-3 text-center">
                  <p className="text-xs text-rose-700 font-semibold">
                    You have exhausted your contact view credits for this cycle.
                  </p>
                  <button
                    onClick={() => {
                      closeContactReveal();
                      openPayment();
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 cursor-pointer"
                  >
                    Top Up / Upgrade Credits
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
