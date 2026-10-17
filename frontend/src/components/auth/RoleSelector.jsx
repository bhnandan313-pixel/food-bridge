import React from 'react';
import { Building2, Heart } from 'lucide-react';

export default function RoleSelector({ selectedRole, onSelectRole }) {
  const roles = [
    {
      id: 'donor',
      title: 'I want to donate',
      description: 'Hotels, restaurants, and event organizers',
      icon: <Building2 size={28} className="mb-3" />
    },
    {
      id: 'ngo',
      title: 'I am an NGO',
      description: 'Verified organizations distributing food',
      icon: <Heart size={28} className="mb-3" />
    }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {roles.map((role) => {
        const isSelected = selectedRole === role.id;
        
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onSelectRole(role.id)}
            aria-pressed={isSelected}
            className={`flex-1 flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all touch-target text-center focus:outline-none focus:ring-4 focus:ring-red-500/30 ${
              isSelected 
                ? 'border-[var(--accent-tomato)] bg-orange-50 dark:bg-orange-900/20 text-[var(--accent-tomato)]' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {role.icon}
            <span className="text-base font-bold text-gray-900 dark:text-white mb-1">
              {role.title}
            </span>
            <span className={`text-xs ${isSelected ? 'text-orange-700 dark:text-orange-300' : 'text-gray-500 dark:text-gray-400'}`}>
              {role.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}