"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchApi } from "../../utils/api"

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface ProductListProps {
  initialProducts: Product[];
}

export function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState("")

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: number) => {
    try {
      await fetchApi(`/admin/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  }

  return (
    <>
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button asChild variant="ghost" className="mr-2">
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

