"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { ModernSidebar } from "@/components/modern-sidebar"
import { ModernDashboardCards } from "@/components/modern-dashboard-cards"
import { ModernQuickActions } from "@/components/modern-quick-actions"
import { SalesChart } from "@/components/sales-chart"
import { RecentSales } from "@/components/recent-sales"
import { EventsChart } from "@/components/events-chart"
import { RecentEvents } from "@/components/recent-events"
import { Loading } from "@/components/ui/loading"
import { getCurrentUser } from "@/lib/auth"

const notifications = [
  {
    id: 1,
    title: "Novo evento confirmado",
    description: "Casamento Maria & João para 15/08",
    time: "5 min atrás",
    type: "success",
    unread: true,
  },
  {
    id: 2,
    title: "Pagamento recebido",
    description: "R$ 5.000 - Evento Ana Carolina",
    time: "1 hora atrás",
    type: "info",
    unread: true,
  },
  {
    id: 3,
    title: "Reunião agendada",
    description: "Degustação hoje às 16h",
    time: "2 horas atrás",
    type: "warning",
    unread: false,
  },
]

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [eventosHoje] = useState(3)
  const [tarefasPendentes] = useState(5)
  const [notificationsList, setNotificationsList] = useState(notifications)
  const unreadCount = notificationsList.filter((n) => n.unread).length

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Simular loading inicial
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Atualizar relógio a cada segundo
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
      clearTimeout(loadingTimer)
    }
  }, [user, router])

  if (!user) return null

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar />
        <div className="flex-1 flex items-center justify-center lg:ml-16">
          <div className="text-center">
            <Loading size="lg" className="mb-4" />
            <p className="text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Bom dia"
    if (hour < 18) return "Boa tarde"
    return "Boa noite"
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const markAsRead = (id: number) => {
    setNotificationsList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, unread: false } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((notification) => ({ ...notification, unread: false })))
  }

  return (
    <LayoutWrapper>
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Visão geral do seu negócio de eventos</p>
            </div>
            <div className="text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString("pt-BR")}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Cards de Métricas */}
          <ModernDashboardCards />

          {/* Ações Rápidas */}
          <ModernQuickActions />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesChart />
            <EventsChart />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentSales />
            <RecentEvents />
          </div>
        </div>
      </main>
    </LayoutWrapper>
  )
}
