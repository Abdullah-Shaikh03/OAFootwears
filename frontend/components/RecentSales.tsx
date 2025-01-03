import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentSale {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  amount: number;
}

interface RecentSalesProps {
  data: RecentSale[];
}

export function RecentSales({ data }: RecentSalesProps) {
  return (
    <div className="space-y-8">
      {data.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.customer.avatar} alt="Avatar" />
            <AvatarFallback>{sale.customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer.name}</p>
            <p className="text-sm text-muted-foreground">
              {sale.customer.email}
            </p>
          </div>
          <div className="ml-auto font-medium">+${sale.amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}

