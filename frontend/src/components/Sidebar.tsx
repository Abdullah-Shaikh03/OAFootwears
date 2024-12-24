import Link from 'next/link'
import { HomeIcon, PackageIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="bg-background border-r w-64 h-screen overflow-y-auto">
      <nav className="mt-5 px-2">
        <SidebarLink href="/dashboard" icon={HomeIcon}>Dashboard</SidebarLink>
        <SidebarLink href="/dashboard/products" icon={PackageIcon}>Products</SidebarLink>
        <SidebarLink href="/dashboard/orders" icon={ShoppingCartIcon}>Orders</SidebarLink>
        <SidebarLink href="/dashboard/customers" icon={UsersIcon}>Customers</SidebarLink>
      </nav>
    </div>
  )
}

function SidebarLink({ href, icon: Icon, children }: { href: string, icon: React.ElementType, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 ease-in-out"
    >
      <Icon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 transition-colors duration-200 ease-in-out" />
      {children}
    </Link>
  )
}

