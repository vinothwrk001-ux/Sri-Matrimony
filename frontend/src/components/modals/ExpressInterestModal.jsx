import React, { useState } from 'react';
import { X, Heart, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/client';
import confetti from 'canvas-confetti';

export default function ExpressInterestModal() {
  const { interestModal, closeInterest, showToast } = useApp();
  const { isAuthenticated, user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [customMsg, setCustomMsg] = useState(
    'Vanakkam. I have reviewed your profile on Sri Matrimony and find our family values and aspirations very compatible. Please review my profile and let us connect.'
  );

  if (!interestModal.isOpen) return null;
  const profile = interestModal.profile;

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/interests/send', {
        targetUserId: profile.user?._id || profile.user || profile._id,
        message: customMsg,
      });

      if (res.success) {
        confetti({ particleCount: 50, spread: 60 });
        showToast(res.message, 'success');
        await refreshUser();
        closeInterest();
      }
    } catch (err) {
      showToast(err.message || 'Failed to send interest request.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const sampleMessages = [
    'Vanakkam. We found your profile through Sri Matrimony and would love to connect with your family.',
    'I found your education and interests very inspiring. Would be glad to take our conversation forward.',
    'Our horoscopes and family traditions match gracefully. Let us know if we can discuss further.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#190507]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-[32px] bg-[#FDFBF7] gold-foil-border shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D0B0E] via-[#23080A] to-[#1C0608] px-7 py-5 text-[#FAF6F0] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F6ECCB] text-[#190507] flex items-center justify-center shadow">
              <Heart className="w-5 h-5 fill-[#190507]" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-light text-[#FAF6F0] tracking-wide">
                Express Auspicious Interest
              </h3>
              <p className="text-[11px] text-[#F6ECCB]/80 font-light">
                Connecting with {profile.fullName} ({profile.profileId})
              </p>
            </div>
          </div>
          <button
            onClick={closeInterest}
            className="w-8 h-8 rounded-full bg-[#190507] text-[#F6ECCB] hover:text-[#FAF6F0] flex items-center justify-center border border-[#D4AF37]/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSend} className="p-6 sm:p-7 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-2">
              Personalized Invitation Message
            </label>
            <textarea
              rows={4}
              required
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-2xl p-3.5 text-xs sm:text-sm font-medium text-[#2D0B0E] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-[#8C6D1F] uppercase tracking-wider">
              Quick Traditional Prompts:
            </p>
            {sampleMessages.map((msg, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCustomMsg(msg)}
                className="w-full text-left p-2.5 rounded-xl bg-[#FAF6F0]/80 hover:bg-[#FAF6F0] border border-[#D4AF37]/20 text-[11px] text-[#321C1C]/80 truncate block transition-colors cursor-pointer"
              >
                &ldquo;{msg}&rdquo;
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#190507]" />
              <span>{loading ? 'Transmitting Request...' : 'Transmit Express Interest'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
