import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardStats from '../components/dashboard/DashboardStats';
import { MapPin, Navigation } from 'lucide-react';

// Mock active claims awaiting pickup
const pendingPickups = [
  { id: 'CLM-201', title: '50 Boxed Lunches (Veg)', donor: 'Tech Corp Cafe', address: '123 Business Park, Sector 4', expiry: 'Ends in 45 mins' }
];

export default function NGODashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const stats = [
    { label: 'Meals Rescued', value: '4,850', trend: '+350 this week' },
    { label: 'Active Pickups', value: '1' },
    { label: 'Donor Partners', value: '12' },
    { label: 'People Served', value: '4,500+' }
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <DashboardHeader user={user} role="ngo" />
      <DashboardStats stats={stats} />

      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Pickups</h2>
          <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-sm font-semibold rounded-full">
            1 Action Required
          </span>
        </div>
        
        {loading ? (
          <div className="animate-pulse h-24 bg-gray-100 dark:bg-gray-800 rounded-xl w-full"></div>
        ) : pendingPickups.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
            <p className="text-gray-500">No active pickups right now.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingPickups.map(item => (
              <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{item.expiry}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm font-medium text-gray-500">#{item.id}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin size={16} />
                    <span><strong className="text-gray-900 dark:text-gray-200">{item.donor}</strong> — {item.address}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 hover:border-gray-300 rounded-xl text-gray-700 dark:text-gray-200 font-medium transition-colors touch-target">
                    <Navigation size={18} />
                    Get Directions
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors touch-target">
                    Mark Collected
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}