import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image 
                src="/images/favicon.ico" 
                alt="Laundry Basket" 
                width={20} 
                height={20} 
                className="w-auto h-auto round-md"
              />
              <span className="text-xl font-bold">Laundry Basket</span>
            </div>
            <p className="text-gray-400 mb-4">
              We provide professional laundry and cleaning services with a commitment to quality, 
              efficiency, and customer satisfaction. Let us take care of your laundry needs so you 
              can focus on what matters most.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#washing" className="text-gray-400 hover:text-white transition-colors">
                  Wash & Fold
                </Link>
              </li>
              <li>
                <Link href="/services#dry-cleaning" className="text-gray-400 hover:text-white transition-colors">
                  Dry Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services#ironing" className="text-gray-400 hover:text-white transition-colors">
                  Ironing Service
                </Link>
              </li>
              <li>
                <Link href="/services#stain-removal" className="text-gray-400 hover:text-white transition-colors">
                  Stain Removal
                </Link>
              </li>
              <li>
                <Link href="/services#comforters" className="text-gray-400 hover:text-white transition-colors">
                  Comforters & Bedding
                </Link>
              </li>
              <li>
                <Link href="/services#commercial" className="text-gray-400 hover:text-white transition-colors">
                  Commercial Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FiMapPin className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400">Juja, Kiambu</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-primary flex-shrink-0" />
                <span className="text-gray-400">+254-700-071-699</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-primary flex-shrink-0" />
                <span className="text-gray-400">info@laundrybasket.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiClock className="text-primary mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>Monday - Friday: 7am - 9pm</p>
                  <p>Saturday: 8am - 7pm</p>
                  <p>Sunday: 9am - 5pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Laundry Basket. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors mr-4">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;