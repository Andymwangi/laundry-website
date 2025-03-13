'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Get parameters from URL
  const plan = searchParams.get('plan') || 'basic';
  const kilos = parseInt(searchParams.get('kilos') || '1', 10);
  
  // Service details
  const [orderDetails, setOrderDetails] = useState({
    servicePlan: plan,
    kilograms: plan === 'subscription' ? null : kilos,
    price: 0,
    pickupDate: '',
    pickupTime: '',
    address: '',
    apartment: '',
    city: 'Nairobi',
    postalCode: '',
    phoneNumber: '',
    notes: '',
  });

  // Calculate price based on plan and kilos
  useEffect(() => {
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
      price: calculatedPrice
    }));
  }, [plan, kilos]);
  
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
      // const response = await fetch('/api/services', { 
      //   method: 'POST', 
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderDetails)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to payment page with order ID
      // In a real app, you would get the order ID from the API response
      const mockOrderId = Math.floor(Math.random() * 1000000);
      router.push(`/payment?orderId=${mockOrderId}`);
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
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Complete Your Order</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>KES {orderDetails.price.toLocaleString()}</span>
              </div>
              
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
            </CardContent>
          </Card>
          
          {/* Order Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Pickup Details</CardTitle>
              <CardDescription>Enter your pickup information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                
                <div className="pt-4">
                  <Button type="submit" className="w-full bg-blue-600" disabled={loading}>
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}