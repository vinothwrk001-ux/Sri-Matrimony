import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Crown,
  CreditCard,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  Eye,
  Check,
  Ban,
  FileText,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  Mail
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import api from '../../api/client';

export default function AdminDashboardPage() {
  const { user, isAdmin } = useAuth();
  const { showToast } = useApp();

  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' | 'members' | 'payments' | 'inquiries'
  const [metrics, setMetrics] = useState(null);
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const [metricRes, membersRes, paymentsRes, inquiriesRes] = await Promise.all([
        api.get('/admin/metrics'),
        api.get(`/admin/members?search=${encodeURIComponent(searchQuery)}`),
        api.get('/admin/payments'),
        api.get('/admin/inquiries'),
      ]);

      if (metricRes.success) setMetrics(metricRes.metrics);
      if (membersRes.success) setMembers(membersRes.members);
      if (paymentsRes.success) setPayments(paymentsRes.payments);
      if (inquiriesRes.success) setInquiries(inquiriesRes.inquiries);
    } catch (err) {
      showToast(err.message || 'Failed to load administrative console.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [searchQuery]);

  const handleVerify = async (memberId, status) => {
    try {
      const res = await api.put(`/admin/members/${memberId}/verify`, { status });
      if (res.success) {
        showToast(res.message, 'success');
        fetchDashboard();
      }
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  const handleToggleStatus = async (memberId, newStatus) => {
    try {
      const res = await api.put(`/admin/members/${memberId}/status`, { status: newStatus });
      if (res.success) {
        showToast(res.message, 'success');
        fetchDashboard();
      }
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-6 text-center">
        <div className="p-8 rounded-3xl bg-[#FDFBF7] gold-foil-border max-w-md shadow-xl">
          <Crown className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
          <h2 className="font-editorial text-2xl font-light text-[#2D0B0E] mb-2">Administrative Sanctuary Restricted</h2>
          <p className="text-xs text-[#5A191E] font-light">
            You must be authenticated with super-administrator credentials to access Sri Matrimony telemetry and member moderation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#D4AF37]/30 selection:text-[#190507]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Regal Admin Header Bar */}
        <div className="rounded-[36px] p-8 sm:p-10 bg-gradient-to-r from-[#2D0B0E] via-[#23080A] to-[#1C0608] text-[#FAF6F0] gold-foil-border shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-jali-pattern pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-2.5 shadow-sm border border-[#D4AF37]/40 bg-[#190507] text-[#F6ECCB]">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Super Admin Console</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#FAF6F0] tracking-wide">
              Sri Matrimony Operational Suite
            </h1>
            <p className="text-xs sm:text-sm text-[#F6ECCB]/80 font-light mt-1">
              Member identity moderation, Razorpay transactions ledger &amp; astrological database telemetry.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="relative z-10 flex flex-wrap gap-2">
            {[
              { id: 'metrics', label: 'Telemetry & Analytics' },
              { id: 'members', label: 'Member Directory' },
              { id: 'payments', label: 'Payment Ledger' },
              { id: 'inquiries', label: 'Inquiries' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#F6ECCB] to-[#D4AF37] text-[#190507] shadow-lg'
                    : 'bg-[#190507] text-[#F6ECCB] border border-[#D4AF37]/30 hover:border-[#D4AF37]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: METRICS & AGGREGATIONS */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {/* Total Members */}
              <div className="rounded-3xl p-6 bg-[#FDFBF7] gold-foil-border shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#2D0B0E] text-[#D4AF37] flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D1F]">Registry</span>
                </div>
                <p className="text-[11px] font-bold uppercase text-[#5A191E]">Total Registered Souls</p>
                <h3 className="font-editorial text-4xl font-light text-[#2D0B0E] mt-1 mb-1">
                  {metrics?.totalMembers || 0}
                </h3>
                <span className="text-[11px] text-[#321C1C]/70">
                  {metrics?.totalBrides || 0} Brides &bull; {metrics?.totalGrooms || 0} Grooms
                </span>
              </div>

              {/* Verified Profiles */}
              <div className="rounded-3xl p-6 bg-[#FDFBF7] gold-foil-border shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-900 text-emerald-300 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">100% ID</span>
                </div>
                <p className="text-[11px] font-bold uppercase text-emerald-900">Verified Profiles</p>
                <h3 className="font-editorial text-4xl font-light text-[#2D0B0E] mt-1 mb-1">
                  {metrics?.verifiedProfiles || 0}
                </h3>
                <span className="text-[11px] text-emerald-700 font-semibold">Government ID Confirmed</span>
              </div>

              {/* Paid Members */}
              <div className="rounded-3xl p-6 bg-[#FDFBF7] gold-foil-border shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#2D0B0E] text-[#D4AF37] flex items-center justify-center">
                    <Crown className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D1F]">Subscribers</span>
                </div>
                <p className="text-[11px] font-bold uppercase text-[#5A191E]">Active Paid Members</p>
                <h3 className="font-editorial text-4xl font-light text-[#2D0B0E] mt-1 mb-1">
                  {metrics?.activePaidMembers || 0}
                </h3>
                <span className="text-[11px] text-[#321C1C]/70">{metrics?.freeMembers || 0} Complimentary</span>
              </div>

              {/* Revenue */}
              <div className="rounded-3xl p-6 bg-[#FDFBF7] gold-foil-border shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#2D0B0E] text-[#D4AF37] flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">Razorpay</span>
                </div>
                <p className="text-[11px] font-bold uppercase text-[#5A191E]">Total Revenue</p>
                <h3 className="font-editorial text-4xl font-light text-[#2D0B0E] mt-1 mb-1">
                  ₹{(metrics?.totalRevenue || 0).toLocaleString('en-IN')}
                </h3>
                <span className="text-[11px] text-emerald-700 font-semibold">Verified Bank Settlements</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE MEMBERS */}
        {activeTab === 'members' && (
          <div className="rounded-3xl p-6 sm:p-8 bg-[#FDFBF7] gold-foil-border shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D4AF37]/20">
              <div>
                <h2 className="font-editorial text-2xl font-light text-[#2D0B0E]">
                  Registered Matrimonial Members
                </h2>
                <p className="text-xs text-[#5A191E] font-light mt-0.5">
                  Inspect member profiles, approve government identity proof, and moderate account standing.
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, ID, mobile, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#2D0B0E] placeholder:text-[#8C6D1F]/60 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-[#D4AF37]/30 text-[#2D0B0E]">
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Member Profile</th>
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Gender &amp; Age</th>
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Community</th>
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Status</th>
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Verification</th>
                    <th className="py-3 px-3 font-bold uppercase tracking-wider text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/20">
                  {members.map((m) => (
                    <tr key={m._id} className="hover:bg-[#FAF4F0]/60 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-[#2D0B0E]">{m.fullName}</div>
                        <div className="text-[10px] text-[#8C6D1F]">{m.profileId} &bull; {m.email}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-[#321C1C]">{m.gender}</span>
                      </td>
                      <td className="py-3.5 px-3 text-[#321C1C]/80">
                        {m.profile?.religion || 'Hindu'} &bull; {m.profile?.caste || 'General Community'}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          m.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        {m.isVerified ? (
                          <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-800 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Pending ID</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-right space-x-2">
                        {!m.isVerified ? (
                          <button
                            onClick={() => handleVerify(m._id, 'verified')}
                            className="px-3 py-1 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] uppercase shadow cursor-pointer transition-all"
                          >
                            Approve ID
                          </button>
                        ) : (
                          <button
                            onClick={() => handleVerify(m._id, 'rejected')}
                            className="px-3 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[10px] uppercase cursor-pointer transition-all"
                          >
                            Revoke
                          </button>
                        )}

                        <button
                          onClick={() => handleToggleStatus(m._id, m.status === 'active' ? 'suspended' : 'active')}
                          className={`px-3 py-1 rounded-xl font-bold text-[10px] uppercase cursor-pointer transition-all ${
                            m.status === 'active'
                              ? 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                          }`}
                        >
                          {m.status === 'active' ? 'Suspend' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TRANSACTIONS & PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="rounded-3xl p-6 sm:p-8 bg-[#FDFBF7] gold-foil-border shadow-xl space-y-6">
            <h2 className="font-editorial text-2xl font-light text-[#2D0B0E]">
              Payment Transactions &amp; GST Invoices
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-[#D4AF37]/30 text-[#2D0B0E]">
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Invoice #</th>
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Member</th>
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Plan Suite</th>
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Amount</th>
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Payment Status</th>
                    <th className="py-3 px-3 font-bold uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/20">
                  {payments.map((p) => (
                    <tr key={p._id} className="hover:bg-[#FAF4F0]/60 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-[#2D0B0E]">{p.invoiceNumber}</td>
                      <td className="py-3.5 px-3 font-semibold text-[#321C1C]">
                        {p.user?.fullName} ({p.user?.profileId})
                      </td>
                      <td className="py-3.5 px-3 uppercase font-bold text-[#D4AF37]">{p.planCode}</td>
                      <td className="py-3.5 px-3 font-bold text-emerald-800">₹{p.amount?.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px]">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-[#321C1C]/70">
                        {new Date(p.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="rounded-3xl p-6 sm:p-8 bg-[#FDFBF7] gold-foil-border shadow-xl space-y-6">
            <h2 className="font-editorial text-2xl font-light text-[#2D0B0E]">
              User Inquiries &amp; Matrimonial Support Requests
            </h2>
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq._id} className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#D4AF37]/30 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-[#2D0B0E] gap-1">
                    <span className="text-sm">{inq.name} &bull; {inq.phone} ({inq.email})</span>
                    <span className="text-xs text-[#8C6D1F] font-normal">
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                    </span>
                  </div>
                  <p className="font-semibold text-[#8C6D1F]">Subject: {inq.subject}</p>
                  <p className="text-[#321C1C]/85 italic bg-[#FDFBF7] p-3 rounded-xl border border-[#D4AF37]/20">
                    &ldquo;{inq.message}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
