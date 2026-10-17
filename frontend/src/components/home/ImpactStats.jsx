import React from 'react';

const stats = [
  { label: 'Meals Rescued', value: '12,450+' },
  { label: 'Active NGOs', value: '45' },
  { label: 'Partner Hotels', value: '120+' },
  { label: 'Cities Active', value: '1' }
];

export default function ImpactStats() {
  return (
    <section className="py-12 bg-white dark:bg-dark-card border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}