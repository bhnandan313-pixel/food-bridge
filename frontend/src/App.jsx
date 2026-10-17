import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts & Common
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages (Assume these are created based on your tree)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Donate from './pages/Donate';
import FindDonations from './pages/FindDonations';
import MyActivity from './pages/MyActivity';
import HotelDashboard from './pages/HotelDashboard';
import NGODashboard from './pages/NGODashboard';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  
  return children;
};

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-cream dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-sans transition-colors">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find" element={<FindDonations />} />
          
          {/* Protected Routes - General User */}
          <Route path="/activity" element={
            <ProtectedRoute><MyActivity /></ProtectedRoute>
          } />

          {/* Protected Routes - Donors (Hotels/Restaurants) */}
          <Route path="/donate" element={
            <ProtectedRoute allowedRoles={['donor']}><Donate /></ProtectedRoute>
          } />
          <Route path="/dashboard/hotel" element={
            <ProtectedRoute allowedRoles={['donor']}><HotelDashboard /></ProtectedRoute>
          } />

          {/* Protected Routes - NGOs */}
          <Route path="/dashboard/ngo" element={
            <ProtectedRoute allowedRoles={['ngo']}><NGODashboard /></ProtectedRoute>
          } />

          {/* Error Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}