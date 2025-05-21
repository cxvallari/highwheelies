"use client"

import { Line, LineChart, ResponsiveContainer } from "recharts"

interface MiniSpeedChartProps {
  data: { value: number }[]
  color?: string
}

export function MiniSpeedChart({ data, color = "#cb4b16" }: MiniSpeedChartProps) {
  return (
    <ResponsiveContainer width={100} height={40}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
