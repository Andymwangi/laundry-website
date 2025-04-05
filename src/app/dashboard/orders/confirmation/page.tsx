// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ArrowRight, Truck, CalendarCheck } from 'lucide-react';

export default function OrderConfirmationPage() {
  const [orderData, setOrderData] = useState({
    id: '',
    status: 'success',
    amount: 0,
    date: new Date().toISOString(),
    estimatedDelivery: ''
  });

  const router = useRouter();

  // Get URL parameters in useEffect to avoid SSR issues
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get('orderId');
    const status = searchParams.get('status') || 'success';
    
    if (!orderId) {
      // Redirect to orders page if no order ID is found
      router.push('/dashboard/orders');
      return;
    }
    
    // In a real app, you would fetch the order details from your API
    // Simulate API data
    const mockOrderAmount = Math.floor(Math.random() * 5000) + 500; // Random amount between 500 and 5500
    
    // Calculate estimated delivery date (3 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    
    setOrderData({
      id: orderId,
      status,
      amount: mockOrderAmount,
      date: new Date().toISOString(),
      estimatedDelivery: deliveryDate.toISOString()
    });
  }, [router]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 md:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you for your order. We've received your payment and will begin processing your laundry soon.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Order #{orderData.id}</span>
            <span className="text-sm font-normal bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {orderData.status === 'success' ? 'Paid' : 'Processing'}
            </span>
          </CardTitle>
          <CardDescription>
            Placed on {formatDate(orderData.date)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
              <p className="font-semibold">KES {orderData.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Payment Method</p>
              <p className="font-semibold">M-Pesa</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Delivery Status</p>
                <p className="text-gray-600 text-sm">Your order has been confirmed and will be processed shortly.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CalendarCheck className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-gray-600 text-sm">{formatDate(orderData.estimatedDelivery)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Link href="/dashboard/orders/history">
          <Button variant="outline" className="w-full sm:w-auto">
            View Order History
          </Button>
        </Link>
        <Link href="/dashboard/orders">
          <Button className="w-full sm:w-auto flex items-center gap-2">
            Place Another Order
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}