"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  Scatter,
  ScatterChart,
} from "recharts"
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Users,
  MapPin,
  Star,
  Target,
  Award,
  Zap,
  Filter,
  RefreshCw,
  Share,
  Eye,
} from "lucide-react"
import { BarChart3 } from "lucide-react"

// Dados para os gráficos - 6 meses de dados
const revenueData = [
  { month: "Jan", receita: 145000, meta: 150000, eventos: 18, despesas: 45000, lucro: 100000 },
  { month: "Fev", receita: 162000, meta: 155000, eventos: 22, despesas: 48000, lucro: 114000 },
  { month: "Mar", receita: 178000, meta: 160000, eventos: 25, despesas: 52000, lucro: 126000 },
  { month: "Abr", receita: 195000, meta: 165000, eventos: 28, despesas: 55000, lucro: 140000 },
  { month: "Mai", receita: 210000, meta: 170000, eventos: 32, despesas: 58000, lucro: 152000 },
  { month: "Jun", receita: 185000, meta: 175000, eventos: 26, despesas: 51000, lucro: 134000 },
]

const eventTypeData = [
  { name: "Casamentos", value: 45, color: "#8B5CF6", receita: 850000, eventos: 68 },
  { name: "Aniversários", value: 25, color: "#06B6D4", receita: 420000, eventos: 38 },
  { name: "Formaturas", value: 15, color: "#10B981", receita: 280000, eventos: 23 },
  { name: "Corporativos", value: 10, color: "#F59E0B", receita: 320000, eventos: 15 },
  { name: "Outros", value: 5, color: "#EF4444", receita: 130000, eventos: 7 },
]

const venueData = [
  { name: "Salão Cristal", ocupacao: 92, receita: 450000, eventos: 28, rating: 4.8, capacidade: 200 },
  { name: "Salão Diamante", ocupacao: 88, receita: 380000, eventos: 24, rating: 4.7, capacidade: 150 },
  { name: "Salão Esmeralda", ocupacao: 85, receita: 320000, eventos: 20, rating: 4.6, capacidade: 120 },
  { name: "Salão Rubi", ocupacao: 78, receita: 280000, eventos: 18, rating: 4.5, capacidade: 100 },
  { name: "Salão Safira", ocupacao: 82, receita: 340000, eventos: 22, rating: 4.7, capacidade: 180 },
]

const clientData = [
  { month: "Jan", novos: 12, retorno: 8, satisfacao: 4.6, total: 20 },
  { month: "Fev", novos: 15, retorno: 10, satisfacao: 4.7, total: 25 },
  { month: "Mar", novos: 18, retorno: 12, satisfacao: 4.8, total: 30 },
  { month: "Abr", novos: 22, retorno: 15, satisfacao: 4.7, total: 37 },
  { month: "Mai", novos: 25, retorno: 18, satisfacao: 4.9, total: 43 },
  { month: "Jun", novos: 20, retorno: 14, satisfacao: 4.8, total: 34 },
]

const trendData = [
  { periodo: "Q1 2024", crescimento: 12, market_share: 15, nps: 68, conversao: 75 },
  { periodo: "Q2 2024", crescimento: 18, market_share: 17, nps: 72, conversao: 78 },
  { periodo: "Q3 2024", crescimento: 22, market_share: 19, nps: 75, conversao: 82 },
  { periodo: "Q4 2024", crescimento: 28, market_share: 22, nps: 78, conversao: 85 },
  { periodo: "Q1 2025", crescimento: 35, market_share: 25, nps: 82, conversao: 87 },
]

const satisfacaoData = [
  { categoria: "Atendimento", pontuacao: 92, meta: 90 },
  { categoria: "Decoração", pontuacao: 88, meta: 85 },
  { categoria: "Comida", pontuacao: 95, meta: 90 },
  { categoria: "Música", pontuacao: 85, meta: 80 },
  { categoria: "Limpeza", pontuacao: 90, meta: 88 },
  { categoria: "Preço", pontuacao: 78, meta: 75 },
]

