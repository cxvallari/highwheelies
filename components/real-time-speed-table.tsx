"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Wifi, WifiOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWebSocket } from "@/hooks/useWebSocket"
import { useState, useEffect } from "react"

interface SensorData {
  numero_sensore: number
  velocita: number
}

interface LapData {
  giro: number
  timestamp: string
  dati: SensorData[]
}

interface MeasurementRow {
  number: number
  lapNumber: number
  sensorNumber: number
  speed: string
  signal: string
  timestamp: string
}

export function RealTimeSpeedTable() {
  const { data, isConnected, error, forceReconnect, reconnectAttempts } = useWebSocket()
  const [measurements, setMeasurements] = useState<MeasurementRow[]>([])

  useEffect(() => {
    if (data) {
      // Converti i dati del giro in righe della tabella
      const newMeasurements = data.dati.map((sensor, index) => ({
        number: measurements.length + index + 1,
        lapNumber: data.giro,
        sensorNumber: sensor.numero_sensore,
        speed: `${sensor.velocita.toFixed(1)} km/h`,
        signal: `Sensore ${sensor.numero_sensore}`,
        timestamp: new Date(data.timestamp).toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      }))

      // Aggiungi le nuove misurazioni all'inizio della lista
      setMeasurements((prev) => [...newMeasurements, ...prev].slice(0, 50)) // Mantieni solo le ultime 50
    }
  }, [data])

  if (error) {
    return (
      <div className="rounded-lg border border-border p-8 text-center">
        <WifiOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Errore di Connessione WebSocket</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <p className="text-sm text-muted-foreground mb-4">WebSocket: ws://salanileohome.ddns.net:3004</p>
        {reconnectAttempts > 0 && (
          <p className="text-sm text-yellow-600 mb-4">Tentativi di riconnessione: {reconnectAttempts}</p>
        )}
        <Button onClick={forceReconnect} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Riprova Connessione
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold">Misurazioni in Tempo Reale</h3>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">Connesso</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-500">Disconnesso</span>
              <Button onClick={forceReconnect} variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {measurements.length === 0 ? (
        <div className="p-8 text-center">
          <div className="animate-pulse">
            <div className="h-4 w-4 bg-primary rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">In attesa di dati dal WebSocket...</p>
            <p className="text-xs text-muted-foreground mt-2">ws://salanileohome.ddns.net:3004</p>
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Giro</TableHead>
              <TableHead>Sensore</TableHead>
              <TableHead>Velocità</TableHead>
              <TableHead>Segnale</TableHead>
              <TableHead>Orario</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {measurements.map((measurement, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{measurement.number}</TableCell>
                <TableCell className="font-medium text-primary">{measurement.lapNumber}</TableCell>
                <TableCell>{measurement.sensorNumber}</TableCell>
                <TableCell className="font-medium">{measurement.speed}</TableCell>
                <TableCell>{measurement.signal}</TableCell>
                <TableCell>{measurement.timestamp}</TableCell>
                <TableCell>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
