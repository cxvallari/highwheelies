"use client"

import { MetricsCard } from "@/components/metrics-card"
import { MiniSpeedChart } from "@/components/mini-speed-chart"
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

export function RealTimeMetrics() {
  const { data, isConnected } = useWebSocket()
  const [metrics, setMetrics] = useState({
    lastSpeed: 0,
    averageSpeed: 0,
    totalMeasurements: 0,
    speedHistory: [] as { value: number }[],
  })

  useEffect(() => {
    if (data) {
      // Calcola la velocità media del giro corrente
      const averageSpeed = data.dati.reduce((sum, sensor) => sum + sensor.velocita, 0) / data.dati.length

      // Trova la velocità massima del giro (ultima velocità significativa)
      const maxSpeed = Math.max(...data.dati.map((sensor) => sensor.velocita))

      setMetrics((prev) => {
        const newSpeedHistory = [...prev.speedHistory, { value: averageSpeed }].slice(-10) // Mantieni ultimi 10 valori

        return {
          lastSpeed: maxSpeed,
          averageSpeed: averageSpeed,
          totalMeasurements: prev.totalMeasurements + data.dati.length,
          speedHistory: newSpeedHistory,
        }
      })
    }
  }, [data])

  const formatSpeed = (speed: number) => speed.toFixed(0)
  const formatChange = (current: number, previous: number) => {
    const diff = current - previous
    return {
      value: `${Math.abs(diff).toFixed(0)} km/h`,
      percentage: previous > 0 ? `${((diff / previous) * 100).toFixed(1)}%` : "0%",
      isPositive: diff >= 0,
    }
  }

  const previousSpeed =
    metrics.speedHistory.length > 1 ? metrics.speedHistory[metrics.speedHistory.length - 2].value : metrics.lastSpeed

  const previousAverage =
    metrics.speedHistory.length > 1
      ? metrics.speedHistory.slice(0, -1).reduce((sum, item) => sum + item.value, 0) / (metrics.speedHistory.length - 1)
      : metrics.averageSpeed

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricsCard
        title="Ultima Velocità Massima"
        value={formatSpeed(metrics.lastSpeed)}
        unit="km/h"
        change={formatChange(metrics.lastSpeed, previousSpeed)}
        chart={<MiniSpeedChart data={metrics.speedHistory} />}
      />
      <MetricsCard
        title="Velocità Media (Giro)"
        value={formatSpeed(metrics.averageSpeed)}
        unit="km/h"
        change={formatChange(metrics.averageSpeed, previousAverage)}
        chart={<MiniSpeedChart data={metrics.speedHistory} color="#268bd2" />}
      />
      <MetricsCard
        title="Misurazioni Totali"
        value={metrics.totalMeasurements.toString()}
        change={{
          value: `+${data ? data.dati.length : 0}`,
          percentage: "+100%",
          isPositive: true,
        }}
        chart={
          <MiniSpeedChart
            data={[...Array(10)].map((_, i) => ({ value: metrics.totalMeasurements + i }))}
            color="#859900"
          />
        }
      />

      {!isConnected && (
        <div className="col-span-full p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-600 dark:text-yellow-400 text-sm">
            ⚠️ Connessione al backend persa. I dati potrebbero non essere aggiornati.
          </p>
        </div>
      )}
    </div>
  )
}
