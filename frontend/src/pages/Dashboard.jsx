import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as urlService from '../services/urlService';
import { useToast } from '../context/ToastContext';
import CreateUrlModal from '../components/CreateUrlModal';
import UrlTable from '../components/UrlTable';
import QRModal from '../components/QRModal';
import EmptyState from '../components/EmptyState';
import { CardSkeleton, TableSkeleton } from '../components/LoadingSkeleton';
import { formatDateTime } from '../utils/formatDate';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [qrModal, setQrModal] = useState(null);
  const { showToast } = useToast();

  const fetchUrls = useCallback(async () => {
    try {
      const res = await urlService.getMyUrls();
      setUrls(res.data.data);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const totalClicks = urls.reduce((sum, u) => sum + (u.clicks || 0), 0);
  const activeLinks = urls.filter(
    (u) => !u.expiryDate || new Date(u.expiryDate) > new Date()
  ).length;

  const handleCreate = async (data) => {
    setCreating(true);
    try {
      await urlService.createUrl(data);
      showToast('Link created', 'success');
      setModalOpen(false);
      await fetchUrls();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleCopy = async (shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      showToast('Copied to clipboard', 'success');
    } catch {
      showToast('Could not copy', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this link? Analytics will be removed too.')) return;
    try {
      await urlService.deleteUrl(id);
      showToast('Link deleted', 'info');
      fetchUrls();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleEdit = async (url) => {
    const newDest = window.prompt('New destination URL (include https://)', url.originalUrl);
    if (!newDest || newDest === url.originalUrl) return;
    try {
      await urlService.updateUrl(url._id, { originalUrl: newDest });
      showToast('Link updated', 'success');
      fetchUrls();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const recentVisits = [...urls]
    .filter((u) => u.lastVisited)
    .sort((a, b) => new Date(b.lastVisited) - new Date(a.lastVisited))
    .slice(0, 4);

  return (
    <div className="p-5 lg:p-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage your short links and track performance</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 shadow-sm self-start sm:self-auto"
        >
          + New link
        </button>
      </div>

      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-8">
          <div className="sm:col-span-5 bg-white rounded-xl p-5 border border-slate-200 shadow-card">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Total clicks</p>
            <p className="text-3xl font-semibold mt-1 text-slate-900">{totalClicks}</p>
          </div>
          <div className="sm:col-span-3 bg-white rounded-lg p-5 border border-slate-200">
            <p className="text-xs text-slate-500">Active links</p>
            <p className="text-2xl font-semibold mt-2">{activeLinks}</p>
          </div>
          <div className="sm:col-span-4 bg-white rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-medium text-slate-600 mb-3">Recent activity</p>
            {recentVisits.length ? (
              <ul className="space-y-2 text-sm">
                {recentVisits.map((u) => (
                  <li key={u._id} className="flex justify-between gap-2">
                    <span className="text-slate-700 truncate">/{u.shortCode}</span>
                    <span className="text-slate-400 shrink-0 text-xs">
                      {formatDateTime(u.lastVisited)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">No visits recorded yet</p>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <TableSkeleton />
      ) : urls.length === 0 ? (
        <EmptyState
          title="No links yet"
          description="Create your first short URL to start tracking clicks."
          action={
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-brand-600 text-white text-sm rounded-lg"
            >
              Create link
            </button>
          }
        />
      ) : (
        <UrlTable
          urls={urls}
          onCopy={handleCopy}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onQr={(url) => setQrModal(url)}
          onRefresh={fetchUrls}
        />
      )}

      <p className="text-xs text-slate-400 mt-6">
        Public stats: share{' '}
        <code className="bg-slate-100 px-1 rounded">/stats/your-code</code> —{' '}
        {urls[0] && (
          <Link to={`/stats/${urls[0].shortCode}`} className="text-brand-600 hover:underline">
            preview example
          </Link>
        )}
      </p>

      <CreateUrlModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
        loading={creating}
      />

      <QRModal
        open={!!qrModal}
        onClose={() => setQrModal(null)}
        qrCode={qrModal?.qrCode}
        shortUrl={qrModal?.shortUrl}
      />
    </div>
  );
};

export default Dashboard;
