"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, AlertCircle } from "lucide-react"
import { api } from "@/utils/api"

export function ConnectionStatus() {
  const [status, setStatus] = useState<"connected" | "disconnected" | "testing">("testing")

  useEffect(() => {
    const testConnection = async () => {
      setStatus("testing")
      const isConnected = await api.testConnection()
      setStatus(isConnected ? "connected" : "disconnected")
    }

    testConnection()

    // Test ogni 30 secondi
    const interval = setInterval(testConnection, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusInfo = () => {
    switch (status) {
      case "connected":
        return {
          icon: <Wifi className="h-4 w-4 text-green-500" />,
          text: "Connesso a highwheelies.salanileo.dev",
          color: "text-green-500",
        }
      case "disconnected":
        return {
          icon: <WifiOff className="h-4 w-4 text-red-500" />,
          text: "Disconnesso da highwheelies.salanileo.dev",
          color: "text-red-500",
        }
      case "testing":
        return {
          icon: <AlertCircle className="h-4 w-4 text-yellow-500" />,
          text: "Verifica connessione...",
          color: "text-yellow-500",
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="flex items-center gap-2 text-sm">
      {statusInfo.icon}
      <span className={statusInfo.color}>{statusInfo.text}</span>
    </div>
  )
}
