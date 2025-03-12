'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const comparisonData = {
  categories: ['Basic Wash', 'Premium Service', 'Subscription'],
  services: [
    { 
      name: 'Regular Laundry', 
      availability: [true, true, true],
      pricing: ['KES 50/Kg', 'KES 80/kg', 'Included (up to 30 Kilos)']
    },
    { 
      name: 'Dry Cleaning', 
      availability: [true, true, true],
      pricing: ['From  KES 400', 'From KES 400', '10% Discount']
    },
    { 
      name: 'Stain Treatment', 
      availability: [false, true, true],
      pricing: ['KES 100/item', 'Included', 'Included']
    },
    { 
      name: 'Express Service (24h)', 
      availability: [false, true, true],
      pricing: ['KES 600 extra', 'Included', 'Included']
    },
    { 
      name: 'Pickup & Delivery', 
      availability: [true, true, true],
      pricing: ['KES 100 each way', 'Free over kES 1500', 'Included']
    },
    { 
      name: 'Garment Repairs', 
      availability: [false, true, true],
      pricing: ['Not available', 'From 600', 'Basic repairs included']
    },
    { 
      name: 'Special Garment Care', 
      availability: [false, true, true],
      pricing: ['Not available', 'KES 100/item', 'Included']
    },
  ]
};

const ServiceComparison = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Comparison</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare our service tiers to find the perfect match for your laundry needs.
          </p>
        </motion.div>

        <motion.div 
          className="overflow-x-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Table className="w-full bg-white rounded-lg shadow-md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Service</TableHead>
                {comparisonData.categories.map((category, index) => (
                  <TableHead key={category} className="text-center">
                    <div className="font-bold text-lg text-gray-900">{category}</div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.services.map((service, serviceIndex) => (
                <TableRow key={service.name} className={serviceIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  {service.availability.map((available, index) => (
                    <TableCell key={index} className="text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          {available ? (
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                              <X className="h-4 w-4 text-red-600" />
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{service.pricing[index]}</div>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        <div className="mt-8 text-center text-gray-600">
          <p>* Additional services may be available upon request. Please contact us for custom requirements.</p>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;