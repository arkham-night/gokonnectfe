import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// These are the pages that need you to be logged in
const protectedRoutes = ['/my-bookings', '/profile', '/pick-a-driver'];

// These pages are open to everyone
const publicRoutes = ['/', '/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if this page needs protection
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Get the login cookie
  const authToken = request.cookies.get('authToken')?.value;

  // If it's protected and no login, send to login page
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Tell Next.js which pages to check
export const config = {
  matcher: [...protectedRoutes, ...publicRoutes],
};