import React from 'react';
import { Package, HeartHandshake, CheckCircle, Clock } from 'lucide-react';

export default function ActivityTimeline({ activities = [], loading = false }) {
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0"></div>
            <div className="flex-1 space-y-2 py-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
        <Clock className="mx-auto text-gray-400 mb-3" size={32} />
        <p className="text-gray-600 dark:text-gray-400 font-medium">No recent activity</p>
      </div>
    );
  }

  const getIconConfig = (type) => {
    switch (type) {
      case 'donation_created':
        return { icon: <Package size={18} />, bg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' };
      case 'claim_made':
        return { icon: <HeartHandshake size={18} />, bg: 'bg-orange-100 dark:bg-orange-900/30 text-[var(--accent-tomato)]' };
      case 'pickup_completed':
        return { icon: <CheckCircle size={18} />, bg: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' };
      default:
        return { icon: <Clock size={18} />, bg: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' };
    }
  };

  return (
    <div className="relative pl-4 sm:pl-0">
      {/* Vertical Line */}
      <div className="absolute left-[31px] sm:left-[39px] top-6 bottom-6 w-0.5 bg-gray-100 dark:bg-gray-800 hidden sm:block"></div>
      
      <div className="space-y-8 relative">
        {activities.map((activity, index) => {
          const { icon, bg } = getIconConfig(activity.type);
          
          return (
            <div key={activity.id || index} className="flex gap-4 sm:gap-6 group">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white dark:border-dark-card ${bg}`}>
                {icon}
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">
                    {activity.title}
                  </h4>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full w-fit">
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}