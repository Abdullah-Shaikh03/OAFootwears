"use client";

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  interface ExtendedSession extends Session {
    user: {
      role: string;
    };
  }

  const { data: session } = useSession() as { data: ExtendedSession | null };

  useEffect(() => {
    fetch(`/api/products/${resolvedParams.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [resolvedParams.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newImageUrls = [...product.imageUrls];
    newImageUrls[index] = e.target.value;
    setProduct({ ...product, imageUrls: newImageUrls });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${resolvedParams.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      setIsEditing(false);
    } else {
      alert("Error updating product");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await fetch(`/api/products/${resolvedParams.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/products");
      } else {
        alert("Error deleting product");
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product?.imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product?.imageUrls.length - 1 : prev - 1
    );
  };

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 rounded"></div>
          <div className="h-48 w-96 rounded"></div>
          <div className="h-8 w-72  rounded"></div>
        </div>
      </div>
    );

  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="container mx-auto px-4 py-8">
      {isEditing && isAdmin ? (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                type="text"
                id="brandName"
                name="brandName"
                value={product.brandName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="article">Article</Label>
              <Input
                type="text"
                id="article"
                name="article"
                value={product.article}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            {product.imageUrls.map((url: string, index: number) => (
              <div key={index}>
                <Label htmlFor={`imageUrl${index}`}>
                  Image URL {index + 1}
                </Label>
                <Input
                  type="text"
                  id={`imageUrl${index}`}
                  value={url}
                  onChange={(e) => handleImageChange(e, index)}
                  required
                />
              </div>
            ))}
            <div className="flex gap-2">
              <Button type="submit">Save Changes</Button>
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800"
              >
                <Image
                  // width={1000}
                  fill
                  // height={1000}
                  src={product.imageUrls[currentImageIndex]}
                  alt={`${product.brandName} - View ${currentImageIndex + 1}`}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </AnimatePresence>

            {product.imageUrls.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {product.imageUrls.map((url: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden",
                    currentImageIndex === index && "ring-2 ring-primary"
                  )}
                >
                  <Image
                    fill
                    // width={1000}
                    // height={1000}
                    src={url}
                    alt={`${product.brandName} thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.brandName}</h1>
              <p className="text-lg text-muted-foreground">{product.article}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">&#8377;{product.price}</span>
              {/* <Badge variant="secondary">Free Shipping</Badge> */}
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList>
                {/* <TabsTrigger value="description">Description</TabsTrigger> */}
                <TabsTrigger value="details">Details</TabsTrigger>
                {/* <TabsTrigger value="shipping">Shipping</TabsTrigger> */}
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <p>
                  Experience ultimate comfort with these premium shoes from{" "}
                  {product.brandName}. Perfect for everyday wear, these shoes
                  combine style with functionality.
                </p>
              </TabsContent>
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Brand</p>
                    <p className="text-muted-foreground">{product.brandName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Article</p>
                    <p className="text-muted-foreground">{product.article}</p>
                  </div>
                  {/* <div>
                    <p className="font-semibold">Material</p>
                    <p className="text-muted-foreground">Premium Quality</p>
                  </div> */}
                  <div>
                    <p className="font-semibold">Style</p>
                    <p className="text-muted-foreground">{product.style}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="space-y-4">
                <p>
                  Free shipping on all orders. Delivery within 3-5 business
                  days.
                </p>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4">
              <Button
                onClick={() => router.push("/contact")}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Contact to Order
              </Button>
              {/* <Button variant="outline" size="lg" className="flex-1">
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button> */}
              {/* <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />

              </Button> */}
            </div>

            {isAdmin && (
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  Edit
                </Button>
                {
                  <Button onClick={handleDelete} variant="destructive">
                    Delete
                  </Button>
                }
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
