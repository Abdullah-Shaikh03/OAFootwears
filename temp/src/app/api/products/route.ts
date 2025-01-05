import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

export async function GET() {
  await dbConnect();
  const products = await Product.find({}).populate('user', 'name');
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const session: { user: { id: string } } | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const data = await request.json();
  const product = new Product({ ...data, user: session.user.id });
  await product.save();
  return NextResponse.json(product);
}

