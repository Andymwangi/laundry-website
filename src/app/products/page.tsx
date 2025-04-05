// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth/auth-context';

// Define product types
type ProductCategory = 'laundry' | 'dry_cleaning' | 'household' | 'supplies';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  tags?: string[];
  isBestSeller?: boolean;
}

// Product data
const PRODUCTS: Product[] = [
  {
    id: 'reg-wash',
    name: 'Regular Wash & Fold',
    description: 'Standard cleaning for everyday items. Per kg pricing.',
    price: 50,
    category: 'laundry',
    image: '/products/regular-wash.jpg',
    tags: ['everyday', 'shirts', 'general'],
  },
  {
    id: 'prem-wash',
    name: 'Premium Wash & Fold',
    description: 'Premium service with stain treatment and fabric care. Per kg pricing.',
    price: 80,
    category: 'laundry',
    image: '/products/premium-wash.jpg',
    tags: ['premium', 'stain treatment'],
    isBestSeller: true,
  },
  {
    id: 'express-wash',
    name: 'Express Wash (Same Day)',
    description: 'Fast turnaround for urgent laundry needs. Completed same day when dropped before 10 AM.',
    price: 100,
    category: 'laundry',
    image: '/products/express-wash.jpg',
    tags: ['express', 'same day', 'urgent'],
    isBestSeller: true,
  },
  {
    id: 'subscription',
    name: 'Monthly Subscription',
    description: 'Regular laundry service with scheduled pickups and deliveries. 20kg per month.',
    price: 3500,
    category: 'laundry',
    image: '/products/subscription.jpg',
    tags: ['subscription', 'regular', 'monthly'],
  },
  {
    id: 'suit-clean',
    name: 'Suit Cleaning',
    description: 'Professional cleaning for suits and formal wear.',
    price: 650,
    category: 'dry_cleaning',
    image: '/products/suit-cleaning.jpg',
    tags: ['formal', 'professional'],
  },
  {
    id: 'dress-clean',
    name: 'Dress Cleaning',
    description: 'Gentle cleaning for all types of dresses.',
    price: 450,
    category: 'dry_cleaning',
    image: '/products/dress-cleaning.jpg',
    tags: ['formal', 'special occasion'],
  },
  {
    id: 'wedding-dress',
    name: 'Wedding Dress Cleaning',
    description: 'Specialized cleaning and preservation for wedding gowns.',
    price: 2500,
    category: 'dry_cleaning',
    image: '/products/wedding-dress.jpg',
    tags: ['wedding', 'special occasion', 'preservation'],
  },
  {
    id: 'leather-clean',
    name: 'Leather & Suede Cleaning',
    description: 'Expert care for leather and suede garments.',
    price: 1200,
    category: 'dry_cleaning',
    image: '/products/leather-clean.jpg',
    tags: ['leather', 'suede', 'specialty'],
  },
  {
    id: 'curtain-clean',
    name: 'Curtain Cleaning',
    description: 'Deep cleaning for curtains of all sizes. Pricing per panel.',
    price: 350,
    category: 'household',
    image: '/products/curtain-cleaning.jpg',
    tags: ['home', 'household'],
  },
  {
    id: 'bedding',
    name: 'Bedding & Comforters',
    description: 'Deep cleaning for all bedding items. Fixed price per item.',
    price: 500,
    category: 'household',
    image: '/products/bedding-cleaning.jpg',
    tags: ['home', 'bedding', 'comforters'],
  },
  {
    id: 'carpet-clean',
    name: 'Carpet Cleaning',
    description: 'Professional carpet cleaning service. Price per square meter.',
    price: 150,
    category: 'household',
    image: '/products/carpet-clean.jpg',
    tags: ['carpet', 'household', 'deep cleaning'],
  },
  {
    id: 'sofa-clean',
    name: 'Sofa & Upholstery Cleaning',
    description: 'Refresh your furniture with our professional cleaning service.',
    price: 1800,
    category: 'household',
    image: '/products/sofa-clean.jpg',
    tags: ['furniture', 'upholstery', 'household'],
  },
  {
    id: 'eco-detergent',
    name: 'Eco-Friendly Detergent',
    description: 'Environmentally friendly detergent option for your laundry.',
    price: 120,
    category: 'supplies',
    image: '/products/eco-detergent.jpg',
    tags: ['eco', 'supplies'],
  },
  {
    id: 'stain-remover',
    name: 'Professional Stain Remover',
    description: 'Advanced stain removal treatment for tough stains.',
    price: 180,
    category: 'supplies',
    image: '/products/stain-remover.jpg',
    tags: ['stain', 'supplies'],
  },
  {
    id: 'fabric-softener',
    name: 'Premium Fabric Softener',
    description: 'Luxury fabric softener that leaves clothes feeling soft and fresh.',
    price: 150,
    category: 'supplies',
    image: '/products/fabric-softener.jpg',
    tags: ['softener', 'supplies', 'premium'],
  },
  {
    id: 'laundry-bag',
    name: 'Reusable Laundry Bag',
    description: 'Durable and washable laundry bag for storing and transporting clothes.',
    price: 250,
    category: 'supplies',
    image: '/products/laundry-bag.jpg',
    tags: ['bag', 'storage', 'eco-friendly'],
  },
];

export default function ProductsPage() {
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const router = useRouter();
  const { user } = useAuth();

  // Filter products by category
  const filteredProducts = category === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === category);

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    if (!user) {
      // Store product in localStorage to retrieve after login
      localStorage.setItem('cartProduct', JSON.stringify(product));
      router.push(`/auth/login?returnUrl=/dashboard/checkout&product=${product.id}`);
      return;
    }

    // If user is logged in, add to cart directly
    // In a real implementation, this would call an API to add to the user's cart
    // For now, we'll just redirect to checkout with the product info
    router.push(`/dashboard/checkout?product=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}`);
  };

  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services & Products</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our comprehensive range of laundry and dry cleaning services.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <Button
          variant={category === 'all' ? 'default' : 'outline'}
          onClick={() => setCategory('all')}
          className="rounded-full"
        >
          All Services
        </Button>
        <Button
          variant={category === 'laundry' ? 'default' : 'outline'}
          onClick={() => setCategory('laundry')}
          className="rounded-full"
        >
          Laundry
        </Button>
        <Button
          variant={category === 'dry_cleaning' ? 'default' : 'outline'}
          onClick={() => setCategory('dry_cleaning')}
          className="rounded-full"
        >
          Dry Cleaning
        </Button>
        <Button
          variant={category === 'household' ? 'default' : 'outline'}
          onClick={() => setCategory('household')}
          className="rounded-full"
        >
          Household
        </Button>
        <Button
          variant={category === 'supplies' ? 'default' : 'outline'}
          onClick={() => setCategory('supplies')}
          className="rounded-full"
        >
          Supplies
        </Button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col h-full relative overflow-hidden">
            {product.isBestSeller && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 z-10">
                BEST SELLER
              </div>
            )}
            
            <div className="h-48 bg-gray-100 relative">
              {/* Placeholder for product image - in a real app, use Next.js Image component */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                {product.name}
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge className="ml-2">{product.category.replace('_', ' ')}</Badge>
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="grow">
              <div className="flex flex-wrap gap-1 mt-2">
                {product.tags?.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-between items-center mt-auto">
              <div className="font-bold text-lg">KES {product.price}</div>
              <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 