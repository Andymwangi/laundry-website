'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PricingHero = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8 mx-auto max-w-2xl">
              At Laundry Basket, we believe in honest pricing with no hidden fees. Choose the plan that works best for your laundry needs.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Plans
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Calculate Cost <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 bg-blue-200 opacity-20 rounded-full w-96 h-96 -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 bg-yellow-200 opacity-20 rounded-full w-64 h-64 -mb-10 -ml-10"></div>
      </div>
    </section>
  );
};

export default PricingHero;