import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <Input id="first-name" placeholder="Enter your first name" required />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <Input id="last-name" placeholder="Enter your last name" required />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" required />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <Input id="subject" placeholder="How can we help you?" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell us more about your inquiry..."
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
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
                  <p className="text-muted-foreground mt-1">+254-700-071-699</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Mail className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground mt-1">info@laundrybasket.com</p>
                  <p className="text-muted-foreground">laundrybasket@gmail.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Clock className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-muted-foreground mt-1">Monday - Friday: 7:00 AM - 8:00 PM</p>
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