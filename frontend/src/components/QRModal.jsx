const QRModal = ({ open, onClose, qrCode, shortUrl }) => {
  if (!open) return null;

  const downloadQr = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `smartlink-qr.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full border border-slate-200 shadow-soft">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold text-slate-800">QR Code</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            ×
          </button>
        </div>

        {qrCode ? (
          <img src={qrCode} alt="QR code" className="mx-auto rounded-lg border border-slate-100" />
        ) : (
          <p className="text-sm text-slate-500 text-center py-8">QR not available</p>
        )}

        <p className="text-xs text-slate-500 text-center mt-3 break-all">{shortUrl}</p>

        <div className="flex gap-2 mt-5">
          <button
            type="button"
            onClick={downloadQr}
            disabled={!qrCode}
            className="flex-1 py-2 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-900 disabled:opacity-50"
          >
            Download PNG
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
