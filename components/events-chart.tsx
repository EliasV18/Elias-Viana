"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", eventos: 18 },
  { month: "Fev", eventos: 22 },
  { month: "Mar", eventos: 25 },
  { month: "Abr", eventos: 28 },
  { month: "Mai", eventos: 32 },
  { month: "Jun", eventos: 26 },
]

export function EventsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} eventos`, "Eventos"]} />
        <Bar dataKey="eventos" fill="#10B981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
