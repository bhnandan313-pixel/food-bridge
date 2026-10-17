import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, Heart, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors touch-target ${
      isActive
        ? 'bg-orange-50 text-[var(--accent-tomato)] dark:bg-orange-900/20'
        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
    }`;

  const dashboardPath = user?.role === 'ngo' ? '/dashboard/ngo' : '/dashboard/hotel';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2 touch-target"
            onClick={() => setIsMenuOpen(false)}
          >
            Anna<span className="text-[var(--accent-tomato)]">Setu</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/find" className={navLinkClass}>
              Find Food
            </NavLink>
            <NavLink to="/donate" className={navLinkClass}>
              Donate
            </NavLink>
            {user && (
              <NavLink to="/activity" className={navLinkClass}>
                Activity
              </NavLink>
            )}
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to={dashboardPath}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-xl transition-colors touch-target"
                >
                  <User size={18} />
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors touch-target"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors touch-target flex items-center justify-center"
                >
                  Log In
                </Link>
                <Link 
                  to="/register"
                  className="px-4 py-2 bg-[var(--accent-tomato)] hover:bg-[var(--accent-tomato-hover)] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm touch-target flex items-center justify-center gap-2"
                >
                  <Heart size={16} />
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors touch-target"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-card border-b border-gray-100 dark:border-gray-800 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <NavLink 
            to="/find" 
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
          >
            Find Food
          </NavLink>
          <NavLink 
            to="/donate" 
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
          >
            Donate
          </NavLink>
          
          {user ? (
            <>
              <NavLink 
                to="/activity" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
              >
                My Activity
              </NavLink>
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
              <Link 
                to={dashboardPath}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
              >
                <User size={20} />
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-left"
              >
                <LogOut size={20} />
                Log Out
              </button>
            </>
          ) : (
            <>
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
              <Link 
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
              >
                Log In
              </Link>
              <Link 
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-3 bg-[var(--accent-tomato)] hover:bg-[var(--accent-tomato-hover)] text-white text-base font-semibold rounded-xl shadow-sm touch-target"
              >
                <Heart size={20} />
                Join Now
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}