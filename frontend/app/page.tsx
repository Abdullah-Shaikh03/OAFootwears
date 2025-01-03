"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const MotionCard = motion(Card)

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to OAFootwears
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 text-muted-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover comfort and style in every step
        </motion.p>
        <Button asChild size="lg" className="text-lg">
          <Link href="/products">Shop Now</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-foreground">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Luxury Collection", description: "Indulge in our premium range of footwear", image: "/luxury.jpg", color: "bg-[#D4AF37]" },
            { title: "Sports & Active", description: "Performance footwear for every athlete", image: "/sports.jpg", color: "bg-[#C92A2A]" },
            { title: "Eco-Friendly", description: "Sustainable shoes for a greener future", image: "/eco.jpg", color: "bg-[#20C997]" },
          ].map((category, index) => (
            <MotionCard 
              key={category.title} 
              className={`${category.color} text-white overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src={category.image} alt={category.title} width={300} height={200} className="rounded-md object-cover w-full h-48" />
                <p className="mt-4">{category.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="secondary">
                  <Link href={`/products?category=${category.title.toLowerCase()}`}>Explore</Link>
                </Button>
              </CardFooter>
            </MotionCard>
          ))}
        </div>
      </section>

      <section className="bg-accent p-8 rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 text-accent-foreground">Why Choose OAFootwears?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Premium quality materials",
            "Wide range of styles for every occasion",
            "Competitive prices",
            "Excellent customer service",
            "Fast and reliable shipping",
            "30-day money-back guarantee",
          ].map((item, index) => (
            <motion.li 
              key={item} 
              className="flex items-center space-x-2 text-accent-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  )
}

