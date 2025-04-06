import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import About from '@/components/home/About'
import Testimonials from '@/components/home/Testimonials'
import Stats from '@/components/home/Stats'
import Contact from '@/components/home/Contact'
import { Suspense } from 'react'

// Import shared configuration
export { dynamic, runtime, generateStaticParams } from './page-config'

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Hero...</div>}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 bg-white">Loading Services...</div>}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 bg-gray-50">Loading About...</div>}>
        <About />
      </Suspense>
      
      <Suspense fallback={<div className="py-20 bg-gray-50">Loading Testimonials...</div>}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 bg-white">Loading Stats...</div>}>
        <Stats />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 bg-gray-50">Loading Contact...</div>}>
        <Contact />
      </Suspense>
    </main>
  )
}