import api from './api';

export const donationService = {
  getDonations: async () => {
    try {
      return await api.get('/donations/');
    } catch (err) {
      console.warn('Backend unavailable, falling back to local storage:', err.message);
      const local = localStorage.getItem('annasetu_donations');
      return local ? JSON.parse(local) : [];
    }
  },
  createDonation: async (donation) => {
    try {
      return await api.post('/donations/', donation);
    } catch (err) {
      console.error('Failed to create donation on backend:', err.message);
      throw err;
    }
  },
  claimDonation: async (id) => {
    try {
      return await api.post(`/donations/${id}/claim`, {});
    } catch (err) {
      console.error('Failed to claim donation on backend:', err.message);
      throw err;
    }
  },
  getActivity: async () => {
    try {
      return await api.get('/activity/');
    } catch (err) {
      console.warn('Could not fetch activity:', err.message);
      return [];
    }
  }
};

export default donationService;
