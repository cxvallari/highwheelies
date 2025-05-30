"use client"

import { useState, useEffect, useRef } from "react"

// Configurazione WebSocket con detection automatica del protocollo
const WEBSOCKET_HOST = "salanileohome.ddns.net:3004"

interface SensorData {
  numero_sensore: number
  velocita: number
}

interface LapData {
  giro: number
  timestamp: string
  dati: SensorData[]
}

export function useWebSocket() {
  const [data, setData] = useState<LapData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [connectionUrl, setConnectionUrl] = useState<string>("")
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)

  // Determina il protocollo WebSocket basato sul protocollo della pagina
  const getWebSocketUrl = () => {
    if (typeof window === "undefined") return ""

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    const url = `${protocol}//${WEBSOCKET_HOST}`

    console.log("🔍 Protocollo pagina:", window.location.protocol)
    console.log("🔍 Protocollo WebSocket:", protocol)
    console.log("🔍 URL WebSocket finale:", url)

    return url
  }

  const connect = () => {
    try {
      const wsUrl = getWebSocketUrl()
      if (!wsUrl) {
        setError("Impossibile determinare l'URL WebSocket")
        return
      }

      setConnectionUrl(wsUrl)
      console.log("🔌 Tentativo connessione WebSocket a:", wsUrl)

      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        console.log("✅ WebSocket connesso a", wsUrl)
        setIsConnected(true)
        setError(null)
        reconnectAttempts.current = 0
      }

      ws.onmessage = (event) => {
        try {
          const lapData: LapData = JSON.parse(event.data)
          console.log("📩 Dati ricevuti dal WebSocket:", lapData)
          setData(lapData)
        } catch (err) {
          console.error("❌ Errore parsing dati WebSocket:", err)
          setError("Errore nel parsing dei dati ricevuti")
        }
      }

      ws.onclose = (event) => {
        console.log("🔌 WebSocket disconnesso:", event.code, event.reason)
        setIsConnected(false)

        // Incrementa i tentativi di riconnessione
        reconnectAttempts.current++

        // Riconnessione automatica con backoff esponenziale
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000) // Max 30 secondi

        reconnectTimeoutRef.current = setTimeout(() => {
          console.log(`🔄 Tentativo di riconnessione #${reconnectAttempts.current}...`)
          connect()
        }, delay)
      }

      ws.onerror = (error) => {
        console.error("❌ Errore WebSocket:", error)
        setError(`Errore di connessione WebSocket`)
        setIsConnected(false)
      }
    } catch (err) {
      console.error("❌ Errore creazione WebSocket:", err)
      setError(`Impossibile creare connessione WebSocket: ${err}`)
    }
  }

  const forceReconnect = () => {
    if (wsRef.current) {
      wsRef.current.close()
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    reconnectAttempts.current = 0
    connect()
  }

  useEffect(() => {
    connect()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return {
    data,
    isConnected,
    error,
    connectionUrl,
    forceReconnect,
    reconnectAttempts: reconnectAttempts.current,
  }
}
