
import React from "react";
import { Metadata } from "next";
import { stats } from "@/lib/constants";
import { CircleIcon, Users, Calendar, ShoppingBag, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Our Performance | Laundry Basket",
  description: "See how Laundry Basket has grown and the impact we've made in the laundry service industry.",
};

const iconMap = {
  Users: Users,
  Calendar: Calendar,
  ShoppingBag: ShoppingBag,
  ThumbsUp: ThumbsUp,
};

export default function StatsPage() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Our Performance</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          At Laundry Basket, we take pride in our growth and the trust our customers place in us.
          Here's a look at our journey by the numbers.
        </p>
      </div>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap] || CircleIcon;
            
            return (
              <Card key={stat.id} className="text-center h-full transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="mx-auto p-2 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-primary">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg font-medium text-gray-700">{stat.label}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Growth Over Time</h2>
            <p className="text-gray-600 mb-4">
              Since our founding, we've seen consistent growth in both our customer base and service volume. 
              Our commitment to quality and customer satisfaction has fueled our expansion throughout the region.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary flex-shrink-0"></span>
                <span>Started with just 2 washing machines in 2022</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary flex-shrink-0"></span>
                <span>Expanded to 3 locations across the city by 2024</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary flex-shrink-0"></span>
                <span>Added premium dry cleaning services in 2023</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary flex-shrink-0"></span>
                <span>Launched mobile app for easy scheduling in 2025</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary flex-shrink-0"></span>
                <span>Processing over 2,000 loads per week in 2025</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Customer Satisfaction</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium">Overall Satisfaction</span>
                  <span className="text-primary font-medium">99%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "99%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium">On-time Delivery</span>
                  <span className="text-primary font-medium">97%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "97%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium">Cleanliness Quality</span>
                  <span className="text-primary font-medium">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "98%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium">Customer Service</span>
                  <span className="text-primary font-medium">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "96%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Environmental Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto p-2 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold">30%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Less water used compared to home washing</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto p-2 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold">100%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Eco-friendly detergents and chemicals</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto p-2 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold">10k+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Reusable packaging bags in circulation</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Join Our Growing Customer Base</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Experience the difference that thousands of satisfied customers are already enjoying.
            Let us take care of your laundry needs while you focus on what matters most to you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/pricing" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
            >
              View Our Plans
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md border border-primary bg-transparent px-6 py-3 text-primary font-medium hover:bg-primary/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}