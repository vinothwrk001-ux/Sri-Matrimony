import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('sri_token') || null);
  const [loading, setLoading] = useState(true);

  // Load user session on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('sri_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.success) {
            setUser(res.user);
            setProfile(res.profile);
          } else {
            logout();
          }
        } catch (err) {
          console.warn('Session verification failed, clearing expired session.');
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (identifier, password) => {
    const res = await api.post('/auth/login', { identifier, password });
    if (res.success) {
      localStorage.setItem('sri_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setProfile(res.profile);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (formData) => {
    const res = await api.post('/auth/register', formData);
    if (res.success) {
      localStorage.setItem('sri_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setProfile(res.profile);
      return res;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('sri_token');
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.success) {
        setUser(res.user);
        setProfile(res.profile);
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  const updateProfileState = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const isPaidMember = user?.activeMembership?.planCode && user?.activeMembership?.planCode !== 'free';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isPaidMember,
        login,
        register,
        logout,
        refreshUser,
        updateProfileState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
