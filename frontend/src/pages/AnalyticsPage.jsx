import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as urlService from '../services/urlService';
import { useToast } from '../context/ToastContext';
import { DailyClicksChart, BrowserChart, DeviceBarChart } from '../components/AnalyticsChart';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { formatDateTime, truncateUrl } from '../utils/formatDate';

const AnalyticsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await urlService.getAnalytics(id);
        setData(res.data.data);
      } catch (err) {
        showToast(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, showToast]);

  if (loading) {
    return (
      <div className="p-8">
        <LoadingSkeleton rows={6} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center text-slate-500">
        Could not load analytics.{' '}
        <Link to="/dashboard" className="text-brand-600">
          Back
        </Link>
      </div>
    );
  }

  const { url, totalClicks, dailyTrends, browsers, devices, clickHistory } = data;

  return (
    <div className="p-5 lg:p-8">
      <Link to="/dashboard" className="text-sm text-slate-500 hover:text-slate-800">
        ← Back to dashboard
      </Link>

      <div className="mt-4 mb-6">
        <h1 className="text-lg font-semibold">Link analytics</h1>
        <p className="text-sm text-slate-500 mt-1" title={url.originalUrl}>
          {truncateUrl(url.originalUrl, 60)}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          /{url.shortCode} · Last visit {formatDateTime(url.lastVisited)}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-lg p-4 border border-slate-200 col-span-2 lg:col-span-1">
          <p className="text-xs text-slate-500">Total clicks</p>
          <p className="text-2xl font-semibold">{totalClicks}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <p className="text-xs text-slate-500">Stored clicks</p>
          <p className="text-2xl font-semibold">{url.clicks}</p>
        </div>
        <div className="col-span-2 lg:col-span-2 bg-slate-800 text-white rounded-xl p-4">
          <p className="text-xs text-slate-300">Quick tip</p>
          <p className="text-sm mt-1">
            Open the short link in another tab to see this chart update after refresh.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-sm font-medium mb-4">Daily clicks (14 days)</h2>
          <DailyClicksChart dailyTrends={dailyTrends} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h2 className="text-sm font-medium mb-3">Browsers</h2>
            <BrowserChart browsers={browsers} />
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <h2 className="text-sm font-medium mb-3">Devices</h2>
            <DeviceBarChart devices={devices} />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <h2 className="text-sm font-semibold">Click history</h2>
        </div>
        {clickHistory?.length ? (
          <ul className="divide-y divide-slate-100 text-sm max-h-64 overflow-y-auto">
            {clickHistory.map((v, i) => (
              <li key={i} className="px-4 py-2.5 flex justify-between text-slate-600">
                <span>
                  {v.browser} · {v.device}
                </span>
                <span className="text-slate-400">{formatDateTime(v.timestamp)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-6 text-sm text-slate-400 text-center">No visits yet — share your link!</p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
