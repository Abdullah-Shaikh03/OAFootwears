'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-hot-toast';

interface Order {
  _id: string;
  user: string;
  total: number;
  status: string;
  deliveryStatus: string;
  createdAt: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    }
  };

  const updateDeliveryStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update order status');
      
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, deliveryStatus: newStatus } : order
      ));
      
      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  if (!session || session.user.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order._id}>
            <CardHeader>
              <CardTitle>Order #{order._id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total: ${order.total}</p>
              <p>Status: {order.status}</p>
              <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
              <div className="mt-4">
                <Select
                  onValueChange={(value: any) => updateDeliveryStatus(order._id, value)}
                  defaultValue={order.deliveryStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Delivery Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

