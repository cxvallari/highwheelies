"use client"

import { useState, useEffect, useRef } from "react"

// URL WebSocket fisso
const WEBSOCKET_URL = "ws://salanileohome.ddns.net:3004"

interface SensorData {
  numero_sensore: number
  velocita: number
}

interface LapData {
  giro: number
  timestamp: string
  dati: SensorData[]
}

export function useProxyWebSocket() {
  const [data, setData] = useState<LapData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const isProxyReady = useRef(false)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)

  const setupProxy = () => {
    if (typeof window === "undefined") return

    // Crea un iframe nascosto per il proxy WebSocket
    if (!iframeRef.current) {
      const iframe = document.createElement("iframe")
      iframe.style.display = "none"
      iframe.src = "/proxy.html"
      document.body.appendChild(iframe)
      iframeRef.current = iframe
    }

    // Ascolta i messaggi dall'iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return

      const data = event.data

      switch (data.type) {
        case "ready":
          isProxyReady.current = true
          connect()
          break
        case "open":
          console.log("✅ WebSocket connesso tramite proxy")
          setIsConnected(true)
          setError(null)
          reconnectAttempts.current = 0
          break
        case "message":
          try {
            const lapData: LapData = JSON.parse(data.data)
            console.log("📩 Dati ricevuti dal WebSocket:", lapData)
            setData(lapData)
          } catch (err) {
            console.error("❌ Errore parsing dati WebSocket:", err)
            setError("Errore nel parsing dei dati ricevuti")
          }
          break
        case "close":
          console.log("🔌 WebSocket disconnesso:", data.code, data.reason)
          setIsConnected(false)

          // Riconnessione automatica
          reconnectAttempts.current++
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000)

          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`🔄 Tentativo di riconnessione #${reconnectAttempts.current}...`)
            connect()
          }, delay)
          break
        case "error":
          console.error("❌ Errore WebSocket:", data.error)
          setError(`Errore di connessione WebSocket: ${data.error}`)
          setIsConnected(false)
          break
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }

  const connect = () => {
    if (!isProxyReady.current || !iframeRef.current?.contentWindow) {
      console.log("Proxy non ancora pronto, riprovo tra poco...")
      setTimeout(connect, 500)
      return
    }

    console.log("🔌 Tentativo connessione WebSocket tramite proxy a:", WEBSOCKET_URL)
    iframeRef.current.contentWindow.postMessage({ type: "connect", url: WEBSOCKET_URL }, "*")
  }

  const disconnect = () => {
    if (isProxyReady.current && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: "close" }, "*")
    }
  }

  const sendMessage = (message: string) => {
    if (isProxyReady.current && iframeRef.current?.contentWindow && isConnected) {
      iframeRef.current.contentWindow.postMessage({ type: "send", message }, "*")
    }
  }

  useEffect(() => {
    const cleanup = setupProxy()

    return () => {
      if (cleanup) cleanup()
      disconnect()

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }

      if (iframeRef.current) {
        document.body.removeChild(iframeRef.current)
        iframeRef.current = null
      }
    }
  }, [])

  return {
    data,
    isConnected,
    error,
    sendMessage,
    disconnect,
    reconnect: connect,
    reconnectAttempts: reconnectAttempts.current,
  }
}
