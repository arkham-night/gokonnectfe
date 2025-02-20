"use client";

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Shield, Clock, CreditCard, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Safe & Secure",
      description: "All our drivers are verified and background checked for your safety"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "24/7 Availability",
      description: "Book a professional driver anytime, anywhere"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Affordable Rates",
      description: "Competitive pricing with no hidden charges"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Your Personal Chauffeur,{" "}
                <span className="text-primary">On Demand</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Experience the luxury of professional chauffeur services at your fingertips. Safe, reliable, and available 24/7.
              </p>
              <Button size="lg" className="text-lg" asChild>
                <Link href="/pick-a-driver">
                  Find a Driver <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Professional Chauffeur"
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose GoKonnect?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}