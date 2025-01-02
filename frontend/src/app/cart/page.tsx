"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for cart items
const initialCartItems = [
  { _id: 1, name: "Classic Leather Loafers", price: 89.99, quantity: 1, image: "/placeholder.svg" },
  { _id: 2, name: "Running Shoes Pro", price: 129.99, quantity: 2, image: "/placeholder.svg" },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (_id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === _id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    )
  }

  const removeItem = (_id: number) => {
    setCartItems(cartItems.filter((item) => item._id !== _id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#1C1C1C]">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl mb-4 text-[#343A40]">Your cart is empty</p>
          <Button asChild className="bg-[#0056D2] hover:bg-[#004AAB] text-white">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" />
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => removeItem(item._id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-2xl font-semibold text-[#1C1C1C]">Total: ${total.toFixed(2)}</p>
            <Button asChild className="bg-[#0056D2] hover:bg-[#004AAB] text-white">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

