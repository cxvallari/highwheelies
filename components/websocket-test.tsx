"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Send, Trash2, Copy, AlertTriangle } from "lucide-react"

// URL WebSocket fisso
const WEBSOCKET_URL = "ws://salanileohome.ddns.net:3004"

interface LogEntry {
  timestamp: string
  type: "connection" | "message" | "error" | "sent" | "info"
  content: string
}

export function WebSocketTest() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [message, setMessage] = useState("Ciao dal client!")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const addLog = (type: LogEntry["type"], content: string) => {
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString("it-IT"),
      type,
      content,
    }
    setLogs((prev) => [...prev, newLog])
  }

  const connectWebSocket = () => {
    try {
      addLog("info", `Protocollo pagina: ${window.location.protocol}`)
      addLog("info", `URL WebSocket: ${WEBSOCKET_URL}`)
      addLog("connection", `Tentativo di connessione a ${WEBSOCKET_URL}`)

      const ws = new WebSocket(WEBSOCKET_URL)

      ws.onopen = () => {
        addLog("connection", "✅ Connessione WebSocket aperta")
        setIsConnected(true)
        setSocket(ws)
      }

      ws.onmessage = (event) => {
        addLog("message", `📩 Messaggio dal server: ${event.data}`)
      }

      ws.onclose = (event) => {
        addLog("connection", `🔌 Connessione chiusa (Code: ${event.code}, Reason: ${event.reason})`)
        setIsConnected(false)
        setSocket(null)
      }

      ws.onerror = (error) => {
        addLog("error", `❌ Errore WebSocket: ${error}`)

        if (window.location.protocol === "https:") {
          addLog(
            "error",
            "⚠️ La pagina è caricata su HTTPS ma stai tentando di connetterti a un WebSocket insicuro (ws://)",
          )
          addLog("info", "💡 Soluzione: Apri l'app in HTTP invece che HTTPS, o configura il server per supportare WSS")
        }

        setIsConnected(false)
      }
    } catch (error) {
      addLog("error", `❌ Errore creazione WebSocket: ${error}`)
    }
  }

  const disconnectWebSocket = () => {
    if (socket) {
      socket.close()
      addLog("connection", "🔌 Disconnessione manuale")
    }
  }

  const sendMessage = () => {
    if (socket && isConnected && message.trim()) {
      try {
        socket.send(message)
        addLog("sent", `📤 Messaggio inviato: ${message}`)
        setMessage("")
      } catch (error) {
        addLog("error", `❌ Errore invio messaggio: ${error}`)
      }
    }
  }

  const clearLogs = () => {
    setLogs([])
  }

  const copyLogs = () => {
    const logsText = logs.map((log) => `[${log.timestamp}] ${log.type.toUpperCase()}: ${log.content}`).join("\n")
    navigator.clipboard.writeText(logsText)
    addLog("info", "📋 Log copiati negli appunti")
  }

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [logs])

  // Inizializza con un avviso se siamo su HTTPS
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.protocol === "https:") {
      addLog(
        "info",
        "⚠️ Questa pagina è caricata su HTTPS. Le connessioni WebSocket insicure (ws://) potrebbero essere bloccate dal browser.",
      )
    }
  }, [])

  const getLogColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "connection":
        return "text-blue-500"
      case "message":
        return "text-green-500"
      case "error":
        return "text-red-500"
      case "sent":
        return "text-purple-500"
      case "info":
        return "text-yellow-500"
      default:
        return "text-foreground"
    }
  }

  const getLogIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "connection":
        return "🔌"
      case "message":
        return "📩"
      case "error":
        return "❌"
      case "sent":
        return "📤"
      case "info":
        return "ℹ️"
      default:
        return "ℹ️"
    }
  }

  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:"

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Test WebSocket
              {isConnected ? (
                <Badge variant="default" className="bg-green-500">
                  <Wifi className="h-3 w-3 mr-1" />
                  Connesso
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Disconnesso
                </Badge>
              )}
              {isHttps && (
                <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  HTTPS
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Connessione: {WEBSOCKET_URL}</CardDescription>
          </div>
          <div className="flex gap-2">
            {isConnected ? (
              <Button onClick={disconnectWebSocket} variant="destructive" size="sm">
                Disconnetti
              </Button>
            ) : (
              <Button onClick={connectWebSocket} size="sm">
                Connetti
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isHttps && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-medium">
              <AlertTriangle className="h-4 w-4" />
              <span>Avviso Sicurezza</span>
            </div>
            <p className="text-sm mt-1 text-muted-foreground">
              Stai usando HTTPS ma tentando di connetterti a un WebSocket insicuro (ws://). I browser moderni bloccano
              queste connessioni. Prova ad aprire l'app in HTTP o configura il server per supportare WSS.
            </p>
          </div>
        )}

        {/* Invio Messaggi */}
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Scrivi un messaggio..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            disabled={!isConnected}
          />
          <Button onClick={sendMessage} disabled={!isConnected || !message.trim()} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Controlli Log */}
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Log Connessione ({logs.length})</h4>
          <div className="flex gap-2">
            <Button onClick={copyLogs} variant="outline" size="sm" disabled={logs.length === 0}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button onClick={clearLogs} variant="outline" size="sm" disabled={logs.length === 0}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Area Log */}
        <ScrollArea className="h-64 w-full border rounded-md p-4" ref={scrollAreaRef}>
          {logs.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nessun log disponibile. Connetti il WebSocket per iniziare.
            </p>
          ) : (
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-2 text-sm font-mono">
                  <span className="text-muted-foreground">[{log.timestamp}]</span>
                  <span>{getLogIcon(log.type)}</span>
                  <span className={getLogColor(log.type)}>{log.content}</span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Statistiche */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2 bg-secondary/20 rounded">
            <div className="text-lg font-bold">{logs.filter((l) => l.type === "message").length}</div>
            <div className="text-xs text-muted-foreground">Messaggi Ricevuti</div>
          </div>
          <div className="p-2 bg-secondary/20 rounded">
            <div className="text-lg font-bold">{logs.filter((l) => l.type === "sent").length}</div>
            <div className="text-xs text-muted-foreground">Messaggi Inviati</div>
          </div>
          <div className="p-2 bg-secondary/20 rounded">
            <div className="text-lg font-bold">{logs.filter((l) => l.type === "error").length}</div>
            <div className="text-xs text-muted-foreground">Errori</div>
          </div>
          <div className="p-2 bg-secondary/20 rounded">
            <div className="text-lg font-bold">{logs.filter((l) => l.type === "connection").length}</div>
            <div className="text-xs text-muted-foreground">Eventi Connessione</div>
          </div>
        </div>

        {/* Info Protocollo */}
        <div className="p-3 bg-secondary/10 rounded-lg text-sm">
          <div className="font-medium mb-2">Informazioni Protocollo:</div>
          <div className="space-y-1 text-muted-foreground">
            <div>• Pagina: {typeof window !== "undefined" ? window.location.protocol : "N/A"}</div>
            <div>• WebSocket: ws:// (insicuro)</div>
            <div>• Host: salanileohome.ddns.net:3004</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
