'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarCheck, Package, ShoppingBag, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Define types for our data structures
type OrderStatus = 'pending' | 'pickup_scheduled' | 'collected' | 'processing' | 
                 'ready_for_delivery' | 'delivery_scheduled' | 'delivered' | 'canceled';

interface Order {
  id: number;
  status: OrderStatus;
  type: 'laundry' | 'product';
  servicePlan?: string;
  kilograms?: number;
  items?: { name: string; quantity: number; price: number }[];
  price: number;
  date: string;
  deliveryDate?: string;
}

// Mock orders data
const MOCK_ORDERS: Order[] = [
  {
    id: 1001,
    status: 'delivered',
    type: 'laundry',
    servicePlan: 'basic',
    kilograms: 4,
    price: 200,
    date: '2025-03-10T10:00:00Z',
    deliveryDate: '2025-03-12T14:00:00Z',
  },
  {
    id: 1002,
    status: 'processing',
    type: 'laundry',
    servicePlan: 'premium',
    kilograms: 3,
    price: 240,
    date: '2025-03-14T09:00:00Z',
    deliveryDate: '2025-03-16T15:00:00Z',
  },
  {
    id: 1003,
    status: 'delivered',
    type: 'product',
    items: [
      { name: 'Eco-Friendly Detergent', quantity: 2, price: 120 },
      { name: 'Fabric Softener', quantity: 1, price: 150 },
    ],
    price: 390,
    date: '2025-02-20T11:00:00Z',
  },
  {
    id: 1004,
    status: 'delivered',
    type: 'laundry',
    servicePlan: 'subscription',
    price: 3500,
    date: '2025-02-01T10:00:00Z',
    deliveryDate: '2025-02-28T14:00:00Z',
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: OrderStatus }) => {
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

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'laundry' | 'products'>('all');
  
  useEffect(() => {
    // In a real app, this would be an API call
    // Simulate loading
    setTimeout(() => {
      setOrders(MOCK_ORDERS);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : filter === 'laundry' 
      ? orders.filter(order => order.type === 'laundry')
      : orders.filter(order => order.type === 'product');

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order History</h1>
          <p className="text-gray-600">View and track all your previous orders</p>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger 
            value="all" 
            onClick={() => setFilter('all')}
            className="flex items-center"
          >
            <List className="mr-2 h-4 w-4" />
            All Orders
          </TabsTrigger>
          <TabsTrigger 
            value="laundry" 
            onClick={() => setFilter('laundry')}
            className="flex items-center"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Laundry Services
          </TabsTrigger>
          <TabsTrigger 
            value="products" 
            onClick={() => setFilter('products')}
            className="flex items-center"
          >
            <Package className="mr-2 h-4 w-4" />
            Products
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="rounded-full bg-gray-100 p-3 mb-4">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No orders found</h3>
                <p className="text-gray-600 text-center mb-6">You haven't placed any orders yet.</p>
                <Button asChild>
                  <a href="/products">Browse Products</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          {order.type === 'laundry' ? (
                            <ShoppingBag className="h-5 w-5 mr-2 text-blue-500" />
                          ) : (
                            <Package className="h-5 w-5 mr-2 text-blue-500" />
                          )}
                          Order #{order.id}
                        </CardTitle>
                        <CardDescription>
                          Placed on {formatDate(order.date)}
                        </CardDescription>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {order.type === 'laundry' ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Laundry Service</h4>
                          <div className="flex justify-between items-center">
                            <div>
                              <p>
                                {order.servicePlan?.charAt(0).toUpperCase()}{order.servicePlan?.slice(1)} Plan
                                {order.servicePlan !== 'subscription' && order.kilograms && ` (${order.kilograms} kg)`}
                              </p>
                              
                              {order.deliveryDate && (
                                <div className="flex items-center text-gray-600 text-sm mt-2">
                                  <CalendarCheck className="h-4 w-4 mr-1" />
                                  Delivered on {formatDate(order.deliveryDate)}
                                </div>
                              )}
                            </div>
                            <p className="font-bold">KES {order.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Products</h4>
                          <div className="space-y-2">
                            {order.items?.map((item, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <div>
                                  <p>{item.name}</p>
                                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                                <p className="font-bold">KES {(item.price * item.quantity).toLocaleString()}</p>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-3" />
                          <div className="flex justify-between items-center font-bold">
                            <p>Total</p>
                            <p>KES {order.price.toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="laundry" className="mt-0">
          {/* The content will be filtered by the filter state */}
        </TabsContent>
        
        <TabsContent value="products" className="mt-0">
          {/* The content will be filtered by the filter state */}
        </TabsContent>
      </Tabs>
    </div>
  );
} 