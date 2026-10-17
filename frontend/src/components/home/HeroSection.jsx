import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-b-3xl sm:rounded-b-[3rem] mx-2 sm:mx-4 mb-12">
      {/* Cinematic Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&q=80&w=2000"
          alt="Volunteers organizing food donations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50 dark:bg-black/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tomato opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-tomato"></span>
          </span>
          Live in Bengaluru
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white mb-6 leading-tight">
          Bridge the gap between <br className="hidden md:block" />
          <span className="text-tomato drop-shadow-sm">surplus food</span> and hunger.
        </motion.h1>
        
        <motion.p variants={itemVariants} className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 mb-10 font-medium">
          AnnaSetu connects hotels and restaurants with local NGOs in real-time. One click to donate, one click to claim.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <Link 
            to="/donate" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-tomato hover:bg-tomato-hover rounded-xl transition-all shadow-lg hover:shadow-tomato/25 hover:-translate-y-0.5 min-h-[44px]"
          >
            <Heart size={20} />
            Donate Food Now
          </Link>
          <Link 
            to="/find" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl transition-all min-h-[44px] hover:-translate-y-0.5"
          >
            <MapPin size={20} />
            Find Nearby Food
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}