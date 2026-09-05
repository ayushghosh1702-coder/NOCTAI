import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
            toast.type === 'success'
              ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900'
              : toast.type === 'error'
              ? 'bg-rose-50/95 border-rose-200 text-rose-900'
              : toast.type === 'warning'
              ? 'bg-amber-50/95 border-amber-200 text-amber-900'
              : 'bg-indigo-50/95 border-indigo-200 text-indigo-900'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-600" />}
          </div>
          <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded-lg"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
