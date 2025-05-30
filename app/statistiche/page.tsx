"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RealTimeSpeedTable } from "@/components/real-time-speed-table"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { BarChart3, Clock, GaugeCircle, LayoutDashboard, Settings } from "lucide-react"
import Link from "next/link"

export default function StatistichePage() {
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
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/statistiche">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-secondary/50">
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
              <h1 className="text-xl md:text-2xl font-bold">Statistiche</h1>
              <div className="text-sm text-muted-foreground">
                <Clock className="inline-block h-4 w-4 mr-1" />
                Dati in tempo reale dal backend
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
            </div>
          </div>

          <div className="mt-6 overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Misurazioni Recenti</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <RealTimeSpeedTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
