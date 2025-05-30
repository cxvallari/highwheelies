"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "@/utils/api"

export function ConnectionStatus() {
  const [wsStatus, setWsStatus] = useState<"connected" | "disconnected" | "testing">("testing")
  const [apiStatus, setApiStatus] = useState<"connected" | "disconnected" | "testing">("testing")

  const testConnections = async () => {
    setWsStatus("testing")
    setApiStatus("testing")

    // Test WebSocket
    const wsConnected = await api.testWebSocketConnection()
    setWsStatus(wsConnected ? "connected" : "disconnected")

    // Test API HTTP
    const apiConnected = await api.testApiConnection()
    setApiStatus(apiConnected ? "connected" : "disconnected")
  }

  useEffect(() => {
    testConnections()

    // Test ogni 60 secondi
    const interval = setInterval(testConnections, 60000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <Wifi className="h-4 w-4 text-green-500" />
      case "disconnected":
        return <WifiOff className="h-4 w-4 text-red-500" />
      case "testing":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Connesso"
      case "disconnected":
        return "Disconnesso"
      case "testing":
        return "Verifica..."
    }
  }

  return (
    <div className="flex flex-col gap-2 p-4 bg-secondary/20 rounded-lg">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Stato Connessioni</h4>
        <Button onClick={testConnections} variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm">
        {getStatusIcon(wsStatus)}
        <span>WebSocket (salanileohome.ddns.net:3004): {getStatusText(wsStatus)}</span>
      </div>

      <div className="flex items-center gap-2 text-sm">
        {getStatusIcon(apiStatus)}
        <span>API HTTP (highwheelesapi.salanileo.dev): {getStatusText(apiStatus)}</span>
      </div>
    </div>
  )
}
