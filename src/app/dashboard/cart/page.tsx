// @ts-nocheck
'use client';

import * as React from 'react';
import { useCart, CartItem } from '@/components/cart/CartProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MinusCircle, PlusCircle, ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeItem, checkout, addItem } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [processedParams, setProcessedParams] = useState(false);
  
  // Handle URL parameters to add product to cart - only process once
  useEffect(() => {
    if (processedParams) return;
    
    const productId = searchParams.get('product');
    const productName = searchParams.get('name');
    const productPrice = searchParams.get('price');
    const productQuantity = searchParams.get('quantity');
    
    if (productId && productName && productPrice) {
      // Add product to cart with exact quantity
      addItem({
        id: productId,
        name: decodeURIComponent(productName),
        price: Number(productPrice),
        type: 'product',
        quantity: productQuantity ? Number(productQuantity) : 1
      });
      
      // Mark parameters as processed
      setProcessedParams(true);
      
      // Clear URL parameters
      router.replace('/dashboard/cart');
    }
  }, [searchParams, addItem, router, processedParams]);

  if (items.length === 0) {
    return (
      <div className="container max-w-3xl mx-auto py-10 px-4 md:px-6">
        <Card className="text-center p-8">
          <CardContent className="pt-10 pb-10">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">
              You haven't added any items to your cart yet.
            </p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Review your items before checkout</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {items.map((item: CartItem) => (
            <div key={item.id} className="flex justify-between items-start py-4 border-b border-gray-100">
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.type === 'service' && item.details?.plan && `${item.details.plan} Plan`}
                  {item.type === 'product' && 'Product'}
                </p>
                <div className="mt-2">
                  <span className="font-semibold">
                    KES {item.price} {item.type === 'service' && item.details?.plan !== 'subscription' && '/ kg'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                
                <span className="w-8 text-center">{item.quantity}</span>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-red-500"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <Separator className="mb-4" />
          
          <div className="flex justify-between w-full mb-2">
            <span>Subtotal</span>
            <span>KES {totalPrice.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between w-full mb-4">
            <span>Delivery Fee</span>
            <span className="text-green-600">Free</span>
          </div>
          
          <div className="flex justify-between w-full text-lg font-bold mb-6">
            <span>Total</span>
            <span>KES {totalPrice.toLocaleString()}</span>
          </div>
          
          <Button className="w-full" onClick={checkout}>
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
      
      <div className="flex justify-between">
        <Link href="/products">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
        
        <Link href="/dashboard/orders/history">
          <Button variant="outline">View My Orders</Button>
        </Link>
      </div>
    </div>
  );
} 