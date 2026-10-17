import React from 'react';
import { PackagePlus, HandHeart, Truck } from 'lucide-react';

const steps = [
  {
    icon: <PackagePlus size={32} className="text-tomato" />,
    title: '1. List Surplus Food',
    description: 'Hotels and restaurants quickly list excess food with quantity and expiry time.'
  },
  {
    icon: <HandHeart size={32} className="text-tomato" />,
    title: '2. One-Click Claim',
    description: 'Verified NGOs get notified and instantly claim the food via the live feed.'
  },
  {
    icon: <Truck size={32} className="text-tomato" />,
    title: '3. Rescue & Distribute',
    description: 'NGOs pick up the food before expiry and deliver it to those in need.'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            How AnnaSetu Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A seamless, zero-friction process designed for busy kitchen staff and on-the-go NGO volunteers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-dark-card p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 text-center transition-transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}