
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { ContactFormDialog } from '@/components/ui/contact-form'

// Import shared configuration
export { dynamic, runtime, generateStaticParams } from '../page-config';

const services = [
  {
    id: 'washing',
    title: 'Regular Washing',
    description: 'Expert wash services for everyday clothing items using premium detergents and state-of-the-art machines.',
    features: [
      'Stain treatment for stubborn spots',
      'Temperature-appropriate washing',
      'Color separation to prevent bleeding',
      'Gentle cycle for delicate fabrics',
      'Fresh-scent options available',
    ],
    image: '/images/services/washing.jpg',
  },
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning',
    description: 'Professional dry cleaning for special garments, suits, dresses, and delicate fabrics that require special care.',
    features: [
      'Gentle chemical process for delicate fabrics',
      'Suitable for wool, silk, and specialty textiles',
      'Preserves garment color and structure',
      'Pressing and finishing included',
      'Individual garment inspection',
    ],
    image: '/images/services/dry-cleaning.jpg',
  },
  {
    id: 'ironing',
    title: 'Ironing & Pressing',
    description: 'Expert ironing and pressing services to ensure your clothes look crisp, professional, and wrinkle-free.',
    features: [
      'Temperature-appropriate ironing',
      'Steam pressing for stubborn wrinkles',
      'Special attention to collars and cuffs',
      'Folding or hanging as preferred',
      'Available as standalone or with wash services',
    ],
    image: '/images/services/ironing.jpg',
  },
  {
    id: 'folding',
    title: 'Folding & Packaging',
    description: 'Meticulous folding and packaging to keep your laundry organized and ready to put away when returned.',
    features: [
      'KonMari-inspired folding techniques',
      'Categorization by garment type',
      'Eco-friendly packaging options',
      'Hanging service for dress shirts and suits',
      'Special requests accommodated',
    ],
    image: '/images/services/folding.jpg',
  },
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We offer comprehensive laundry solutions tailored to your specific needs
        </p>
        <Separator className="my-8 max-w-md mx-auto" />
      </div>

      <div className="grid gap-8 md:gap-12">
        {services.map((service, index) => (
          <Card key={service.id} className={`overflow-hidden ${index % 2 ? 'md:flex-row-reverse' : ''} md:flex`}>
            <div className="md:w-1/3 relative h-64 md:h-auto min-h-[250px] flex-shrink-0">
              <Image 
                src={service.image} 
                alt={service.title} 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index < 2} // Load first two images with priority
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-lg">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-3">What we offer:</h3>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-blue-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Special Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Commercial Laundry Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Tailored services for businesses including hotels, restaurants, spas, and healthcare facilities. We offer bulk processing with consistent quality and reliable delivery schedules.
              </p>
              <ContactFormDialog />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Subscription Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Weekly or monthly laundry plans at discounted rates. Perfect for busy professionals and families who want to save time and enjoy the convenience of regular laundry service.
              </p>
              <Button variant="outline" asChild>
                <Link href="/services">View Plans</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}