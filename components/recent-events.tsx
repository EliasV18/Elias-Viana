"use client"

import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"

const recentEvents = [
  {
    title: "Casamento Maria & João",
    date: "15 Ago 2025",
    time: "19:00",
    venue: "Salão Cristal",
    status: "confirmado",
  },
  {
    title: "Aniversário Ana Carolina",
    date: "22 Ago 2025",
    time: "20:00",
    venue: "Salão Diamante",
    status: "pendente",
  },
  {
    title: "Formatura Turma 2025",
    date: "28 Ago 2025",
    time: "18:30",
    venue: "Salão Esmeralda",
    status: "confirmado",
  },
  {
    title: "Evento Corporativo",
    date: "05 Set 2025",
    time: "14:00",
    venue: "Salão Safira",
    status: "negociacao",
  },
]

export function RecentEvents() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "negociacao":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {recentEvents.map((event, index) => (
        <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-sm">{event.title}</h4>
            <Badge className={`text-xs ${getStatusColor(event.status)}`}>{event.status}</Badge>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
