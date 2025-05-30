"use client"

import { useState, useEffect, useRef } from "react"

// URL WebSocket sicuro
const WEBSOCKET_URL = "wss://highwheelesapi.salanileo.dev/"

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
  const reconnectAttempts = useRef(0)

  const connect = () => {
    try {
      console.log("🔌 Tentativo connessione WebSocket a:", WEBSOCKET_URL)

      const ws = new WebSocket(WEBSOCKET_URL)
      wsRef.current = ws

      ws.onopen = () => {
        console.log("✅ WebSocket connesso a", WEBSOCKET_URL)
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
    forceReconnect,
    reconnectAttempts: reconnectAttempts.current,
  }
}
