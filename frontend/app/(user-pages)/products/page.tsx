import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for products
const products = [
  { id: 1, name: "Classic Leather Loafers", price: 89.99, category: "Luxury", image: "/placeholder.svg" },
  { id: 2, name: "Running Shoes Pro", price: 129.99, category: "Sports", image: "/placeholder.svg" },
  { id: 3, name: "Eco-Canvas Slip-ons", price: 59.99, category: "Eco-Friendly", image: "/placeholder.svg" },
  { id: 4, name: "Formal Oxford Shoes", price: 99.99, category: "Luxury", image: "/placeholder.svg" },
  { id: 5, name: "Trail Hiking Boots", price: 149.99, category: "Sports", image: "/placeholder.svg" },
  { id: 6, name: "Recycled Sneakers", price: 79.99, category: "Eco-Friendly", image: "/placeholder.svg" },
]

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#1C1C1C]">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-md object-cover"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">{product.name}</CardTitle>
              <p className="text-[#343A40]">${product.price.toFixed(2)}</p>
              <p className="text-sm text-[#20C997]">{product.category}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full bg-[#0056D2] hover:bg-[#004AAB] text-white">
                <Link href={`/products/${product.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

