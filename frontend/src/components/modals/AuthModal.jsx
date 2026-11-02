import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User, Calendar, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import confetti from 'canvas-confetti';

export default function AuthModal() {
  const { authModal, closeAuth } = useApp();
  const { login, register } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState(authModal.mode || 'login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // Registration states
  const [regData, setRegData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    gender: 'Bride',
    lookingFor: 'Groom',
    dateOfBirth: '1998-05-15',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Mudaliar',
    education: 'B.E. Computer Science',
    occupation: 'Software Engineer',
    workLocation: 'Chennai, Tamil Nadu',
  });

  if (!authModal.isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await login(identifier, password);
      closeAuth();
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await register(regData);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      closeAuth();
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Login helper buttons for testing
  const handleQuickLogin = (email, pass) => {
    setIdentifier(email);
    setPassword(pass);
    login(email, pass)
      .then(() => closeAuth())
      .catch((err) => setErrorMsg(err.message));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#190507]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-[32px] bg-[#FDFBF7] gold-foil-border shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#2D0B0E] via-[#23080A] to-[#1C0608] px-7 py-5 text-[#FAF6F0] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#190507] border border-[#D4AF37]/30 text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Sacred Portal Access</span>
            </div>
            <h3 className="font-editorial text-2xl font-light text-[#FAF6F0] tracking-wide">
              {mode === 'login' ? 'Sanctuary Sign-In' : 'Create Matrimony Account'}
            </h3>
            <p className="text-[11px] text-[#F6ECCB]/80 font-light">
              {mode === 'login' ? 'Authenticate to access your compatible Tamil matches' : 'Register in 2 minutes & connect with verified profiles'}
            </p>
          </div>
          <button
            onClick={closeAuth}
            className="w-8 h-8 rounded-full bg-[#190507] text-[#F6ECCB] hover:text-[#FAF6F0] flex items-center justify-center border border-[#D4AF37]/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1.5">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. priya@gmail.com or 9840111221"
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-[#2D0B0E] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('For password reset, please contact support@srimatrimony.com or use demo accounts.')}
                    className="text-xs text-[#8C6D1F] hover:text-[#2D0B0E] font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm font-medium text-[#2D0B0E] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#8C6D1F] hover:text-[#2D0B0E]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer mt-2"
              >
                {loading ? 'Authenticating...' : 'Sign In to Sri Matrimony'}
              </button>

              {/* Demo Accounts Quick Fill Buttons */}
              <div className="pt-4 border-t border-[#D4AF37]/20">
                <p className="text-[10px] font-bold text-[#8C6D1F] uppercase tracking-wider text-center mb-2.5">
                  1-Click Fast Evaluation Logins
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('priya@gmail.com', 'Priya@123')}
                    className="py-2 px-2 rounded-xl bg-[#FAF6F0] border border-[#D4AF37]/40 text-[11px] font-bold text-[#2D0B0E] hover:bg-[#D4AF37]/20 text-center cursor-pointer transition-all"
                  >
                    Bride (Priya)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('karthik@gmail.com', 'Karthik@123')}
                    className="py-2 px-2 rounded-xl bg-[#FAF6F0] border border-[#D4AF37]/40 text-[11px] font-bold text-[#2D0B0E] hover:bg-[#D4AF37]/20 text-center cursor-pointer transition-all"
                  >
                    Groom (Karthik)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin@srimatrimony.com', 'Admin@1234')}
                    className="py-2 px-2 rounded-xl bg-[#2D0B0E] text-[#F6ECCB] border border-[#D4AF37]/40 text-[11px] font-bold hover:bg-[#190507] text-center cursor-pointer transition-all"
                  >
                    Super Admin
                  </button>
                </div>
              </div>

              <p className="text-center text-xs text-[#321C1C]/80 pt-3 font-light">
                Seeking a life partner?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-[#2D0B0E] hover:underline cursor-pointer"
                >
                  Register Free
                </button>
              </p>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1">
                  Full Name ( மணமகள் / மணமகன் பெயர் )
                </label>
                <input
                  type="text"
                  required
                  value={regData.fullName}
                  onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                  placeholder="e.g. Soundarya Natarajan"
                  className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-[#2D0B0E] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1">
                    I am Creating For
                  </label>
                  <select
                    value={regData.gender}
                    onChange={(e) =>
                      setRegData({
                        ...regData,
                        gender: e.target.value,
                        lookingFor: e.target.value === 'Bride' ? 'Groom' : 'Bride',
                      })
                    }
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs font-semibold text-[#2D0B0E]"
                  >
                    <option value="Bride">Bride (மணமகள்)</option>
                    <option value="Groom">Groom (மணமகன்)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    required
                    value={regData.dateOfBirth}
                    onChange={(e) => setRegData({ ...regData, dateOfBirth: e.target.value })}
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs font-semibold text-[#2D0B0E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-[#2D0B0E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={regData.mobile}
                    onChange={(e) => setRegData({ ...regData, mobile: e.target.value })}
                    placeholder="+91 98400..."
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-[#2D0B0E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1">
                    Faith &amp; Religion
                  </label>
                  <select
                    value={regData.religion}
                    onChange={(e) => setRegData({ ...regData, religion: e.target.value })}
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs font-semibold text-[#2D0B0E]"
                  >
                    <option value="Hindu">Hindu</option>
                    <option value="Christian">Christian</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Jain">Jain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1">
                    Community Heritage
                  </label>
                  <input
                    type="text"
                    value={regData.caste}
                    onChange={(e) => setRegData({ ...regData, caste: e.target.value })}
                    placeholder="e.g. Mudaliar / Brahmin / Nadar"
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-[#2D0B0E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1">
                    Highest Education
                  </label>
                  <input
                    type="text"
                    value={regData.education}
                    onChange={(e) => setRegData({ ...regData, education: e.target.value })}
                    placeholder="e.g. B.E / B.Tech / MBA / MBBS"
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-[#2D0B0E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={regData.workLocation}
                    onChange={(e) => setRegData({ ...regData, workLocation: e.target.value })}
                    placeholder="e.g. Chennai, Tamil Nadu"
                    className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-[#2D0B0E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8C6D1F] uppercase tracking-wider mb-1">
                  Create Confidential Password
                </label>
                <input
                  type="password"
                  required
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs font-medium text-[#2D0B0E]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  {loading ? 'Creating Profile...' : 'Complete Free Registration'}
                </button>
              </div>

              <p className="text-center text-xs text-[#321C1C]/80 pt-2 font-light">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-[#2D0B0E] hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
