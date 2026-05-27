import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showToast('Welcome back!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-slate-800 text-white p-12 flex-col justify-between">
        <div>
          <span className="text-xl font-semibold">SmartLink</span>
          <p className="mt-8 text-slate-300 text-lg leading-relaxed max-w-md">
            Shorten links, track clicks, and see where your traffic comes from — built for hackathon demos and real projects.
          </p>
        </div>
        <p className="text-sm text-slate-500">© SmartLink</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="glass-panel w-full max-w-md rounded-2xl p-8 shadow-soft">
          <h1 className="text-2xl font-semibold text-slate-900">Log in</h1>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            Demo: demo@smartlink.dev / demo123
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500/30 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-6 text-center">
            No account?{' '}
            <Link to="/signup" className="text-brand-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-center mt-3">
            <Link to="/" className="text-xs text-slate-400 hover:text-slate-600">
              ← Back home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
