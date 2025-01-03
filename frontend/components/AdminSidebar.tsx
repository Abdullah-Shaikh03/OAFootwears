"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, ShoppingCart, Users, LogOut } from 'lucide-react'

const AdminSidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/users", icon: Users, label: "Users" },
  ]

  return (
    <aside className="bg-[#1C1C1C] text-white w-64 min-h-screen p-4">
      <nav className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#0056D2]">OAFootwears Admin</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-[#343A40] ${
                    pathname === item.href ? "bg-[#343A40]" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link
            href="/admin/logout"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#343A40] text-[#FF6F00]"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </div>
      </nav>
    </aside>
  )
}

export default AdminSidebar

