'use client'
import { useState, useRef, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { toast, Toaster } from 'sonner'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Specify the correct type for the form reference
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Access environment variables with type checking
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const formId = process.env.NEXT_PUBLIC_EMAILJS_FORM_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Validate that all required values are present
    if (!serviceId || !formId || !publicKey || !formRef.current) {
      console.error('Missing EmailJS configuration or form reference');
      toast.error('Email service is not properly configured. Please contact the administrator.');
      setIsSubmitting(false);
      return;
    }

    // Now TypeScript knows these are strings and the form is defined
    emailjs.sendForm(serviceId, formId, formRef.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        formRef.current?.reset();
        toast.success('We\'ve received your message and will get back to you soon!');
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        toast.error('Failed to send your message. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

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
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <Input id="first-name" name="first_name" placeholder="Enter your first name" required />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <Input id="last-name" name="last_name" placeholder="Enter your last name" required />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" required />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <Input id="subject" name="subject" placeholder="How can we help you?" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us more about your inquiry..."
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
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