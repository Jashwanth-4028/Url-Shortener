const LoadingSkeleton = ({ rows = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-12 bg-slate-200/80 rounded-lg animate-pulse"
          style={{ width: i === 0 ? '100%' : i % 2 === 0 ? '92%' : '85%' }}
        />
      ))}
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {[1, 2, 3].map((n) => (
      <div key={n} className="bg-white rounded-xl p-5 shadow-card border border-slate-100">
        <div className="h-3 w-20 bg-slate-200 rounded animate-pulse mb-3" />
        <div className="h-7 w-16 bg-slate-200 rounded animate-pulse" />
      </div>
    ))}
  </div>
);

export const TableSkeleton = () => (
  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
    <div className="h-10 bg-slate-100 animate-pulse" />
    <LoadingSkeleton rows={5} />
  </div>
);

export default LoadingSkeleton;
