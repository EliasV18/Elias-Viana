"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Edit,
  Trash2,
  MoreHorizontal,
  CalendarDays,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface Event {
  id: number
  name: string
  client: string
  date: string
  time: string
  location: string
  type: "casamento" | "aniversario" | "corporativo" | "formatura" | "outro"
  status: "planejamento" | "confirmado" | "em_andamento" | "concluido" | "cancelado"
  guests: number
  budget: number
  paid: number
  remaining: number
  description?: string
}

export default function Eventos() {
  const [events] = useState<Event[]>([
    {
      id: 1,
      name: "Casamento Silva",
      client: "Maria & João Silva",
      date: "2024-03-14",
      time: "18:00",
      location: "Chácara Bela Vista",
      type: "casamento",
      status: "confirmado",
      guests: 150,
      budget: 25000,
      paid: 15000,
      remaining: 10000,
      description: "Cerimônia ao ar livre com decoração rústica",
    },
    {
      id: 2,
      name: "Aniversário 15 Anos - Ana Carolina",
      client: "Ana Carolina Santos",
      date: "2024-02-28",
      time: "19:00",
      location: "Salão de Festas Villa Real",
      type: "aniversario",
      status: "planejamento",
      guests: 80,
      budget: 15000,
      paid: 5000,
      remaining: 10000,
      description: "Tema: Jardim Encantado",
    },
    {
      id: 3,
      name: "Evento Corporativo - Tech Summit",
      client: "TechCorp Ltda",
      date: "2024-04-10",
      time: "08:00",
      location: "Centro de Convenções",
      type: "corporativo",
      status: "confirmado",
      guests: 300,
      budget: 45000,
      paid: 20000,
      remaining: 25000,
      description: "Conferência de tecnologia com coffee break",
    },
    {
      id: 4,
      name: "Formatura Medicina - UNIFESP",
      client: "Turma 2024 - UNIFESP",
      date: "2024-12-15",
      time: "19:30",
      location: "Hotel Grand Plaza",
      type: "formatura",
      status: "planejamento",
      guests: 200,
      budget: 35000,
      paid: 0,
      remaining: 35000,
      description: "Cerimônia de colação de grau",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.client.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "casamento":
        return "bg-pink-100 text-pink-700 border-pink-200"
      case "aniversario":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "corporativo":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "formatura":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-700 border-green-200"
      case "planejamento":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "em_andamento":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "concluido":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "cancelado":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const totalEvents = events.length
  const confirmedEvents = events.filter((e) => e.status === "confirmado").length
  const totalRevenue = events.reduce((sum, event) => sum + event.paid, 0)
  const totalGuests = events.reduce((sum, event) => sum + event.guests, 0)

  const upcomingEvents = events.filter((event) => new Date(event.date) > new Date())
  const thisMonthEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    const now = new Date()
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear()
  })

  return (
    <LayoutWrapper>
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Eventos</h1>
              <p className="text-gray-600 mt-1">Gerencie casamentos, aniversários e eventos corporativos</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Calendário
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <CalendarDays className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalEvents}</div>
                    <div className="text-sm text-gray-600">Total de Eventos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{confirmedEvents}</div>
                    <div className="text-sm text-gray-600">Confirmados</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">R$ {totalRevenue.toLocaleString("pt-BR")}</div>
                    <div className="text-sm text-gray-600">Receita Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalGuests}</div>
                    <div className="text-sm text-gray-600">Total de Convidados</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Todos os Eventos</TabsTrigger>
              <TabsTrigger value="upcoming">Próximos</TabsTrigger>
              <TabsTrigger value="month">Este Mês</TabsTrigger>
              <TabsTrigger value="planning">Em Planejamento</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Todos os Eventos</CardTitle>
                  <CardDescription>Lista completa de eventos cadastrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="font-semibold text-gray-900">Evento</TableHead>
                          <TableHead className="font-semibold text-gray-900">Cliente</TableHead>
                          <TableHead className="font-semibold text-gray-900">Data/Hora</TableHead>
                          <TableHead className="font-semibold text-gray-900">Local</TableHead>
                          <TableHead className="font-semibold text-gray-900">Tipo</TableHead>
                          <TableHead className="font-semibold text-gray-900">Convidados</TableHead>
                          <TableHead className="font-semibold text-gray-900">Orçamento</TableHead>
                          <TableHead className="font-semibold text-gray-900">Status</TableHead>
                          <TableHead className="font-semibold text-gray-900">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEvents.map((event) => (
                          <TableRow key={event.id} className="border-gray-200 hover:bg-gray-50">
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">{event.name}</div>
                                {event.description && <div className="text-sm text-gray-500">{event.description}</div>}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-gray-900">{event.client}</div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {new Date(event.date).toLocaleDateString("pt-BR")}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{event.time}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1 text-sm">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span>{event.location}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getTypeColor(event.type)}>
                                <span className="capitalize">{event.type}</span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">{event.guests}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">
                                  R$ {event.budget.toLocaleString("pt-BR")}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Pago: R$ {event.paid.toLocaleString("pt-BR")}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(event.status)}>
                                <span className="capitalize">{event.status.replace("_", " ")}</span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Próximos Eventos</CardTitle>
                  <CardDescription>Eventos futuros agendados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                            <p className="text-gray-600">{event.client}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getTypeColor(event.type)}>
                              <span className="capitalize">{event.type}</span>
                            </Badge>
                            <Badge className={getStatusColor(event.status)}>
                              <span className="capitalize">{event.status.replace("_", " ")}</span>
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{new Date(event.date).toLocaleDateString("pt-BR")}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>{event.guests} convidados</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span>R$ {event.budget.toLocaleString("pt-BR")}</span>
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 rounded-lg">{event.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="month">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Eventos deste Mês</CardTitle>
                  <CardDescription>Eventos agendados para o mês atual</CardDescription>
                </CardHeader>
                <CardContent>
                  {thisMonthEvents.length === 0 ? (
                    <div className="text-center py-12">
                      <CalendarDays className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum evento este mês</h3>
                      <p className="text-gray-600">Não há eventos agendados para este mês.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {thisMonthEvents.map((event) => (
                        <div key={event.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <CalendarDays className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{event.name}</h3>
                                <p className="text-sm text-gray-600">{event.client}</p>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(event.date).toLocaleDateString("pt-BR")}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-3 w-3" />
                                    <span>{event.guests} convidados</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getTypeColor(event.type)}>
                                <span className="capitalize">{event.type}</span>
                              </Badge>
                              <Badge className={getStatusColor(event.status)}>
                                <span className="capitalize">{event.status.replace("_", " ")}</span>
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="planning">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Eventos em Planejamento</CardTitle>
                  <CardDescription>Eventos que precisam de atenção</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events
                      .filter((event) => event.status === "planejamento")
                      .map((event) => (
                        <div key={event.id} className="border border-yellow-200 rounded-xl p-4 bg-yellow-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-yellow-100 rounded-lg">
                                <AlertCircle className="h-5 w-5 text-yellow-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-yellow-800">{event.name}</h3>
                                <p className="text-sm text-yellow-600">{event.client}</p>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-yellow-500">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(event.date).toLocaleDateString("pt-BR")}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-3 w-3" />
                                    <span>{event.guests} convidados</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <DollarSign className="h-3 w-3" />
                                    <span>R$ {event.remaining.toLocaleString("pt-BR")} restante</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Em Planejamento</Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </LayoutWrapper>
  )
}
