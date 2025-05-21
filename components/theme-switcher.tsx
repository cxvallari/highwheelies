"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Palette, Sun } from "lucide-react"

type Theme = "dark" | "light" | "solarized"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    }
  }, [])

  const setThemeAndSave = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {theme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : theme === "light" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Palette className="h-5 w-5" />
          )}
          <span className="sr-only">Cambia tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeAndSave("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Scuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeAndSave("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Chiaro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeAndSave("solarized")}>
          <Palette className="mr-2 h-4 w-4" />
          <span>Solarized</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
