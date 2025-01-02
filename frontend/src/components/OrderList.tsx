"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchApi } from "../../utils/api"

interface Order {
  id: number;
  customer: string;
  date: string;
  total: number;
  status: string;
}

interface OrderListProps {
  initialOrders: Order[];
}

export function OrderList({ initialOrders }: OrderListProps) {
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState("")

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase())
  )

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      await fetchApi(`/admin/orders/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  }

  return (
    <>
      <Input
        placeholder="Search orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                  defaultValue={order.status}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

