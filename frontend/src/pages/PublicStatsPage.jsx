import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as urlService from '../services/urlService';
import { formatDate, formatDateTime } from '../utils/formatDate';
import LoadingSkeleton from '../components/LoadingSkeleton';

const PublicStatsPage = () => {
  const { shortCode } = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await urlService.getPublicStats(shortCode);
        setStats(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [shortCode]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-5 py-3">
        <Link to="/" className="text-sm font-semibold text-slate-800">
          SmartLink
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        {loading ? (
          <div className="w-full max-w-md">
            <LoadingSkeleton rows={4} />
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-slate-600">{error}</p>
            <Link to="/" className="text-sm text-brand-600 mt-4 inline-block">
              Go home
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-8 shadow-soft">
            <p className="text-xs uppercase text-slate-400 tracking-wide">Public stats</p>
            <h1 className="text-2xl font-semibold mt-1">/{stats.shortCode}</h1>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-500">Total clicks</p>
                <p className="text-3xl font-semibold text-brand-600">{stats.clicks}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-500">Created</p>
                <p className="text-sm font-medium mt-2">{formatDate(stats.createdAt)}</p>
              </div>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="text-slate-400">Destination</dt>
                <dd className="text-slate-700 break-all mt-0.5">{stats.originalUrl}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Last visited</dt>
                <dd className="text-slate-700">{formatDateTime(stats.lastVisited)}</dd>
              </div>
              {stats.expiryDate && (
                <div>
                  <dt className="text-slate-400">Expires</dt>
                  <dd className="text-slate-700">{formatDate(stats.expiryDate)}</dd>
                </div>
              )}
            </dl>

            <a
              href={stats.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="block mt-6 text-center py-2.5 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700"
            >
              Visit short link
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicStatsPage;
