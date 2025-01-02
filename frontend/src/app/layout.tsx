import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import  ThemeProviders  from "@/components/theme-provider"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OAFootwears",
  description: "Your one-stop shop for quality footwear",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProviders>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProviders>
      </body>
    </html>
  )
}

