import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

export default function Pending() {
  const [telegramLinked, setTelegramLinked] =
    useState(false);
  const [linkedAt, setLinkedAt] =
    useState<string | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const pollingRef = useRef<number | null>(null);

  // Check Telegram link status and start polling
  useEffect(() => {
    checkStatus();
    pollingRef.current = window.setInterval(checkStatus, 5000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  const checkStatus = async () => {
    try {
      const token =
        localStorage.getItem('token');

      const response = await api.get(
        '/telegram/status',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const linked = response.data.linked;
      const approved = response.data.status === 'APPROVED';

      if (linked) {
        setTelegramLinked(true);
        setLinkedAt(response.data.linkedAt);
        setWaiting(false);
      }
      
      if (approved) {
        setIsApproved(true);
      }

      if (linked && approved && pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    } catch {
      // Status check failed — ignore silently
    }
  };

  const handleConnect = async () => {
    setLoading(true);

    try {
      const token =
        localStorage.getItem('token');

      const response = await api.get(
        '/telegram/connect-link',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.alreadyLinked) {
        setTelegramLinked(true);
        setLoading(false);
        return;
      }

      // Open Telegram deep link
      window.open(
        response.data.telegramUrl,
        '_blank',
      );

      setWaiting(true);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg animate-fade-in">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-10 shadow-2xl">
          {/* Status Badge */}
          <div className="text-center mb-8">
            {isApproved ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Approved
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
                Pending Review
              </div>
            )}

            <h1 className="text-2xl font-bold tracking-tight">
              {isApproved ? "Account Approved" : "Access Request Submitted"}
            </h1>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              {isApproved 
                ? "You are now approved and will receive weather alerts via Telegram."
                : "Your account is awaiting admin approval. You'll be notified via Telegram once approved."
              }
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-3 mb-8 animate-fade-in-d1">
            {/* Step 1 — Account Created */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-slate-300">Account created</span>
            </div>

            {/* Step 2 — Telegram */}
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                telegramLinked
                  ? 'bg-emerald-500/15 border border-emerald-500/30'
                  : 'bg-slate-800/80 border border-slate-700/50'
              }`}>
                {telegramLinked ? (
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs text-slate-500 font-semibold">2</span>
                )}
              </div>
              <span className={`text-sm ${telegramLinked ? 'text-slate-300' : 'text-slate-500'}`}>
                Telegram connected
              </span>
            </div>

            {/* Step 3 — Admin Approval */}
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isApproved
                  ? 'bg-emerald-500/15 border border-emerald-500/30'
                  : 'bg-slate-800/80 border border-slate-700/50'
              }`}>
                {isApproved ? (
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs text-slate-500 font-semibold">3</span>
                )}
              </div>
              <span className={`text-sm ${isApproved ? 'text-slate-300' : 'text-slate-500'}`}>
                Admin approval
              </span>
            </div>
          </div>

          {/* Telegram Connect Section */}
          <div className="border-t border-slate-800/50 pt-6 animate-fade-in-d2">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
              Connect Telegram
            </h2>

            {telegramLinked ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                <p className="text-emerald-400 font-medium text-sm">
                  ✅ Telegram Connected
                </p>
                {linkedAt && (
                  <p className="text-emerald-600 text-xs mt-1">
                    Linked {new Date(linkedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ) : waiting ? (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                <div className="animate-spin-slow w-6 h-6 border-2 border-amber-900 border-t-amber-400 rounded-full mx-auto mb-3" />
                <p className="text-amber-400 font-medium text-sm">
                  Waiting for connection...
                </p>
                <p className="text-amber-600 text-xs mt-1">
                  Tap <strong>START</strong> in the Telegram bot
                </p>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium px-5 py-3 rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg text-sm cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating link...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                    Connect Telegram
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}