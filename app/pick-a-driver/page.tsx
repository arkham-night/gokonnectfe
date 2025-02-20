'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { Star, MessageSquare, Languages, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// This tells us what a driver looks like
type Driver = {
  id: string;
  name: string;
  rating: number;
  personality: 'chatty' | 'quiet';
  languages: string[];
  yearsExperience: number;
  specialties: string[];
  availability: boolean;
  imageUrl: string;
};

// These are our example drivers
const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'John Smith',
    rating: 4.9,
    personality: 'chatty',
    languages: ['English', 'Spanish'],
    yearsExperience: 5,
    specialties: ['Luxury Vehicles', 'Sports Cars', 'Long Distance'],
    availability: true,
    imageUrl: 'https://ui-avatars.com/api/?name=John+Smith'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    rating: 4.8,
    personality: 'quiet',
    languages: ['English', 'French'],
    yearsExperience: 7,
    specialties: ['High Performance Cars', 'Airport Transfers'],
    availability: true,
    imageUrl: 'https://ui-avatars.com/api/?name=Sarah+Johnson'
  },
  {
    id: '3',
    name: 'Michael Chen',
    rating: 4.95,
    personality: 'chatty',
    languages: ['English', 'Mandarin'],
    yearsExperience: 3,
    specialties: ['Luxury Vehicles', 'VIP Services'],
    availability: false,
    imageUrl: 'https://ui-avatars.com/api/?name=Michael+Chen'
  }
];

// This shows one driver card
function DriverCard({ driver }: { driver: Driver }) {
  const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);

  const handleBookDriver = async (driverId: string) => {
    setIsBooking(true);
    try {
      // We'll add the real booking later
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/my-bookings');
    } catch (error) {
      alert('Oops! Could not book the driver');
      setIsBooking(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col items-center space-y-3">
            <img
              src={driver.imageUrl}
              alt={driver.name}
              className="h-24 w-24 rounded-full"
            />
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{driver.rating}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{driver.name}</h3>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{driver.personality}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Languages className="h-4 w-4" />
                  <span>{driver.languages.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{driver.yearsExperience} years experience</span>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-1">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {driver.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button
              className="w-full sm:w-auto"
              onClick={() => handleBookDriver(driver.id)}
              disabled={!driver.availability || isBooking}
            >
              {!driver.availability
                ? 'Not Available'
                : isBooking
                ? 'Booking...'
                : 'Book Now'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// This is the main page that shows all drivers
export default function PickADriverPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    personality: '',
    language: '',
  });

  // This helps us find the right drivers
  const filteredDrivers = mockDrivers.filter(driver => {
    if (filters.personality && driver.personality !== filters.personality) {
      return false;
    }
    if (
      filters.language &&
      !driver.languages.includes(filters.language)
    ) {
      return false;
    }
    return true;
  });

  // If you're not logged in, show this message
  if (!user) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Please Log In First</CardTitle>
            <CardDescription>
              You need to log in to see the drivers
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // This is what you see when you are logged in
  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Pick a Driver</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>
              Find the perfect driver
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Driver Personality</Label>
              <Select
                value={filters.personality}
                onValueChange={(value) =>
                  setFilters(prev => ({ ...prev, personality: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any personality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any personality</SelectItem>
                  <SelectItem value="chatty">Chatty</SelectItem>
                  <SelectItem value="quiet">Quiet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={filters.language}
                onValueChange={(value) =>
                  setFilters(prev => ({ ...prev, language: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any language</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Mandarin">Mandarin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredDrivers.length === 0 ? (
            <Card>
              <CardHeader>
                <CardDescription>
                  No drivers found matching what you want.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            filteredDrivers.map(driver => (
              <DriverCard key={driver.id} driver={driver} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}