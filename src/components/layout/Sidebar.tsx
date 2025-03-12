'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiInfo, FiSettings, FiPhone, FiMail, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';
import { MdLocalLaundryService, MdDryCleaning, MdIron } from 'react-icons/md';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position and show sidebar when mouse is near the left edge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Show sidebar when mouse is within 20px of left edge
      if (e.clientX < 20) {
        setIsVisible(true);
      } else if (e.clientX > 300 && isVisible) {
        // Hide sidebar when mouse moves far away from sidebar
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={sidebarVariants}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-4 bg-primary text-white">
              <h3 className="text-xl font-bold">Laundry Basket</h3>
              <p className="text-sm opacity-80">Professional Laundry Service</p>
            </div>

            {/* Quick Links */}
            <div className="p-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quick Links</h4>
              <nav className="space-y-2">
                <Link href="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted group">
                  <FiHome size={18} />
                  <span>Home</span>
                  <FiArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link href="/about" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted group">
                  <FiInfo size={18} />
                  <span>About Us</span>
                  <FiArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link href="/services" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted group">
                  <FiSettings size={18} />
                  <span>Services</span>
                  <FiArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link href="/contact" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted group">
                  <FiPhone size={18} />
                  <span>Contact</span>
                  <FiArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </nav>
            </div>

            {/* Services */}
            <div className="p-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Our Services</h4>
              <nav className="space-y-2">
                <Link href="/services#washing" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted">
                  <MdLocalLaundryService size={18} />
                  <span>Wash & Fold</span>
                </Link>
                <Link href="/services#dry-cleaning" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted">
                  <MdDryCleaning size={18} />
                  <span>Dry Cleaning</span>
                </Link>
                <Link href="/services#ironing" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted">
                  <MdIron size={18} />
                  <span>Ironing Service</span>
                </Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="mt-auto p-4 bg-muted">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Contact Us</h4>
              <div className="text-sm space-y-2">
                <div className="flex items-center space-x-2">
                  <FiPhone size={16} className="text-primary" />
                  <span>+254-700-071-699</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMail size={16} className="text-primary" />
                  <span>info@laundrybasket.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin size={16} className="text-primary" />
                  <span>Juja, Kiambu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiClock size={16} className="text-primary" />
                  <span>Mon-Sat: 8am - 8pm</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;