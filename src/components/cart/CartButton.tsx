// @ts-nocheck
'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function CartButton({ variant = 'outline', size = 'default', className }: CartButtonProps) {
  const { totalItems } = useCart();
  
  return (
    <Button
      variant={variant}
      size={size}
      className={cn('relative', className)}
      asChild
    >
      <Link href="/dashboard/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
} 