const styles = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-slate-800 text-white',
};

const Toast = ({ message, type = 'info', onClose }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-soft text-sm min-w-[220px] max-w-sm animate-[slideIn_0.25s_ease-out] ${styles[type] || styles.info}`}
      role="alert"
    >
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="opacity-70 hover:opacity-100 text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
