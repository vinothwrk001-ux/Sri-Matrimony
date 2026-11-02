import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isError = toast.type === 'error';
          const isInfo = toast.type === 'info';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className={`pointer-events-auto p-4 rounded-2xl border shadow-xl flex items-start gap-3 backdrop-blur-md ${
                isError
                  ? 'bg-[#351011] border-red-500 text-white'
                  : isInfo
                  ? 'bg-[#351011] border-[#D7AD4A] text-[#FFFCF7]'
                  : 'bg-[#351011] border-emerald-500 text-[#FFFCF7]'
              }`}
            >
              {isError ? (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              ) : isInfo ? (
                <Info className="w-5 h-5 text-[#D7AD4A] shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              )}

              <div className="flex-1 text-xs sm:text-sm font-medium">
                {toast.message}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/60 hover:text-white shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
