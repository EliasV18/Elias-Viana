"use client"

import type React from "react"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Filter, Edit, Trash2, Shield, Users, UserPlus, Crown, Eye, EyeOff } from "lucide-react"
import { User } from "lucide-react"

interface Usuario {
  id: number
  name: string
  email: string
  role: "admin" | "manager" | "employee"
  status: "ativo" | "inativo" | "suspenso"
  lastLogin: string
  createdAt: string
  permissions: string[]
}

export default function Usuarios() {
  const [users, setUsers] = useState<Usuario[]>([
    {
      id: 1,
      name: "Administrador",
      email: "admin@casadefestas.com",
      role: "admin",
      status: "ativo",
      lastLogin: "2024-01-20",
      createdAt: "2024-01-01",
      permissions: ["all"],
    },
    {
      id: 2,
      name: "João Silva",
      email: "joao@casadefestas.com",
      role: "manager",
      status: "ativo",
      lastLogin: "2024-01-19",
      createdAt: "2024-01-05",
      permissions: ["events", "clients", "contracts", "reports"],
    },
    {
      id: 3,
      name: "Maria Santos",
      email: "maria@casadefestas.com",
      role: "employee",
      status: "ativo",
      lastLogin: "2024-01-18",
      createdAt: "2024-01-10",
      permissions: ["events", "clients"],
    },
    {
      id: 4,
      name: "Pedro Costa",
      email: "pedro@casadefestas.com",
      role: "employee",
      status: "suspenso",
      lastLogin: "2024-01-15",
      createdAt: "2024-01-12",
      permissions: ["events"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<Usuario | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee" as const,
    status: "ativo" as const,
    permissions: [] as string[],
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "admin":
        return { label: "Administrador", color: "bg-red-100 text-red-700 border-red-200", icon: Crown }
      case "manager":
        return { label: "Gerente", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Shield }
      case "employee":
        return { label: "Funcionário", color: "bg-green-100 text-green-700 border-green-200", icon: User }
      default:
        return { label: "Usuário", color: "bg-gray-100 text-gray-700 border-gray-200", icon: User }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-700 border-green-200"
      case "inativo":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "suspenso":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      permissions: formData.permissions,
      lastLogin: "Nunca",
      createdAt: new Date().toISOString().split("T")[0],
    }

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...userData, id: editingUser.id } : u)))
      console.log("Usuário editado:", userData)
      alert("Usuário atualizado com sucesso!")
    } else {
      setUsers([...users, { ...userData, id: Date.now() }])
      console.log("Novo usuário criado:", userData)
      alert("Usuário criado com sucesso!")
    }

    setFormData({ name: "", email: "", password: "", role: "employee", status: "ativo", permissions: [] })
    setEditingUser(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (user: Usuario) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
      permissions: user.permissions,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers(users.filter((u) => u.id !== id))
      alert("Usuário excluído com sucesso!")
    }
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, permissions: [...formData.permissions, permission] })
    } else {
      setFormData({ ...formData, permissions: formData.permissions.filter((p) => p !== permission) })
    }
  }

  const availablePermissions = [
    { id: "events", label: "Eventos" },
    { id: "clients", label: "Clientes" },
    { id: "contracts", label: "Contratos" },
    { id: "stock", label: "Estoque" },
    { id: "reports", label: "Relatórios" },
    { id: "settings", label: "Configurações" },
  ]

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "ativo").length
  const adminUsers = users.filter((u) => u.role === "admin").length

  return (
    <LayoutWrapper>
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestão de Usuários</h1>
              <p className="text-gray-600 mt-1">Controle total sobre usuários e permissões do sistema</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingUser(null)
                      setFormData({
                        name: "",
                        email: "",
                        password: "",
                        role: "employee",
                        status: "ativo",
                        permissions: [],
                      })
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{editingUser ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
                    <DialogDescription>
                      {editingUser ? "Edite as informações do usuário" : "Crie um novo usuário no sistema"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Nome Completo</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="password">
                          {editingUser ? "Nova Senha (deixe vazio para manter)" : "Senha"}
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required={!editingUser}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="role">Função</Label>
                          <Select
                            value={formData.role}
                            onValueChange={(value: any) => setFormData({ ...formData, role: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Administrador</SelectItem>
                              <SelectItem value="manager">Gerente</SelectItem>
                              <SelectItem value="employee">Funcionário</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={formData.status}
                            onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ativo">Ativo</SelectItem>
                              <SelectItem value="inativo">Inativo</SelectItem>
                              <SelectItem value="suspenso">Suspenso</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {formData.role !== "admin" && (
                        <div className="grid gap-2">
                          <Label>Permissões</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {availablePermissions.map((permission) => (
                              <div key={permission.id} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={permission.id}
                                  checked={formData.permissions.includes(permission.id)}
                                  onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                                  className="rounded"
                                />
                                <Label htmlFor={permission.id} className="text-sm">
                                  {permission.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button type="submit">{editingUser ? "Salvar" : "Criar"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
                    <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
                    <div className="text-sm text-gray-600">Total de Usuários</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <UserPlus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{activeUsers}</div>
                    <div className="text-sm text-gray-600">Usuários Ativos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-50 rounded-xl">
                    <Crown className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{adminUsers}</div>
                    <div className="text-sm text-gray-600">Administradores</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {users.filter((u) => u.role === "manager").length}
                    </div>
                    <div className="text-sm text-gray-600">Gerentes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Usuários */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Lista de Usuários</CardTitle>
              <CardDescription>Todos os usuários cadastrados no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="font-semibold text-gray-900">Usuário</TableHead>
                      <TableHead className="font-semibold text-gray-900">Função</TableHead>
                      <TableHead className="font-semibold text-gray-900">Status</TableHead>
                      <TableHead className="font-semibold text-gray-900">Último Login</TableHead>
                      <TableHead className="font-semibold text-gray-900">Criado em</TableHead>
                      <TableHead className="font-semibold text-gray-900">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => {
                      const roleInfo = getRoleInfo(user.role)
                      const RoleIcon = roleInfo.icon
                      return (
                        <TableRow key={user.id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <RoleIcon className="h-4 w-4" />
                              <Badge className={roleInfo.color}>{roleInfo.label}</Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {user.lastLogin === "Nunca"
                                ? "Nunca"
                                : new Date(user.lastLogin).toLocaleDateString("pt-BR")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{new Date(user.createdAt).toLocaleDateString("pt-BR")}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              {user.role !== "admin" && (
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
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
        </div>
      </main>
    </LayoutWrapper>
  )
}
