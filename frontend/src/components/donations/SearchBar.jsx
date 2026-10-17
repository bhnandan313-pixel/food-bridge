import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search for bread, rice, hotel name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full min-h-[44px] pl-10 pr-4 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--accent-tomato)] outline-none transition-all dark:text-white shadow-sm"
      />
    </div>
  );
}