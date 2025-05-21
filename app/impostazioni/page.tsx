"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Palette, GaugeCircle, LayoutDashboard, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

type Theme = "dark" | "light" | "solarized"

export default function ImpostazioniPage() {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
      // Default to dark theme
      document.documentElement.setAttribute("data-theme", "dark")
    }
  }, [])

  const setThemeAndSave = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

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
            <Link href="/impostazioni">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-secondary/50">
                <Settings className="h-4 w-4" />
                Impostazioni
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="p-4 md:p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Impostazioni</h1>

          <Card className="rounded-lg shadow-sm border border-border">
            <CardHeader>
              <CardTitle>Tema</CardTitle>
              <CardDescription>Personalizza l'aspetto dell'interfaccia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-24 gap-2 rounded-lg border border-border"
                  onClick={() => setThemeAndSave("dark")}
                >
                  <Moon className="h-8 w-8" />
                  <span>Scuro</span>
                </Button>
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-24 gap-2 rounded-lg border border-border"
                  onClick={() => setThemeAndSave("light")}
                >
                  <Sun className="h-8 w-8" />
                  <span>Chiaro</span>
                </Button>
                <Button
                  variant={theme === "solarized" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-24 gap-2 rounded-lg border border-border"
                  onClick={() => setThemeAndSave("solarized")}
                >
                  <Palette className="h-8 w-8" />
                  <span>Solarized</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
