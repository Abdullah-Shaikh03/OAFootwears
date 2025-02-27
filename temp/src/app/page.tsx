"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { FeaturedProducts } from "@/components/FeaturedProduct";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { SocialProof } from "@/components/SocialProof";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const words = [
    {
      text: "OA",
      className: "text-4xl sm:text-5xl md:text-6xl font-bold text-primary rubik-vinyl-regular",
    },
    {
      text: "Footwears",
      className: "text-4xl sm:text-5xl md:text-6xl font-bold text-secondary rubik-vinyl-regular",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundBeams />
      <div className="z-10 flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-8">
              <TypewriterEffect words={words} />
            </div>
            <h2 className="mb-6 text-2xl font-medium text-gray-200 sm:text-3xl">
              Stepping Up Your Business, One Pair at a Time!
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg rounded-full"
                onClick={() => router.push("/products")}
              >
                Explore our Collection
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>


        <SocialProof />

        <Testimonials />

        <Newsletter />

        {!session && (
          <Card className="mt-12 w-full max-w-md">
            <CardHeader>
              <CardTitle>Join OA Footwears</CardTitle>
              <CardDescription>
                Create an account to get exclusive offers and track your orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => router.push("/signup")}
              >
                Sign Up Now
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

