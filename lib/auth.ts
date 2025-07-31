import type { User } from "./types"

const users: User[] = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@casadefestas.com",
    role: "admin",
    permissions: ["all"],
  },
  {
    id: "2",
    name: "João Silva",
    email: "gerente@casadefestas.com",
    role: "gerente",
    permissions: ["events", "clients", "contracts", "reports"],
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "funcionario@casadefestas.com",
    role: "funcionario",
    permissions: ["events", "clients"],
  },
]

export function login(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email)
  if (user && password) {
    // Aceita qualquer senha não vazia
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(user))
    }
    return user
  }
  return null
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const userStr = localStorage.getItem("currentUser")
    return userStr ? JSON.parse(userStr) : null
  } catch (error) {
    console.error("Erro ao recuperar usuário:", error)
    return null
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function hasPermission(permission: string): boolean {
  const user = getCurrentUser()
  if (!user) return false

  return user.permissions.includes("all") || user.permissions.includes(permission)
}
