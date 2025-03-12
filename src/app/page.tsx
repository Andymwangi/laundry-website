import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import About from '@/components/home/About'
import Testimonials from '@/components/home/Testimonials'
import Stats from '@/components/home/Stats'
import Contact from '@/components/home/Contact'

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Stats />
      <Contact />
    </div>
  )
}