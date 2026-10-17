import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function DonationFilters({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'All Items' },
    { id: 'urgent', label: 'Ending Soon' },
    { id: 'veg', label: 'Pure Veg' },
    { id: 'meals', label: 'Prepared Meals' }
  ];

  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center gap-2 text-gray-500 shrink-0">
        <SlidersHorizontal size={18} />
        <span className="text-sm font-medium">Filter:</span>
      </div>
      <div className="flex gap-2 shrink-0">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`min-h-[40px] px-4 rounded-full text-sm font-medium transition-all touch-target ${
              activeFilter === filter.id
                ? 'bg-[var(--accent-tomato)] text-white shadow-sm'
                : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[var(--accent-tomato)] hover:text-[var(--accent-tomato)]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}