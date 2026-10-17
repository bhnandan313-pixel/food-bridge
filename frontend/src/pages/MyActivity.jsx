import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import { Calendar, Filter, Download } from 'lucide-react';

const mockActivities = [
  {
    id: 1,
    type: 'claim_made',
    title: 'Claimed 50 Boxed Lunches (Veg)',
    time: '2 hours ago',
    description: 'Claimed from Tech Corp Cafe. Assigned volunteer Ravi for pickup at 2:30 PM.'
  },
  {
    id: 2,
    type: 'pickup_completed',
    title: 'Completed Delivery of 100 Meals',
    time: 'Yesterday at 6:45 PM',
    description: 'Successfully distributed meals at Rainbow Children Shelter, Koramangala.'
  },
  {
    id: 3,
    type: 'donation_created',
    title: 'Listed Surplus Buffet Catering',
    time: '2 days ago',
    description: '30 portions of Rice & Curry listed with 4-hour expiry window.'
  }
];

export default function MyActivity() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            Activity History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your donations, claims, and rescue milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Download size={16} />
            Export Log
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar size={18} />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Recent Timeline</span>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-gray-700 dark:text-gray-300 outline-none"
            >
              <option value="all">All Events</option>
              <option value="claims">Claims Only</option>
              <option value="donations">Donations Only</option>
            </select>
          </div>
        </div>

        <ActivityTimeline activities={mockActivities} />
      </div>
    </div>
  );
}
