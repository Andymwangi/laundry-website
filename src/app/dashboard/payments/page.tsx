'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Clock, Smartphone } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Important: Move to a separate client component
export default function PaymentPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Complete Payment</h1>
        <PaymentClient />
      </div>
    </div>
  );
}

// Client component that uses hooks
function PaymentClient() {
  // Use the hooks in the client component that doesn't affect initial render
  const [orderId, setOrderId] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderData, setOrderData] = useState({
    id: orderId,
    amount: 1250,
    currency: 'KES',
    servicePlan: 'premium',
    kilograms: 2,
  });

  // Get URL parameters in useEffect to avoid SSR issues
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderIdParam = searchParams.get('orderId');
    if (orderIdParam) {
      setOrderId(orderIdParam);
      // Update order data with the new ID
      setOrderData(prev => ({
        ...prev,
        id: orderIdParam
      }));
    }
  }, []);
  
  const handleMpesaPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    
    setLoading(true);
    setPaymentStatus('processing');
    
    try {
      // Simulate API call to initiate MPesa payment
      // In a real app, you would call your backend API to initiate the payment
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful payment
      setPaymentStatus('success');
      
      // Redirect to confirmation page after successful payment
      setTimeout(() => {
        window.location.href = `/orders/confirmation?orderId=${orderId}`;
      }, 2000);
      
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
      setLoading(false);
    }
  };
  
  return (
    <div className="grid gap-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Order #{orderId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Service Plan:</span>
            <span className="font-medium capitalize">{orderData.servicePlan}</span>
          </div>
          
          {orderData.servicePlan !== 'subscription' && (
            <div className="flex justify-between">
              <span>Weight:</span>
              <span className="font-medium">{orderData.kilograms} kg</span>
            </div>
          )}
          
          <Separator />
          
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>{orderData.currency} {orderData.amount.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mpesa">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="mpesa" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                M-Pesa
              </TabsTrigger>
            </TabsList>
            <TabsContent value="mpesa" className="pt-4">
              {paymentStatus === 'idle' && (
                <form onSubmit={handleMpesaPayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      placeholder="e.g., 07XXXXXXXX" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-sm text-blue-700">
                      You will receive an M-Pesa prompt on your phone to complete the payment.
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    Pay {orderData.currency} {orderData.amount.toLocaleString()} via M-Pesa
                  </Button>
                </form>
              )}
              
              {paymentStatus === 'processing' && (
                <div className="text-center py-6">
                  <Clock className="h-12 w-12 text-blue-500 mx-auto animate-pulse mb-4" />
                  <h3 className="text-lg font-medium mb-2">Processing Payment</h3>
                  <p className="text-gray-600 mb-4">
                    Please check your phone and approve the M-Pesa payment request.
                  </p>
                  <div className="mx-auto w-12 h-1 bg-gray-200 rounded-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-blue-500 animate-progress"></div>
                  </div>
                </div>
              )}
              
              {paymentStatus === 'success' && (
                <div className="text-center py-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 mb-6">
                    Your payment of {orderData.currency} {orderData.amount.toLocaleString()} has been received.
                  </p>
                  <p className="text-sm text-gray-500">
                    Redirecting to your order confirmation...
                  </p>
                </div>
              )}
              
              {paymentStatus === 'failed' && (
                <div className="text-center py-6">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Payment Failed</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't process your payment. Please try again.
                  </p>
                  <Button 
                    onClick={() => setPaymentStatus('idle')} 
                    className="bg-blue-600"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}