import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Unauthorized() {
  const { user } = useAuth();
  const dashboardPath = user?.role === 'ngo' ? '/dashboard/ngo' : '/dashboard/hotel';

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-950/40 text-red-600 rounded-2xl flex items-center justify-center mb-6">
        <ShieldAlert size={36} />
      </div>
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        You do not have permission to view this section. Please log in with an authorized account or return to your dashboard.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        {user ? (
          <Link
            to={dashboardPath}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-tomato)] hover:bg-[var(--accent-tomato-hover)] text-white font-semibold rounded-xl transition-all shadow-sm touch-target"
          >
            <ArrowLeft size={18} />
            Go to Your Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-tomato)] hover:bg-[var(--accent-tomato-hover)] text-white font-semibold rounded-xl transition-all shadow-sm touch-target"
          >
            Log In
          </Link>
        )}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all hover:bg-gray-50 touch-target"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
