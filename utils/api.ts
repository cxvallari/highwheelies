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
        const ws = new WebSocket(WEBSOCKET_URL)

        ws.onopen = () => {
          ws.close()
          resolve(true)
        }

        ws.onerror = () => {
          resolve(false)
        }

        // Timeout dopo 5 secondi
        setTimeout(() => {
          ws.close()
          resolve(false)
        }, 5000)
      } catch (error) {
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
