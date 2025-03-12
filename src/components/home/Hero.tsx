'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full min-h-[600px] flex items-center bg-blue-50">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center space-y-6 z-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            Professional 
            <span className="block text-blue-600 mt-2">Laundry Service</span>
            <span className="block text-blue-500 mt-2">for your clothes</span>
          </h1>
          
          <p className="text-lg text-slate-700 max-w-xl">
            Experience pristine care for all your garments with our premium laundry solutions. 
            We handle everything from everyday wear to delicate fabrics with expert precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              View Services
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mt-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs text-white">
                  C{i}
                </div>
              ))}
            </div>
            <div>
              <p className="text-blue-600 font-bold text-xl">4.9</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-600">3k+ Reviews</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full h-[500px]">
            <Image 
              src="/images/hero.jpg" 
              alt="Laundry Basket Professional Service" 
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
          
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Fast Turnaround</p>
                <p className="text-lg font-bold text-slate-900">24-48 Hours</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 text-blue-500 opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.071 4.929a10 10 0 1 0 0 14.142 10 10 0 0 0 0-14.142zm-1.414 12.728a8 8 0 1 1 0-11.314 8 8 0 0 1 0 11.314z"/>
          <path d="M12 8a1 1 0 0 0-1 1v3a1 1 0 0 0 .293.707l2 2a1 1 0 0 0 1.414-1.414L13 11.586V9a1 1 0 0 0-1-1z"/>
        </svg>
      </div>
      <div className="absolute bottom-10 right-20 w-24 h-24 text-yellow-400 opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.25 4.5l3.5 7 7.5 1-5.5 5.25L18 24l-6.75-3.5L4.5 24l1.25-7.25L.5 12.5l7.5-1z"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero;