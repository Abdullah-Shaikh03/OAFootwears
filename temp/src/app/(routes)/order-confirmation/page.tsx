'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderConfirmation() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('lastOrderId');
    if (id) {
      setOrderId(id);
      localStorage.removeItem('lastOrderId');
    }
  }, []);

  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <Button onClick={() => router.push('/products')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Confirmation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Thank you for your order! Your order has been successfully placed.</p>
          <p className="mb-4">Order ID: {orderId}</p>
          <p className="mb-8">We will process your order and send you a confirmation email shortly.</p>
          <Button onClick={() => router.push('/products')}>Continue Shopping</Button>
        </CardContent>
      </Card>
    </div>
  );
}

