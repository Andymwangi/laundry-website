'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TinypesaPaymentProps {
  amount: number;
  orderId: string;
  phoneNumber: string;
  onSuccess?: (transactionId: string) => void;
  onFailure?: (error: any) => void;
}

export default function TinypesaPaymentButton({
  amount,
  orderId,
  phoneNumber,
  onSuccess,
  onFailure
}: TinypesaPaymentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    // Validate phone number - should be a valid Kenyan format
    if (!phoneNumber.match(/^(0|254|\+254)7[0-9]{8}$/)) {
      setMessage('Please enter a valid Kenyan phone number');
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus('processing');

    try {
      // Format the phone number to international format (254XXXXXXXXX)
      const formattedPhone = phoneNumber.startsWith('+') 
        ? phoneNumber.substring(1) 
        : phoneNumber.startsWith('0') 
          ? '254' + phoneNumber.substring(1) 
          : phoneNumber;

      // Call the API endpoint to initiate payment
      const response = await fetch('/api/tinypesa/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          msisdn: formattedPhone,
          account_no: orderId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initiate payment');
      }

      // Payment initiated successfully, show waiting message
      setMessage('Payment request sent! Please check your phone for the M-Pesa prompt and enter your PIN.');
      setStatus('success');
      
      // In a real implementation, you would check the status via a webhook or callback
      // For demo purposes, we'll simulate success after some time
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(data.request_id || orderId);
        } else {
          router.push(`/dashboard/orders/confirmation?orderId=${orderId}&status=success`);
        }
      }, 5000);
      
    } catch (error) {
      console.error('Payment error:', error);
      setMessage(error instanceof Error ? error.message : 'Payment failed. Please try again.');
      setStatus('error');
      
      if (onFailure) {
        onFailure(error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === 'processing') {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm text-gray-600">Sending payment request to M-Pesa...</p>
      </div>
    );
  }

  if (status === 'success' && message) {
    return (
      <Alert className="bg-green-50 border-green-200 my-4">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700">
          {message}
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'error' && message) {
    return (
      <>
        <Alert className="bg-red-50 border-red-200 my-4">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            {message}
          </AlertDescription>
        </Alert>
        <Button 
          onClick={() => setStatus('idle')} 
          className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
        >
          Try Again
        </Button>
      </>
    );
  }

  return (
    <Button 
      onClick={handlePayment} 
      className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
      disabled={loading}
    >
      {loading ? 'Processing...' : `Pay KES ${amount.toLocaleString()} with M-Pesa`}
    </Button>
  );
} 