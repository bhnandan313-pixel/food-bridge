import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import DonationCard from '../donations/DonationCard';
import donationService from '../../services/donationService';

export default function FeaturedDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await donationService.getDonations();
        setDonations(data.slice(0, 3));
      } catch (e) {
        console.warn('Could not load featured donations:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleClaim = (id) => {
    setDonations((prev) => prev.filter((d) => String(d.id) !== String(id)));
    donationService.claimDonation(id).catch(console.warn);
  };

  if (!loading && donations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent-tomato)] mb-2">
            <Sparkles size={14} />
            Urgent Needs Near You
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            Available Surplus Food
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time surplus listings connected to our live backend.
          </p>
        </div>

        <Link
          to="/find"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-tomato)] hover:text-[var(--accent-tomato-hover)] transition-colors group"
        >
          View all live donations
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-dark-card rounded-2xl p-5 h-64 animate-pulse border border-gray-100 dark:border-gray-800">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-8"></div>
              <div className="h-11 bg-gray-200 dark:bg-gray-800 rounded-xl w-full mt-auto"></div>
            </div>
          ))
        ) : (
          donations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} onClaim={handleClaim} />
          ))
        )}
      </div>
    </section>
  );
}