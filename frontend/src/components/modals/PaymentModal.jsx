import React, { useState } from 'react';
import { X, ShieldCheck, Check, Sparkles, CreditCard, Zap, FileText, Crown } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../api/client';
import confetti from 'canvas-confetti';

export default function PaymentModal() {
  const { paymentModal, closePayment, showToast } = useApp();
  const { refreshUser } = useAuth();
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [successInvoice, setSuccessInvoice] = useState(null);

  if (!paymentModal.isOpen) return null;
  const plan = paymentModal.plan;

  // Process Instant Test Payment Simulation
  const handleTestPayment = async () => {
    setLoading(true);
    try {
      const res = await api.post('/payments/mock-activate', { planCode: plan.code });
      if (res.success) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setSuccessInvoice(res.payment);
        await refreshUser();
        showToast(res.message, 'success');
      }
    } catch (err) {
      showToast(err.message || 'Payment processing failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Process Real Razorpay Order
  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      const orderRes = await api.post('/payments/create-order', { planCode: plan.code });
      if (!orderRes.success) throw new Error(orderRes.message);

      if (window.Razorpay) {
        const options = {
          key: orderRes.key,
          amount: orderRes.order.amount,
          currency: 'INR',
          name: 'Sri Matrimony',
          description: `${plan.name} Membership Suite`,
          order_id: orderRes.order.id,
          handler: async (response) => {
            const verifyRes = await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planCode: plan.code,
            });
            if (verifyRes.success) {
              confetti({ particleCount: 100, spread: 70 });
              setSuccessInvoice(verifyRes.payment);
              await refreshUser();
              showToast(verifyRes.message, 'success');
            }
          },
          theme: { color: '#190507' },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        await handleTestPayment();
      }
    } catch (err) {
      showToast(err.message || 'Razorpay order creation failed. Using sandbox simulation.', 'info');
      await handleTestPayment();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#190507]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-[32px] bg-[#FDFBF7] gold-foil-border shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D0B0E] via-[#23080A] to-[#1C0608] px-7 py-5 text-[#FAF6F0] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F6ECCB] text-[#190507] flex items-center justify-center font-bold shadow">
              <Crown className="w-5 h-5 text-[#190507]" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-light text-[#FAF6F0] tracking-wide">
                {successInvoice ? 'Sacred Suite Activated!' : 'Upgrade Membership Suite'}
              </h3>
              <p className="text-[11px] text-[#F6ECCB]/80 font-light">
                {successInvoice ? 'Your privileges have been provisioned instantly' : 'Secure Razorpay Indian Payment Gateway &bull; 256-bit SSL'}
              </p>
            </div>
          </div>

          <button
            onClick={closePayment}
            className="w-8 h-8 rounded-full bg-[#190507] text-[#F6ECCB] hover:text-[#FAF6F0] flex items-center justify-center border border-[#D4AF37]/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {successInvoice ? (
            /* INVOICE & CONFIRMATION */
            <div className="text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-800 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h4 className="font-editorial text-3xl font-light text-[#2D0B0E]">
                Auspicious Blessings!
              </h4>
              <p className="text-xs text-[#321C1C]/80 font-light leading-relaxed">
                You are now an active <strong>{plan.name} Member</strong> of Sri Matrimony. You can now reveal verified phone coordinates, view confidential horoscopes, and send direct interest requests.
              </p>

              {/* Receipt Box */}
              <div className="bg-[#FAF6F0] border border-[#D4AF37]/30 rounded-2xl p-5 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2 font-bold text-[#2D0B0E]">
                  <span>GST Tax Invoice:</span>
                  <span>{successInvoice.invoiceNumber}</span>
                </div>
                <div className="flex justify-between text-[#321C1C]">
                  <span>Enrolled Suite:</span>
                  <span className="font-semibold text-[#2D0B0E]">{plan.name}</span>
                </div>
                <div className="flex justify-between text-[#321C1C]">
                  <span>Amount Settled:</span>
                  <span className="font-bold text-emerald-800">₹{successInvoice.amount?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#321C1C]">
                  <span>Status:</span>
                  <span className="font-bold text-emerald-800 uppercase tracking-wider">Settled &bull; Captured</span>
                </div>
              </div>

              <button
                onClick={closePayment}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-widest shadow-lg hover:brightness-105 cursor-pointer mt-2"
              >
                Proceed to Matrimonial Matches
              </button>
            </div>
          ) : (
            /* PLAN SUMMARY & PAYMENT OPTIONS */
            <div className="space-y-6">
              {/* Selected Plan Details */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-[#2D0B0E] via-[#23080A] to-[#1C0608] text-[#FAF6F0] gold-foil-border shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-editorial text-2xl font-light text-[#FAF6F0]">
                    {plan.name} Suite
                  </h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-light text-[#D4AF37]">₹</span>
                    <span className="font-editorial text-3xl font-light text-[#FAF6F0]">
                      {plan.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#F6ECCB]/80 font-light">
                  Validity Duration: {plan.durationLabel || '90 Days'}
                </p>

                <div className="mt-5 pt-4 border-t border-[#D4AF37]/25 grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="bg-[#190507] p-3 rounded-2xl border border-[#D4AF37]/20">
                    <p className="font-editorial text-xl text-[#D4AF37]">{plan.contactViewsLimit || 10}</p>
                    <p className="text-[10px] text-[#FAF6F0]/70 uppercase tracking-wider mt-0.5">Contact Views</p>
                  </div>
                  <div className="bg-[#190507] p-3 rounded-2xl border border-[#D4AF37]/20">
                    <p className="font-editorial text-xl text-[#D4AF37]">{plan.interestRequestsLimit || 10}</p>
                    <p className="text-[10px] text-[#FAF6F0]/70 uppercase tracking-wider mt-0.5">Interests</p>
                  </div>
                  <div className="bg-[#190507] p-3 rounded-2xl border border-[#D4AF37]/20">
                    <p className="font-editorial text-xl text-[#D4AF37]">{plan.messagingCreditsLimit || 10}</p>
                    <p className="text-[10px] text-[#FAF6F0]/70 uppercase tracking-wider mt-0.5">Messages</p>
                  </div>
                </div>
              </div>

              {/* Payment Actions */}
              <div className="space-y-3">
                {/* 1-Click Instant Activation (Sandbox evaluation) */}
                <button
                  type="button"
                  onClick={handleTestPayment}
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/30"
                >
                  <Zap className="w-4 h-4 text-emerald-300" />
                  <span>{loading ? 'Activating Privileges...' : 'Instant Sandbox 1-Click Activation (Test Mode)'}</span>
                </button>

                {/* Razorpay Gateway Button */}
                <button
                  type="button"
                  onClick={handleRazorpayPayment}
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-[#190507]" />
                  <span>Pay ₹{plan.price.toLocaleString('en-IN')} via Razorpay (UPI &bull; Cards &bull; NetBanking)</span>
                </button>
              </div>

              {/* Security Trust Indicator */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#321C1C]/75 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>256-bit Bank Grade Encryption &bull; Instant Allocation to Account</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
