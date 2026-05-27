import { Link } from 'react-router-dom';
import { formatDate, formatDateTime, truncateUrl } from '../utils/formatDate';

const UrlTable = ({ urls, onCopy, onDelete, onEdit, onQr, onRefresh }) => {
  if (!urls?.length) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">Your links</h2>
        <button
          type="button"
          onClick={onRefresh}
          className="text-xs text-brand-600 hover:underline"
        >
          Refresh
        </button>
      </div>

      <div className="url-table-wrap overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-4 py-2.5 font-medium">Original</th>
              <th className="px-4 py-2.5 font-medium">Short</th>
              <th className="px-4 py-2.5 font-medium w-16">Clicks</th>
              <th className="px-4 py-2.5 font-medium">Created</th>
              <th className="px-4 py-2.5 font-medium">Last visit</th>
              <th className="px-4 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {urls.map((url) => (
              <tr key={url._id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 max-w-[200px]">
                  <span title={url.originalUrl} className="text-slate-700">
                    {truncateUrl(url.originalUrl, 36)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onCopy(url.shortUrl)}
                    className="text-brand-600 hover:underline font-medium"
                  >
                    /{url.shortCode}
                  </button>
                </td>
                <td className="px-4 py-3 text-slate-700">{url.clicks}</td>
                <td className="px-4 py-3 text-slate-500">{formatDate(url.createdAt)}</td>
                <td className="px-4 py-3 text-slate-500">{formatDateTime(url.lastVisited)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1 flex-wrap">
                    <Link
                      to={`/dashboard/analytics/${url._id}`}
                      className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      Analytics
                    </Link>
                    <button
                      type="button"
                      onClick={() => onQr(url)}
                      className="px-2 py-1 text-xs rounded-md text-slate-600 hover:bg-slate-100"
                    >
                      QR
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(url)}
                      className="px-2 py-1 text-xs rounded-md text-slate-600 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(url._id)}
                      className="px-2 py-1 text-xs rounded-md text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlTable;
