import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose, 
  duration = 3000 
}) {
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const styles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-800/50',
      text: 'text-green-800 dark:text-green-300',
      icon: <CheckCircle size={20} className="text-green-600 dark:text-green-400 shrink-0" />
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-800/50',
      text: 'text-red-800 dark:text-red-300',
      icon: <AlertCircle size={20} className="text-red-600 dark:text-red-400 shrink-0" />
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-200 dark:border-blue-800/50',
      text: 'text-blue-800 dark:text-blue-300',
      icon: <Info size={20} className="text-blue-600 dark:text-blue-400 shrink-0" />
    }
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 sm:right-6 left-4 sm:left-auto z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all duration-300 transform max-w-sm ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
      role="alert"
    >
      {currentStyle.icon}
      
      <p className="text-sm font-medium flex-1 mr-2">
        {message}
      </p>

      <button
        onClick={onClose}
        className="p-1 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all touch-target focus:outline-none focus:ring-2 focus:ring-current"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}