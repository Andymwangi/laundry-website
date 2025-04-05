import { StaticImageData } from "next/image";

// Navigation
export const navLinks = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

// Company Information
export const companyInfo = {
  name: "Laundry Basket",
  tagline: "Professional Laundry Services",
  description: "We provide premium laundry services with fast turnaround times and quality results.",
  foundedYear: 2015,
  address: "123 Clean Street, Washville, WA 12345",
  phone: "+1 (555) 123-4567",
  email: "info@laundrybasket.com",
  hours: "Monday - Friday: 7:00 AM - 8:00 PM, Saturday: 8:00 AM - 6:00 PM, Sunday: Closed",
  socialMedia: {
    facebook: "https://facebook.com/laundrybasket",
    instagram: "https://instagram.com/laundrybasket",
    twitter: "https://twitter.com/laundrybasket",
  },
};

// Services Data
export const services = [
  {
    id: "washing",
    title: "Washing",
    description: "Professional washing services using eco-friendly detergents and modern washing machines.",
    icon: "Droplet",
    image: "/images/services/washing.jpg",
    details: [
      "Regular wash for everyday clothes",
      "Delicate wash for sensitive fabrics",
      "Heavy-duty wash for heavily soiled items",
      "Stain treatment for stubborn spots",
    ],
    turnaround: "24 hours",
    price: "from $2.50/lb",
  },
  {
    id: "ironing",
    title: "Ironing & Pressing",
    description: "Crisp, wrinkle-free results with our professional ironing and pressing services.",
    icon: "Iron",
    image: "/images/services/ironing.jpg",
    details: [
      "Shirt and blouse ironing",
      "Pants and skirts pressing",
      "Dress ironing",
      "Steam pressing for delicate fabrics",
    ],
    turnaround: "24-48 hours",
    price: "from $3.00/item",
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    description: "Expert dry cleaning for your special garments and sensitive fabrics.",
    icon: "Shirt",
    image: "/images/services/dry-cleaning.jpg",
    details: [
      "Suits and formal wear",
      "Dresses and evening gowns",
      "Winter coats and jackets",
      "Delicate fabrics and silk",
    ],
    turnaround: "48-72 hours",
    price: "from $6.00/item",
  },
  {
    id: "folding",
    title: "Folding & Packaging",
    description: "Neatly folded laundry delivered in environmentally friendly packaging.",
    icon: "PackageCheck",
    image: "/images/services/folding.jpg",
    details: [
      "Precise folding techniques",
      "Organized packaging by type",
      "Eco-friendly materials",
      "Special handling for delicate items",
    ],
    turnaround: "Included with services",
    price: "Included with services",
  },
];

// Pricing Plans
export const pricingPlans = [
  {
    id: "basic",
    title: "Basic Plan",
    description: "Perfect for individuals with basic laundry needs",
    price: 29.99,
    frequency: "per month",
    features: [
      "10 lbs of regular washing per week",
      "Free pickup and delivery",
      "72-hour turnaround",
      "Basic folding included",
    ],
    isPopular: false,
    cta: "Get Started",
  },
  {
    id: "standard",
    title: "Standard Plan",
    description: "Ideal for couples or small families",
    price: 49.99,
    frequency: "per month",
    features: [
      "20 lbs of regular washing per week",
      "Free pickup and delivery",
      "48-hour turnaround",
      "Premium folding included",
      "Basic ironing (5 items per week)",
    ],
    isPopular: true,
    cta: "Best Value",
  },
  {
    id: "premium",
    title: "Premium Plan",
    description: "Comprehensive solution for families",
    price: 89.99,
    frequency: "per month",
    features: [
      "40 lbs of regular washing per week",
      "Priority pickup and delivery",
      "24-hour turnaround",
      "Premium folding included",
      "Complete ironing service",
      "Stain treatment included",
      "Dry cleaning discount (20%)",
    ],
    isPopular: false,
    cta: "Go Premium",
  },
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Busy Professional",
    image: "/images/testimonials/client1.jpg",
    quote: "Laundry Basket has been a lifesaver! With my hectic schedule, I never have time for laundry. Their service is reliable, and my clothes always come back perfectly clean and folded.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Small Business Owner",
    image: "/images/testimonials/client2.jpg",
    quote: "I've been using Laundry Basket for my restaurant's linens for over a year now. Their attention to detail and quick turnaround time has made a real difference for my business.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Parent of Three",
    image: "/images/testimonials/client3.jpg",
    quote: "With three kids, laundry was consuming my weekends. Laundry Basket's family plan has given me back my free time while ensuring everyone has clean clothes all week.",
    rating: 4,
  },
];

