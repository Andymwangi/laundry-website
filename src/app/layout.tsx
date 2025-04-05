// @ts-nocheck
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/auth/auth-context';
import { CartProvider } from '@/components/cart/CartProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Laundry Basket | Quality Laundry & Dry Cleaning Services',
  description: 'Professional laundry and dry cleaning services with free pickup and delivery.',
  keywords: 'laundry, dry cleaning, washing, ironing, clothes cleaning, fabric care',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <Sidebar />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}