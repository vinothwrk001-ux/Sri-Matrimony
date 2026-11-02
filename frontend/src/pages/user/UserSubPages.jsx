import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import {
  Heart,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Shield,
  Crown,
  Lock,
  Eye,
  Send,
  Calendar,
  Sparkles
} from 'lucide-react';
import api from '../../api/client';
import ProfileCard from '../../components/common/ProfileCard';

// 1. INTERESTS & REQUESTS PAGE
export function InterestsPage() {
  const [tab, setTab] = useState('received'); // 'received' or 'sent'
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useApp();

  const fetchInterests = async () => {
    try {
      setLoading(true);
      const res = await api.get('/interests');
      if (res.success) {
        setReceived(res.received || []);
        setSent(res.sent || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  const handleRespond = async (interestId, action) => {
    try {
      const res = await api.put(`/interests/${interestId}/respond`, { action });
      if (res.success) {
        showToast(res.message, 'success');
        fetchInterests();
      }
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  return (
    <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#D7AD4A]/30 shadow-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#D7AD4A]/20">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-[#4B1718]">
            Interest Requests &amp; Connections
          </h1>
          <p className="text-xs text-[#682526]">
            Manage connection invitations sent to and received from Tamil matches
          </p>
        </div>

        <div className="flex rounded-full bg-[#F8F1E7] p-1 border border-[#D7AD4A]/30">
          <button
            onClick={() => setTab('received')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              tab === 'received' ? 'bg-[#4B1718] text-[#F0D69C] shadow' : 'text-[#321C1C]'
            }`}
          >
            Received ({received.length})
          </button>
          <button
            onClick={() => setTab('sent')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              tab === 'sent' ? 'bg-[#4B1718] text-[#F0D69C] shadow' : 'text-[#321C1C]'
            }`}
          >
            Sent ({sent.length})
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-xs text-[#682526]">Loading interest requests...</p>
      ) : tab === 'received' ? (
        received.length > 0 ? (
          <div className="space-y-4">
            {received.map((item) => (
              <div
                key={item._id}
                className="bg-[#F8F1E7]/70 rounded-2xl p-4 border border-[#D7AD4A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#351011] shrink-0 border border-[#D7AD4A]/40">
                    <img
                      src={item.profile?.photos?.[0]?.url || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200'}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#4B1718]">
                      {item.profile?.fullName || item.sender?.fullName}
                    </h4>
                    <p className="text-xs text-[#682526]">
                      {item.profile?.age} Yrs &bull; {item.profile?.occupation} &bull; {item.profile?.workLocation}
                    </p>
                    <p className="text-xs text-[#321C1C]/80 italic mt-1">&ldquo;{item.message}&rdquo;</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {item.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleRespond(item._id, 'accepted')}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow hover:bg-emerald-700 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleRespond(item._id, 'declined')}
                        className="px-4 py-1.5 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      item.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-center py-10 text-[#682526]">No interest requests received yet.</p>
        )
      ) : (
        sent.length > 0 ? (
          <div className="space-y-4">
            {sent.map((item) => (
              <div
                key={item._id}
                className="bg-[#F8F1E7]/70 rounded-2xl p-4 border border-[#D7AD4A]/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#351011] shrink-0 border border-[#D7AD4A]/40">
                    <img
                      src={item.profile?.photos?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200'}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#4B1718]">
                      {item.profile?.fullName || item.receiver?.fullName}
                    </h4>
                    <p className="text-[11px] text-[#682526]">Status: <strong className="uppercase">{item.status}</strong></p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  item.status === 'accepted'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.status === 'declined'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-center py-10 text-[#682526]">No interest requests sent yet.</p>
        )
      )}
    </div>
  );
}

// 2. SHORTLISTED PROFILES PAGE
export function ShortlistsPage() {
  const [shortlists, setShortlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShortlists = async () => {
      try {
        const res = await api.get('/shortlists');
        if (res.success) setShortlists(res.shortlists);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchShortlists();
  }, []);

  return (
    <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#D7AD4A]/30 shadow-xl space-y-6">
      <div className="pb-4 border-b border-[#D7AD4A]/20">
        <h1 className="font-heading font-extrabold text-2xl text-[#4B1718]">
          My Shortlisted Profiles
        </h1>
        <p className="text-xs text-[#682526]">
          Profiles you have marked for future reference and family consultation
        </p>
      </div>

      {loading ? (
        <p className="text-xs text-[#682526]">Loading shortlists...</p>
      ) : shortlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlists.map((item) => (
            <div key={item._id}>
              {item.profile ? <ProfileCard profile={item.profile} /> : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-[#682526]">
          You have not shortlisted any profiles yet. Browse search results to save candidates.
        </div>
      )}
    </div>
  );
}

// 3. CONTACT VIEWS HISTORY PAGE
export function ContactViewsPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/contact-views/history');
        if (res.success) setHistory(res.history);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#D7AD4A]/30 shadow-xl space-y-6">
      <div className="pb-4 border-b border-[#D7AD4A]/20">
        <h1 className="font-heading font-extrabold text-2xl text-[#4B1718]">
          Unlocked Contact Views History
        </h1>
        <p className="text-xs text-[#682526]">
          All verified mobile numbers and emails revealed via your active membership plan
        </p>
      </div>

      {loading ? (
        <p className="text-xs text-[#682526]">Loading unlocked contacts...</p>
      ) : history.length > 0 ? (
        <div className="space-y-4">
          {history.map((view) => (
            <div
              key={view._id}
              className="bg-[#F8F1E7]/70 rounded-2xl p-5 border border-[#D7AD4A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#351011] shrink-0 border border-[#D7AD4A]/40">
                  <img
                    src={view.profile?.photos?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200'}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#4B1718]">
                    {view.profile?.fullName || view.viewedProfile?.fullName}
                  </h4>
                  <p className="text-xs text-[#682526]">
                    ID: {view.profile?.profileId || view.viewedProfile?.profileId}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs font-bold text-[#4B1718]">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#D7AD4A]" />
                      <a href={`tel:${view.revealedPhone}`} className="hover:underline">{view.revealedPhone}</a>
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#D7AD4A]" />
                      <a href={`mailto:${view.revealedEmail}`} className="hover:underline">{view.revealedEmail}</a>
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right text-[11px] text-[#682526]">
                Unlocked: {new Date(view.viewedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-[#682526]">
          You have not unlocked any contact numbers yet.
        </div>
      )}
    </div>
  );
}

// 4. MESSAGES / CONVERSATIONS PAGE
export function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const { user } = useAuth();
  const { showToast } = useApp();

  useEffect(() => {
    const fetchConvs = async () => {
      try {
        const res = await api.get('/messages/conversations');
        if (res.success) {
          setConversations(res.conversations || []);
          if (res.conversations?.length > 0) setActiveConv(res.conversations[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchConvs();
  }, []);

  useEffect(() => {
    if (activeConv?._id) {
      const fetchMsgs = async () => {
        try {
          const res = await api.get(`/messages/${activeConv._id}`);
          if (res.success) setMessages(res.messages || []);
        } catch (e) {
          console.error(e);
        }
      };
      fetchMsgs();
    }
  }, [activeConv]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !activeConv) return;
    try {
      const res = await api.post('/messages/send', {
        targetUserId: activeConv.partner?._id,
        text: newMsg,
      });
      if (res.success) {
        setMessages((prev) => [...prev, res.message]);
        setNewMsg('');
      }
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  return (
    <div className="bg-[#FFFCF7] rounded-3xl border border-[#D7AD4A]/30 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[650px]">
      {/* Conversations List (4 cols) */}
      <div className="md:col-span-4 border-r border-[#D7AD4A]/20 flex flex-col h-full bg-[#F8F1E7]/40">
        <div className="p-4 border-b border-[#D7AD4A]/20">
          <h2 className="font-heading font-bold text-lg text-[#4B1718]">Conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-[#D7AD4A]/10">
          {conversations.length > 0 ? (
            conversations.map((conv) => (
              <button
                key={conv._id}
                onClick={() => setActiveConv(conv)}
                className={`w-full p-4 text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  activeConv?._id === conv._id ? 'bg-[#FFFCF7] border-l-4 border-[#4B1718]' : 'hover:bg-[#F8F1E7]'
                }`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#351011] shrink-0 border border-[#D7AD4A]/30">
                  <img
                    src={conv.partnerProfile?.photos?.[0]?.url || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200'}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 truncate">
                  <h4 className="font-bold text-xs text-[#4B1718] truncate">{conv.partner?.fullName}</h4>
                  <p className="text-[11px] text-[#321C1C]/70 truncate">{conv.lastMessage || 'Say hello...'}</p>
                </div>
              </button>
            ))
          ) : (
            <p className="p-6 text-xs text-center text-[#682526]">No active conversations.</p>
          )}
        </div>
      </div>

      {/* Chat Messages View (8 cols) */}
      <div className="md:col-span-8 flex flex-col h-full bg-[#FFFCF7]">
        {activeConv ? (
          <>
            <div className="p-4 border-b border-[#D7AD4A]/20 bg-[#FFFCF7] flex items-center gap-3">
              <h3 className="font-heading font-bold text-base text-[#4B1718]">{activeConv.partner?.fullName}</h3>
              <span className="text-xs text-[#D7AD4A] font-bold">({activeConv.partner?.profileId})</span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m) => {
                const isMe = m.sender === user?._id || m.sender?._id === user?._id;
                return (
                  <div key={m._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-xs sm:text-sm ${
                      isMe ? 'bg-[#4B1718] text-[#F0D69C]' : 'bg-[#F8F1E7] text-[#321C1C] border border-[#D7AD4A]/30'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-[#D7AD4A]/20 flex gap-2">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2 text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#4B1718] text-[#F0D69C] hover:bg-[#351011] text-xs font-bold cursor-pointer"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6 text-center text-xs text-[#682526]">
            Select a conversation on the left to start communicating.
          </div>
        )}
      </div>
    </div>
  );
}

// 5. MEMBERSHIP & BILLING PAGE
export function MembershipPage() {
  const { user, isPaidMember } = useAuth();
  const { openPayment } = useApp();
  const plan = user?.activeMembership;

  return (
    <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#D7AD4A]/30 shadow-xl space-y-6">
      <div className="pb-4 border-b border-[#D7AD4A]/20">
        <h1 className="font-heading font-extrabold text-2xl text-[#4B1718]">
          My Membership &amp; Entitlements
        </h1>
        <p className="text-xs text-[#682526]">
          View your active plan, remaining balance, and renewal options
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#4B1718] to-[#351011] text-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#D7AD4A]/40 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#F0D69C] bg-[#351011] px-3 py-1 rounded-full border border-[#D7AD4A]/30">
              Active Subscription
            </span>
            <h2 className="font-heading font-bold text-3xl text-gold-gradient mt-2 uppercase">
              {plan?.planCode || 'FREE'} PLAN
            </h2>
            <p className="text-xs text-[#F0D69C]/80 mt-1">
              Expires on: {plan?.endDate ? new Date(plan.endDate).toLocaleDateString() : 'Lifetime Free Access'}
            </p>
          </div>

          <button
            onClick={() => openPayment()}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D7AD4A] to-[#F0D69C] text-[#4B1718] font-bold text-xs uppercase tracking-wider shadow hover:brightness-110 active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            {isPaidMember ? 'Renew or Upgrade Plan' : 'Upgrade to Standard / Premium'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-[#351011]/80 p-4 rounded-2xl border border-[#D7AD4A]/20">
            <p className="text-2xl font-heading font-extrabold text-[#D7AD4A]">{plan?.remainingContactViews || 0}</p>
            <p className="text-xs text-[#F8F1E7]/80">Remaining Contact Views</p>
          </div>
          <div className="bg-[#351011]/80 p-4 rounded-2xl border border-[#D7AD4A]/20">
            <p className="text-2xl font-heading font-extrabold text-[#D7AD4A]">{plan?.remainingInterests || 0}</p>
            <p className="text-xs text-[#F8F1E7]/80">Remaining Interests</p>
          </div>
          <div className="bg-[#351011]/80 p-4 rounded-2xl border border-[#D7AD4A]/20">
            <p className="text-2xl font-heading font-extrabold text-[#D7AD4A]">{plan?.remainingMessages || 0}</p>
            <p className="text-xs text-[#F8F1E7]/80">Messaging Credits</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. PRIVACY SETTINGS PAGE
export function PrivacySettingsPage() {
  const { profile, updateProfileState } = useAuth();
  const { showToast } = useApp();
  const [settings, setSettings] = useState({
    showMobileTo: profile?.privacySettings?.showMobileTo || 'paid_only',
    showEmailTo: profile?.privacySettings?.showEmailTo || 'paid_only',
    photoVisibility: profile?.privacySettings?.photoVisibility || 'all',
    hideProfile: profile?.privacySettings?.hideProfile || false,
  });

  const handleSave = async () => {
    try {
      const res = await api.put('/profiles/privacy-settings', settings);
      if (res.success) {
        showToast(res.message, 'success');
      }
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  return (
    <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#D7AD4A]/30 shadow-xl space-y-6">
      <div className="pb-4 border-b border-[#D7AD4A]/20">
        <h1 className="font-heading font-extrabold text-2xl text-[#4B1718]">
          Privacy &amp; Profile Visibility
        </h1>
        <p className="text-xs text-[#682526]">
          Configure who is authorized to view your phone numbers, photographs, and matching listing
        </p>
      </div>

      <div className="space-y-6 max-w-xl">
        <div>
          <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1.5">
            Who Can View My Contact Number?
          </label>
          <select
            value={settings.showMobileTo}
            onChange={(e) => setSettings({ ...settings, showMobileTo: e.target.value })}
            className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
          >
            <option value="paid_only">Verified Paid Members with available credits</option>
            <option value="interests_accepted">Only Members whose Interest I Accepted</option>
            <option value="nobody">Strictly Hide from Everyone</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#4B1718] uppercase mb-1.5">
            Photo Visibility
          </label>
          <select
            value={settings.photoVisibility}
            onChange={(e) => setSettings({ ...settings, photoVisibility: e.target.value })}
            className="w-full bg-[#F8F1E7] border border-[#D7AD4A]/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
          >
            <option value="all">Visible to All Registered Members</option>
            <option value="paid_only">Visible to Paid Subscribers Only</option>
            <option value="accepted_only">Visible Only after Interest Accepted</option>
          </select>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.hideProfile}
              onChange={(e) => setSettings({ ...settings, hideProfile: e.target.checked })}
              className="w-4 h-4 rounded text-[#4B1718] accent-[#4B1718]"
            />
            <div>
              <span className="font-bold text-xs text-[#4B1718] block">Hide My Profile From Public Search</span>
              <span className="text-[11px] text-[#321C1C]/70 block">Temporarily pause discovery while retaining your account and interests</span>
            </div>
          </label>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-full bg-[#4B1718] text-[#F0D69C] text-xs font-bold uppercase tracking-wider shadow hover:bg-[#351011] cursor-pointer"
        >
          Save Privacy Preferences
        </button>
      </div>
    </div>
  );
}