// Stats
export const stats = [
  {
    id: "customers",
    value: "5,000+",
    label: "Happy Customers",
    icon: "Users",
  },
  {
    id: "experience",
    value: "10+",
    label: "Years Experience",
    icon: "Calendar",
  },
  {
    id: "loads",
    value: "100,000+",
    label: "Loads Processed",
    icon: "ShoppingBag",
  },
  {
    id: "satisfaction",
    value: "99%",
    label: "Satisfaction Rate",
    icon: "ThumbsUp",
  },
];

// FAQ
export const faqs = [
  {
    question: "How does pickup and delivery work?",
    answer: "We offer scheduled pickup and delivery services within our service area. Simply schedule a time slot, and our driver will collect or deliver your laundry in our clean, branded vehicles.",
  },
  {
    question: "What if I have special washing instructions?",
    answer: "You can provide special instructions when scheduling your service. We also recommend attaching notes to specific garments that require special attention.",
  },
  {
    question: "How do you handle delicate fabrics?",
    answer: "Our professional staff is trained to identify and properly handle delicate fabrics. We use special detergents and washing techniques for sensitive materials.",
  },
  {
    question: "What detergents do you use?",
    answer: "We use high-quality, eco-friendly detergents that are effective yet gentle on fabrics and the environment. We also offer fragrance-free options for customers with sensitivities.",
  },
  {
    question: "How do I pay for services?",
    answer: "We accept all major credit cards, digital payments through our app, and subscription plans for regular customers. Payment is processed securely after service completion.",
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer: "Customer satisfaction is our priority. If you're not completely satisfied with our service, please contact us within 24 hours of delivery, and we'll make it right.",
  },
];

// Contact Form Fields
export const contactFormFields = [
  { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
  { id: "email", label: "Email Address", type: "email", placeholder: "Enter your email address", required: true },
  { id: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number", required: false },
  { id: "service", label: "Service Interested In", type: "select", options: ["Regular Washing", "Dry Cleaning", "Ironing", "Full Service", "Other"], required: true },
  { id: "message", label: "Message", type: "textarea", placeholder: "Tell us about your laundry needs", required: true },
];

// Service Areas
export const serviceAreas = [
  "Downtown Washville",
  "North Washville",
  "South Washville",
  "East Washville",
  "West Washville",
  "Cleanton",
  "Sudsburg",
  "Rinseview Heights",
];

// Process Steps
export const processSteps = [
  {
    id: 1,
    title: "Schedule",
    description: "Book your pickup through our website or mobile app.",
    icon: "Calendar",
  },
  {
    id: 2,
    title: "Pickup",
    description: "We collect your laundry from your doorstep.",
    icon: "Truck",
  },
  {
    id: 3,
    title: "Clean",
    description: "Your clothes are sorted, cleaned, and folded with care.",
    icon: "ShowerHead",
  },
  {
    id: 4,
    title: "Deliver",
    description: "Clean laundry is delivered back to you, fresh and ready to wear.",
    icon: "Package",
  },
];

// Hero Section Content
export const heroContent = {
  headline: "Professional Laundry Services Delivered to Your Door",
  subheadline: "Save time and enjoy freshly cleaned clothes without the hassle",
  cta: "Schedule Pickup",
  secondaryCta: "View Services",
  image: "/images/hero.jpg",
};

// About Section Content
export const aboutContent = {
  headline: "About Laundry Basket",
  story: "Founded in 2015, Laundry Basket began with a simple mission: to provide busy individuals and families with more free time by taking care of their laundry needs. What started as a small operation has grown into a trusted laundry service provider, serving thousands of satisfied customers.",
  mission: "Our mission is to deliver exceptional laundry services that save our customers time while providing consistently clean, fresh, and well-cared-for garments.",
  values: [
    {
      title: "Quality",
      description: "We take pride in our attention to detail and high standards in every load we process.",
    },
    {
      title: "Convenience",
      description: "We design our services to make your life easier with simple scheduling and reliable delivery.",
    },
    {
      title: "Sustainability",
      description: "We use eco-friendly products and processes to minimize our environmental impact.",
    },
    {
      title: "Reliability",
      description: "You can count on us to handle your laundry with care and deliver on time, every time.",
    },
  ],
  image: "/images/about-us.jpg",
};

// Footer Links
export const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Washing", href: "/services#washing" },
      { label: "Ironing", href: "/services#ironing" },
      { label: "Dry Cleaning", href: "/services#dry-cleaning" },
      { label: "Folding", href: "/services#folding" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Pricing", href: "/pricing" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];