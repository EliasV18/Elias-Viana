"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", receita: 145000 },
  { month: "Fev", receita: 162000 },
  { month: "Mar", receita: 178000 },
  { month: "Abr", receita: 195000 },
  { month: "Mai", receita: 210000 },
  { month: "Jun", receita: 185000 },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
        <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, "Receita"]} />
        <Area type="monotone" dataKey="receita" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
