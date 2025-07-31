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
  Clock,
  MapPin,
  Phone,
  Edit,
  Trash2,
  MoreHorizontal,
  CalendarDays,
  Users,
  CheckCircle,
} from "lucide-react"

interface AgendaItem {
  id: number
  title: string
  client: string
  date: string
  time: string
  location: string
  type: "reuniao" | "visita" | "evento" | "ligacao"
  status: "agendado" | "confirmado" | "cancelado" | "concluido"
  contact: {
    phone: string
    email: string
  }
  notes?: string
}

export default function Agenda() {
  const [agendaItems] = useState<AgendaItem[]>([
    {
      id: 1,
      title: "Reunião - Planejamento Casamento",
      client: "Maria & João Silva",
      date: "2024-01-20",
      time: "14:00",
      location: "Escritório",
      type: "reuniao",
      status: "confirmado",
      contact: {
        phone: "(11) 99999-9999",
        email: "maria.silva@email.com",
      },
      notes: "Discutir decoração e cardápio",
    },
    {
      id: 2,
      title: "Visita ao Local - Aniversário 15 Anos",
      client: "Ana Carolina Santos",
      date: "2024-01-21",
      time: "10:30",
      location: "Salão de Festas Villa Real",
      type: "visita",
      status: "agendado",
      contact: {
        phone: "(11) 88888-8888",
        email: "ana.santos@email.com",
      },
    },
    {
      id: 3,
      title: "Evento - Casamento Silva",
      client: "Maria & João Silva",
      date: "2024-03-14",
      time: "18:00",
      location: "Chácara Bela Vista",
      type: "evento",
      status: "confirmado",
      contact: {
        phone: "(11) 99999-9999",
        email: "maria.silva@email.com",
      },
    },
    {
      id: 4,
      title: "Ligação - Follow-up Orçamento",
      client: "Pedro & Carla Costa",
      date: "2024-01-22",
      time: "16:00",
      location: "Remoto",
      type: "ligacao",
      status: "agendado",
      contact: {
        phone: "(11) 77777-7777",
        email: "pedro.costa@email.com",
      },
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = agendaItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.client.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reuniao":
        return <Users className="h-4 w-4" />
      case "visita":
        return <MapPin className="h-4 w-4" />
      case "evento":
        return <CalendarDays className="h-4 w-4" />
      case "ligacao":
        return <Phone className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reuniao":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "visita":
        return "bg-green-100 text-green-700 border-green-200"
      case "evento":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "ligacao":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-700 border-green-200"
      case "agendado":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "cancelado":
        return "bg-red-100 text-red-700 border-red-200"
      case "concluido":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const todayItems = agendaItems.filter((item) => item.date === new Date().toISOString().split("T")[0])
  const upcomingItems = agendaItems.filter((item) => new Date(item.date) > new Date())
  const confirmedItems = agendaItems.filter((item) => item.status === "confirmado")

  return (
    <LayoutWrapper>
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
              <p className="text-gray-600 mt-1">Gerencie compromissos, reuniões e eventos</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar compromissos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Visualizar Calendário
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Compromisso
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
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{todayItems.length}</div>
                    <div className="text-sm text-gray-600">Hoje</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <CalendarDays className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{upcomingItems.length}</div>
                    <div className="text-sm text-gray-600">Próximos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{confirmedItems.length}</div>
                    <div className="text-sm text-gray-600">Confirmados</div>
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
                    <div className="text-2xl font-bold text-gray-900">{agendaItems.length}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="today">Hoje</TabsTrigger>
              <TabsTrigger value="upcoming">Próximos</TabsTrigger>
              <TabsTrigger value="calendar">Calendário</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Todos os Compromissos</CardTitle>
                  <CardDescription>Lista completa de compromissos agendados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="font-semibold text-gray-900">Compromisso</TableHead>
                          <TableHead className="font-semibold text-gray-900">Cliente</TableHead>
                          <TableHead className="font-semibold text-gray-900">Data/Hora</TableHead>
                          <TableHead className="font-semibold text-gray-900">Local</TableHead>
                          <TableHead className="font-semibold text-gray-900">Tipo</TableHead>
                          <TableHead className="font-semibold text-gray-900">Status</TableHead>
                          <TableHead className="font-semibold text-gray-900">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => (
                          <TableRow key={item.id} className="border-gray-200 hover:bg-gray-50">
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">{item.title}</div>
                                {item.notes && <div className="text-sm text-gray-500">{item.notes}</div>}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">{item.client}</div>
                                <div className="text-sm text-gray-500 flex items-center space-x-2">
                                  <Phone className="h-3 w-3" />
                                  <span>{item.contact.phone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {new Date(item.date).toLocaleDateString("pt-BR")}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{item.time}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1 text-sm">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span>{item.location}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getTypeColor(item.type)}>
                                <div className="flex items-center space-x-1">
                                  {getTypeIcon(item.type)}
                                  <span className="capitalize">{item.type}</span>
                                </div>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(item.status)}>
                                <span className="capitalize">{item.status}</span>
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

            <TabsContent value="today">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Compromissos de Hoje</CardTitle>
                  <CardDescription>Agenda do dia atual</CardDescription>
                </CardHeader>
                <CardContent>
                  {todayItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum compromisso hoje</h3>
                      <p className="text-gray-600">Você não tem compromissos agendados para hoje.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {todayItems.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-blue-50 rounded-lg">{getTypeIcon(item.type)}</div>
                              <div>
                                <h3 className="font-medium text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.client}</p>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{item.time}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{item.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Badge className={getStatusColor(item.status)}>
                              <span className="capitalize">{item.status}</span>
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Próximos Compromissos</CardTitle>
                  <CardDescription>Compromissos futuros agendados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-50 rounded-lg">{getTypeIcon(item.type)}</div>
                            <div>
                              <h3 className="font-medium text-gray-900">{item.title}</h3>
                              <p className="text-sm text-gray-600">{item.client}</p>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(item.date).toLocaleDateString("pt-BR")}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{item.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getTypeColor(item.type)}>
                              <span className="capitalize">{item.type}</span>
                            </Badge>
                            <Badge className={getStatusColor(item.status)}>
                              <span className="capitalize">{item.status}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Visualização em Calendário</CardTitle>
                  <CardDescription>Vista mensal dos compromissos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <CalendarDays className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Calendário em Desenvolvimento</h3>
                    <p className="text-gray-600">A visualização em calendário será implementada em breve.</p>
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
