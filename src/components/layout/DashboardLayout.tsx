'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Package,
  CreditCard,
  LogOut,
  ShoppingCart,
  Settings,
  Home,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/auth-context';
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);
  
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  
  const sidebarLinks = [
    { href: '/dashboard/orders', label: 'Orders', icon: Package },
    { href: '/dashboard/checkout', label: 'Checkout', icon: ShoppingCart },
    { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
  ];
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  // If user not authenticated and not loading, the useEffect will handle redirection
  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="container px-4 mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Laundry Basket</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden md:block text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/dashboard/orders" className="hidden md:block text-gray-600 hover:text-blue-600">
              Orders
            </Link>
            <Link href="/pricing" className="hidden md:block text-gray-600 hover:text-blue-600">
              Pricing
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={''} alt={user.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r bg-white p-4 pt-8">
          <nav className="space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600 hover:bg-blue-50"
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
            
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </nav>
          
          <div className="mt-auto pt-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <h3 className="font-medium text-blue-900 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-700">
                Contact our customer support team for assistance.
              </p>
              <Button className="mt-3 w-full bg-blue-600" size="sm">
                Contact Support
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 py-6 px-4 md:px-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;