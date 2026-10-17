import React from 'react';
import { Clock, CheckCircle, AlertTriangle, PackageCheck } from 'lucide-react';

export default function StatusBadge({ status, expiry }) {
  const isExpired = new Date(expiry) < new Date();
  
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50">
        <CheckCircle size={14} /> 
        Completed
      </span>
    );
  }
  
  if (status === 'claimed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
        <PackageCheck size={14} /> 
        Pending Pickup
      </span>
    );
  }

  if (isExpired) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
        <AlertTriangle size={14} /> 
        Expired
      </span>
    );
  }

  // Calculate remaining time for available items
  const msLeft = new Date(expiry) - new Date();
  const hoursLeft = Math.floor(msLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  const isUrgent = hoursLeft < 2;

  let timeString = '';
  if (hoursLeft > 0) {
    timeString = `${hoursLeft}h ${minutesLeft}m left`;
  } else {
    timeString = `${minutesLeft}m left`;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
      isUrgent 
        ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50' 
        : 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800/50'
    }`}>
      <Clock size={14} /> 
      {timeString}
    </span>
  );
}