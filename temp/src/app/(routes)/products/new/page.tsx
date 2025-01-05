'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TextRevealCard } from '@/components/ui/text-reveal-card';
import { useToast } from "@/hooks/use-toast"


export default function NewProduct() {
  const {toast} = useToast()
  const [product, setProduct] = useState({ brandName: '', article: '', style:'', price: '', imageUrls: [''] });
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('You must be logged in to add a product');
      return;
    }
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      router.push('/');
    } else {
      toast({
        title:'Error adding Product',
        // description:''
      })
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newImageUrls = [...product.imageUrls];
    newImageUrls[index] = e.target.value;
    setProduct({ ...product, imageUrls: newImageUrls });
  };

  const addImageField = () => {
    if (product.imageUrls.length < 5) {
      setProduct({ ...product, imageUrls: [...product.imageUrls, ''] });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <TextRevealCard
        text="Add New Product"
        revealText="Create something amazing"
        className="mb-8"
      />
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
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
              <Label htmlFor="style">Style</Label>
              <Input type="text" id="style" name="style" value={product.style} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input type="number" id="price" name="price" value={product.price} onChange={handleChange} required />
            </div>
            {product.imageUrls.map((url, index) => (
              <div key={index}>
                <Label htmlFor={`imageUrl${index}`}>Image URL {index + 1}</Label>
                <Input type="text" id={`imageUrl${index}`} value={url} onChange={(e) => handleImageChange(e, index)} required />
              </div>
            ))}
            {product.imageUrls.length < 5 && (
              <Button type="button" onClick={addImageField} variant="outline">
                Add Another Image
              </Button>
            )}
            <Button type="submit">Add Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

