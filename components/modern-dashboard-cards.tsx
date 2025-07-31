"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DollarSign, Calendar, Users, TrendingUp, TrendingDown, PartyPopper, X } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ChartData {
  month: string
  value: number
}

interface DashboardCard {
  title: string
  value: string
  description: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  borderColor: string
  chartType: "area" | "bar" | "line"
  chartData: ChartData[]
}

const cards: DashboardCard[] = [
  {
    title: "Receita Total",
    value: "R$ 1.275.000",
    description: "Últimos 6 meses",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    chartType: "area",
    chartData: [
      { month: "Jan", value: 180000 },
      { month: "Fev", value: 195000 },
      { month: "Mar", value: 210000 },
      { month: "Abr", value: 225000 },
      { month: "Mai", value: 240000 },
      { month: "Jun", value: 225000 },
    ],
  },
  {
    title: "Eventos Realizados",
    value: "151",
    description: "Este ano",
    change: "+12.5%",
    trend: "up",
    icon: PartyPopper,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    chartType: "bar",
    chartData: [
      { month: "Jan", value: 22 },
      { month: "Fev", value: 25 },
      { month: "Mar", value: 28 },
      { month: "Abr", value: 24 },
      { month: "Mai", value: 26 },
      { month: "Jun", value: 26 },
    ],
  },
  {
    title: "Clientes Ativos",
    value: "1.247",
    description: "Base total",
    change: "+8.1%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    chartType: "line",
    chartData: [
      { month: "Jan", value: 1150 },
      { month: "Fev", value: 1180 },
      { month: "Mar", value: 1200 },
      { month: "Abr", value: 1220 },
      { month: "Mai", value: 1235 },
      { month: "Jun", value: 1247 },
    ],
  },
  {
    title: "Taxa de Ocupação",
    value: "85%",
    description: "Média mensal",
    change: "+5.2%",
    trend: "up",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    chartType: "area",
    chartData: [
      { month: "Jan", value: 78 },
      { month: "Fev", value: 82 },
      { month: "Mar", value: 85 },
      { month: "Abr", value: 88 },
      { month: "Mai", value: 85 },
      { month: "Jun", value: 85 },
    ],
  },
]

export function ModernDashboardCards() {
  const [selectedCard, setSelectedCard] = useState<DashboardCard | null>(null)

  const renderChart = (card: DashboardCard) => {
    if (!card?.chartData) {
      return <div className="flex items-center justify-center h-[300px] text-gray-500">Dados não disponíveis</div>
    }

    const commonProps = {
      data: card.chartData,
    }

    switch (card.chartType) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [
                  card.title.includes("Receita")
                    ? `R$ ${value.toLocaleString()}`
                    : card.title.includes("Taxa")
                      ? `${value}%`
                      : value.toString(),
                  card.title,
                ]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={card.color.includes("green") ? "#16a34a" : "#ea580c"}
                fill={card.color.includes("green") ? "#16a34a" : "#ea580c"}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`${value} eventos`, "Eventos"]} />
              <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`${value.toLocaleString()} clientes`, "Clientes"]} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ fill: "#7c3aed", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      default:
        return (
          <div className="flex items-center justify-center h-[300px] text-gray-500">Tipo de gráfico não suportado</div>
        )
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            className={`${card.bgColor} ${card.borderColor} border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105`}
            onClick={() => setSelectedCard(card)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color} opacity-70`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color} mb-1`}>{card.value}</div>
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs text-gray-500">{card.description}</CardDescription>
                <div className={`flex items-center text-xs font-medium ${card.color}`}>
                  {card.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {card.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal com gráfico individual */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {selectedCard && <selectedCard.icon className={`h-5 w-5 ${selectedCard.color}`} />}
                <span>{selectedCard?.title} - Análise Detalhada</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCard(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-6">
              <div className={`text-3xl font-bold ${selectedCard?.color} mb-2`}>{selectedCard?.value}</div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{selectedCard?.description}</span>
                <div className={`flex items-center text-sm font-medium ${selectedCard?.color}`}>
                  {selectedCard?.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {selectedCard?.change}
                </div>
              </div>
            </div>

            {/* Gráfico Visual */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Evolução - Últimos 6 Meses</h3>
              {selectedCard && renderChart(selectedCard)}
            </div>

            {/* Insights adicionais */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm text-gray-700">Melhor Mês</h4>
                <p className="text-lg font-bold text-green-600">
                  {selectedCard?.chartData
                    ? selectedCard.chartData.reduce((max, item) => (item.value > max.value ? item : max)).month
                    : "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm text-gray-700">Média Mensal</h4>
                <p className="text-lg font-bold text-blue-600">
                  {selectedCard?.chartData
                    ? selectedCard.title.includes("Receita")
                      ? `R$ ${Math.round(selectedCard.chartData.reduce((sum, item) => sum + item.value, 0) / selectedCard.chartData.length).toLocaleString()}`
                      : selectedCard.title.includes("Taxa")
                        ? `${Math.round(selectedCard.chartData.reduce((sum, item) => sum + item.value, 0) / selectedCard.chartData.length)}%`
                        : Math.round(
                            selectedCard.chartData.reduce((sum, item) => sum + item.value, 0) /
                              selectedCard.chartData.length,
                          ).toString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
