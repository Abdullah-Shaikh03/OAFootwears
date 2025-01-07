'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { use } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2 } from 'lucide-react'
import { cn } from "@/lib/utils"
// import { getSignedDownloadUrl } from '@/lib/s3';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [signedImageUrls, setSignedImageUrls] = useState<string[]>([]);
  const [imageLoadError, setImageLoadError] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${resolvedParams.id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
        setSignedImageUrls(data.imageUrls);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('brandName', product.brandName);
    formData.append('article', product.article);
    formData.append('style', product.style)
    formData.append('desc', product.desc)
    formData.append('price', product.price.toString());
    newImages.forEach((image) => formData.append('images', image));

    try {
      const res = await fetch(`/api/products/${resolvedParams.id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to update product');
      const updatedProduct = await res.json();
      setProduct(updatedProduct);
      setIsEditing(false);
      setNewImages([]);
      
      setSignedImageUrls(updatedProduct.imageUrls);
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`/api/products/${resolvedParams.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete product');
        router.push('/products');
        toast.success('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (signedImageUrls.length - 1) ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? signedImageUrls.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product._id,
        brandName: product.brandName,
        article: product.article,
        price: product.price,
        quantity: 1,
      });
      toast.success('Product added to cart');
    }
  };

  if (!product) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse space-y-4">
        <div className="h-12 w-48 bg-gray-200 rounded"></div>
        <div className="h-48 w-96 bg-gray-200 rounded"></div>
        <div className="h-8 w-72 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const isAdmin = session?.user.role === 'admin';

  return (
    <div className="container mx-auto px-4 py-8">
      {isEditing && isAdmin ? (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="brandName">Brand Name</Label>
              <Input type="text" id="brandName" name="brandName" value={product.brandName} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="article">Article</Label>
              <Input type="text" id="article" name="article" value={product.article} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input type="number" id="price" name="price" value={product.price} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="images">New Images</Label>
              <Input type="file" id="images" onChange={handleImageChange} multiple accept="image/*" />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
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
                className="aspect-square relative rounded-2xl overflow-hidden"
              >
                {imageLoadError ? (
                  <div className="flex items-center justify-center w-full h-full text-red-500">
                    Failed to load image
                  </div>
                ) : (
                  <img
                    src={signedImageUrls[currentImageIndex] || '/placeholder.svg?height=300&width=300'}
                    alt={`${product.brandName} - View ${currentImageIndex + 1}`}
                    className="object-cover w-full h-full"
                    onError={() => setImageLoadError(true)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            
            {signedImageUrls.length > 1 && (
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
              {signedImageUrls.map((url: string, index: number) => (
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
                    src={url || '/placeholder.svg?height=80&width=80'}
                    alt={`${product.brandName} thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg?height=80&width=80';
                    }}
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
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <p>{product.desc}</p>
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
                  <div>
                    <p className="font-semibold">Style</p>
                    <p className="text-muted-foreground">{product.style}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4">
              <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {isAdmin && (
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => setIsEditing(true)} variant="outline">Edit</Button>
                <Button onClick={handleDelete} variant="destructive">Delete</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

