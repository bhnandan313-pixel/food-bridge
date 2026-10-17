import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardStats from '../components/dashboard/DashboardStats';
import { Package, Clock, CheckCircle } from 'lucide-react';

// Mock data
const mockDonations = [
  { id: 'DON-102', title: '50 Boxed Lunches', qty: 50, status: 'claimed', time: '2 hours ago', claimedBy: 'Hope Foundation' },
  { id: 'DON-101', title: 'Leftover Buffet Items', qty: 30, status: 'completed', time: 'Yesterday', claimedBy: 'City Rescue' },
];

export default function HotelDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const stats = [
    { label: 'Total Meals Donated', value: '1,240', trend: '+12% this month' },
    { label: 'Active Listings', value: '0' },
    { label: 'NGO Partners', value: '4' },
    { label: 'Food Waste Saved', value: '450 kg' }
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <DashboardHeader user={user} role="donor" />
      <DashboardStats stats={stats} />

      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl w-full"></div>
            <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl w-full"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {mockDonations.map(donation => (
              <div key={donation.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white dark:bg-dark-card rounded-lg shadow-sm text-[var(--accent-tomato)]">
                    <Package size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{donation.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span>Qty: {donation.qty}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{donation.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {donation.status === 'claimed' ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                      <Clock size={16} /> Pickup Pending ({donation.claimedBy})
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      <CheckCircle size={16} /> Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}