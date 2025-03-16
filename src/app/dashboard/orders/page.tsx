'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarClock, Info, Check, MinusCircle, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Define types for our data structures
type ServicePlan = 'basic' | 'premium' | 'subscription';
type OrderStatus = 'pending' | 'pickup_scheduled' | 'collected' | 'processing' | 
                 'ready_for_delivery' | 'delivery_scheduled' | 'delivered' | 'canceled';

interface Order {
  id: number;
  status: OrderStatus;
  servicePlan: ServicePlan;
  kilograms?: number;
  price: number;
  pickupDate: string;
  deliveryDate: string;
}

// Price configuration for different service plans
const PRICE_CONFIG: Record<ServicePlan, number> = {
  basic: 50, // KES per kg
  premium: 80, // KES per kg
  subscription: 6000, // KES monthly
};

// Mock orders data
const MOCK_ORDERS: Order[] = [
  {
    id: 1001,
    status: 'delivered',
    servicePlan: 'basic',
    kilograms: 4,
    price: 200,
    pickupDate: '2025-03-10T10:00:00Z',
    deliveryDate: '2025-03-12T14:00:00Z',
  },
  {
    id: 1002,
    status: 'processing',
    servicePlan: 'premium',
    kilograms: 3,
    price: 240,
    pickupDate: '2025-03-14T09:00:00Z',
    deliveryDate: '2025-03-16T15:00:00Z',
  },
  {
    id: 1003,
    status: 'pending',
    servicePlan: 'basic',
    kilograms: 2,
    price: 100,
    pickupDate: '2025-03-17T11:00:00Z',
    deliveryDate: '2025-03-19T16:00:00Z',
  },
];

interface StatusBadgeProps {
  status: OrderStatus;
}

// Status badge component
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    pickup_scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    collected: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
    processing: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    ready_for_delivery: "bg-green-100 text-green-800 hover:bg-green-100",
    delivery_scheduled: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
    delivered: "bg-green-100 text-green-800 hover:bg-green-100",
    canceled: "bg-red-100 text-red-800 hover:bg-red-100",
  };
  
  return (
    <Badge className={statusStyles[status] || "bg-gray-100 text-gray-800"} variant="outline">
      {status.replace(/_/g, ' ')}
    </Badge>
  );
};

interface OrderStatusProgressProps {
  status: OrderStatus;
}

