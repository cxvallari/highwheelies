"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, AlertCircle, RefreshCw, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { api } from "@/utils/api"
import Link from "next/link"

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="default" className="bg-green-500">
            Connesso
          </Badge>
        )
      case "disconnected":
        return <Badge variant="destructive">Disconnesso</Badge>
      case "testing":
        return <Badge variant="secondary">Verifica...</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-secondary/20 rounded-lg">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Stato Connessioni</h4>
        <div className="flex gap-1">
          <Button onClick={testConnections} variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Link href="/test-websocket">
            <Button variant="ghost" size="sm" title="Test WebSocket">
              <TestTube className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {getStatusIcon(wsStatus)}
            <span>WebSocket</span>
          </div>
          {getStatusBadge(wsStatus)}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {getStatusIcon(apiStatus)}
            <span>API HTTP</span>
          </div>
          {getStatusBadge(apiStatus)}
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <div>WS: wss://highwheelesapi.salanileo.dev/</div>
        <div>API: https://highwheelesapi.salanileo.dev</div>
      </div>
    </div>
  )
}
