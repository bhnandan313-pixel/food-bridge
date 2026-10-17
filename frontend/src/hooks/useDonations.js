import { useState, useEffect, useCallback } from 'react';
import donationService from '../services/donationService';

export const useDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await donationService.getDonations();
      setDonations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const claimDonation = useCallback(async (id) => {
    setLoading(true);
    try {
      await donationService.claimDonation(id);
      setDonations((prev) =>
        prev.map((d) => (String(d.id) === String(id) ? { ...d, status: 'claimed' } : d))
      );
      return { success: true };
    } catch (err) {
      setError('Failed to claim donation');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const createDonation = useCallback(async (newDonation) => {
    setLoading(true);
    try {
      const created = await donationService.createDonation(newDonation);
      setDonations((prev) => [created, ...prev]);
      return { success: true, donation: created };
    } catch (err) {
      console.warn('Backend create fallback to local state:', err.message);
      const fallback = {
        id: Date.now(),
        status: 'available',
        ...newDonation
      };
      setDonations((prev) => [fallback, ...prev]);
      return { success: true, donation: fallback };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    donations,
    loading,
    error,
    fetchDonations,
    claimDonation,
    createDonation
  };
};