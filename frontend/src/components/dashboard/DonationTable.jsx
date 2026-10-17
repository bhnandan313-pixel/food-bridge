import React from 'react';
import StatusBadge from '../donations/StatusBadge';
import { Eye, CheckCircle2, Clock } from 'lucide-react';

export default function DonationTable({ donations = [], onComplete, onView }) {
  if (donations.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <Clock className="mx-auto mb-2 opacity-50" size={32} />
        <p className="font-medium">No donation records found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-400 font-semibold">
            <th className="py-3 px-4">Item Details</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Quantity</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Partner / Time</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
          {donations.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-white">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.isVeg ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  <span>{item.title}</span>
                </div>
              </td>
              <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">
                {item.type || 'Prepared'}
              </td>
              <td className="py-3.5 px-4 font-medium text-gray-800 dark:text-gray-200">
                {item.quantity || item.qty} servings
              </td>
              <td className="py-3.5 px-4">
                <StatusBadge status={item.status} expiry={item.expiry || new Date(Date.now() + 3600000)} />
              </td>
              <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 text-xs">
                {item.claimedBy ? (
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {item.claimedBy}
                  </span>
                ) : (
                  <span>{item.time || 'Today'}</span>
                )}
              </td>
              <td className="py-3.5 px-4 text-right">
                <div className="inline-flex items-center gap-2">
                  {onComplete && item.status === 'claimed' && (
                    <button
                      onClick={() => onComplete(item.id)}
                      className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/40 rounded-lg transition-colors"
                      title="Mark Picked Up & Completed"
                    >
                      <CheckCircle2 size={18} />
                    </button>
                  )}
                  {onView && (
                    <button
                      onClick={() => onView(item)}
                      className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
