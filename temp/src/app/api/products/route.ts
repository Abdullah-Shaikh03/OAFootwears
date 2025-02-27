import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { uploadToS3 } from '@/lib/s3';

export async function GET() {
  await dbConnect();
  const products = await Product.find({}).populate('user', 'name');
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await dbConnect();
  const formData = await request.formData();
  const brandName = formData.get('brandName') as string;
  const article = formData.get('article') as string;
  const price = formData.get('price') as string;
  const images = formData.getAll('images') as File[];

  if (!brandName || !article || !price || images.length === 0) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      return uploadToS3(buffer, fileName, image.type);
    })
  );

  const product = new Product({
    brandName,
    article,
    price: parseFloat(price),
    imageUrls,
    user: session.user.id,
  });

  await product.save();
  return NextResponse.json(product, { status: 201 });
}

