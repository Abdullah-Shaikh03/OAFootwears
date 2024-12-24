"use client"

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden`} onClick={() => setSidebarOpen(false)}></div>
        <div className={`${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-background lg:translate-x-0 lg:static lg:inset-0`}>
          <Sidebar />
        </div>
        <div className="flex-1">
          <div className="py-6 lg:hidden">
            <Button variant="ghost" onClick={() => setSidebarOpen(true)} className="px-4 py-2 text-gray-500 focus:outline-none focus:text-gray-900">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

