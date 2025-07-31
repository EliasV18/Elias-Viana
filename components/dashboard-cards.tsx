import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Calendar, CalendarDays } from "lucide-react"

// Dados simulados que seriam vindos do contexto/estado global
const getDashboardData = () => {
  const events = [
    { status: "confirmado", value: 25000, date: "2025-07-25" },
    { status: "agendado", value: 15000, date: "2025-07-28" },
    { status: "confirmado", value: 35000, date: "2025-08-05" },
  ]

  const clients = 156
  const todayMeetings = 3
  const monthlyRevenue = events.reduce((sum, event) => sum + event.value, 0)
  const scheduledEvents = events.filter((e) => e.status === "confirmado" || e.status === "agendado").length

  return { monthlyRevenue, scheduledEvents, clients, todayMeetings }
}

export function DashboardCards() {
  const { monthlyRevenue, scheduledEvents, clients, todayMeetings } = getDashboardData()

  const cards = [
    {
      title: "Receita Mensal",
      value: `R$ ${monthlyRevenue.toLocaleString("pt-BR")}`,
      change: "+15.2% em relação ao mês passado",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Eventos Agendados",
      value: scheduledEvents.toString(),
      change: "+8 novos eventos este mês",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Clientes Ativos",
      value: clients.toString(),
      change: "+12% em relação ao mês passado",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Reuniões Hoje",
      value: todayMeetings.toString(),
      change: "3 confirmadas, 2 pendentes",
      icon: CalendarDays,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-gray-500 mt-1">{card.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
