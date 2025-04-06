'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Droplet, Shirt, Sparkles, Briefcase } from 'lucide-react';
import Link from 'next/link';

// Service card component
const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  delay: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-blue-500">
        <CardContent className="pt-6 flex flex-col h-full">
          <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-slate-600 flex-grow">{description}</p>
          <Link 
            href="/services" 
            className="text-blue-600 hover:text-blue-700 font-medium mt-4 inline-flex items-center group"
          >
            Read More
            <svg 
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: Droplet, // Changed from Tint to Droplet which is available in lucide-react
      title: "Wash & Fold",
      description: "Our comprehensive wash and fold service handles everyday garments with care, leaving them fresh, clean, and neatly folded for easy storage."
    },
    {
      icon: Shirt,
      title: "Dry Cleaning",
      description: "Professional dry cleaning service for your delicate garments, formal wear, and special fabrics that require expert handling and treatment."
    },
    {
      icon: Sparkles,
      title: "Stain Removal",
      description: "Our stain removal experts tackle even the most stubborn stains with specialized techniques and eco-friendly products for optimal results."
    },
    {
      icon: Briefcase,
      title: "Business Services",
      description: "Tailored laundry solutions for businesses including hotels, restaurants, and offices with flexible scheduling and volume discounts."
    }
  ];

  return (
    <section className="py-16 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-blue-600 font-medium mb-3"
          >
            Our Services
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            We offer different services<br />to take care of your clothes
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-slate-600"
          >
            From everyday essentials to specialty garments, our comprehensive laundry solutions ensure your clothes receive the best care with attention to detail and quality results.
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-blue-50 rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Premium Laundry Experience</h3>
              <p className="text-slate-700 mb-6">
                At Laundry Basket, we use premium detergents and fabric softeners that are gentle on clothes yet effective at removing dirt and stains. Our advanced equipment and expert techniques preserve the quality and extend the life of your garments.
              </p>
              <ul className="space-y-3">
                {[
                  'Eco-friendly cleaning solutions',
                  'Advanced stain removal technology',
                  'Garment-specific treatment methods',
                  'Quality inspection before delivery',
                  'Convenient pickup and delivery options'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-64 lg:h-auto">
              <Image 
                src="/images/services/washing.jpg" 
                alt="Premium Laundry Services" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;