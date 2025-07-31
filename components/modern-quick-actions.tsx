"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Users,
  PartyPopper,
  FileText,
  Package,
  BarChart3,
  Plus,
  Eye,
  UserPlus,
  TrendingUp,
} from "lucide-react"

const quickActions = [
  {
    title: "Novo Evento",
    description: "Agendar um novo evento",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600",
    href: "/eventos",
  },
  {
    title: "Ver Agenda",
    description: "Compromissos de hoje",
    icon: Calendar,
    color: "bg-green-500 hover:bg-green-600",
    href: "/agenda",
  },
  {
    title: "Clientes",
    description: "Gerenciar clientes",
    icon: Users,
    color: "bg-purple-500 hover:bg-purple-600",
    href: "/clientes",
  },
  {
    title: "Contratos",
    description: "Visualizar contratos",
    icon: FileText,
    color: "bg-orange-500 hover:bg-orange-600",
    href: "/contratos",
  },
  {
    title: "Estoque",
    description: "Controle de estoque",
    icon: Package,
    color: "bg-red-500 hover:bg-red-600",
    href: "/estoque",
  },
  {
    title: "Relatórios",
    description: "Análises e métricas",
    icon: BarChart3,
    color: "bg-indigo-500 hover:bg-indigo-600",
    href: "/relatorios",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "event",
    title: "Evento confirmado",
    description: "Casamento Maria & João - 15/08",
    time: "2 horas atrás",
    icon: PartyPopper,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "meeting",
    title: "Reunião agendada",
    description: "Degustação Ana Carolina - Hoje 16h",
    time: "4 horas atrás",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "client",
    title: "Novo cliente",
    description: "Pedro Costa cadastrado",
    time: "1 dia atrás",
    icon: UserPlus,
    color: "text-purple-600",
  },
  {
    id: 4,
    type: "contract",
    title: "Contrato assinado",
    description: "Evento corporativo - R$ 12.000",
    time: "2 dias atrás",
    icon: FileText,
    color: "text-orange-600",
  },
]

export function ModernQuickActions() {
  const router = useRouter()

  const handleActionClick = (href: string) => {
    router.push(href)
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Ações Rápidas */}
      <Card className="shadow-sm hover:shadow-md transition-shadow hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Ações Rápidas</span>
          </CardTitle>
          <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-20 flex flex-col items-center justify-center space-y-2 ${action.color} text-white border-0 hover:scale-105 transition-all duration-200 hover-lift`}
                onClick={() => handleActionClick(action.href)}
              >
                <action.icon className="h-5 w-5" />
                <div className="text-center">
                  <div className="text-xs font-semibold">{action.title}</div>
                  <div className="text-xs opacity-90 hidden lg:block">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Atividades Recentes */}
      <Card className="shadow-sm hover:shadow-md transition-shadow hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-600" />
              <span>Atividades Recentes</span>
            </div>
            <Button variant="ghost" size="sm" className="text-xs hover:bg-gray-100">
              Ver todas
            </Button>
          </CardTitle>
          <CardDescription>Últimas atividades do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="p-2 rounded-full bg-gray-100 flex-shrink-0">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
