"use client"

import { useState, useEffect } from "react"

// Dati di fallback da mostrare quando il backend non è disponibile
export const useFallbackData = () => {
  const [fallbackData, setFallbackData] = useState<any>(null)

  useEffect(() => {
    // Genera dati di esempio
    const generateFallbackData = () => {
      const now = new Date()
      const dati = []

      // Genera 6 sensori con velocità casuali
      for (let i = 1; i <= 6; i++) {
        dati.push({
          numero_sensore: i,
          velocita: Math.floor(Math.random() * 50) + 80, // 80-130 km/h
        })
      }

      return {
        giro: Math.floor(Math.random() * 100) + 1,
        timestamp: now.toISOString(),
        dati: dati,
      }
    }

    // Genera dati iniziali
    setFallbackData(generateFallbackData())

    // Aggiorna i dati ogni 5 secondi
    const interval = setInterval(() => {
      setFallbackData(generateFallbackData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return fallbackData
}
