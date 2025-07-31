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
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Edit,
  MoreHorizontal,
  Users,
  Heart,
  Building,
  GraduationCap,
} from "lucide-react"

interface Client {
  id: number
  name: string
  email: string
  phone: string
  address: string
  city: string
  type: "pessoa_fisica" | "pessoa_juridica"
  category: "casamento" | "aniversario" | "corporativo" | "formatura" | "outro"
  status: "ativo" | "inativo" | "prospecto"
  totalEvents: number
  totalSpent: number
  lastEvent: string
  registrationDate: string
  notes?: string
}

export default function Clientes() {
  const [clients] = useState<Client[]>([
    {
      id: 1,
      name: "Maria & João Silva",
      email: "maria.silva@email.com",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123",
      city: "São Paulo - SP",
      type: "pessoa_fisica",
      category: "casamento",
      status: "ativo",
      totalEvents: 1,
      totalSpent: 25000,
      lastEvent: "2024-03-14",
      registrationDate: "2024-01-10",
      notes: "Casal muito organizado, gosta de detalhes",
    },
    {
      id: 2,
      name: "Ana Carolina Santos",
      email: "ana.santos@email.com",
      phone: "(11) 88888-8888",
      address: "Av. Paulista, 456",
      city: "São Paulo - SP",
      type: "pessoa_fisica",
      category: "aniversario",
      status: "ativo",
      totalEvents: 1,
      totalSpent: 15000,
      lastEvent: "2024-02-28",
      registrationDate: "2024-01-15",
      notes: "Aniversário de 15 anos - tema jardim encantado",
    },
    {
      id: 3,
      name: "TechCorp Ltda",
      email: "eventos@techcorp.com",
      phone: "(11) 77777-7777",
      address: "Rua Comercial, 789",
      city: "São Paulo - SP",
      type: "pessoa_juridica",
      category: "corporativo",
      status: "ativo",
      totalEvents: 2,
      totalSpent: 80000,
      lastEvent: "2024-04-10",
      registrationDate: "2023-12-01",
      notes: "Empresa de tecnologia - eventos corporativos regulares",
    },
    {
      id: 4,
      name: "Pedro & Carla Costa",
      email: "pedro.costa@email.com",
      phone: "(11) 66666-6666",
      address: "Rua dos Jardins, 321",
      city: "São Paulo - SP",
      type: "pessoa_fisica",
      category: "casamento",
      status: "prospecto",
      totalEvents: 0,
      totalSpent: 0,
      lastEvent: "",
      registrationDate: "2024-01-20",
      notes: "Interessados em casamento para 2024",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "casamento":
        return <Heart className="h-4 w-4" />
      case "aniversario":
        return <Calendar className="h-4 w-4" />
      case "corporativo":
        return <Building className="h-4 w-4" />
      case "formatura":
        return <GraduationCap className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
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
      case "ativo":
        return "bg-green-100 text-green-700 border-green-200"
      case "inativo":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "prospecto":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const totalClients = clients.length
  const activeClients = clients.filter((c) => c.status === "ativo").length
  const prospects = clients.filter((c) => c.status === "prospecto").length
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalSpent, 0)

  return (
    <LayoutWrapper>
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
              <p className="text-gray-600 mt-1">Gerencie informações e histórico dos clientes</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Email
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Cliente
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
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalClients}</div>
                    <div className="text-sm text-gray-600">Total de Clientes</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{activeClients}</div>
                    <div className="text-sm text-gray-600">Clientes Ativos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-yellow-50 rounded-xl">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{prospects}</div>
                    <div className="text-sm text-gray-600">Prospectos</div>
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
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Todos os Clientes</TabsTrigger>
              <TabsTrigger value="active">Ativos</TabsTrigger>
              <TabsTrigger value="prospects">Prospectos</TabsTrigger>
              <TabsTrigger value="analytics">Análises</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Todos os Clientes</CardTitle>
                  <CardDescription>Lista completa de clientes cadastrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="font-semibold text-gray-900">Cliente</TableHead>
                          <TableHead className="font-semibold text-gray-900">Contato</TableHead>
                          <TableHead className="font-semibold text-gray-900">Localização</TableHead>
                          <TableHead className="font-semibold text-gray-900">Categoria</TableHead>
                          <TableHead className="font-semibold text-gray-900">Eventos</TableHead>
                          <TableHead className="font-semibold text-gray-900">Total Gasto</TableHead>
                          <TableHead className="font-semibold text-gray-900">Status</TableHead>
                          <TableHead className="font-semibold text-gray-900">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredClients.map((client) => (
                          <TableRow key={client.id} className="border-gray-200 hover:bg-gray-50">
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">{client.name}</div>
                                <div className="text-sm text-gray-500">
                                  {client.type === "pessoa_juridica" ? "Pessoa Jurídica" : "Pessoa Física"}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-1 text-sm">
                                  <Mail className="h-3 w-3 text-gray-400" />
                                  <span>{client.email}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-sm">
                                  <Phone className="h-3 w-3 text-gray-400" />
                                  <span>{client.phone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1 text-sm">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <div>
                                  <div>{client.address}</div>
                                  <div className="text-xs text-gray-500">{client.city}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getCategoryColor(client.category)}>
                                <div className="flex items-center space-x-1">
                                  {getCategoryIcon(client.category)}
                                  <span className="capitalize">{client.category}</span>
                                </div>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{client.totalEvents}</div>
                                {client.lastEvent && (
                                  <div className="text-xs text-gray-500">
                                    Último: {new Date(client.lastEvent).toLocaleDateString("pt-BR")}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-gray-900">
                                R$ {client.totalSpent.toLocaleString("pt-BR")}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(client.status)}>
                                <span className="capitalize">{client.status}</span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Mail className="h-4 w-4" />
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

            <TabsContent value="active">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Clientes Ativos</CardTitle>
                  <CardDescription>Clientes com eventos confirmados ou em andamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients
                      .filter((client) => client.status === "ativo")
                      .map((client) => (
                        <div key={client.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                              <p className="text-gray-600">{client.email}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getCategoryColor(client.category)}>
                                <div className="flex items-center space-x-1">
                                  {getCategoryIcon(client.category)}
                                  <span className="capitalize">{client.category}</span>
                                </div>
                              </Badge>
                              <Badge className="bg-green-100 text-green-700 border-green-200">Ativo</Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{client.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{client.totalEvents} eventos</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                              <span>R$ {client.totalSpent.toLocaleString("pt-BR")}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{client.city}</span>
                            </div>
                          </div>
                          {client.notes && (
                            <p className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 rounded-lg">{client.notes}</p>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prospects">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Prospectos</CardTitle>
                  <CardDescription>Clientes em potencial que precisam de follow-up</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients
                      .filter((client) => client.status === "prospecto")
                      .map((client) => (
                        <div key={client.id} className="border border-yellow-200 rounded-xl p-4 bg-yellow-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-yellow-100 rounded-lg">
                                <User className="h-5 w-5 text-yellow-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-yellow-800">{client.name}</h3>
                                <p className="text-sm text-yellow-600">{client.email}</p>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-yellow-500">
                                  <div className="flex items-center space-x-1">
                                    <Phone className="h-3 w-3" />
                                    <span>{client.phone}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                      Cadastrado em {new Date(client.registrationDate).toLocaleDateString("pt-BR")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getCategoryColor(client.category)}>
                                <span className="capitalize">{client.category}</span>
                              </Badge>
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Prospecto</Badge>
                            </div>
                          </div>
                          {client.notes && (
                            <p className="text-sm text-yellow-600 mt-3 p-3 bg-yellow-100 rounded-lg">{client.notes}</p>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Análises de Clientes</CardTitle>
                  <CardDescription>Insights e métricas sobre a base de clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Análises em Desenvolvimento</h3>
                    <p className="text-gray-600">Relatórios detalhados e insights serão implementados em breve.</p>
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
