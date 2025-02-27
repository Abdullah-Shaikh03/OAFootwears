import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from 'lucide-react'
import Link from 'next/link';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return <div className="text-center py-8">Your cart is empty</div>;
  }

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div key={item.productId} className="flex items-center justify-betweenp-4 rounded-lg">
          <div>
            <h3 className="font-semibold">{item.brandName}</h3>
            <p className="text-sm text-gray-400">{item.article}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
              className="w-16"
            />
            <p>${(item.price * item.quantity).toFixed(2)}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.productId)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center pt-4 border-t border-gray-700">
        <p className="font-semibold">Total:</p>
        <p className="text-xl font-bold">${total.toFixed(2)}</p>
      </div>
      <Link href="/checkout" passHref>
        <Button className="w-full">Proceed to Checkout</Button>
      </Link>
    </div>
  );
};

