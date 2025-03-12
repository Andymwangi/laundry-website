'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Clock, Award, Users, ShieldCheck } from 'lucide-react';

const featureItem = (Icon: any, title: string, description: string, delay: number) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="flex items-start"
  >
    <div className="mr-4 bg-blue-100 p-3 rounded-lg text-blue-600">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/about-us.jpg"
                alt="About Laundry Basket"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex gap-4 items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Trusted by</p>
                  <p className="text-xl font-bold">10,000+ Customers</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-8 -left-8 p-2 bg-blue-600 rounded-lg text-white font-bold">
              Since 2022
            </div>
          </motion.div>
          
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="text-blue-600 font-medium mb-3"
            >
              About Us
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Why will you choose<br/>our services?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-slate-700 mb-8"
            >
              Laundry Basket has been providing exceptional laundry services since 2022. We started as a small family business with a vision to deliver premium laundry solutions with a personal touch. Today, we've grown to become a trusted name in the industry while maintaining our commitment to quality and customer satisfaction.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-slate-700 mb-8"
            >
              We understand that everyone's laundry needs are different. That's why we offer customized solutions for individuals, families, and businesses. Our team of experienced professionals handles your garments with the utmost care, using advanced techniques and eco-friendly products to deliver exceptional results.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {featureItem(Clock, "Time-Saving", "Our efficient service gives you back precious time to focus on what matters most to you.", 0.4)}
              {featureItem(ShieldCheck, "Quality Guaranteed", "We guarantee the highest quality results with our expert handling and premium products.", 0.5)}
              {featureItem(Users, "Experienced Team", "Our skilled professionals have years of experience in handling all types of fabrics and garments.", 0.6)}
              {featureItem(Award, "Award-Winning", "Recognized for excellence with multiple industry awards for outstanding service.", 0.7)}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;