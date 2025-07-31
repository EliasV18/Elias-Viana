"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Lock, Palette, Bell, Database, Save, Eye, EyeOff } from "lucide-react"

export default function Configuracoes() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [userSettings, setUserSettings] = useState({
    name: "Administrador",
    email: "admin@casadefestas.com",
    phone: "(11) 99999-9999",
    company: "Casa de Festas Premium",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [systemSettings, setSystemSettings] = useState({
    theme: "system",
    notifications: true,
    emailNotifications: true,
    autoBackup: true,
    language: "pt-BR",
  })

  const handleUserSettingsChange = (field: string, value: string) => {
    setUserSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSystemSettingsChange = (field: string, value: boolean | string) => {
    setSystemSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    console.log("Salvando perfil:", userSettings)
    alert("Perfil atualizado com sucesso!")
  }

  const handleChangePassword = () => {
    if (userSettings.newPassword !== userSettings.confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }
    if (userSettings.newPassword.length < 6) {
      alert("A nova senha deve ter pelo menos 6 caracteres!")
      return
    }
    console.log("Alterando senha...")
    alert("Senha alterada com sucesso!")
    setUserSettings((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }))
  }

  const handleSaveSystemSettings = () => {
    console.log("Salvando configurações do sistema:", systemSettings)
    alert("Configurações salvas com sucesso!")
  }

  return (
    <LayoutWrapper>
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
              <p className="text-gray-600 mt-1">Gerencie suas preferências e configurações do sistema</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Perfil do Usuário */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg font-semibold text-gray-900">Perfil do Usuário</CardTitle>
                  </div>
                  <CardDescription>Atualize suas informações pessoais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">A</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        Alterar Foto
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG até 2MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={userSettings.name}
                        onChange={(e) => handleUserSettingsChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userSettings.email}
                        onChange={(e) => handleUserSettingsChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={userSettings.phone}
                        onChange={(e) => handleUserSettingsChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        value={userSettings.company}
                        onChange={(e) => handleUserSettingsChange("company", e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Perfil
                  </Button>
                </CardContent>
              </Card>

              {/* Alterar Senha */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-red-600" />
                    <CardTitle className="text-lg font-semibold text-gray-900">Alterar Senha</CardTitle>
                  </div>
                  <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={userSettings.currentPassword}
                        onChange={(e) => handleUserSettingsChange("currentPassword", e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={userSettings.newPassword}
                          onChange={(e) => handleUserSettingsChange("newPassword", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={userSettings.confirmPassword}
                          onChange={(e) => handleUserSettingsChange("confirmPassword", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleChangePassword} variant="outline" className="w-full md:w-auto bg-transparent">
                    <Lock className="h-4 w-4 mr-2" />
                    Alterar Senha
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Configurações do Sistema */}
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Palette className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-lg font-semibold text-gray-900">Aparência</CardTitle>
                  </div>
                  <CardDescription>Personalize a interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <Select
                      value={systemSettings.theme}
                      onValueChange={(value) => handleSystemSettingsChange("theme", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select
                      value={systemSettings.language}
                      onValueChange={(value) => handleSystemSettingsChange("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-orange-600" />
                    <CardTitle className="text-lg font-semibold text-gray-900">Notificações</CardTitle>
                  </div>
                  <CardDescription>Configure suas preferências</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notificações Push</Label>
                      <p className="text-sm text-gray-500">Receber notificações no navegador</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={systemSettings.notifications}
                      onCheckedChange={(checked) => handleSystemSettingsChange("notifications", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email</Label>
                      <p className="text-sm text-gray-500">Receber notificações por email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={systemSettings.emailNotifications}
                      onCheckedChange={(checked) => handleSystemSettingsChange("emailNotifications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg font-semibold text-gray-900">Sistema</CardTitle>
                  </div>
                  <CardDescription>Configurações avançadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoBackup">Backup Automático</Label>
                      <p className="text-sm text-gray-500">Backup diário dos dados</p>
                    </div>
                    <Switch
                      id="autoBackup"
                      checked={systemSettings.autoBackup}
                      onCheckedChange={(checked) => handleSystemSettingsChange("autoBackup", checked)}
                    />
                  </div>

                  <Separator />

                  <Button onClick={handleSaveSystemSettings} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </LayoutWrapper>
  )
}