// Order status progress component
const OrderStatusProgress: React.FC<OrderStatusProgressProps> = ({ status }) => {
  const statusOrder: OrderStatus[] = [
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

interface OrderCalculatorProps {
  plan: ServicePlan;
  onOrderPlaced: (order: Order) => void;
}

// New Order Form Component with calculator
const OrderCalculator: React.FC<OrderCalculatorProps> = ({ plan, onOrderPlaced }) => {
  const router = useRouter();
  const [kilos, setKilos] = useState(3);
  const [loading, setLoading] = useState(false);
  
  // Calculate price based on plan and kilos
  const calculatePrice = (): number => {
    if (plan === 'subscription') {
      return PRICE_CONFIG.subscription;
    } else {
      return kilos * PRICE_CONFIG[plan];
    }
  };
  
  const handleDecrement = () => {
    if (kilos > 1) setKilos(kilos - 1);
  };
  
  const handleIncrement = () => {
    setKilos(kilos + 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Create a mock order
    const mockOrder: Order = {
      id: Math.floor(1000 + Math.random() * 9000),
      status: 'pending',
      servicePlan: plan,
      kilograms: plan !== 'subscription' ? kilos : undefined,
      price: calculatePrice(),
      pickupDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      deliveryDate: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    };
    
    // Simulate API delay
    setTimeout(() => {
      onOrderPlaced(mockOrder);
      // Redirect to confirmation page with order details
      router.push(`/confirmation?orderId=${mockOrder.id}&plan=${plan}&price=${mockOrder.price}`);
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>New {plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : 'Basic'} Order</CardTitle>
        <CardDescription>
          {plan === 'subscription' 
            ? 'Monthly laundry subscription with up to 20kg of laundry' 
            : 'Select the amount of laundry you need cleaned'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {plan !== 'subscription' && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Estimated Weight (kg)
              </label>
              <div className="flex items-center">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={handleDecrement}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={kilos}
                  onChange={(e) => setKilos(parseInt(e.target.value) || 1)}
                  className="mx-3 text-center"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={handleIncrement}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Minimum order is 1kg. Don't worry, we'll weigh the exact amount during pickup.
              </p>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">
                {plan === 'subscription' ? 'Monthly Subscription' : `${kilos} kg × KES ${PRICE_CONFIG[plan]}/kg`}
              </span>
              <span className="font-semibold">
                KES {calculatePrice()}
              </span>
            </div>
            
            {plan !== 'subscription' && (
              <div className="mt-2 text-sm text-gray-500">
                {plan === 'premium' ? 'Includes premium washing, stain treatment, and ironing' : 'Standard washing and drying'}
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <CalendarClock className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Estimated Pickup</h3>
                <p className="text-gray-600">
                  {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Main Orders Page Component
export default function OrdersPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOrderCalculator, setShowOrderCalculator] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ServicePlan>('basic');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  
  // Format date helper function
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Function to handle order placement
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setShowOrderCalculator(false);
    setShowSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };
  
  // Function to handle order cancellation
  const handleCancelOrder = (orderId: number) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'canceled' as OrderStatus } 
          : order
      )
    );
  };
  
  // Filter orders by status for tabs
  const activeStatuses: OrderStatus[] = ['pending', 'pickup_scheduled', 'collected', 'processing', 'ready_for_delivery', 'delivery_scheduled'];
  const completedStatuses: OrderStatus[] = ['delivered'];
  const canceledStatuses: OrderStatus[] = ['canceled'];

  const activeOrders = orders.filter(order => activeStatuses.includes(order.status));
  const completedOrders = orders.filter(order => completedStatuses.includes(order.status));
  const canceledOrders = orders.filter(order => canceledStatuses.includes(order.status));
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Orders</h1>
          {!showOrderCalculator && (
            <Button 
              onClick={() => setShowOrderCalculator(true)} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              New Order
            </Button>
          )}
        </div>
        
        {showSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Order placed successfully!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your laundry order has been placed. You can track its status here.
            </AlertDescription>
          </Alert>
        )}
        
        {showOrderCalculator ? (
          <div className="mb-8">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Create New Order</h2>
              <div className="flex gap-2">
                <Button 
                  variant={selectedPlan === 'basic' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedPlan('basic')}
                  className={selectedPlan === 'basic' ? 'bg-blue-600' : ''}
                >
                  Basic
                </Button>
                <Button 
                  variant={selectedPlan === 'premium' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedPlan('premium')}
                  className={selectedPlan === 'premium' ? 'bg-blue-600' : ''}
                >
                  Premium
                </Button>
                <Button 
                  variant={selectedPlan === 'subscription' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedPlan('subscription')}
                  className={selectedPlan === 'subscription' ? 'bg-blue-600' : ''}
                >
                  Subscription
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowOrderCalculator(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
            <OrderCalculator 
              plan={selectedPlan} 
              onOrderPlaced={handleOrderPlaced} 
            />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">Track and manage your laundry orders</p>
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
                            <StatusBadge status={order.status} />
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
                            {order.servicePlan !== 'subscription' && (
                              <div>
                                <p className="text-sm text-gray-500">Weight</p>
                                <p className="font-medium">{order.kilograms} kg</p>
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-gray-500">Delivery</p>
                              <p className="font-medium">{formatDate(order.deliveryDate)}</p>
                            </div>
                          </div>
                          
                          {order.status === 'pending' && (
                            <div className="mt-4 flex justify-end">
                              <Button 
                                variant="outline" 
                                className="text-red-600 border-red-200"
                                onClick={() => handleCancelOrder(order.id)}
                              >
                                Cancel Order
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="mb-4">
                      <Info className="h-10 w-10 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No active orders</h3>
                    <p className="text-gray-500 mb-6">You don't have any active laundry orders at the moment.</p>
                    <Button 
                      onClick={() => setShowOrderCalculator(true)} 
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create Your First Order
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
                            <StatusBadge status={order.status} />
                          </div>
                          <CardDescription>
                            {formatDate(order.pickupDate)} - {formatDate(order.deliveryDate)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Service Plan</p>
                              <p className="font-medium capitalize">{order.servicePlan}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="font-medium">KES {order.price.toLocaleString()}</p>
                            </div>
                            {order.servicePlan !== 'subscription' && (
                              <div>
                                <p className="text-sm text-gray-500">Weight</p>
                                <p className="font-medium">{order.kilograms} kg</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button 
                              variant="outline" 
                              className="text-blue-600 border-blue-200"
                              onClick={() => {
                                setSelectedPlan(order.servicePlan);
                                setShowOrderCalculator(true);
                              }}
                            >
                              Reorder
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="mb-4">
                      <Info className="h-10 w-10 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No completed orders</h3>
                    <p className="text-gray-500">Your completed orders will appear here.</p>
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
                            <StatusBadge status={order.status} />
                          </div>
                          <CardDescription>
                            {formatDate(order.pickupDate)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Service Plan</p>
                              <p className="font-medium capitalize">{order.servicePlan}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="font-medium">KES {order.price.toLocaleString()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="mb-4">
                      <Info className="h-10 w-10 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No canceled orders</h3>
                    <p className="text-gray-500">Your canceled orders will appear here.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}