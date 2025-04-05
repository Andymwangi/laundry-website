// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, X } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function PricingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMonthly, setIsMonthly] = useState(true);
  const { user, loading } = useAuth();
  
  // Handle selection of a pricing plan
  const handleSelectPlan = (plan: string, defaultKilos = 1) => {
    // Always route through the authentication flow first
    if (!user && !loading) {
      // Store plan selection info in localStorage for retrieval after login
      localStorage.setItem('selectedPlan', plan);
      localStorage.setItem('defaultKilos', defaultKilos.toString());
      
      // Redirect to login with plan parameters in URL
      router.push(`/auth/login?plan=${plan}${plan !== 'subscription' ? `&kilos=${defaultKilos}` : ''}`);
      return;
    }
    
    // If user is already logged in, redirect directly to checkout page
    router.push(`/dashboard/checkout?plan=${plan}${plan !== 'subscription' ? `&kilos=${defaultKilos}` : ''}`);
  };
  
  // Check for redirect from login
  useEffect(() => {
    // If user just logged in and we have a stored plan, redirect to checkout
    if (user && !loading) {
      const storedPlan = localStorage.getItem('selectedPlan');
      if (storedPlan) {
        const kilos = localStorage.getItem('defaultKilos') || '1';
        
        // Clear stored data
        localStorage.removeItem('selectedPlan');
        localStorage.removeItem('defaultKilos');
        
        // Redirect to checkout with the plan info
        router.push(`/dashboard/checkout?plan=${storedPlan}${storedPlan !== 'subscription' ? `&kilos=${kilos}` : ''}`);
      }
    }
  }, [user, loading, router]);
  
  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the plan that fits your laundry needs. No hidden fees, just clean clothes delivered to your door.
        </p>
        
        <div className="flex items-center justify-center mt-8 mb-12">
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                isMonthly ? 'bg-white shadow-sm' : 'text-gray-700'
              }`}
              onClick={() => setIsMonthly(true)}
            >
              Pay Per Use
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                !isMonthly ? 'bg-white shadow-sm' : 'text-gray-700'
              }`}
              onClick={() => setIsMonthly(false)}
            >
              Subscription
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle>Basic Wash</CardTitle>
            <CardDescription>Perfect for everyday laundry needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-3xl font-bold">KES 50</span>
              <span className="text-gray-500"> / kg</span>
            </div>
            
            <Separator />
            
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Standard washing and drying</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Eco-friendly detergents</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>48-hour turnaround</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Free pickup for 5kg+</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-500">Stain treatment</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-500">Premium fabric softener</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              variant="outline"
              onClick={() => handleSelectPlan('basic', 3)}
            >
              Get Started
            </Button>
          </CardFooter>
        </Card>
        
        {/* Premium Plan */}
        <Card className="relative overflow-hidden border-blue-200 bg-blue-50">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1">
            POPULAR
          </div>
          <CardHeader>
            <CardTitle className="text-blue-700">Premium Wash</CardTitle>
            <CardDescription>For those who demand the best</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-3xl font-bold text-blue-700">KES 80</span>
              <span className="text-gray-600"> / kg</span>
            </div>
            
            <Separator className="bg-blue-200" />
            
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Premium washing and drying</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Premium detergents</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Stain treatment included</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Free pickup for all orders</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Ironing service (shirts only)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>24-hour turnaround</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handleSelectPlan('premium', 3)}
            >
              Get Started
            </Button>
          </CardFooter>
        </Card>
        
        {/* Subscription Plan */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle>Monthly Subscription</CardTitle>
            <CardDescription>Hassle-free laundry all month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-3xl font-bold">KES {isMonthly ? '6,000' : '5,500'}</span>
              <span className="text-gray-500"> / month</span>
              {!isMonthly && (
                <div className="text-sm text-green-600 font-medium mt-1">Save KES 6,000 yearly</div>
              )}
            </div>
            
            <Separator />
            
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Up to 20kg of laundry per month</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Premium washing and drying</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>All premium services included</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Priority scheduling</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Free pickup and delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Roll over unused kilograms</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              variant="outline"
              onClick={() => handleSelectPlan('subscription')}
            >
              Subscribe Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}