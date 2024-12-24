"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { ThemeToggle } from './ThemeToggle'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                OAFootwears
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/products">Products</NavLink>
              <NavLink href="/orders">Orders</NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <ThemeToggle />
            <Button variant="ghost" className="ml-4">
              Log out
            </Button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink href="/dashboard" mobile>Dashboard</NavLink>
            <NavLink href="/products" mobile>Products</NavLink>
            <NavLink href="/orders" mobile>Orders</NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <ThemeToggle />
              <Button variant="ghost" className="ml-auto">
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children, mobile = false }: { href: string, children: React.ReactNode, mobile?: boolean }) {
  return (
    <Link
      href={href}
      className={`${
        mobile
          ? 'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
          : 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
      } text-gray-500 hover:text-primary hover:border-primary`}
    >
      {children}
    </Link>
  )
}

