// src/lib/types.ts
export interface ServiceType {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    longDescription: string;
    benefits: string[];
    process: {
      step: number;
      title: string;
      description: string;
    }[];
    pricing: {
      type: string;
      price: number;
    }[];
  }
  
  export interface TestimonialType {
    id: string;
    name: string;
    role: string;
    comment: string;
    rating: number;
    imageSrc: string;
  }
  
  export interface FAQItem {
    question: string;
    answer: string;
  }
  
  export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageSrc: string;
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    service?: string;
  }