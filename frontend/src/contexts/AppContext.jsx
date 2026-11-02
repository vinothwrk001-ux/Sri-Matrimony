import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [bootstrapData, setBootstrapData] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState(null);

  // Modal states
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, plan: null });
  const [contactModal, setContactModal] = useState({ isOpen: false, profile: null });
  const [interestModal, setInterestModal] = useState({ isOpen: false, profile: null });

  // Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loadBootstrap = async () => {
    try {
      setInitError(null);
      const res = await api.get('/app/bootstrap');
      if (res.success) {
        setBootstrapData(res);
        setIsInitialized(true);
        return res;
      }
      throw new Error(res.message || 'Bootstrap failed');
    } catch (err) {
      console.error('App Bootstrap Error:', err);
      setInitError(err.message || 'Server connection failed');
      throw err;
    }
  };

  const openAuth = (mode = 'login') => setAuthModal({ isOpen: true, mode });
  const closeAuth = () => setAuthModal({ isOpen: false, mode: 'login' });

  const openPayment = (plan = null) => setPaymentModal({ isOpen: true, plan });
  const closePayment = () => setPaymentModal({ isOpen: false, plan: null });

  const openContactReveal = (profile) => setContactModal({ isOpen: true, profile });
  const closeContactReveal = () => setContactModal({ isOpen: false, profile: null });

  const openInterest = (profile) => setInterestModal({ isOpen: true, profile });
  const closeInterest = () => setInterestModal({ isOpen: false, profile: null });

  return (
    <AppContext.Provider
      value={{
        bootstrapData,
        isInitialized,
        initError,
        loadBootstrap,
        authModal,
        openAuth,
        closeAuth,
        paymentModal,
        openPayment,
        closePayment,
        contactModal,
        openContactReveal,
        closeContactReveal,
        interestModal,
        openInterest,
        closeInterest,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
