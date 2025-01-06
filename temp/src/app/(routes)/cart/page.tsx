'use client';

import { useCart } from '@/contexts/CartContext';
import { Cart } from '@/components/Cart';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export default function CartPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" passHref>
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <Cart />
      <div className="mt-8 text-center">
        <Link href="/checkout" passHref>
          <Button size="lg">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );
}

