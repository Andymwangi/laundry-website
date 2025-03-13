'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Home, CalendarClock, Truck } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId') || '123456';
  
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
              <span>Order #{orderId}</span>
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