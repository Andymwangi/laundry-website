// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phoneNumber: string) {
  // Format: (XXX) XXX-XXXX
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumber;
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function calculateServiceTime(serviceType: string, items: number): number {
  const timePerItem = {
    'wash-and-fold': 0.5,
    'dry-cleaning': 1,
    'ironing': 0.3,
    'stain-removal': 0.8,
    'bedding': 1.2,
    'delicates': 0.7
  } as Record<string, number>;

  return Math.ceil(items * (timePerItem[serviceType] || 0.5));
}