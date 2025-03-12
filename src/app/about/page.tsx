import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Laundry Basket</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Your trusted partner for all laundry needs since 2022
        </p>
        <Separator className="my-8 max-w-md mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <Image 
            src="/images/about-us.jpg" 
            alt="About Laundry Basket" 
            width={600} 
            height={400} 
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="mb-4">
            Laundry Basket was founded in 2022 with a simple mission: to provide high-quality laundry services that make people's lives easier. What started as a small family business has grown into a trusted name in professional laundry care across the region.
          </p>
          <p className="mb-4">
            Our journey began when our founder, John Chege, recognized the need for reliable and convenient laundry services for busy professionals and families. With a commitment to exceptional quality and customer satisfaction, Laundry Basket quickly became known for its attention to detail and personalized service around Juja, Kiambu County and its outskirts.
          </p>
          <p className="mb-6">
            Today, we serve many residential and commercial clients, offering comprehensive laundry solutions that save time and deliver consistent results. Our team of experienced professionals treats each garment with care, using eco-friendly products and modern equipment to ensure the best possible outcome.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">✓</span>
              <span><strong>Quality:</strong> We pay attention to every detail and treat each item with care.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">✓</span>
              <span><strong>Reliability:</strong> Consistent service you can count on, every time.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">✓</span>
              <span><strong>Sustainability:</strong> Eco-friendly practices and products that protect your clothes and our planet.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">✓</span>
              <span><strong>Customer-Centric:</strong> Your satisfaction is our top priority.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Collection</h3>
            <p>We collect your laundry at your convenience, with flexible scheduling options including same-day pickup for urgent needs.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Processing</h3>
            <p>Our expert team sorts, treats, and processes your items using premium detergents and state-of-the-art equipment.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Delivery</h3>
            <p>We return your freshly cleaned items neatly folded or hung, packaged with care, and delivered right to your door.</p>
          </div>
        </div>
      </div>
    </div>
  )
}