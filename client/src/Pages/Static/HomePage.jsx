
import CTA from '@/components/static/CTA';
import Footer from '@/components/static/Footer';
import Hero from '@/components/static/Hero';
import Navigation from '@/components/static/Navigation';
import PremiumCTA from '@/components/static/PremiumCTA';
import Services from '@/components/static/Services';
import Testimonials from '@/components/static/Testimonials';
import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Services />
      <PremiumCTA />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
