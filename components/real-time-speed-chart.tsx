"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useWebSocket } from "@/hooks/useWebSocket"

interface ChartDataPoint {
  time: string
  speed: number
  lapNumber: number
}

export function RealTimeSpeedChart() {
  const { data, isConnected } = useWebSocket()
  const [timeInterval, setTimeInterval] = useState("10laps")
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    if (data) {
      // Calcola la velocità media del giro
      const averageSpeed = data.dati.reduce((sum, sensor) => sum + sensor.velocita, 0) / data.dati.length

      const newDataPoint: ChartDataPoint = {
        time: new Date(data.timestamp).toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        speed: averageSpeed,
        lapNumber: data.giro,
      }

      setChartData((prev) => {
        const updated = [...prev, newDataPoint]

        // Mantieni solo i dati in base all'intervallo selezionato
        switch (timeInterval) {
          case "5laps":
            return updated.slice(-5)
          case "10laps":
            return updated.slice(-10)
          case "20laps":
            return updated.slice(-20)
          case "50laps":
            return updated.slice(-50)
          default:
            return updated.slice(-10)
        }
      })
    }
  }, [data, timeInterval])

  const updateChart = (interval: string) => {
    setTimeInterval(interval)
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => updateChart("5laps")}
          className={`px-3 py-1 text-xs rounded-md ${timeInterval === "5laps" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
        >
          Ultimi 5 giri
        </button>
        <button
          onClick={() => updateChart("10laps")}
          className={`px-3 py-1 text-xs rounded-md ${timeInterval === "10laps" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
        >
          Ultimi 10 giri
        </button>
        <button
          onClick={() => updateChart("20laps")}
          className={`px-3 py-1 text-xs rounded-md ${timeInterval === "20laps" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
        >
          Ultimi 20 giri
        </button>
        <button
          onClick={() => updateChart("50laps")}
          className={`px-3 py-1 text-xs rounded-md ${timeInterval === "50laps" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
        >
          Ultimi 50 giri
        </button>
      </div>

      <div className="h-[300px] w-full">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-pulse mb-4">
                <div className="h-4 w-4 bg-primary rounded-full mx-auto"></div>
              </div>
              <p className="text-muted-foreground">In attesa di dati dal backend...</p>
              {!isConnected && <p className="text-red-500 text-sm mt-2">Connessione WebSocket non disponibile</p>}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="lapNumber"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `Giro ${value}`}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toFixed(0)}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as ChartDataPoint
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Velocità Media</span>
                            <span className="font-bold text-muted-foreground">{data.speed.toFixed(1)} km/h</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Giro</span>
                            <span className="font-bold">{data.lapNumber}</span>
                          </div>
                          <div className="flex flex-col col-span-2">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Orario</span>
                            <span className="font-bold">{data.time}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="speed"
                stroke="#cb4b16"
                strokeWidth={2}
                dot={{ fill: "#cb4b16", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#cb4b16" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
