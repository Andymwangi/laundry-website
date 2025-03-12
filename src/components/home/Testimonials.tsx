'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Wambui",
    role: "Regular Customer",
    image: "/images/testimonials/client2.jpg",
    content: "Laundry Basket has completely transformed my weekly routine. Their wash and fold service is impeccable, and I'm always impressed by how fresh my clothes smell and how neatly they're folded. The convenience of their pickup and delivery service has saved me countless hours."
  },
  {
    id: 2,
    name: "Michael Ochieng",
    role: "Business Owner",
    image: "/images/testimonials/client1.jpg",
    content: "As a restaurant owner, I need reliable linen service. Laundry Basket has been our partner for over three years, and they've never let us down. Their attention to detail and consistent quality keeps our tablecloths and napkins looking pristine. Their business services are truly top-notch."
  },
 
  {
    id: 3,
    name: "Emma Mbaya",
    role: "Working Professional",
    image: "/images/testimonials/client3.jpg",
    content: "I've been using Laundry Basket's dry cleaning service for my work clothes, and the results are amazing. They treat each garment with care and always remove even the toughest stains. Their staff is friendly and professional, making the entire experience pleasant."
  },
  {
    id: 4,
    name: "Daniel Kariuki",
    role: "Family Customer",
    image: "/images/testimonials/client1.jpg",
    content: "Our family of five generates a lot of laundry, and Laundry Basket has been a lifesaver. Their weekly service handles everything from our kids' clothes to our bedding. The quality is consistent, and their flexible scheduling works perfectly with our busy lifestyle."
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <Card className="h-full border-none shadow-lg">
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden">
              <Image 
                src={testimonial.image} 
                alt={testimonial.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-lg">{testimonial.name}</h4>
              <p className="text-slate-500 text-sm">{testimonial.role}</p>
            </div>
          </div>
          <Quote className="h-10 w-10 text-blue-100" />
        </div>
        <p className="text-slate-700 leading-relaxed">{testimonial.content}</p>
        <div className="mt-6 flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayCount = 2; // Number of testimonials to display at once on larger screens
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % (testimonials.length - displayCount + 1)
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - displayCount : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-gray-50" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-blue-600 font-medium mb-3"
          >
            Testimonials
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            What Our Customers Say
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-slate-600"
          >
            Discover why thousands of customers trust Laundry Basket with their garments. Our commitment to quality and customer satisfaction speaks through their experiences.
          </motion.p>
        </div>
        
        <div className="relative">
          <div className="hidden md:flex gap-8 overflow-hidden">
            {testimonials.slice(currentIndex, currentIndex + displayCount).map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-1/2 flex-shrink-0"
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
          
          <div className="md:hidden">
            <motion.div 
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-blue-600" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-blue-600" />
            </button>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-blue-600 rounded-xl text-white text-center py-12 px-4"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready to Experience Premium Laundry Service?</h3>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            Join thousands of satisfied customers who have transformed their laundry routine with Laundry Basket's professional services.
          </p>
          <button className="bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;