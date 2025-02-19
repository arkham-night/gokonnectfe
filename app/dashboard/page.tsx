"use client";

"use client"

import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Languages, Shield } from 'lucide-react'

interface Driver {
  id: string
  name: string
  photo: string
  rating: number
  languages: string[]
  experience: string
  available: boolean
}

export default function DashboardPage() {
  const drivers: Driver[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
      rating: 4.8,
      languages: ['English', 'Hindi'],
      experience: '5 years',
      available: true
    },
    {
      id: '2',
      name: 'Priya Singh',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
      rating: 4.9,
      languages: ['English', 'Hindi', 'Punjabi'],
      experience: '3 years',
      available: true
    },
    {
      id: '3',
      name: 'Amit Patel',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
      rating: 4.7,
      languages: ['English', 'Gujarati'],
      experience: '4 years',
      available: false
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Available Drivers</h1>
          <p className="text-muted-foreground">Choose from our professional chauffeurs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver, index) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    className="object-cover w-full h-48"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{driver.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>{driver.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="h-5 w-5 text-primary" />
                      <span>{driver.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Available for long trips</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full" disabled={!driver.available}>
                      {driver.available ? 'Book Now' : 'Currently Unavailable'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}