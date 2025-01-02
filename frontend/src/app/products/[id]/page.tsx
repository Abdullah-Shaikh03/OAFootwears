import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"

// Mock data for a single product
const product = {
  _id: 1,
  name: "Classic Leather Loafers",
  price: 89.99,
  category: "Luxury",
  image: "/placeholder.svg",
  description: "Elegant and comfortable leather loafers, perfect for formal occasions or a stylish casual look.",
  sizes: [7, 8, 9, 10, 11],
  colors: ["Black", "Brown", "Tan"],
}

export default function ProductPage({ params }: { params: { _id: string } }) {
  // In a real application, you would fetch the product data based on the _id
  // For this example, we'll just use our mock data
  if (parseInt(params._id) !== product._id) {
    notFound()
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold text-[#1C1C1C]">{product.name}</h1>
        <p className="text-2xl font-semibold text-[#0056D2]">${product.price.toFixed(2)}</p>
        <p className="text-[#20C997] font-medium">{product.category}</p>
        <p className="text-[#343A40]">{product.description}</p>
        <div>
          <h2 className="text-lg font-semibold mb-2">Available Sizes:</h2>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <Button key={size} variant="outline" className="w-12 h-12">
                {size}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Available Colors:</h2>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <Button key={color} variant="outline" className="px-4">
                {color}
              </Button>
            ))}
          </div>
        </div>
        <Button className="w-full bg-[#0056D2] hover:bg-[#004AAB] text-white">Add to Cart</Button>
      </div>
    </div>
  )
}

