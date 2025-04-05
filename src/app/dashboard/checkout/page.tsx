// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, CreditCard, Smartphone } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Complete Your Order</h1>
        <CheckoutClient />
      </div>
    </div>
  );
}

// Client component that uses hooks
function CheckoutClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderType, setOrderType] = useState<'service' | 'product'>('service');
  const [plan, setPlan] = useState('basic');
  const [kilos, setKilos] = useState(1);
  const [product, setProduct] = useState<{id: string, name: string, price: number} | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'pesapal'>('mpesa');
  
  // Get URL parameters in useEffect to avoid SSR issues
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    
    // Check for product details
    const productId = searchParams.get('product');
    const productName = searchParams.get('name');
    const productPrice = searchParams.get('price');
    
    if (productId && productName && productPrice) {
      setOrderType('product');
      setProduct({
        id: productId,
        name: decodeURIComponent(productName),
        price: Number(productPrice)
      });
    } else {
      // If no product, check for plan details
    const planParam = searchParams.get('plan');
    const kilosParam = searchParams.get('kilos');
    
    if (planParam) {
      setPlan(planParam);
    }
    
    if (kilosParam) {
      setKilos(parseInt(kilosParam, 10));
      }
    }
    
    // Check for stored product from localStorage (if user was redirected from login)
    const storedProduct = localStorage.getItem('cartProduct');
    if (storedProduct && !productId) {
      try {
        const parsedProduct = JSON.parse(storedProduct);
        setOrderType('product');
        setProduct({
          id: parsedProduct.id,
          name: parsedProduct.name,
          price: parsedProduct.price
        });
        // Clear the stored product
        localStorage.removeItem('cartProduct');
      } catch (error) {
        console.error('Error parsing stored product:', error);
      }
    }
  }, []);
  
  // Service details
  const [orderDetails, setOrderDetails] = useState({
    servicePlan: 'basic',
    kilograms: 1 as number | null,
    price: 50,
    pickupDate: '',
    pickupTime: '',
    address: '',
    apartment: '',
    city: 'Nairobi',
    postalCode: '',
    phoneNumber: '',
    notes: '',
    // Card payment details
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });

  // Update order details when plan or kilos change
  useEffect(() => {
    if (orderType === 'service') {
    let calculatedPrice = 0;
    
    if (plan === 'basic') {
      calculatedPrice = kilos * 50;
    } else if (plan === 'premium') {
      calculatedPrice = kilos * 80;
    } else if (plan === 'subscription') {
      calculatedPrice = 6000;
    }
    
    setOrderDetails(prev => ({
      ...prev,
      servicePlan: plan,
      kilograms: plan === 'subscription' ? null : kilos,
      price: calculatedPrice
    }));
    } else if (orderType === 'product' && product) {
      setOrderDetails(prev => ({
        ...prev,
        price: product.price
      }));
    }
  }, [plan, kilos, orderType, product]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, you would send the order details to your API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock order ID
      const mockOrderId = Math.floor(Math.random() * 1000000);
      
      // Navigate to payment page with order details
      router.push(`/dashboard/payments?orderId=${mockOrderId}&price=${orderDetails.price}&method=${paymentMethod}`);
    } catch (error) {
      console.error('Error creating order:', error);
      setLoading(false);
    }
  };
  
  // Get tomorrow's date in YYYY-MM-DD format for min date of pickup
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Order Summary */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orderType === 'service' ? (
            <>
          <div className="flex justify-between">
            <span>Service Plan:</span>
            <span className="font-medium capitalize">{plan}</span>
          </div>
          
          {plan !== 'subscription' && (
            <div className="flex justify-between">
              <span>Weight:</span>
              <span className="font-medium">{kilos} kg</span>
            </div>
              )}
            </>
          ) : (
            product && (
              <div className="flex justify-between">
                <span>Product:</span>
                <span className="font-medium">{product.name}</span>
              </div>
            )
          )}
          
          <Separator />
          
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>KES {orderDetails.price.toLocaleString()}</span>
          </div>
          
          {orderType === 'service' && (
          <div className="bg-blue-50 p-3 rounded-md mt-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Free pickup for orders:</p>
                <p className="text-gray-600">
                  {plan === 'basic' ? '5kg or more' : 'All premium & subscription plans'}
                </p>
              </div>
            </div>
          </div>
          )}
        </CardContent>
      </Card>
      
      {/* Order Form */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{orderType === 'service' ? 'Pickup Details' : 'Delivery Details'}</CardTitle>
          <CardDescription>Enter your information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {orderType === 'service' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupDate">Pickup Date</Label>
                <Input 
                  id="pickupDate" 
                  name="pickupDate" 
                  type="date" 
                  min={tomorrowFormatted}
                  value={orderDetails.pickupDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupTime">Preferred Time</Label>
                <Input 
                  id="pickupTime" 
                  name="pickupTime" 
                  type="time"
                  value={orderDetails.pickupTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                name="address" 
                value={orderDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment/Building (Optional)</Label>
              <Input 
                id="apartment" 
                name="apartment"
                value={orderDetails.apartment}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  name="city"
                  value={orderDetails.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input 
                  id="postalCode" 
                  name="postalCode"
                  value={orderDetails.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber" 
                name="phoneNumber"
                type="tel"
                placeholder="e.g., 0712345678"
                value={orderDetails.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {orderType === 'service' && (
            <div className="space-y-2">
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea 
                id="notes" 
                name="notes"
                placeholder="Any special instructions for pickup..."
                value={orderDetails.notes}
                onChange={handleInputChange}
              />
            </div>
            )}
            
            {/* Payment Method Selection */}
            <div className="mt-6">
              <Label className="mb-2 block">Select Payment Method</Label>
              <Tabs defaultValue="mpesa" onValueChange={(value) => setPaymentMethod(value as 'mpesa' | 'card' | 'pesapal')}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="mpesa" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    M-Pesa
                  </TabsTrigger>
                  <TabsTrigger value="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Card
                  </TabsTrigger>
                  <TabsTrigger value="pesapal" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    PesaPal
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="mpesa" className="pt-4">
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-sm text-blue-700">
                      You will be redirected to complete payment via M-Pesa on the next screen.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
                
                <TabsContent value="card" className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber" 
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={orderDetails.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Expiry Date</Label>
                      <Input 
                        id="cardExpiry" 
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={orderDetails.cardExpiry}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardCvv">CVV</Label>
                      <Input 
                        id="cardCvv" 
                        name="cardCvv"
                        placeholder="123"
                        value={orderDetails.cardCvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input 
                      id="cardName" 
                      name="cardName"
                      placeholder="John Doe"
                      value={orderDetails.cardName}
                      onChange={handleInputChange}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="pesapal" className="pt-4">
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-sm text-green-700">
                      You will be redirected to PesaPal to complete your payment after submitting the order.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay KES ${orderDetails.price.toLocaleString()}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}