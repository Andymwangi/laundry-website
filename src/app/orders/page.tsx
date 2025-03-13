'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarClock, Truck, Info, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Mock order status badges
const getStatusBadge = (status: string) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    pickup_scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    collected: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
    processing: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    ready_for_delivery: "bg-green-100 text-green-800 hover:bg-green-100",
    delivery_scheduled: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
    delivered: "bg-green-100 text-green-800 hover:bg-green-100",
    canceled: "bg-red-100 text-red-800 hover:bg-red-100",
  } as Record<string, string>;
  
  return (
    <Badge className={statusStyles[status] || "bg-gray-100 text-gray-800"} variant="outline">
      {status.replace(/_/g, ' ')}
    </Badge>
  );
};

// Status progress component
const OrderStatusProgress = ({ status }: { status: string }) => {
  const statusOrder = [
    'pending',
    'pickup_scheduled',
    'collected',
    'processing',
    'ready_for_delivery',
    'delivery_scheduled',
    'delivered'
  ];
  
  const currentIndex = statusOrder.indexOf(status);
  
  return (
    <div className="w-full space-y-2 my-4">
      <div className="flex justify-between">
        {statusOrder.map((s, index) => (
          <div 
            key={s} 
            className={`flex items-center justify-center rounded-full w-2 h-2 ${
              index <= currentIndex ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            {index === currentIndex && (
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
            )}
          </div>
        ))}
      </div>
      <div className="relative h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-blue-600 transition-all"
          style={{ width: `${(currentIndex / (statusOrder.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);
  
  // In a real app, fetch orders from your API
  const [orders, setOrders] = useState([
    {
      id: '123456',
      servicePlan: 'premium',
      kilograms: 2,
      price: 160,
      status: 'delivery_scheduled',
      pickupDate: '2024-03-10',
      deliveryDate: '2024-03-12',
      paymentMethod: 'mpesa',
      transactionId: 'MPESA1234567',
      address: '123 Moi Avenue, Downtown',
      items: [
        { id: 1, name: 'Shirts', quantity: 3 },
        { id: 2, name: 'Pants', quantity: 2 },
        { id: 3, name: 'Bed Sheets', quantity: 1 }
      ]
    },
    {
      id: '123457',
      servicePlan: 'basic',
      kilograms: 5,
      price: 250,
      status: 'delivered',
      pickupDate: '2024-03-05',
      deliveryDate: '2024-03-07',
      paymentMethod: 'mpesa',
      transactionId: 'MPESA7654321',
      address: '456 Kimathi Street, Westlands',
      items: [
        { id: 1, name: 'T-shirts', quantity: 5 },
        { id: 2, name: 'Jeans', quantity: 2 },
        { id: 3, name: 'Towels', quantity: 3 }
      ]
    },
    {
      id: '123458',
      servicePlan: 'subscription',
      kilograms: null,
      price: 6000,
      status: 'processing',
      pickupDate: '2024-03-12',
      deliveryDate: '2024-03-14',
      paymentMethod: 'mpesa',
      transactionId: 'MPESA8765432',
      address: '789 Kenyatta Avenue, Karen',
      items: [
        { id: 1, name: 'Weekly Subscription', quantity: 1 }
      ]
    },
  ]);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Filter orders by status for tabs
  const activeOrders = orders.filter(order => 
    ['pending', 'pickup_scheduled', 'collected', 'processing', 'ready_for_delivery', 'delivery_scheduled'].includes(order.status)
  );
  
  const completedOrders = orders.filter(order => 
    ['delivered'].includes(order.status)
  );
  
  const canceledOrders = orders.filter(order => 
    ['canceled'].includes(order.status)
  );
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        
        {showSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Order placed successfully!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your laundry order has been placed. You can track its status here.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">Track and manage your laundry orders</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/schedule">Schedule Pickup</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="active">
              Active Orders
              {activeOrders.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs">
                  {activeOrders.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeOrders.length > 0 ? (
              <div className="space-y-4">
                {activeOrders.map(order => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        {getStatusBadge(order.status)}
                      </div>
                      <CardDescription>
                        {formatDate(order.pickupDate)}
                      </CardDescription>
                    </CardHeader>
                    
                    <OrderStatusProgress status={order.status} />
                    
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Service Plan</p>
                          <p className="font-medium capitalize">{order.servicePlan}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="font-medium">KES {order.price.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">
                            Pickup: {formatDate(order.pickupDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">
                            Expected Delivery: {formatDate(order.deliveryDate)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                          Cancel Order
                        </Button>
                        <Link href={`/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                            View Details <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No Active Orders</h3>
                <p className="text-gray-500 mt-2 mb-6">You don't have any active orders at the moment.</p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/pricing">Order Now</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedOrders.length > 0 ? (
              <div className="space-y-4">
                {completedOrders.map(order => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        {getStatusBadge(order.status)}
                      </div>
                      <CardDescription>
                        Completed on {formatDate(order.deliveryDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Service Plan</p>
                          <p className="font-medium capitalize">{order.servicePlan}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="font-medium">KES {order.price.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Link href={`/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                            View Details <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No Completed Orders</h3>
                <p className="text-gray-500 mt-2">You don't have any completed orders yet.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="canceled">
            {canceledOrders.length > 0 ? (
              <div className="space-y-4">
                {canceledOrders.map(order => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        {getStatusBadge(order.status)}
                      </div>
                      <CardDescription>
                        Canceled on {formatDate(order.pickupDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Service Plan</p>
                          <p className="font-medium capitalize">{order.servicePlan}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="font-medium">KES {order.price.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm" asChild>
                          <Link href={`/checkout?plan=${order.servicePlan}${order.kilograms ? `&kilos=${order.kilograms}` : ''}`}>
                            Reorder
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No Canceled Orders</h3>
                <p className="text-gray-500 mt-2">You don't have any canceled orders.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}