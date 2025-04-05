'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PromoSectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const PromoSection: React.FC<PromoSectionProps> = ({
  title,
  description,
  ctaText,
  ctaLink,
}) => {
  return (
    <section className="py-16 bg-blue-600 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 bg-white rounded-full w-64 h-64 -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 bg-white rounded-full w-96 h-96 -mb-40 -ml-40"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-blue-100 mb-8">{description}</p>
          <Button 
            asChild
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;