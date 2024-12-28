import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { RandomImages, RandomImagesLoading } from "@/components/RandomImages"
import { Suspense } from 'react'
import { ShoppingBag, User } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">OAFootwears</Link>
          <nav className="flex items-center space-x-4">
            <Link href="/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost"><User className="mr-2 h-4 w-4" /> Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="ghost">Sign Up</Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline"><ShoppingBag className="mr-2 h-4 w-4" /> Cart</Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to OAFootwears</h1>
          <p className="text-xl mb-8 text-muted-foreground">Your one-stop shop for quality footwear</p>
          <Link href="/products">
            <Button size="lg" className="animate-pulse">Shop Now</Button>
          </Link>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
          <Suspense fallback={<RandomImagesLoading />}>
            <RandomImages />
          </Suspense>
        </section>
      </main>
      <footer className="bg-muted">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2023 OAFootwears. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

