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
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Edit,
  Trash2,
  MoreHorizontal,
  Box,
  Archive,
  Activity,
} from "lucide-react"

interface StockItem {
  id: number
  name: string
  category: string
  quantity: number
  minQuantity: number
  unit: string
  location: string
  lastUpdate: string
  value: number
}

interface StockMovement {
  id: number
  itemName: string
  type: "entrada" | "saida"
  quantity: number
  reason: string
  date: string
  user: string
}

export default function Estoque() {
  const [stockItems] = useState<StockItem[]>([
    {
      id: 1,
      name: "Toalhas de Mesa Brancas",
      category: "Decoração",
      quantity: 50,
      minQuantity: 10,
      unit: "unidades",
      location: "Depósito A",
      lastUpdate: "2024-01-15",
      value: 25,
    },
    {
      id: 2,
      name: "Cadeiras Tiffany Douradas",
      category: "Mobiliário",
      quantity: 200,
      minQuantity: 50,
      unit: "unidades",
      location: "Depósito B",
      lastUpdate: "2024-01-10",
      value: 45,
    },
    {
      id: 3,
      name: "Arranjos de Flores Artificiais",
      category: "Decoração",
      quantity: 8,
      minQuantity: 15,
      unit: "unidades",
      location: "Depósito A",
      lastUpdate: "2024-01-12",
      value: 120,
    },
    {
      id: 4,
      name: "Pratos de Porcelana",
      category: "Louças",
      quantity: 300,
      minQuantity: 100,
      unit: "unidades",
      location: "Depósito C",
      lastUpdate: "2024-01-08",
      value: 15,
    },
  ])

  const [movements] = useState<StockMovement[]>([
    {
      id: 1,
      itemName: "Toalhas de Mesa Brancas",
      type: "entrada",
      quantity: 20,
      reason: "Compra de reposição",
      date: "2024-01-15",
      user: "Admin",
    },
    {
      id: 2,
      itemName: "Cadeiras Tiffany Douradas",
      type: "saida",
      quantity: 50,
      reason: "Evento - Casamento Silva",
      date: "2024-01-14",
      user: "João",
    },
    {
      id: 3,
      itemName: "Arranjos de Flores Artificiais",
      type: "entrada",
      quantity: 10,
      reason: "Nova aquisição",
      date: "2024-01-12",
      user: "Maria",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = stockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const lowStockItems = stockItems.filter((item) => item.quantity <= item.minQuantity)

  const getStockStatus = (quantity: number, minQuantity: number) => {
    if (quantity === 0) return { color: "bg-red-100 text-red-700 border-red-200", text: "Sem estoque" }
    if (quantity <= minQuantity)
      return { color: "bg-yellow-100 text-yellow-700 border-yellow-200", text: "Estoque baixo" }
    return { color: "bg-green-100 text-green-700 border-green-200", text: "Normal" }
  }

  const totalItems = stockItems.length
  const totalValue = stockItems.reduce((sum, item) => sum + item.quantity * item.value, 0)
  const todayMovements = movements.filter((m) => m.date === new Date().toISOString().split("T")[0]).length

  return (
    <LayoutWrapper>
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Estoque</h1>
              <p className="text-gray-600 mt-1">Controle de itens, decorações e equipamentos</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar itens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Movimentação
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Item
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
                    <Box className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
                    <div className="text-sm text-gray-600">Total de Itens</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <Archive className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">R$ {totalValue.toLocaleString("pt-BR")}</div>
                    <div className="text-sm text-gray-600">Valor Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-50 rounded-xl">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
                    <div className="text-sm text-gray-600">Estoque Baixo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{todayMovements}</div>
                    <div className="text-sm text-gray-600">Movimentações Hoje</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="items" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="items">Itens do Estoque</TabsTrigger>
              <TabsTrigger value="movements">Movimentações</TabsTrigger>
              <TabsTrigger value="alerts">Alertas</TabsTrigger>
            </TabsList>

            <TabsContent value="items">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Itens do Estoque</CardTitle>
                  <CardDescription>Controle de todos os itens disponíveis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="font-semibold text-gray-900">Item</TableHead>
                          <TableHead className="font-semibold text-gray-900">Categoria</TableHead>
                          <TableHead className="font-semibold text-gray-900">Quantidade</TableHead>
                          <TableHead className="font-semibold text-gray-900">Localização</TableHead>
                          <TableHead className="font-semibold text-gray-900">Valor Unit.</TableHead>
                          <TableHead className="font-semibold text-gray-900">Status</TableHead>
                          <TableHead className="font-semibold text-gray-900">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => {
                          const status = getStockStatus(item.quantity, item.minQuantity)
                          return (
                            <TableRow key={item.id} className="border-gray-200 hover:bg-gray-50">
                              <TableCell>
                                <div>
                                  <div className="font-medium text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-500">
                                    Atualizado em {new Date(item.lastUpdate).toLocaleDateString("pt-BR")}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                  {item.category}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">
                                    {item.quantity} {item.unit}
                                  </div>
                                  <div className="text-xs text-gray-500">Mín: {item.minQuantity}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-1 text-sm">
                                  <Package className="h-4 w-4 text-gray-400" />
                                  <span>{item.location}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium text-gray-900">R$ {item.value.toFixed(2)}</div>
                              </TableCell>
                              <TableCell>
                                <Badge className={status.color}>{status.text}</Badge>
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
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="movements">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Movimentações Recentes</CardTitle>
                  <CardDescription>Histórico de entradas e saídas do estoque</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="font-semibold text-gray-900">Item</TableHead>
                          <TableHead className="font-semibold text-gray-900">Tipo</TableHead>
                          <TableHead className="font-semibold text-gray-900">Quantidade</TableHead>
                          <TableHead className="font-semibold text-gray-900">Motivo</TableHead>
                          <TableHead className="font-semibold text-gray-900">Data</TableHead>
                          <TableHead className="font-semibold text-gray-900">Usuário</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {movements.map((movement) => (
                          <TableRow key={movement.id} className="border-gray-200 hover:bg-gray-50">
                            <TableCell>
                              <div className="font-medium text-gray-900">{movement.itemName}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {movement.type === "entrada" ? (
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-red-600" />
                                )}
                                <Badge
                                  className={
                                    movement.type === "entrada"
                                      ? "bg-green-100 text-green-700 border-green-200"
                                      : "bg-red-100 text-red-700 border-red-200"
                                  }
                                >
                                  {movement.type === "entrada" ? "Entrada" : "Saída"}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{movement.quantity}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{movement.reason}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{new Date(movement.date).toLocaleDateString("pt-BR")}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{movement.user}</div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Alertas de Estoque</CardTitle>
                  <CardDescription>Itens que precisam de atenção</CardDescription>
                </CardHeader>
                <CardContent>
                  {lowStockItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum alerta</h3>
                      <p className="text-gray-600">Todos os itens estão com estoque adequado.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {lowStockItems.map((item) => (
                        <div key={item.id} className="border border-yellow-200 rounded-xl p-4 bg-yellow-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-yellow-100 rounded-lg">
                                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-yellow-800">{item.name}</h3>
                                <p className="text-sm text-yellow-600">
                                  Estoque atual: {item.quantity} {item.unit} (Mínimo: {item.minQuantity} {item.unit})
                                </p>
                                <p className="text-xs text-yellow-500">Localização: {item.location}</p>
                              </div>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Estoque Baixo</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </LayoutWrapper>
  )
}
