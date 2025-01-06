import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { uploadToS3, deleteFromS3 } from "@/lib/s3";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    await dbConnect();
    const product = await Product.findById(id).populate("user", "name");
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();
    const formData = await request.formData();
    const brandName = formData.get("brandName") as string;
    const article = formData.get("article") as string;
    const price = formData.get("price") as string;
    const style = formData.get("style") as string
    const desc = formData.get("desc") as string;
    const images = formData.getAll("images") as File[];

    const updateData: any = {
      brandName,
      article,
      price: parseFloat(price),
    };

    // Get the existing product to compare images
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (images.length > 0) {
      // Delete old images from S3
      await Promise.all(
        existingProduct.imageUrls.map((url: string) => deleteFromS3(url))
      );

      // Upload new images
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const buffer = Buffer.from(await image.arrayBuffer());
          const fileName = `${Date.now()}-${image.name}`;
          return uploadToS3(buffer, fileName, image.type);
        })
      );
      updateData.imageUrls = imageUrls;
    }

    const product = await Product.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();

    // Get the product first to access its image URLs
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete all images from S3
    await Promise.all(
      product.imageUrls.map((url: string) => deleteFromS3(url))
    );

    // Delete the product from the database
    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Product and associated images deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
