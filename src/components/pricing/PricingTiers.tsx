'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Basic Wash',
    price: 'Kes 50',
    unit: 'per Kilogram',
    description: 'Perfect for everyday laundry needs with quick turnaround',
    features: [
      'Wash & Fold Service',
      'Standard 48-hour turnaround',
      'Free fabric softener',
      'Folded and organized',
      'Eco-friendly detergent options',
    ],
    popular: false,
    color: 'bg-blue-50 border-blue-200',
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Premium Service',
    price: 'KES 80',
    unit: 'per Kilogram',
    description: 'Enhanced service with premium care for your garments',
    features: [
      'Wash & Fold Service',
      'Express 24-hour turnaround',
      'Premium fabric softener',
      'Stain treatment included',
      'Delicate item handling',
      'Garment-specific care',
      'Free delivery over  Kes 500',
    ],
    popular: true,
    color: 'bg-blue-600 text-white',
    buttonVariant: 'default' as const,
  },
  {
    name: 'Subscription',
    price: 'KES 8000',
    unit: 'per month',
    description: 'Our best value for regular laundry service',
    features: [
      'Up to 30 Kilos per month',
      'Unlimited drop-offs',
      'Priority 24-hour service',
      'Free pickup and delivery',
      'Personal laundry concierge',
      'Special garment care',
      'Monthly rollover of unused pounds',
    ],
    popular: false,
    color: 'bg-yellow-50 border-yellow-200',
    buttonVariant: 'outline' as const,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PricingTiers = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Service Level</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the service that best fits your laundry needs and budget. All plans include our satisfaction guarantee.
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={plan.name} variants={item}>
              <Card className={`h-full relative ${plan.popular ? plan.color : 'border-2 ' + plan.color}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </CardTitle>
                  <CardDescription className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                      {' '}{plan.unit}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className={`flex-shrink-0 h-6 w-6 rounded-full ${plan.popular ? 'bg-blue-500' : 'bg-blue-100'} flex items-center justify-center mr-2`}>
                          <Check className={`h-4 w-4 ${plan.popular ? 'text-white' : 'text-blue-600'}`} />
                        </div>
                        <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    size="lg" 
                    variant={plan.buttonVariant} 
                    className={`w-full ${plan.buttonVariant === 'outline' ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : ''}`}
                  >
                    Choose Plan
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTiers;