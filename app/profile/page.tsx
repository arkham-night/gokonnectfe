'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import type { DriverPersonality, Language } from '@/lib/types/auth';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Example languages - you can fetch these from your API
  const availableLanguages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
  ];

  const driverPersonalities: DriverPersonality[] = ['chatty', 'quiet'];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement profile update
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      // TODO: Show success message
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-20">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={user.name}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue={user.email}
                disabled
                readOnly
              />
              <p className="text-sm text-muted-foreground">
                Email cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                defaultValue={user.phoneNumber}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Driver Personality Preference</Label>
              <Select
                defaultValue={user.preferences?.preferredDriverPersonality}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  {driverPersonalities.map((personality) => (
                    <SelectItem key={personality} value={personality}>
                      {personality.charAt(0).toUpperCase() + personality.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Preferred Languages</Label>
              <Select
                defaultValue={user.preferences?.preferredLanguages?.[0]?.code}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}