// Dados para análise avançada tipo Power BI
const correlationData = [
  { receita: 145000, satisfacao: 4.6, eventos: 18 },
  { receita: 162000, satisfacao: 4.7, eventos: 22 },
  { receita: 178000, satisfacao: 4.8, eventos: 25 },
  { receita: 195000, satisfacao: 4.7, eventos: 28 },
  { receita: 210000, satisfacao: 4.9, eventos: 32 },
  { receita: 185000, satisfacao: 4.8, eventos: 26 },
]

const heatmapData = [
  { dia: "Seg", hora: "08:00", valor: 2 },
  { dia: "Seg", hora: "12:00", valor: 5 },
  { dia: "Seg", hora: "18:00", valor: 8 },
  { dia: "Ter", hora: "08:00", valor: 3 },
  { dia: "Ter", hora: "12:00", valor: 7 },
  { dia: "Ter", hora: "18:00", valor: 9 },
  { dia: "Qua", hora: "08:00", valor: 4 },
  { dia: "Qua", hora: "12:00", valor: 6 },
  { dia: "Qua", hora: "18:00", valor: 7 },
]

export default function RelatoriosPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m")
  const [refreshing, setRefreshing] = useState(false)

  const kpis = [
    {
      title: "Receita Total",
      value: "R$ 1.275.000",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Eventos Realizados",
      value: "151",
      change: "+12.5%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Taxa de Ocupação",
      value: "85%",
      change: "+5.2%",
      trend: "up",
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Satisfação Média",
      value: "4.8/5",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  const exportarPDF = () => {
    alert("Funcionalidade de exportação PDF será implementada!")
  }

  const refreshData = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  return (
    <LayoutWrapper>
      <main className="flex-1 overflow-y-auto">
        {/* Header estilo Power BI */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <span>Analytics Dashboard</span>
              </h1>
              <p className="text-gray-600">Análises avançadas e insights de negócio</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={refreshData} disabled={refreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Atualizar
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm" onClick={exportarPDF}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Último mês</SelectItem>
                  <SelectItem value="3m">Últimos 3 meses</SelectItem>
                  <SelectItem value="6m">Últimos 6 meses</SelectItem>
                  <SelectItem value="1y">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* KPIs estilo Power BI */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <Card
                key={index}
                className={`${kpi.bgColor} border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                      <p className={`text-3xl font-bold ${kpi.color} mt-1`}>{kpi.value}</p>
                      <div className={`flex items-center mt-2 ${kpi.color}`}>
                        {kpi.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-sm font-medium">{kpi.change}</span>
                      </div>
                    </div>
                    <kpi.icon className={`h-10 w-10 ${kpi.color} opacity-60`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs de Relatórios estilo Power BI */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white border border-gray-200">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                📊 Visão Geral
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                💰 Financeiro
              </TabsTrigger>
              <TabsTrigger value="venues" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                🏢 Salões
              </TabsTrigger>
              <TabsTrigger value="clients" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                👥 Clientes
              </TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                📈 Tendências
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                🔬 Avançado
              </TabsTrigger>
            </TabsList>

            {/* Visão Geral */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AreaChart className="h-5 w-5 text-blue-600" />
                      <span>Receita vs Meta - Últimos 6 Meses</span>
                    </CardTitle>
                    <CardDescription>Acompanhamento do desempenho financeiro</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, ""]} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="receita"
                          stackId="1"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.6}
                          name="Receita Real"
                        />
                        <Area
                          type="monotone"
                          dataKey="meta"
                          stackId="2"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.3}
                          name="Meta"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5 text-purple-600" />
                      <span>Distribuição por Tipo de Evento</span>
                    </CardTitle>
                    <CardDescription>Participação de cada categoria</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={eventTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {eventTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart className="h-5 w-5 text-green-600" />
                    <span>Performance Mensal Detalhada</span>
                  </CardTitle>
                  <CardDescription>Eventos realizados e receita por mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="receita" fill="#3B82F6" name="Receita (R$)" />
                      <Bar yAxisId="left" dataKey="despesas" fill="#EF4444" name="Despesas (R$)" />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="eventos"
                        stroke="#10B981"
                        strokeWidth={3}
                        name="Eventos (#)"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Análise Avançada - Novo Tab estilo Power BI */}
            <TabsContent value="advanced" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-red-600" />
                      <span>Análise de Correlação</span>
                    </CardTitle>
                    <CardDescription>Relação entre Receita, Satisfação e Eventos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart data={correlationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="satisfacao" name="Satisfação" />
                        <YAxis
                          dataKey="receita"
                          name="Receita"
                          tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "receita" ? `R$ ${Number(value).toLocaleString()}` : value,
                            name === "receita" ? "Receita" : "Satisfação",
                          ]}
                        />
                        <Scatter dataKey="receita" fill="#8B5CF6" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      <span>Radar de Performance</span>
                    </CardTitle>
                    <CardDescription>Análise multidimensional dos KPIs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={satisfacaoData}>
                        <RadialBar dataKey="pontuacao" cornerRadius={10} fill="#8B5CF6" />
                        <Tooltip formatter={(value) => [`${value}%`, "Performance"]} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Insights Inteligentes */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-indigo-600" />
                    <span>Insights Inteligentes</span>
                  </CardTitle>
                  <CardDescription>Análises automáticas baseadas em IA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                      <h4 className="font-bold text-green-800">🎯 Oportunidade Detectada</h4>
                      <p className="text-sm text-green-700 mt-2">
                        Casamentos têm 45% de participação e alta satisfação (4.8).
                        <strong>Recomendação:</strong> Criar pacotes premium para aumentar ticket médio.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                      <h4 className="font-bold text-blue-800">📊 Padrão Identificado</h4>
                      <p className="text-sm text-blue-700 mt-2">
                        Correlação positiva entre satisfação e receita (R² = 0.87).
                        <strong>Ação:</strong> Investir em qualidade gera retorno financeiro.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                      <h4 className="font-bold text-orange-800">⚠️ Alerta de Performance</h4>
                      <p className="text-sm text-orange-700 mt-2">
                        Salão Rubi com 78% de ocupação (abaixo da média).
                        <strong>Sugestão:</strong> Revisar estratégia de marketing e preços.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Outros tabs mantidos iguais... */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 shadow-lg">
                  <CardHeader>
                    <CardTitle>Receita vs Despesas</CardTitle>
                    <CardDescription>Análise de lucratividade mensal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, ""]} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="receita"
                          stackId="1"
                          stroke="#10B981"
                          fill="#10B981"
                          name="Receita"
                        />
                        <Area
                          type="monotone"
                          dataKey="despesas"
                          stackId="2"
                          stroke="#EF4444"
                          fill="#EF4444"
                          name="Despesas"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Receita por Categoria</CardTitle>
                    <CardDescription>Contribuição financeira</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {eventTypeData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold">R$ {item.receita.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{item.value}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Lucro Líquido</p>
                        <p className="text-2xl font-bold">R$ 966.000</p>
                        <p className="text-green-100 text-sm mt-1">Margem: 75.8%</p>
                      </div>
                      <Target className="h-8 w-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Ticket Médio</p>
                        <p className="text-2xl font-bold">R$ 8.450</p>
                        <p className="text-blue-100 text-sm mt-1">+15.2% vs anterior</p>
                      </div>
                      <Award className="h-8 w-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">ROI Médio</p>
                        <p className="text-2xl font-bold">312%</p>
                        <p className="text-purple-100 text-sm mt-1">Excelente retorno</p>
                      </div>
                      <Zap className="h-8 w-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Outros tabs continuam iguais... */}
            <TabsContent value="venues" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Performance dos Salões</CardTitle>
                  <CardDescription>Taxa de ocupação e receita por salão</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {venueData.map((venue, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-lg">{venue.name}</h4>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {venue.eventos} eventos
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{venue.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Taxa de Ocupação</p>
                            <Progress value={venue.ocupacao} className="h-2" />
                            <p className="text-sm font-medium mt-1">{venue.ocupacao}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Receita Total</p>
                            <p className="text-lg font-bold text-green-600">R$ {venue.receita.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Receita/Evento</p>
                            <p className="text-lg font-bold text-blue-600">
                              R$ {Math.round(venue.receita / venue.eventos).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Comparação de Receita por Salão</CardTitle>
                  <CardDescription>Performance financeira dos salões</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={venueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, "Receita"]} />
                      <Bar dataKey="receita" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Aquisição de Clientes</CardTitle>
                    <CardDescription>Novos clientes vs clientes de retorno</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={clientData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="novos" fill="#3B82F6" name="Novos Clientes" />
                        <Bar dataKey="retorno" fill="#10B981" name="Clientes de Retorno" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Satisfação do Cliente</CardTitle>
                    <CardDescription>Evolução da nota média mensal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={clientData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[4.0, 5.0]} />
                        <Tooltip formatter={(value) => [`${value}/5`, "Satisfação"]} />
                        <Line
                          type="monotone"
                          dataKey="satisfacao"
                          stroke="#F59E0B"
                          strokeWidth={3}
                          dot={{ fill: "#F59E0B", strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-indigo-100 text-sm">Total de Clientes</p>
                        <p className="text-2xl font-bold">1.247</p>
                        <p className="text-indigo-100 text-sm mt-1">+18.5% este ano</p>
                      </div>
                      <Users className="h-8 w-8 text-indigo-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-pink-100 text-sm">Taxa de Retenção</p>
                        <p className="text-2xl font-bold">78%</p>
                        <p className="text-pink-100 text-sm mt-1">Acima da média</p>
                      </div>
                      <Target className="h-8 w-8 text-pink-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-teal-100 text-sm">NPS Score</p>
                        <p className="text-2xl font-bold">82</p>
                        <p className="text-teal-100 text-sm mt-1">Promotores ativos</p>
                      </div>
                      <Star className="h-8 w-8 text-teal-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Satisfação por Categoria</CardTitle>
                  <CardDescription>Avaliação dos clientes por área de serviço</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={satisfacaoData}>
                      <RadialBar dataKey="pontuacao" cornerRadius={10} fill="#8884d8" />
                      <Tooltip formatter={(value) => [`${value}%`, "Satisfação"]} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Taxa de Conversão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">87%</div>
                    <p className="text-sm text-muted-foreground">Agendamentos → Confirmações</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Taxa de Cancelamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-600">8%</div>
                    <p className="text-sm text-muted-foreground">Abaixo da média do setor</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Tempo Médio de Antecedência</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">45</div>
                    <p className="text-sm text-muted-foreground">dias para agendamento</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Tendências de Crescimento</CardTitle>
                  <CardDescription>Análise trimestral de indicadores chave</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="periodo" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="crescimento"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        name="Crescimento (%)"
                      />
                      <Line
                        type="monotone"
                        dataKey="market_share"
                        stroke="#10B981"
                        strokeWidth={3}
                        name="Market Share (%)"
                      />
                      <Line type="monotone" dataKey="nps" stroke="#F59E0B" strokeWidth={3} name="NPS Score" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Projeções para 2025</CardTitle>
                    <CardDescription>Estimativas baseadas em tendências atuais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Receita Projetada</span>
                        <span className="text-lg font-bold text-green-600">R$ 2.8M</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Eventos Estimados</span>
                        <span className="text-lg font-bold text-blue-600">320</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium">Novos Clientes</span>
                        <span className="text-lg font-bold text-purple-600">180</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="font-medium">Market Share</span>
                        <span className="text-lg font-bold text-orange-600">28%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Insights Estratégicos</CardTitle>
                    <CardDescription>Recomendações baseadas em dados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border-l-4 border-green-500 bg-green-50">
                        <p className="font-medium text-green-800">Oportunidade</p>
                        <p className="text-sm text-green-700">
                          Casamentos representam 45% da receita. Considere pacotes premium.
                        </p>
                      </div>
                      <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                        <p className="font-medium text-blue-800">Crescimento</p>
                        <p className="text-sm text-blue-700">
                          Taxa de retenção de 78% indica alta satisfação. Foque em referências.
                        </p>
                      </div>
                      <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
                        <p className="font-medium text-orange-800">Atenção</p>
                        <p className="text-sm text-orange-700">
                          Salão Rubi com menor ocupação. Revisar estratégia de marketing.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </LayoutWrapper>
  )
}
