'use client';
import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  comment: string;
  rating: number;
  imageSrc: string;
  index: number;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  name,
  role,
  comment,

  rating,
  imageSrc,
  index
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg p-6 relative"
    >
      <div className="absolute -top-6 left-6">
        <div className="relative h-12 w-12 rounded-full border-4 border-white overflow-hidden">
          <Image 
            src={imageSrc} 
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="flex mb-3">
          {renderStars()}
        </div>
        <p className="text-gray-700 mb-4 italic">"{comment}"</p>
        <div className="border-t pt-3">
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;