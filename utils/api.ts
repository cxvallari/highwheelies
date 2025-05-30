// Utility per chiamate API al backend
const API_URL = "http://highwheelesapi.salanileo.dev"

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

  // Test connessione
  testConnection: async () => {
    try {
      // Prova prima l'endpoint health
      const healthResponse = await fetch(`${API_URL}/api/health`, { method: "GET" })
      if (healthResponse.ok) return true

      // Se non esiste, prova l'endpoint dati
      const dataResponse = await fetch(`${API_URL}/api/dati`, { method: "GET" })
      return dataResponse.ok
    } catch (error) {
      console.error("Errore test connessione:", error)
      return false
    }
  },
}
