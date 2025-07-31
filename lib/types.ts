export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "gerente" | "funcionario"
  permissions: string[]
}

export interface Event {
  id: number
  client: string
  eventType: string
  date: string
  time: string
  guests: number
  venue: string
  status: "agendado" | "confirmado" | "realizado" | "cancelado"
  value: number
  observations: string
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  company: string
  city: string
  eventsCount: number
  totalSpent: number
  lastEvent: string
  status: "ativo" | "inativo" | "vip"
}

export interface Contract {
  id: number
  client: string
  eventDate: string
  contractDate: string
  totalValue: number
  paidValue: number
  installments: number
  status: "ativo" | "pago" | "vencido" | "cancelado"
  paymentMethod: string
  observations: string
}

export interface Meeting {
  id: number
  client: string
  type: string
  date: string
  time: string
  duration: number
  location: string
  status: "agendada" | "confirmada" | "realizada" | "cancelada"
  notes: string
}

export interface StockItem {
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

export interface StockMovement {
  id: number
  itemName: string
  type: "entrada" | "saida"
  quantity: number
  reason: string
  date: string
  user: string
}

export interface Usuario {
  id: number
  name: string
  email: string
  role: "admin" | "manager" | "employee"
  status: "ativo" | "inativo" | "suspenso"
  lastLogin: string
  createdAt: string
  permissions: string[]
}
