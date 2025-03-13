'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/favicon.ico"
            alt="Laundry Basket Logo"
            width={10}
            height={10}
            className="w-auto h-auto round-md"
          />
          <span className="text-2xl font-bold text-primary">Laundry Basket</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-foreground hover:text-blue-800 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-foreground hover:text-blue-800 transition-colors">
            About
          </Link>
          <Link href="/services" className="text-foreground hover:text-blue-800 transition-colors">
            Services
          </Link>
          <Link href="/pricing" className="text-foreground hover:text-blue-800 transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="text-foreground hover:text-blue-800 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white py-4 shadow-md"
        >
          <div className="container flex flex-col space-y-4">
            <Link href="/" className="text-foreground hover:text-blue-800 transition-colors" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-blue-800 transition-colors" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/services" className="text-foreground hover:text-blue-800 transition-colors" onClick={toggleMenu}>
              Services
            </Link>
            <Link href="/pricing" className="text-foreground hover:text-blue-800 transition-colors" onClick={toggleMenu}>
              Pricing
            </Link>
            <Link href="/contact" className="text-foreground hover:text-blue-800 transition-colors" onClick={toggleMenu}>
              Contact
            </Link>

            <div className="flex space-x-4 pt-2">
              <Link href="/auth/login" className="w-full">
                <Button variant="outline" className="w-full" onClick={toggleMenu}>Login</Button>
              </Link>
              <Link href="/auth/signup" className="w-full">
                <Button className="w-full" onClick={toggleMenu}>Sign Up</Button>
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <FiPhone size={16} />
                <span>=254-700-071-699</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                <FiMail size={16} />
                <span>info@laundrybasket.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;