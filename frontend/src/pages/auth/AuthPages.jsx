import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await login(identifier, password);
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (e, p) => {
    setIdentifier(e);
    setPassword(p);
    try {
      await login(e, p);
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[#FFFCF7] rounded-3xl p-8 border-2 border-[#D7AD4A]/40 shadow-2xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border border-[#D7AD4A] bg-[#4B1718] flex items-center justify-center mx-auto mb-3 shadow">
            <svg viewBox="0 0 100 100" className="w-7 h-7 fill-[#D7AD4A]">
              <path d="M50,15 C45,28 32,38 32,54 C32,68 40,78 50,78 C60,78 68,68 68,54 C68,38 55,28 50,15 Z" fill="#D7AD4A" />
            </svg>
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[#4B1718]">
            Sign In to Sri Matrimony
          </h1>
          <p className="text-xs text-[#682526] mt-1">
            Access your verified Tamil matrimony matches
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#4B1718] uppercase tracking-wider mb-1.5">
              Email or Mobile
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#D7AD4A] absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@gmail.com or 9840111221"
                className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#321C1C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4B1718] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#D7AD4A] absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#321C1C]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D7AD4A] via-[#F0D69C] to-[#D7AD4A] text-[#4B1718] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-98 cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* 1-Click Demo Buttons */}
        <div className="pt-4 border-t border-[#D7AD4A]/20">
          <p className="text-[11px] font-bold text-[#4B1718] uppercase tracking-wider text-center mb-2">
            Instant Demo Logins
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <button
              onClick={() => handleQuickLogin('priya@gmail.com', 'Priya@123')}
              className="py-1.5 px-2 rounded-lg bg-[#F8F1E7] border border-[#D7AD4A]/40 font-bold text-[#4B1718] hover:bg-[#D7AD4A]/20"
            >
              Bride
            </button>
            <button
              onClick={() => handleQuickLogin('karthik@gmail.com', 'Karthik@123')}
              className="py-1.5 px-2 rounded-lg bg-[#F8F1E7] border border-[#D7AD4A]/40 font-bold text-[#4B1718] hover:bg-[#D7AD4A]/20"
            >
              Groom
            </button>
            <button
              onClick={() => handleQuickLogin('admin@srimatrimony.com', 'Admin@1234')}
              className="py-1.5 px-2 rounded-lg bg-[#351011] text-[#F0D69C] border border-[#D7AD4A]/40 font-bold"
            >
              Admin
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-[#321C1C]/80">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#4B1718] hover:underline">
            Register Free
          </Link>
        </p>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    gender: 'Bride',
    lookingFor: 'Groom',
    dateOfBirth: '1999-06-15',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Mudaliar',
    education: 'B.E. Computer Science',
    occupation: 'Software Engineer',
    workLocation: 'Chennai, Tamil Nadu',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard/edit-profile');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-[#FFFCF7] rounded-3xl p-8 border-2 border-[#D7AD4A]/40 shadow-2xl space-y-6">
        <div className="text-center">
          <h1 className="font-heading font-extrabold text-2xl text-[#4B1718]">
            Register Free on Sri Matrimony
          </h1>
          <p className="text-xs text-[#682526] mt-1">
            Create your Tamil matrimony profile and start connecting
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Keerthana Balaji"
              className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value, lookingFor: e.target.value === 'Bride' ? 'Groom' : 'Bride' })}
                className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3 py-2 text-xs"
              >
                <option value="Bride">Bride</option>
                <option value="Groom">Groom</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Date of Birth</label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Mobile</label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="+91 98400..."
                className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Religion</label>
              <select
                value={formData.religion}
                onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3 py-2 text-xs"
              >
                <option value="Hindu">Hindu</option>
                <option value="Christian">Christian</option>
                <option value="Muslim">Muslim</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Caste</label>
              <input
                type="text"
                value={formData.caste}
                onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
                className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1">Create Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2 text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D7AD4A] via-[#F0D69C] to-[#D7AD4A] text-[#4B1718] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-98 cursor-pointer"
          >
            {loading ? 'Creating Account...' : 'Complete Free Registration'}
          </button>
        </form>

        <p className="text-center text-xs text-[#321C1C]/80">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-[#4B1718] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
