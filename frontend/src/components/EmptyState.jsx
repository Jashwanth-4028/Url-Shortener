const EmptyState = ({ title = 'Nothing here yet', description, action }) => {
  return (
    <div className="text-center py-14 px-6 bg-white rounded-xl border border-dashed border-slate-300">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xl">
        ∅
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 mt-1.5 max-w-sm mx-auto">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;
