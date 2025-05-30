"use client"

import { useState, useEffect, useRef } from "react"

// URL dell'API aggiornato
const API_URL = "http://highwheelesapi.salanileo.dev"

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
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Converti HTTP URL in WebSocket URL
  const getWebSocketUrl = (url: string) => {
    if (url.startsWith("https://")) {
      return url.replace("https://", "wss://")
    } else if (url.startsWith("http://")) {
      return url.replace("http://", "ws://")
    }
    return url
  }

  const connect = () => {
    try {
      const wsUrl = getWebSocketUrl(API_URL)
      console.log("🔌 Tentativo connessione a:", wsUrl)

      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        console.log("🔌 WebSocket connesso a", wsUrl)
        setIsConnected(true)
        setError(null)
      }

      ws.onmessage = (event) => {
        try {
          const lapData: LapData = JSON.parse(event.data)
          console.log("📩 Dati ricevuti:", lapData)
          setData(lapData)
        } catch (err) {
          console.error("❌ Errore parsing dati:", err)
          setError("Errore nel parsing dei dati")
        }
      }

      ws.onclose = (event) => {
        console.log("🔌 WebSocket disconnesso:", event.code, event.reason)
        setIsConnected(false)

        // Riconnessione automatica dopo 5 secondi
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log("🔄 Tentativo di riconnessione...")
          connect()
        }, 5000)
      }

      ws.onerror = (error) => {
        console.error("❌ Errore WebSocket:", error)
        setError(`Errore di connessione WebSocket`)
        setIsConnected(false)
      }
    } catch (err) {
      console.error("❌ Errore creazione WebSocket:", err)
      setError(`Impossibile connettersi al server`)
    }
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

  return { data, isConnected, error }
}
