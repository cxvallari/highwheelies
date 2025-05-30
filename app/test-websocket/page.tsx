"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WebSocketTest } from "@/components/websocket-test"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { BarChart3, GaugeCircle, LayoutDashboard, Settings, TestTube } from "lucide-react"
import Link from "next/link"

export default function TestWebSocketPage() {
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
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistiche
              </Button>
            </Link>
            <Link href="/test-websocket">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-secondary/50">
                <TestTube className="h-4 w-4" />
                Test WebSocket
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
              <h1 className="text-xl md:text-2xl font-bold">Test WebSocket</h1>
              <p className="text-sm text-muted-foreground">Strumento di debug per testare la connessione WebSocket</p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
            </div>
          </div>

          <WebSocketTest />
        </main>
      </div>
    </div>
  )
}
