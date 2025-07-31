"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Calendar,
  Users,
  PartyPopper,
  FileText,
  Package,
  BarChart3,
  UserCog,
  Settings,
  User,
  HelpCircle,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", roles: ["admin", "gerente", "funcionario"] },
  { icon: Calendar, label: "Agenda", href: "/agenda", roles: ["admin", "gerente", "funcionario"] },
  { icon: Users, label: "Clientes", href: "/clientes", roles: ["admin", "gerente", "funcionario"] },
  { icon: PartyPopper, label: "Eventos", href: "/eventos", roles: ["admin", "gerente", "funcionario"] },
  { icon: FileText, label: "Contratos", href: "/contratos", roles: ["admin", "gerente"] },
  { icon: Package, label: "Estoque", href: "/estoque", roles: ["admin", "gerente"] },
  { icon: BarChart3, label: "Relatórios", href: "/relatorios", roles: ["admin", "gerente"] },
  { icon: UserCog, label: "Usuários", href: "/usuarios", roles: ["admin"] },
  { icon: Settings, label: "Configurações", href: "/configuracoes", roles: ["admin"] },
]

export function ModernSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const user = getCurrentUser()

  // Manter expandido quando dropdown estiver aberto
  useEffect(() => {
    if (dropdownOpen) {
      setIsExpanded(true)
    }
  }, [dropdownOpen])

  // Fechar mobile menu ao navegar
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  if (!user) return null

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user.role))

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white shadow-md"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
          isExpanded || dropdownOpen ? "w-64" : "w-16"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        onMouseEnter={() => !isMobileOpen && setIsExpanded(true)}
        onMouseLeave={() => !dropdownOpen && !isMobileOpen && setIsExpanded(false)}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                CF
              </div>
              {(isExpanded || dropdownOpen || isMobileOpen) && (
                <div className="min-w-0">
                  <h2 className="font-bold text-gray-900 truncate">Casa de Festas</h2>
                  <p className="text-xs text-gray-500 truncate">Sistema de Gestão</p>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-2 overflow-y-auto">
            <ul className="space-y-1">
              {filteredMenuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start h-10 transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600 shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => router.push(item.href)}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {(isExpanded || dropdownOpen || isMobileOpen) && (
                        <span className="ml-3 truncate">{item.label}</span>
                      )}
                    </Button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-2 border-t border-gray-200">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start h-12 hover:bg-gray-100 transition-colors">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                      {user.role === "admin" ? "A" : user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {(isExpanded || dropdownOpen || isMobileOpen) && (
                    <div className="ml-3 flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.role === "admin" ? "Administrador" : user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  )}
                  {(isExpanded || dropdownOpen || isMobileOpen) && (
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => router.push("/perfil")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/ajuda")}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Ajuda</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}
