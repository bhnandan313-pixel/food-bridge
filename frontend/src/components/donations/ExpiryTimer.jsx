import React, { useState, useEffect } from 'react';
import { Timer, AlertCircle } from 'lucide-react';

export default function ExpiryTimer({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(expiryDate) - new Date();
      
      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft('Expired');
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setIsUrgent(hours < 2); // Less than 2 hours is considered urgent

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    };

    // Calculate immediately, then set interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  if (isExpired) {
    return (
      <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm font-medium">
        <AlertCircle size={16} />
        <span>Listing Expired</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 text-sm font-bold ${
      isUrgent ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'
    }`}>
      <Timer size={16} className={isUrgent ? 'animate-pulse' : ''} />
      {/* tabular-nums prevents horizontal jumping as numbers tick */}
      <span className="tabular-nums tracking-tight">{timeLeft}</span>
      <span className="font-medium text-xs uppercase tracking-wider ml-0.5">left</span>
    </div>
  );
}