import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDonations } from '../../hooks/useDonations';
import { Utensils, Clock, MapPin, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

export default function DonationForm() {
  const { user } = useAuth();
  const { createDonation } = useDonations();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    type: 'Prepared Meals',
    quantity: '',
    isVeg: true,
    expiryHours: '3',
    address: user?.address || 'Indiranagar 100ft Road, Bengaluru',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const expiryDate = new Date(Date.now() + Number(formData.expiryHours) * 3600000).toISOString();

    const result = await createDonation({
      title: formData.title,
      type: formData.type,
      quantity: Number(formData.quantity) || 10,
      isVeg: formData.isVeg,
      expiry: expiryDate,
      donor: user?.name || 'Grand Hotel & Cafe',
      distance: '0.5 km away',
      address: formData.address,
      notes: formData.notes
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/hotel');
      }, 1200);
    }
  };

  if (success) {
    return (
      <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 text-center max-w-xl mx-auto border border-gray-100 dark:border-gray-800 shadow-sm animate-fade-in">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={36} />
        </div>
        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">
          Donation Listed Live!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Nearby verified NGOs have been alerted. You will receive real-time updates as soon as it is claimed.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800 max-w-2xl mx-auto space-y-6"
    >
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent-tomato)] mb-2">
          <Sparkles size={14} /> Quick Surplus Form
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
          Post Food Donation
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Takes under 60 seconds. Connected directly with verified NGOs.
        </p>
      </div>

      {/* Food Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Food Description / Items
        </label>
        <div className="relative">
          <Utensils className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., 40 Boxes of Fresh Vegetable Biryani"
            className="w-full min-h-[44px] pl-11 pr-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--accent-tomato)] outline-none text-gray-900 dark:text-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Food Category
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full min-h-[44px] px-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--accent-tomato)] outline-none text-gray-900 dark:text-white transition-all"
          >
            <option value="Prepared Meals">Prepared Meals</option>
            <option value="Raw Ingredients">Raw Ingredients / Veggies</option>
            <option value="Bakery">Bakery / Breads</option>
            <option value="Packaged Foods">Packaged Foods</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Servings / Quantity
          </label>
          <input
            type="number"
            min="1"
            required
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            placeholder="e.g., 35"
            className="w-full min-h-[44px] px-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--accent-tomato)] outline-none text-gray-900 dark:text-white transition-all"
          />
        </div>
      </div>

      {/* Dietary & Expiry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Dietary preference */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Dietary Type
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isVeg: true })}
              className={`flex-1 min-h-[44px] rounded-xl border-2 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                formData.isVeg
                  ? 'border-green-600 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
              Pure Veg
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isVeg: false })}
              className={`flex-1 min-h-[44px] rounded-xl border-2 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                !formData.isVeg
                  ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              Non-Veg
            </button>
          </div>
        </div>

        {/* Expiry Hours */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Best Consumed Within
          </label>
          <div className="relative">
            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={formData.expiryHours}
              onChange={(e) => setFormData({ ...formData, expiryHours: e.target.value })}
              className="w-full min-h-[44px] pl-11 pr-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--accent-tomato)] outline-none text-gray-900 dark:text-white transition-all"
            >
              <option value="2">2 Hours (Urgent)</option>
              <option value="3">3 Hours</option>
              <option value="5">5 Hours</option>
              <option value="12">12 Hours (Today)</option>
              <option value="24">24 Hours (Next Day)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pickup Location */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Pickup Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Full hotel / restaurant address"
            className="w-full min-h-[44px] pl-11 pr-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--accent-tomato)] outline-none text-gray-900 dark:text-white transition-all"
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Special Pickup Instructions (Optional)
        </label>
        <textarea
          rows="2"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="e.g. Ask for kitchen supervisor Anand at service gate 2. Please bring containers."
          className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--accent-tomato)] outline-none text-gray-900 dark:text-white transition-all"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-[44px] bg-[var(--accent-tomato)] hover:bg-[var(--accent-tomato-hover)] text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed touch-target"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Listing Food Donation...
          </>
        ) : (
          'Publish Donation Instantly'
        )}
      </button>
    </form>
  );
}
