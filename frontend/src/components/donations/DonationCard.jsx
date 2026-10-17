import React, { useState } from 'react';
import { MapPin, Utensils, Check, HeartHandshake } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ExpiryTimer from './ExpiryTimer';

export default function DonationCard({ donation, onClaim }) {
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleClaimClick = async () => {
    setClaiming(true);
    // Visual feedback delay
    await new Promise((res) => setTimeout(res, 400));
    setClaimed(true);
    if (onClaim) {
      setTimeout(() => {
        onClaim(donation.id);
      }, 500);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between hover:shadow-md transition-all duration-200">
      <div>
        {/* Top Header: Veg/Non-Veg & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center p-0.5 ${
                donation.isVeg ? 'border-green-600' : 'border-red-600'
              }`}
              title={donation.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  donation.isVeg ? 'bg-green-600' : 'bg-red-600'
                }`}
              ></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {donation.type || 'Prepared Food'}
            </span>
          </div>

          <StatusBadge status={donation.status} expiry={donation.expiry} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white line-clamp-2 mb-2">
          {donation.title}
        </h3>

        {/* Details: Quantity & Donor */}
        <div className="space-y-1.5 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Utensils size={15} className="text-gray-400" />
            <span>Quantity: <strong className="text-gray-900 dark:text-gray-200">{donation.quantity} servings</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-[var(--accent-tomato)] shrink-0" />
            <span className="truncate">
              {donation.donor} • <span className="text-xs font-medium text-gray-500">{donation.distance || '1.0 km away'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Expiry countdown and Claim button */}
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 mt-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400">Expires in:</span>
          <ExpiryTimer expiryDate={donation.expiry} />
        </div>

        <button
          onClick={handleClaimClick}
          disabled={claiming || claimed || donation.status !== 'available'}
          className={`w-full min-h-[44px] rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 touch-target ${
            claimed
              ? 'bg-green-600 text-white'
              : 'bg-[var(--accent-tomato)] hover:bg-[var(--accent-tomato-hover)] text-white shadow-sm hover:shadow active:scale-[0.98]'
          } disabled:opacity-75 disabled:cursor-not-allowed`}
        >
          {claimed ? (
            <>
              <Check size={18} />
              Claimed Successfully!
            </>
          ) : claiming ? (
            'Claiming...'
          ) : (
            <>
              <HeartHandshake size={18} />
              Claim Donation
            </>
          )}
        </button>
      </div>
    </div>
  );
}