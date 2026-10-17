import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ImpactStats from '../components/home/ImpactStats';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedDonations from '../components/home/FeaturedDonations';
import CallToAction from '../components/home/CallToAction';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ImpactStats />
      <FeaturedDonations />
      <HowItWorks />
      <CallToAction />
    </div>
  );
}