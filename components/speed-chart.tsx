"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate data for different time intervals
const generateData = (interval: string) => {
  const now = new Date()
  const data = []

  switch (interval) {
    case "10sec":
      // Last 10 seconds with 1 second intervals
      for (let i = 10; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 1000)
        data.push({
          time: time.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          speed: Math.floor(Math.random() * 50) + 80, // Random speed between 80-130
        })
      }
      break
    case "30sec":
      // Last 30 seconds with 3 second intervals
      for (let i = 10; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3000)
        data.push({
          time: time.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          speed: Math.floor(Math.random() * 50) + 80,
        })
      }
      break
    case "1min":
      // Last minute with 6 second intervals
      for (let i = 10; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 6000)
        data.push({
          time: time.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          speed: Math.floor(Math.random() * 50) + 80,
        })
      }
      break
    case "5min":
    default:
      // Last 5 minutes with 30 second intervals
      for (let i = 10; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 30000)
        data.push({
          time: time.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          speed: Math.floor(Math.random() * 50) + 80,
        })
      }
  }

  return data
}

export function SpeedChart() {
  const [timeInterval, setTimeInterval] = useState("10sec")
  const [chartData, setChartData] = useState(() => generateData(timeInterval))

  const updateChart = (interval: string) => {
    setTimeInterval(interval)
    setChartData(generateData(interval))
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => updateChart("10sec")}
          className={`px-3 py-1 text-xs rounded-md ${timeInterval === "10sec" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
        >
          Ultimi 10 sec
        </button>
        <button
          onClick={() => updateChart("30sec")}
          className={`px-3 py-1 text-xs rounded-md ${timeInterval === "30sec" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
        >
          Ultimi 30 sec
        </button>
        <button
          onClick={() => updateChart("1min")}
          className={`px-3 py-1 text-xs rounded-md ${timeInterval === "1min" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
        >
          Ultimo minuto
        </button>
        <button
          onClick={() => updateChart("5min")}
          className={`px-3 py-1 text-xs rounded-md ${timeInterval === "5min" ? "bg-primary text-white" : "bg-secondary text-foreground"}`}
        >
          Ultimi 5 minuti
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="time"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.split(":")[2]} // Show only seconds
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Velocità</span>
                          <span className="font-bold text-muted-foreground">{payload[0].value} km/h</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Orario</span>
                          <span className="font-bold">{payload[0].payload.time}</span>
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
              dot={false}
              activeDot={{ r: 6, fill: "#cb4b16" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
