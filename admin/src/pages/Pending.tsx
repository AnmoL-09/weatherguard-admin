import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

export default function Pending() {
  const [telegramLinked, setTelegramLinked] =
    useState(false);
  const [linkedAt, setLinkedAt] =
    useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const pollingRef = useRef<number | null>(null);

  // Check Telegram link status on mount
  useEffect(() => {
    checkStatus();

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

      if (response.data.linked) {
        setTelegramLinked(true);
        setLinkedAt(response.data.linkedAt);
        setWaiting(false);

        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
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

      // Start polling for link completion
      pollingRef.current = window.setInterval(
        checkStatus,
        5000,
      );
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center max-w-lg">
        <h1 className="text-3xl font-bold mb-4">
          Access Request Submitted
        </h1>

        <p className="text-slate-400">
          Your account is currently pending
          approval.
        </p>

        <p className="text-slate-500 mt-4">
          Once approved, you will receive a
          Telegram notification and begin
          receiving weather alerts.
        </p>

        {/* Telegram Connection Section */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <h2 className="text-lg font-semibold mb-3">
            Connect Telegram
          </h2>

          {telegramLinked ? (
            <div className="bg-green-900/30 border border-green-800 rounded-lg p-4">
              <p className="text-green-400 font-medium">
                ✅ Telegram Connected
              </p>
              {linkedAt && (
                <p className="text-green-600 text-sm mt-1">
                  Linked on{' '}
                  {new Date(
                    linkedAt,
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
          ) : waiting ? (
            <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-400 font-medium">
                ⏳ Waiting for Telegram
                connection...
              </p>
              <p className="text-yellow-600 text-sm mt-1">
                Send /start in the bot to
                complete linking.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-slate-500 text-sm mb-4">
                Link your Telegram account to
                receive weather alerts.
              </p>
              <button
                onClick={handleConnect}
                disabled={loading}
                className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading
                  ? 'Generating link...'
                  : 'Connect Telegram Account'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}