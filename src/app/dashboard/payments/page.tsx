// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ArrowLeft, CheckCircle, Clock, CreditCard, ExternalLink, Smartphone } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import TinypesaPaymentButton from '@/components/TinypesaPaymentButton';

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
  const router = useRouter();
  // Use the hooks in the client component that doesn't affect initial render
  const [orderId, setOrderId] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'tinypesa' | 'pesapal'>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: ''
  });
  const [orderData, setOrderData] = useState({
    id: orderId,
    amount: 1250,
    currency: 'KES',
    servicePlan: 'premium',
    kilograms: 2,
  });
  
  // Card payment details
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle customer information changes
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // If phone field is changed, update the phoneNumber state too
    if (name === 'phone') {
      setPhoneNumber(value);
    }
  };

  // Get URL parameters in useEffect to avoid SSR issues
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderIdParam = searchParams.get('orderId');
    const priceParam = searchParams.get('price');
    const methodParam = searchParams.get('method') as 'mpesa' | 'card' | 'tinypesa' | 'pesapal' | null;
    
    if (orderIdParam) {
      setOrderId(orderIdParam);
      // Update order data with the new ID
      setOrderData(prev => ({
        ...prev,
        id: orderIdParam
      }));
    }
    
    if (priceParam) {
      setOrderData(prev => ({
        ...prev,
        amount: Number(priceParam)
      }));
    }
    
    if (methodParam && ['mpesa', 'card', 'tinypesa', 'pesapal'].includes(methodParam)) {
      setPaymentMethod(methodParam);
    }
  }, []);
  
  // Handle successful Tinypesa payment
  const handleTinypesaSuccess = (transactionId: string) => {
    // Set success status
    setPaymentStatus('success');
    
    // Redirect to confirmation page after successful payment
    setTimeout(() => {
      router.push(`/dashboard/orders/confirmation?orderId=${orderId}&status=success&paymentId=${transactionId}`);
    }, 2000);
  };

  const handleTinypesaFailure = (error: any) => {
    console.error('Payment failed:', error);
    setPaymentStatus('failed');
  };
  
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
        router.push(`/dashboard/orders/confirmation?orderId=${orderId}&status=success`);
      }, 2000);
      
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
      setLoading(false);
    }
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (
      !cardDetails.cardNumber.trim() || 
      !cardDetails.cardExpiry.trim() || 
      !cardDetails.cardCvv.trim() || 
      !cardDetails.cardName.trim()
    ) {
      return;
    }
    
    setLoading(true);
    setPaymentStatus('processing');
    
    try {
      // Simulate API call to process card payment
      // In a real app, you would integrate with a payment gateway
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful payment
      setPaymentStatus('success');
      
      // Redirect to confirmation page after successful payment
      setTimeout(() => {
        router.push(`/dashboard/orders/confirmation?orderId=${orderId}&status=success`);
      }, 2000);
      
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
      setLoading(false);
    }
  };

  const handlePesapalPayment = async () => {
    setLoading(true);
    
    try {
      // In a real app, you would redirect to PesaPal
      // Simulate API delay before redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would be replaced with a redirect to PesaPal
      window.open('https://www.pesapal.com', '_blank');
      
      // For demo purposes, let's simulate a successful payment after "returning" from PesaPal
      setPaymentStatus('success');
      
      setTimeout(() => {
        router.push(`/dashboard/orders/confirmation?orderId=${orderId}&status=success`);
      }, 3000);
      
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
      setLoading(false);
    }
  };
  
  // Render different UI based on payment status
  if (paymentStatus === 'success') {
    return (
      <Card className="text-center py-6">
        <CardContent className="pt-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-6">
            Your payment of {orderData.currency} {orderData.amount.toLocaleString()} has been received.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Order ID: {orderId}
          </p>
          <div className="animate-pulse mb-4">
            Redirecting to your order confirmation...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (paymentStatus === 'processing') {
    return (
      <Card className="text-center py-6">
        <CardContent className="pt-6">
          <Clock className="h-16 w-16 text-blue-500 mx-auto animate-pulse mb-4" />
          <h3 className="text-xl font-medium mb-2">Processing Payment</h3>
          <p className="text-gray-600 mb-6">
            {paymentMethod === 'mpesa' || paymentMethod === 'tinypesa'
              ? 'Please check your phone and approve the M-Pesa payment request.'
              : paymentMethod === 'pesapal'
              ? 'Connecting to PesaPal...'
              : 'Processing your payment. Please wait...'}
          </p>
          <div className="mx-auto w-full max-w-xs h-2 bg-gray-200 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-blue-500 animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <Card className="text-center py-6">
        <CardContent className="pt-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Payment Failed</h3>
          <p className="text-gray-600 mb-6">
            We couldn't process your payment. Please try again.
          </p>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
            <Button 
              variant="outline"
              onClick={() => router.push('/dashboard/checkout')}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Checkout
            </Button>
            <Button 
              onClick={() => setPaymentStatus('idle')} 
              className="bg-blue-600"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Review your order details before payment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between pb-4 border-b">
              <span>Order ID</span>
              <span className="font-medium">{orderId}</span>
            </div>
            <div className="flex justify-between pb-4 border-b">
              <span>Service Plan</span>
              <span className="font-medium">{orderData.servicePlan}</span>
            </div>
            {orderData.kilograms && (
              <div className="flex justify-between pb-4 border-b">
                <span>Weight</span>
                <span className="font-medium">{orderData.kilograms} kg</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>{orderData.currency} {orderData.amount.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Choose your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue={paymentMethod} 
            onValueChange={(value) => setPaymentMethod(value as 'mpesa' | 'card' | 'tinypesa' | 'pesapal')}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mpesa" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                M-Pesa
              </TabsTrigger>
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Card
              </TabsTrigger>
              <TabsTrigger value="tinypesa" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                TinyPesa
              </TabsTrigger>
              <TabsTrigger value="pesapal" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                PesaPal
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mpesa" className="pt-4">
              <form onSubmit={handleMpesaPayment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    type="tel" 
                    placeholder="e.g., 07XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">Enter the phone number registered with M-Pesa.</p>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-sm text-blue-700">
                    You will receive a prompt on your phone to enter your M-Pesa PIN.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  Pay {orderData.currency} {orderData.amount.toLocaleString()} with M-Pesa
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="card" className="pt-4">
              <form onSubmit={handleCardPayment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input 
                    id="cardName" 
                    name="cardName" 
                    placeholder="Enter name as shown on card"
                    value={cardDetails.cardName}
                    onChange={handleCardInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    name="cardNumber" 
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input 
                      id="cardExpiry" 
                      name="cardExpiry" 
                      placeholder="MM/YY"
                      value={cardDetails.cardExpiry}
                      onChange={handleCardInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input 
                      id="cardCvv" 
                      name="cardCvv" 
                      placeholder="XXX"
                      value={cardDetails.cardCvv}
                      onChange={handleCardInputChange}
                      required
                    />
                  </div>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-sm text-blue-700">
                    Your card details are secure. We use industry-standard encryption.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  Pay {orderData.currency} {orderData.amount.toLocaleString()} with Card
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="tinypesa" className="pt-4">
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200 mb-4">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-sm text-green-700">
                    TinyPesa provides a simple and secure way to pay with M-Pesa.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">M-Pesa Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel"
                      placeholder="e.g., 07XX XXX XXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">Enter the phone number registered with M-Pesa that you wish to pay from.</p>
                  </div>
                </div>
                
                <TinypesaPaymentButton 
                  amount={orderData.amount} 
                  orderId={orderId}
                  phoneNumber={phoneNumber}
                  onSuccess={handleTinypesaSuccess}
                  onFailure={handleTinypesaFailure}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="pesapal" className="pt-4">
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-700">
                    PesaPal lets you pay using credit cards, debit cards, or mobile money.
                  </AlertDescription>
                </Alert>
                
                <div className="text-center my-6">
                  <p className="mb-4">
                    You will be redirected to PesaPal to complete your payment of {orderData.currency} {orderData.amount.toLocaleString()}.
                  </p>
                </div>
                
                <Button 
                  onClick={handlePesapalPayment} 
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                  disabled={loading}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Continue to PesaPal
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}