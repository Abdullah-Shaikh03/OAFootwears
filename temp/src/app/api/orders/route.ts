import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import {Orders} from '@/models/Order';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { items, total, shippingDetails, paymentMethod } = await request.json();

    const order = new Orders({
      user: session.user.id,
      items,
      total,
      shippingDetails,
      paymentMethod,
      status: 'Pending',
    });

    await order.save();

    return NextResponse.json({ message: 'Order placed successfully', orderId: order._id }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const orders = await Orders.find({}).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

