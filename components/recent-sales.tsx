"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentSales = [
  {
    name: "Maria Silva",
    email: "maria@email.com",
    amount: "R$ 15.000",
    event: "Casamento",
  },
  {
    name: "João Santos",
    email: "joao@email.com",
    amount: "R$ 8.500",
    event: "Aniversário",
  },
  {
    name: "Ana Costa",
    email: "ana@email.com",
    amount: "R$ 12.000",
    event: "Formatura",
  },
  {
    name: "Pedro Lima",
    email: "pedro@email.com",
    amount: "R$ 6.800",
    event: "Corporativo",
  },
]

export function RecentSales() {
  return (
    <div className="space-y-4">
      {recentSales.map((sale, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {sale.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{sale.amount}</p>
            <p className="text-xs text-muted-foreground">{sale.event}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
