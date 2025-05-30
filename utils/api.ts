// Utility per chiamate API al backend
const API_URL = "http://highwheelesapi.salanileo.dev"
const WEBSOCKET_URL = "ws://salanileohome.ddns.net:3004"

export const api = {
  // Invia dati sensore (se necessario)
  sendSensorData: async (sensore: number, velocita: number) => {
    try {
      const response = await fetch(`${API_URL}/api/dati`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sensore, velocita }),
      })
      return response.ok
    } catch (error) {
      console.error("Errore invio dati:", error)
      return false
    }
  },

  // Recupera dati storici (se disponibile)
  getHistoricalData: async () => {
    try {
      const response = await fetch(`${API_URL}/api/storico`)
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.error("Errore recupero dati storici:", error)
    }
    return null
  },

  // Test connessione WebSocket
  testWebSocketConnection: () => {
    return new Promise((resolve) => {
      try {
        console.log("🧪 Test connessione WebSocket:", WEBSOCKET_URL)
        const ws = new WebSocket(WEBSOCKET_URL)

        ws.onopen = () => {
          console.log("✅ Test WebSocket riuscito")
          ws.close()
          resolve(true)
        }

        ws.onerror = (error) => {
          console.log("❌ Test WebSocket fallito:", error)
          resolve(false)
        }

        // Timeout dopo 5 secondi
        setTimeout(() => {
          if (ws.readyState === WebSocket.CONNECTING) {
            ws.close()
            resolve(false)
          }
        }, 5000)
      } catch (error) {
        console.log("❌ Errore test WebSocket:", error)
        resolve(false)
      }
    })
  },

  // Test connessione API HTTP
  testApiConnection: async () => {
    try {
      const response = await fetch(`${API_URL}/api/health`, { method: "GET" })
      return response.ok
    } catch (error) {
      console.error("Errore test connessione API:", error)
      return false
    }
  },
}
