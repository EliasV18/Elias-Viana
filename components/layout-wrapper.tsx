"use client"

import type React from "react"

import { ModernSidebar } from "@/components/modern-sidebar"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <ModernSidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-16">{children}</div>
    </div>
  )
}
