import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ compact }) => {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`bg-white border-b border-slate-200 ${compact ? 'h-14' : 'h-16'} flex items-center px-4 lg:px-6`}
    >
      <div className="flex items-center justify-between w-full">
        <Link to={isLoggedIn ? '/dashboard' : '/'} className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center text-sm font-bold">
            SL
          </span>
          <span className="font-semibold text-slate-800 hidden sm:inline">SmartLink</span>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          {isLoggedIn ? (
            <>
              <span className="text-slate-500 hidden md:inline">
                Hi, <span className="text-slate-700 font-medium">{user?.name?.split(' ')[0]}</span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1.5 text-slate-600 hover:text-slate-900">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3.5 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
