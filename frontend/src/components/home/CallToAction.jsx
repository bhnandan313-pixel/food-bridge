import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Building2 } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-20 max-w-7xl mx-auto">
      <div className="bg-tomato rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden shadow-sm">
        {/* Subtle decorative background icon */}
        <div className="absolute -top-12 -right-12 text-white/10 transform rotate-12 pointer-events-none hidden md:block">
          <Heart size={250} fill="currentColor" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-lg text-white/90 mb-10 leading-relaxed">
            Whether you have surplus food to share or you are an organization feeding those in need, join AnnaSetu and help us eliminate food waste today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-tomato hover:bg-orange-50 text-base font-bold rounded-xl transition-colors shadow-sm touch-target focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              <Heart size={20} />
              Register as NGO
            </Link>
            <Link
              to="/register" // Routing to register where they can select the 'donor' role
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 text-base font-bold rounded-xl transition-colors touch-target focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              <Building2 size={20} />
              Partner as Hotel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
