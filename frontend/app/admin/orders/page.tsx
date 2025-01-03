import { fetchApi } from "@/utils/api"
import { OrderList } from "@/components/OrderList"

export default async function OrdersPage() {
  const orders = await fetchApi('/admin/orders');

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#1C1C1C]">Orders</h1>
      <OrderList initialOrders={orders} />
    </div>
  )
}

