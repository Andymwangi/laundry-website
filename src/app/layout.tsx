import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Laundry Basket - Professional Laundry & Cleaning Services',
  description: 'Laundry Basket offers professional laundry, dry cleaning, and ironing services for homes and businesses. Fast, reliable, and eco-friendly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Sidebar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}