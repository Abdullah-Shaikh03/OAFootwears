"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import Image from "next/image";
interface Product {
  _id: string;
  brandName: string;
  article: string;
  price: number;
  imageUrls: string[];
}
interface ExtendedSession extends Session {
  user: {
    role: string;
  };
}
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { data: sessionData } = useSession();
  const session = sessionData as unknown as ExtendedSession;

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Products</h1>
          {session?.user?.role === "admin" && (
            <Link href="/products/new">
              <Button variant="outline">Add New Product</Button>
            </Link>
          )}
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link href={`/products/${product._id}`} key={product._id}>
              <Card className="group  hover:border-gray-700 transition-all">
                <CardContent className="p-4">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <Image width={100} height={100}
                      src={product.imageUrls[0]}
                      alt={product.brandName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-semibold text-lg ">
                      {product.brandName}
                    </h2>
                    <p className="text-sm ">{product.article}</p>
                    <p className="text-lg font-bold ">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile List View */}
        <div className="md:hidden space-y-4">
          {products.map((product) => (
            <Link href={`/products/${product._id}`} key={product._id}>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image width={100} height={100}
                        src={product.imageUrls[0]}
                        alt={product.brandName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold text-white">
                        {product.brandName}
                      </h2>
                      <p className="text-sm text-gray-400">{product.article}</p>
                      <p className="text-lg font-bold text-white mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
