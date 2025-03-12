'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

const PricingPage = () => {
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

  // Pricing plans data
  const pricingPlans = [
    {
      name: "Basic Wash",
      price: "KES 50",
      unit: "per kilo",
      description: "Perfect for everyday laundry needs",
      features: [
        "Regular detergent",
        "Standard washing cycle",
        "Air drying option available",
        "48-hour turnaround",
        "Free pickup for 5kg or more"
      ],
      highlight: false,
      ctaText: "Choose Basic",
      href: "/checkout?plan=basic"
    },
    {
      name: "Premium Wash",
      price: "KES 80",
      unit: "per kilo",
      description: "Enhanced care for your favorite clothes",
      features: [
        "Premium eco-friendly detergent",
        "Delicate washing cycle",
        "Fabric softener included",
        "24-hour turnaround",
        "Free pickup and delivery",
        "Stain treatment included"
      ],
      highlight: true,
      ctaText: "Choose Premium",
      href: "/checkout?plan=premium"
    },
    {
      name: "Monthly Subscription",
      price: "KES 6,000",
      unit: "per month",
      description: "Unlimited laundry service for heavy users",
      features: [
        "Up to 100kg of laundry monthly",
        "Premium or basic washing options",
        "Scheduled weekly pickups",
        "Priority processing",
        "Dedicated account manager",
        "WhatsApp notifications"
      ],
      highlight: false,
      ctaText: "Subscribe Monthly",
      href: "/checkout?plan=subscription"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
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
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    const plansSection = document.getElementById('pricing-plans');
                    plansSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Plans
                </Button>
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
                    
                    <Link 
                      href={`/checkout?plan=${serviceType}${serviceType !== 'subscription' ? `&kilos=${kilos}` : ''}`}
                      className="block mt-4"
                    >
                      <Button className="w-full bg-blue-600">
                        Proceed to Checkout
                      </Button>
                    </Link>
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

      {/* Pricing Plans Section */}
      <section id="pricing-plans" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Select the plan that fits your laundry needs. All plans include free pickup for orders above the minimum threshold.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-lg overflow-hidden shadow-lg bg-white ${
                  plan.highlight ? 'ring-2 ring-blue-500 relative' : ''
                }`}
              >
                {plan.highlight && (
                  <div className="bg-blue-500 text-white text-xs font-semibold py-1 text-center">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="ml-2 text-gray-500">{plan.unit}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{plan.description}</p>

                  <div className="mt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <Link href={plan.href}>
                    <Button
                      className={`w-full ${
                        plan.highlight ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'
                      }`}
                      size="lg"
                    >
                      {plan.ctaText}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Optional */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our pricing? Find answers to common inquiries below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ items would go here */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900">How is the weight of my laundry determined?</h3>
              <p className="mt-2 text-gray-600">
                We weigh all laundry when it arrives at our facility using calibrated industrial scales.
                You'll only be charged for the actual weight of your dry items.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900">Is there a minimum order requirement?</h3>
              <p className="mt-2 text-gray-600">
                For basic and premium wash services, there's a 2kg minimum order. Free pickup is available for orders of 5kg or more.
                Subscription users have no minimum per pickup, with scheduled weekly service.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900">How does the monthly subscription work?</h3>
              <p className="mt-2 text-gray-600">
                Our monthly subscription covers up to 100kg of laundry per month, with weekly scheduled pickups.
                You can choose between basic or premium washing for each batch at no extra cost.
                Any usage beyond 100kg will be charged at the premium rate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;