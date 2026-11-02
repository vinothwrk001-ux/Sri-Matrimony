import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import api from '../../api/client';

export default function ContactPage() {
  const { t } = useLanguage();
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Matrimonial Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/contact-inquiries', formData);
      if (res.success) {
        setSubmitted(true);
        showToast(res.message, 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Matrimonial Inquiry',
          message: '',
        });
      }
    } catch (err) {
      showToast(err.message || 'Failed to submit inquiry.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D7AD4A] bg-[#4B1718] px-3.5 py-1 rounded-full shadow-sm">
            Contact Support
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#4B1718] mt-3">
            Get In Touch With Sri Matrimony
          </h1>
          <p className="text-xs sm:text-sm text-[#682526] font-medium mt-2">
            Our experienced Tamil matrimonial relationship managers are here to assist you and your family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#FFFCF7] rounded-3xl p-6 border-2 border-[#D7AD4A]/30 shadow-lg space-y-6">
              <h3 className="font-heading font-bold text-xl text-[#4B1718]">
                Headquarters &amp; Support
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#321C1C]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4B1718] text-[#D7AD4A] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-[#4B1718] font-bold">Main Office:</strong>
                    <span>No. 42, Anna Salai, T. Nagar, Chennai, Tamil Nadu - 600017</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4B1718] text-[#D7AD4A] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-[#4B1718] font-bold">Helpline:</strong>
                    <a href="tel:+919840012345" className="hover:text-[#D7AD4A] transition-colors">
                      +91 98400 12345 / +91 98400 12346
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4B1718] text-[#D7AD4A] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-[#4B1718] font-bold">Email Inquiries:</strong>
                    <a href="mailto:support@srimatrimony.com" className="hover:text-[#D7AD4A] transition-colors">
                      support@srimatrimony.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-[#4B1718] font-bold">WhatsApp Support:</strong>
                    <a
                      href="https://wa.me/919840012345"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-emerald-700 font-semibold"
                    >
                      Chat with us on WhatsApp (+91 98400 12345)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4B1718] text-[#D7AD4A] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-[#4B1718] font-bold">Working Hours:</strong>
                    <span>Monday - Saturday: 9:00 AM to 7:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Functional Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-10 border-2 border-[#D7AD4A]/30 shadow-xl">
              <h3 className="font-heading font-bold text-2xl text-[#4B1718] mb-1">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#682526] font-medium mb-6">
                Fill in your details below and our matrimonial advisor will get back to you within 24 hours.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4B1718] uppercase tracking-wider mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sundaram K"
                      className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#321C1C] focus:outline-none focus:ring-2 focus:ring-[#D7AD4A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4B1718] uppercase tracking-wider mb-1.5">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98400..."
                      className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#321C1C] focus:outline-none focus:ring-2 focus:ring-[#D7AD4A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4B1718] uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#321C1C] focus:outline-none focus:ring-2 focus:ring-[#D7AD4A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4B1718] uppercase tracking-wider mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#321C1C]"
                    >
                      <option value="General Matrimonial Inquiry">General Matrimonial Inquiry</option>
                      <option value="Profile Verification Assistance">Profile Verification Assistance</option>
                      <option value="Membership Plan Question">Membership Plan Question</option>
                      <option value="Horoscope Matching Support">Horoscope Matching Support</option>
                      <option value="Report an Issue">Report an Issue</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B1718] uppercase tracking-wider mb-1.5">
                    Your Message / Query
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the bride or groom, preferred community, or how we can assist you..."
                    className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl p-3 text-xs sm:text-sm text-[#321C1C] focus:outline-none focus:ring-2 focus:ring-[#D7AD4A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D7AD4A] via-[#F0D69C] to-[#D7AD4A] text-[#4B1718] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#D7AD4A]/50"
                >
                  <Send className="w-4 h-4 text-[#4B1718]" />
                  <span>{loading ? 'Submitting Message...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
