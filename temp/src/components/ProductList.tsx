'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';



export default function ProductList() {
  interface Product {
    _id: string;
    brandName: string;
    article: string;
    price: number;
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {products.map((product) => (
        <Card key={product._id}>
          <CardHeader>
            <CardTitle>
              <TextGenerateEffect words={product.brandName} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{product.article}</p>
            <p className="font-bold mt-2">${product.price}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/products/${product._id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

