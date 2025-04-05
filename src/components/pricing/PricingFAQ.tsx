'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Define the FAQ item type
interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How is the weight of my laundry determined?",
    answer: "We weigh your laundry when it's dry, before washing. This provides the most accurate and fair measurement for pricing purposes. You're welcome to witness the weighing process when you drop off your items."
  },
  {
    question: "What if I have a mixture of regular and delicate items?",
    answer: "We carefully sort your laundry and charge according to the appropriate service level for each type of garment. Delicate items are priced at our Premium Service rate, while regular items follow the Basic Wash pricing, unless you've chosen our Subscription plan which covers both."
  },
  {
    question: "Is there a minimum order requirement?",
    answer: "Yes, we have a minimum order of 5 kilos for our wash and fold service. For smaller loads, we offer a flat-rate small load service at KES 60 per kilo. Our subscription plans don't have a minimum weight requirement per drop-off."
  },
  {
    question: "How does the subscription plan work?",
    answer: "Our subscription gives you up to 40 kilos of laundry service per month with unlimited drop-offs. You can bring in any amount at a time, and we'll track your monthly usage. Unused kilos roll over to the next month for up to 30 days, giving you flexibility with your laundry schedule."
  },
  {
    question: "Are there any additional fees I should know about?",
    answer: "We pride ourselves on transparent pricing. The only additional charges would be for special stain treatments in our Basic Wash plan, express service upgrades, or handling extremely soiled items that require extra care. We always communicate any potential additional charges before proceeding."
  },
  {
    question: "How does pickup and delivery pricing work?",
    answer: "For Basic Wash customers, pickup and delivery is KES 150 each way. Premium Service customers receive free delivery for orders over KES 1500. Our Subscription plan includes unlimited free pickup and delivery within our service area as part of your monthly fee."
  },
  {
    question: "Can I cancel my subscription plan?",
    answer: "Yes, you can cancel your subscription at any time with no cancellation fees. We process subscription payments on a monthly basis, and you'll continue to have access to your subscription benefits until the end of your current billing cycle."
  }
];

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const PricingFAQ = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our pricing and services.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((faqItem, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
              >
                <AccordionItem value={`item-${index}`} className="border rounded-lg p-1 shadow-sm">
                  <AccordionTrigger className="px-4 py-3 text-left font-medium text-lg text-gray-900 hover:text-blue-600">
                    {faqItem.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-1 text-gray-600">
                    {faqItem.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Have more questions? <a href="/contact" className="text-blue-600 font-medium hover:underline">Contact our team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;