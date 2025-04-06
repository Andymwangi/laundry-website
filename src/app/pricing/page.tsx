import React from 'react';
import { Metadata } from 'next';
import PricingTiers from '@/components/pricing/PricingTiers';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import ServiceComparison from '@/components/pricing/ServiceComparison';
import PromoSection from '@/components/shared/PromoSection';

// Import shared configuration
export { dynamic, runtime, generateStaticParams } from '../page-config';

export const metadata: Metadata = {
  title: 'Pricing | Laundry Basket',
  description: 'Affordable and transparent pricing for all your laundry and dry cleaning needs at Laundry Basket.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <PricingTiers />
      <ServiceComparison />
      <PricingFAQ />
      <PromoSection 
        title="Ready to experience premium laundry service?" 
        description="Join thousands of satisfied customers who have transformed their laundry routine."
        ctaText="Get Started"
        ctaLink="/auth/signup"
      />
    </main>
  );
}