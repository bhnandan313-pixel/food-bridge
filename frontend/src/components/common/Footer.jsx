import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-card border-t border-gray-100 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Branding */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-4 inline-block touch-target">
              Anna<span className="text-[var(--accent-tomato)]">Setu</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Bridging the gap between surplus food and hunger. One click to donate, one click to claim.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-[var(--accent-tomato)] transition-colors touch-target flex items-center justify-center">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-[var(--accent-tomato)] transition-colors touch-target flex items-center justify-center">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-[var(--accent-tomato)] transition-colors touch-target flex items-center justify-center">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/find" className="text-gray-500 hover:text-[var(--accent-tomato)] dark:text-gray-400 dark:hover:text-[var(--accent-tomato)] text-sm transition-colors touch-target inline-flex items-center">
                  Live Food Feed
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-500 hover:text-[var(--accent-tomato)] dark:text-gray-400 dark:hover:text-[var(--accent-tomato)] text-sm transition-colors touch-target inline-flex items-center">
                  Donate Food
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-500 hover:text-[var(--accent-tomato)] dark:text-gray-400 dark:hover:text-[var(--accent-tomato)] text-sm transition-colors touch-target inline-flex items-center">
                  Register NGO
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-500 hover:text-[var(--accent-tomato)] dark:text-gray-400 dark:hover:text-[var(--accent-tomato)] text-sm transition-colors touch-target inline-flex items-center">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-[var(--accent-tomato)] dark:text-gray-400 dark:hover:text-[var(--accent-tomato)] text-sm transition-colors touch-target inline-flex items-center">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-[var(--accent-tomato)] dark:text-gray-400 dark:hover:text-[var(--accent-tomato)] text-sm transition-colors touch-target inline-flex items-center">
                  Food Safety Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Mail size={16} className="mt-0.5 shrink-0 text-gray-400" />
                <span>hello@annasetu.org</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
                <span>Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} AnnaSetu. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Made with <Heart size={14} className="text-[var(--accent-tomato)] fill-current" /> for hackathon
          </p>
        </div>
      </div>
    </footer>
  );
}