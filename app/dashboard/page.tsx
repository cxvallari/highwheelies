"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MetricsCard } from "@/components/metrics-card"
import { SpeedChart } from "@/components/speed-chart"
import { SpeedTable } from "@/components/speed-table"
import { MiniSpeedChart } from "@/components/mini-speed-chart"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { BarChart3, Clock, GaugeCircle, LayoutDashboard, Settings } from "lucide-react"
import Link from "next/link"

// Sample data for mini charts
const dailyData = [
  { value: 85 },
  { value: 90 },
  { value: 88 },
  { value: 95 },
  { value: 110 },
  { value: 105 },
  { value: 100 },
]

const weeklyData = [
  { value: 95 },
  { value: 100 },
  { value: 92 },
  { value: 98 },
  { value: 105 },
  { value: 110 },
  { value: 108 },
]

const monthlyData = [
  { value: 90 },
  { value: 95 },
  { value: 100 },
  { value: 98 },
  { value: 102 },
  { value: 105 },
  { value: 110 },
]

export default function DashboardPage() {
  // Set the theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
      // Default to dark theme
      document.documentElement.setAttribute("data-theme", "dark")
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid lg:grid-cols-[280px_1fr] h-screen">
        <aside className="border-r bg-background/50 backdrop-blur">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <GaugeCircle className="h-6 w-6 text-primary" />
            <Link href="/" className="font-bold hover:text-primary transition-colors">
              Highwheelies
            </Link>
          </div>
          <div className="px-4 py-4">
            <Input placeholder="Cerca" className="bg-background/50" />
          </div>
          <nav className="space-y-2 px-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-secondary/50">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/statistiche">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistiche
              </Button>
            </Link>
            <Link href="/impostazioni">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Impostazioni
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="p-4 md:p-6 overflow-auto">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-bold">Dashboard Velocità</h1>
              <div className="text-sm text-muted-foreground">
                <Clock className="inline-block h-4 w-4 mr-1" />
                Ultimo aggiornamento: 21 Maggio, 2025 - 09:06:38
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricsCard
              title="Ultima Velocità"
              value="142"
              unit="km/h"
              change={{ value: "+32 km/h", percentage: "+29.1%", isPositive: false }}
              chart={<MiniSpeedChart data={dailyData} />}
            />
            <MetricsCard
              title="Velocità Media (Oggi)"
              value="98"
              unit="km/h"
              change={{ value: "+3 km/h", percentage: "+3.2%", isPositive: true }}
              chart={<MiniSpeedChart data={weeklyData} />}
            />
            <MetricsCard
              title="Numero di Misurazioni"
              value="42"
              change={{ value: "+5", percentage: "+13.5%", isPositive: true }}
              chart={<MiniSpeedChart data={monthlyData} color="#268bd2" />}
            />
          </div>
          <Card className="mt-6 p-4 md:p-6 rounded-lg border border-border">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Andamento Velocità</h2>
            </div>
            <SpeedChart />
          </Card>
          <div className="mt-6 overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Misurazioni Recenti</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <SpeedTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
