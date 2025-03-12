'use client'
import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import emailjs from '@emailjs/browser'
import { toast, Toaster } from 'sonner'
import { Phone, Mail, Clock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// Define form validation schema
const contactFormSchema = z.object({
  first_name: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  last_name: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
})

// Define the form values type
type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Initialize the form with react-hook-form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  // Function to handle form submission
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Get environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_FORM_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    
    // Validate EmailJS configuration
    if (!serviceId || !templateId || !publicKey) {
      console.error('Missing EmailJS configuration');
      toast.error('Email service is not properly configured. Please contact the administrator.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Send the form using EmailJS with the form values directly
      const result = await emailjs.send(
        serviceId,
        templateId,
        values, // Use the validated form values directly
        publicKey
      );
      
      console.log('Email sent successfully:', result.text);
      toast.success('We\'ve received your message and will get back to you soon!');
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Failed to send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      {/* Add the Toaster component to render toasts */}
      <Toaster position="top-right" />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Have questions about our services? Get in touch with us today!
        </p>
        <Separator className="my-8 max-w-md mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="How can we help you?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us more about your inquiry..." 
                        rows={5}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="grid gap-6">
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Phone className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground mt-1">
                    <a href="tel:+254700071699" className="hover:underline">+254-700-071-699</a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Mail className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground mt-1">
                    <a href="mailto:info@laundrybasket.com" className="hover:underline">info@laundrybasket.com</a>
                  </p>
                  <p className="text-muted-foreground">
                    <a href="mailto:laundrybasket@gmail.com" className="hover:underline">laundrybasket@gmail.com</a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Clock className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-muted-foreground mt-1">Monday - Friday: 7:00 AM - 9:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 8:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground">Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Service Areas</h3>
            <p className="mb-4">
              We proudly serve residential and commercial clients in the following areas:
            </p>
            <ul className="grid grid-cols-2 gap-2">
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Juja Town, Gate A, B, C, D, E</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Kenyatta Road</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Waitethie</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Thika</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Ruiru</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Gachororo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}