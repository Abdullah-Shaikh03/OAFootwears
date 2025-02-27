"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Product {
  _id: string;
  brandName: string;
  article: string;
  price: number;
  imageUrls: string[];
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 3)));
  }, []);

  return (
    <section className="my-16 w-full max-w-6xl">
      <h2 className="mb-8 text-3xl font-bold text-center text-white">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                fill
                  src={product.imageUrls[0] || "/placeholder.svg"}
                  alt={product.brandName}
                  className="w-full h-48 object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h3 className="text-lg font-semibold">{product.brandName}</h3>
                <p className="text-sm text-gray-500">{product.article}</p>
                <p className="mt-2 text-lg font-bold">${product.price}</p>
                <Link href={`/products/${product._id}`} passHref>
                  <Button className="mt-4" variant="outline">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

