"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function NewProduct() {
  const [product, setProduct] = useState({
    brandName: "",
    article: "",
    style: "",
    price: "",
    desc:""
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
      setImages(filesArray);

      // Create preview URLs
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => {
        // Clean up old preview URLs
        prev.forEach((url) => URL.revokeObjectURL(url));
        return newPreviews;
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const newPreviews = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index]);
      return newPreviews;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert("You must be logged in to add a product");
      return;
    }

    const formData = new FormData();
    formData.append("brandName", product.brandName);
    formData.append("article", product.article);
    formData.append("style", product.style);
    formData.append("price", product.price);
    formData.append('desc', product.desc)
    images.forEach((image) => formData.append("images", image));

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/products");
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      alert("Error adding product");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="brandName" className="">
                  Brand Name
                </Label>
                <Input
                  id="brandName"
                  value={product.brandName}
                  onChange={(e) =>
                    setProduct({ ...product, brandName: e.target.value })
                  }
                  className=""
                  required
                />
              </div>
              <div>
                <Label htmlFor="article" className="">
                  Article No.
                </Label>
                <Input
                  id="article"
                  value={product.article}
                  onChange={(e) =>
                    setProduct({ ...product, article: e.target.value })
                  }
                  className=""
                  required
                />
              </div>
              <div>
                <Label htmlFor="style" className="">
                  Style
                </Label>
                <Input
                  id="style"
                  value={product.style}
                  onChange={(e) =>
                    setProduct({ ...product, style: e.target.value })
                  }
                  className=""
                  required
                />
              </div>
              <div>
                <Label htmlFor="style" className="">
                  Price
                </Label>
                <Input
                  type="number"
                  id="style"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className=""
                  required
                />
              </div>
              <div>
                <Label htmlFor="desc" className="">
                    Product Description
                </Label>
                <Textarea
                  id="style"
                  value={product.desc}
                  onChange={(e) =>
                    setProduct({ ...product, desc: e.target.value })
                  }
                  className=""
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Add Product
              </Button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="images"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2 py-8"
                >
                  <ImagePlus className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-400">Add Images</span>
                  <span className="text-xs text-gray-500">
                    (Up to 5 images)
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {previews.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
                {[...Array(5 - previews.length)].map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="aspect-square border border-gray-700 rounded-lg"
                  />
                ))}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
