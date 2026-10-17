import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950/40 text-[var(--accent-tomato)] rounded-2xl flex items-center justify-center mb-6">
        <AlertCircle size={36} />
      </div>
      <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
        The page you are looking for doesn't exist or has been moved to another URL.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-tomato)] hover:bg-[var(--accent-tomato-hover)] text-white font-semibold rounded-xl transition-all shadow-sm touch-target"
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
}
