import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
    <p className="text-6xl font-semibold text-slate-300">404</p>
    <h1 className="text-lg font-medium mt-2">Page not found</h1>
    <p className="text-sm text-slate-500 mt-1">This route doesn&apos;t exist.</p>
    <Link to="/" className="mt-6 text-sm text-brand-600 hover:underline">
      Back to home
    </Link>
  </div>
);

export default NotFound;
