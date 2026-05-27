import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveSession = (data) => {
    localStorage.setItem('smartlink_token', data.token);
    localStorage.setItem('smartlink_user', JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email,
    }));
    setUser({ _id: data._id, name: data.name, email: data.email });
  };

  const logout = () => {
    localStorage.removeItem('smartlink_token');
    localStorage.removeItem('smartlink_user');
    setUser(null);
  };

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    saveSession(res.data.data);
    return res.data.data;
  };

  const signup = async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    saveSession(res.data.data);
    return res.data.data;
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('smartlink_token');
      const cached = localStorage.getItem('smartlink_user');

      if (!token) {
        setLoading(false);
        return;
      }

      if (cached) {
        try {
          setUser(JSON.parse(cached));
        } catch {
          /* ignore bad cache */
        }
      }

      try {
        const res = await authService.getMe();
        setUser(res.data.data);
        localStorage.setItem('smartlink_user', JSON.stringify(res.data.data));
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
