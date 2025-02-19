"use client";

"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star, Phone } from 'lucide-react'

interface RideRequest {
  id: string
  pickup: string
  destination: string
  time: string
  fare: string
}

export default function DriversPage() {
  const [isAvailable, setIsAvailable] = useState(false)
  const [requests] = useState<RideRequest[]>([
    {
      id: '1',
      pickup: 'Downtown Mall',
      destination: 'Airport Terminal 2',
      time: '10:30 AM',
      fare: '$45'
    },
    {
      id: '2',
      pickup: 'Hotel Grand',
      destination: 'Convention Center',
      time: '11:45 AM',
      fare: '$30'
    },
    {
      id: '3',
      pickup: 'Central Park',
      destination: 'Business District',
      time: '1:15 PM',
      fare: '$25'
    }
  ])

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Driver Dashboard</h1>
              <p className="text-muted-foreground">Manage your availability and ride requests</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                {isAvailable ? 'Available' : 'Unavailable'}
              </span>
              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Incoming Ride Requests</h2>
          {requests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">{request.time}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <span>{request.pickup}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{request.destination}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">{request.fare}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button size="sm">Accept Ride</Button>
                    </div>
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