"use client";

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/context/auth-context'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()

  // Menu items that change based on auth status
  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/pick-a-driver', label: 'Pick a Driver' },
    // Only show My Bookings when logged in
    ...(isAuthenticated ? [{ href: '/my-bookings', label: 'My Bookings' }] : []),
  ]

  // Auth buttons for desktop view
  const AuthButtons = () => {
    if (isAuthenticated) {
      return (
        <>
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </>
      )
    }

    return (
      <>
        <Link href="/login">
          <Button variant="ghost" size="sm">Login</Button>
        </Link>
        <Link href="/signup">
          <Button variant="default" size="sm">Sign Up</Button>
        </Link>
      </>
    )
  }

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">GoKonnect</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <AuthButtons />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/80 backdrop-blur-sm">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="w-full justify-start px-3"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                  setIsOpen(false)
                }}
                className="w-full justify-start px-3"
              >
                {theme === 'dark' ? (
                  <><Sun className="h-5 w-5 mr-2" /> Light Mode</>
                ) : (
                  <><Moon className="h-5 w-5 mr-2" /> Dark Mode</>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}