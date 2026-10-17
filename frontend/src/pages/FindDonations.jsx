import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { RefreshCw, Map, List } from 'lucide-react';

import SearchBar from '../components/donations/SearchBar';
import DonationFilters from '../components/donations/DonationFilters';
import DonationCard from '../components/donations/DonationCard';
import donationService from '../services/donationService';

// Fix for default Leaflet marker icons in React
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function FindDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'

  // Default center: Bengaluru
  // To use Google Maps tiles instead of OpenStreetMap, replace the TileLayer url below (line ~112) with:
  // url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=YOUR_GOOGLE_MAPS_API_KEY"
  // and paste your API key where it says YOUR_GOOGLE_MAPS_API_KEY
  const mapCenter = [12.9716, 77.5946];

  const loadFeed = async () => {
    setLoading(true);
    try {
      const data = await donationService.getDonations();
      // Inject random coords near Bengaluru if backend doesn't provide them
      const dataWithCoords = data.map((d) => ({
        ...d,
        lat: d.lat || mapCenter[0] + (Math.random() - 0.5) * 0.1,
        lng: d.lng || mapCenter[1] + (Math.random() - 0.5) * 0.1,
      }));
      setDonations(dataWithCoords);
    } catch (err) {
      console.error('Failed to load donations feed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const handleClaim = async (id) => {
    setDonations((prev) => prev.filter((d) => String(d.id) !== String(id)));
    try {
      await donationService.claimDonation(id);
    } catch (err) {
      console.warn('Backend claim error or unauthenticated:', err.message);
    }
  };

  const filteredDonations = donations.filter((d) => {
    const title = (d.title || d.food_item || '').toLowerCase();
    const donor = (d.donor || '').toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = title.includes(q) || donor.includes(q);
    if (!matchesSearch) return false;

    if (activeFilter === 'veg' && !d.isVeg) return false;
    if (activeFilter === 'meals' && d.type !== 'Prepared Meals' && d.type !== 'Cooked Meals') return false;
    if (activeFilter === 'urgent') {
      const expiryDate = d.expiry || d.expires_at;
      if (expiryDate) {
        const hoursLeft = (new Date(expiryDate) - new Date()) / 3600000;
        if (hoursLeft > 2) return false;
      }
    }
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Live Food Feed</h1>
          <p className="text-gray-600 dark:text-gray-400">Claim surplus food instantly in your area.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Toggle between Grid and Map view */}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors touch-target"
          >
            {viewMode === 'grid' ? <Map size={18} /> : <List size={18} />}
            <span className="text-sm font-medium">{viewMode === 'grid' ? 'Map View' : 'List View'}</span>
          </button>
          <button
            onClick={loadFeed}
            className="p-2.5 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors touch-target"
            aria-label="Refresh feed"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin text-[var(--accent-tomato)]' : ''} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <DonationFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-dark-card rounded-2xl p-5 h-64 animate-pulse border border-gray-100 dark:border-gray-800">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-8"></div>
              <div className="h-11 bg-gray-200 dark:bg-gray-800 rounded-xl w-full mt-auto"></div>
            </div>
          ))}
        </div>
      ) : filteredDonations.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-dark-card rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 mt-8">
          <p className="text-lg text-gray-900 dark:text-white font-medium mb-1">No donations found.</p>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} onClaim={handleClaim} />
          ))}
        </div>
      ) : (
        // ─── MAP VIEW ────────────────────────────────────────────────────────────
        // Currently using OpenStreetMap tiles (FREE, no API key needed).
        // To switch to Google Maps, replace the TileLayer `url` on the line below with:
        //   url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=YOUR_GOOGLE_MAPS_API_KEY"
        // Paste your Google Maps API Key where it says YOUR_GOOGLE_MAPS_API_KEY
        // ─────────────────────────────────────────────────────────────────────────
        <div className="mt-8 h-[600px] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm relative z-0">
          <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer
  attribution="Google Maps"
  url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=AIzaSyBWlLIhd6J_Pqj3Fpran-p7JmQjV1-QDvw"
/>

            {filteredDonations.map((donation) => (
              <Marker key={donation.id} position={[donation.lat, donation.lng]}>
                <Popup>
                  <div className="font-sans min-w-[180px]">
                    <h3 className="font-bold text-sm mb-1">{donation.title || donation.food_item}</h3>
                    <p className="text-xs text-gray-600 mb-1">{donation.donor}</p>
                    <p className="text-xs text-gray-500 mb-3">{donation.address || 'Bengaluru'}</p>
                    <button
                      onClick={() => handleClaim(donation.id)}
                      className="w-full px-3 py-1.5 bg-[#ff473a] hover:bg-[#e03a2e] text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Claim Now
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}