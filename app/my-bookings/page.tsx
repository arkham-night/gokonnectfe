'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Types for our bookings
type Booking = {
  id: string;
  driverName: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};

// Example data - replace with actual API call
const mockBookings: Booking[] = [
  {
    id: '1',
    driverName: 'John Driver',
    pickupLocation: '123 Main St',
    dropoffLocation: '456 Market St',
    date: '2025-02-25',
    time: '14:30',
    status: 'upcoming',
  },
  {
    id: '2',
    driverName: 'Sarah Smith',
    pickupLocation: '789 Park Ave',
    dropoffLocation: '321 Lake Rd',
    date: '2025-02-19',
    time: '09:15',
    status: 'completed',
  },
];

function BookingCard({ booking }: { booking: Booking }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async (bookingId: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement booking cancellation
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Booking cancelled successfully!');
    } catch (error) {
      alert('Failed to cancel booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4" />
              <span className="font-medium">{booking.driverName}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(booking.date), 'PPP')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>{booking.time}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>From: {booking.pickupLocation}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>To: {booking.dropoffLocation}</span>
            </div>
            {booking.status === 'upcoming' && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleCancel(booking.id)}
                disabled={isLoading}
              >
                {isLoading ? 'Cancelling...' : 'Cancel Booking'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MyBookingsPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              Please log in to view your bookings.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const upcomingBookings = mockBookings.filter(
    booking => booking.status === 'upcoming'
  );
  const pastBookings = mockBookings.filter(
    booking => booking.status === 'completed' || booking.status === 'cancelled'
  );

  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardDescription>
                    You have no upcoming bookings.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardDescription>
                    You have no past bookings.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}