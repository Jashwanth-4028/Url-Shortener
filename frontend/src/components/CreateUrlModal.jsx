import { useState } from 'react';

const CreateUrlModal = ({ open, onClose, onSubmit, loading }) => {
  const [form, setForm] = useState({
    originalUrl: '',
    customAlias: '',
    expiryDate: '',
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      originalUrl: form.originalUrl.trim(),
      customAlias: form.customAlias.trim() || undefined,
      expiryDate: form.expiryDate || undefined,
    });
  };

  const handleClose = () => {
    setForm({ originalUrl: '', customAlias: '', expiryDate: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-soft border border-slate-200 p-6">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-lg font-semibold">Create short link</h2>
            <p className="text-sm text-slate-500 mt-0.5">Paste a long URL and optionally set an alias</p>
          </div>
          <button type="button" onClick={handleClose} className="text-slate-400 hover:text-slate-600 text-xl">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Destination URL</label>
            <input
              type="url"
              required
              placeholder="https://example.com/page"
              value={form.originalUrl}
              onChange={(e) => setForm({ ...form, originalUrl: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Custom alias <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="my-portfolio"
              value={form.customAlias}
              onChange={(e) => setForm({ ...form, customAlias: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Expiry date <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="date"
              value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2 rounded-lg border border-slate-300 text-sm text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? 'Creating…' : 'Create link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUrlModal;
