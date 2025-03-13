'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Home, CalendarClock, Truck } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

// Client Component that uses useSearchParams
function OrderConfirmationContent() {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [orderId, setOrderId] = useState('123456');
  
  // Get search params on the client side
  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  useEffect(() => {
    if (searchParams) {
      const id = searchParams.get('orderId');
      if (id) {
        setOrderId(id);
      }
    }
  }, [searchParams]);
  
  const [order, setOrder] = useState({
    id: orderId,
    status: 'pending',
    servicePlan: 'premium',
    kilograms: 2,
    price: 1250,
    pickupDate: '2024-03-15',
    pickupTime: '14:00',
    deliveryDate: '2024-03-17',
    paymentMethod: 'mpesa',
    transactionId: 'M-PESA' + Math.floor(Math.random() * 10000000),
  });
  
  // Update order ID when it changes
  useEffect(() => {
    setOrder(prev => ({
      ...prev,
      id: orderId
    }));
  }, [orderId]);
  
  // In a real app, fetch order details from your API
  useEffect(() => {
    // Simulate API call
    // const fetchOrder = async () => {
    //   const response = await fetch(`/api/orders/${orderId}`);
    //   const data = await response.json();
    //   setOrder(data);
    // };
    // fetchOrder();
  }, [orderId]);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-lg text-gray-600">Your order has been confirmed and is being processed.</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Order #{order.id}</span>
              <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                {order.status}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Service Plan</h3>
                <p className="font-medium capitalize">{order.servicePlan}</p>
              </div>
              
              {order.servicePlan !== 'subscription' && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                  <p className="font-medium">{order.kilograms} kg</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Amount Paid</h3>
                <p className="font-medium">KES {order.price.toLocaleString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                <p className="font-medium capitalize">{order.paymentMethod}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Transaction ID</h3>
                <p className="font-medium">{order.transactionId}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CalendarClock className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Pickup Details</h3>
                  <p className="text-gray-600">
                    {formatDate(order.pickupDate)} at {order.pickupTime}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Estimated Delivery</h3>
                  <p className="text-gray-600">
                    {formatDate(order.deliveryDate)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="flex-1">
            <Link href="/orders">View All Orders</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function OrderConfirmationLoading() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4" />
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-2 max-w-md mx-auto" />
          <div className="h-6 bg-gray-200 rounded animate-pulse max-w-sm mx-auto" />
        </div>
        
        <div className="border rounded-lg mb-6 overflow-hidden">
          <div className="p-4 border-b">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>
              ))}
            </div>
            
            <div className="h-px bg-gray-200 my-4" />
            
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
                  <div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-24 mb-2" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="h-10 bg-gray-200 rounded animate-pulse flex-1" />
          <div className="h-10 bg-gray-200 rounded animate-pulse flex-1" />
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationLoading />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}