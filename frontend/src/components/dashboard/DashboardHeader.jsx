import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

export default function DashboardHeader({ user, role }) {
  const isDonor = role === 'donor';

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name || 'Partner'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {isDonor ? "Here is your donation impact overview." : "Here are your active claims and impact."}
        </p>
      </div>
      
      {isDonor ? (
        <Link 
          to="/donate"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-tomato)] hover:bg-[var(--accent-tomato-hover)] text-white font-semibold rounded-xl transition-all shadow-sm touch-target"
        >
          <Plus size={20} />
          New Donation
        </Link>
      ) : (
        <Link 
          to="/find"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-tomato)] hover:bg-[var(--accent-tomato-hover)] text-white font-semibold rounded-xl transition-all shadow-sm touch-target"
        >
          <Search size={20} />
          Find Food
        </Link>
      )}
    </div>
  );
}