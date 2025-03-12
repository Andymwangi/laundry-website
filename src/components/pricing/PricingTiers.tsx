'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PricingHero = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [kilos, setKilos] = useState(1);
  const [serviceType, setServiceType] = useState('basic');
  const [total, setTotal] = useState<number | null>(null);

  const calculateCost = () => {
    let cost = 0;
    
    if (serviceType === 'basic') {
      cost = kilos * 50; // KES 50 per kilo for basic wash
    } else if (serviceType === 'premium') {
      cost = kilos * 80; // KES 80 per kilo for premium wash
    } else if (serviceType === 'subscription') {
      cost = 6000; // KES 6000 for monthly subscription
    }
    
    setTotal(cost);
  };

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
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/pricing">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View Plans
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => setShowCalculator(!showCalculator)}
              >
                Calculate Cost <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {showCalculator && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
            >
              <h3 className="text-xl font-semibold mb-4">Cost Calculator</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Service Type</label>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <Button 
                    variant={serviceType === 'basic' ? 'default' : 'outline'} 
                    className={serviceType === 'basic' ? 'bg-blue-600' : ''}
                    onClick={() => setServiceType('basic')}
                  >
                    Basic Wash
                  </Button>
                  <Button 
                    variant={serviceType === 'premium' ? 'default' : 'outline'} 
                    className={serviceType === 'premium' ? 'bg-blue-600' : ''}
                    onClick={() => setServiceType('premium')}
                  >
                    Premium Wash
                  </Button>
                  <Button 
                    variant={serviceType === 'subscription' ? 'default' : 'outline'} 
                    className={serviceType === 'subscription' ? 'bg-blue-600' : ''}
                    onClick={() => setServiceType('subscription')}
                  >
                    Monthly
                  </Button>
                </div>
              </div>
              
              {serviceType !== 'subscription' && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Weight (Kilos)
                  </label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setKilos(Math.max(1, kilos - 1))}
                    >
                      -
                    </Button>
                    <span className="mx-4 text-lg font-medium">{kilos}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setKilos(kilos + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              )}
              
              <Button 
                className="w-full bg-blue-600 mt-2" 
                onClick={calculateCost}
              >
                Calculate
              </Button>
              
              {total !== null && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <p className="text-sm text-gray-600">Estimated Cost:</p>
                  <p className="text-2xl font-bold text-blue-800">KES {total.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {serviceType === 'basic' ? 'Basic Wash - KES 50 per kilo' : 
                     serviceType === 'premium' ? 'Premium Wash - KES 80 per kilo' : 
                     'Monthly Subscription - KES 6,000 fixed'}
                  </p>
                </div>
              )}
            </motion.div>
          )}
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