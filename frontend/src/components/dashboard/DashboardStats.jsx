import React from 'react';

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col"
        >
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            {stat.label}
          </span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-display font-bold text-gray-900 dark:text-white">
              {stat.value}
            </span>
            {stat.trend && (
              <span className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                {stat.trend}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}