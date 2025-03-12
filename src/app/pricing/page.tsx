import React from 'react';
import { Metadata } from 'next';
import PricingHero from '@/components/pricing/PricingHero';
import PricingTiers from '@/components/pricing/PricingTiers';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import ServiceComparison from '@/components/pricing/ServiceComparison';
import PromoSection from '@/components/shared/PromoSection';

export const metadata: Metadata = {
  title: 'Pricing | Laundry Basket',
  description: 'Affordable and transparent pricing for all your laundry and dry cleaning needs at Laundry Basket.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <PricingHero />
      <PricingTiers />
      <ServiceComparison />
      <PricingFAQ />
      <PromoSection 
        title="First-Time Customer Special"
        description="Get 15% off your first order with Laundry Basket. Experience premium laundry service at a discounted rate."
        ctaText="Book Now"
        ctaLink="/contact"
      />
    </main>
  );
}