// src/lib/validation.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  service: z.string().min(1, { message: 'Please select a service' }),
  date: z.date({
    required_error: 'Please select a date',
    invalid_type_error: 'Please select a valid date',
  }),
  time: z.string().min(1, { message: 'Please select a time' }),
  instructions: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});