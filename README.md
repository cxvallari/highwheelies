# Highwheelies - Sistema di Misurazione Velocità

Sistema completo per la misurazione e visualizzazione in tempo reale della velocità dei veicoli su pista.

## Struttura del Progetto

### Frontend (Next.js)
- **Dashboard**: Visualizzazione in tempo reale dei dati di velocità
- **Statistiche**: Tabella dettagliata delle misurazioni
- **Impostazioni**: Configurazione temi e preferenze
- **WebSocket Integration**: Connessione in tempo reale al backend

### Backend (Node.js + Express + WebSocket)
- **API REST**: Endpoint per ricevere dati dai sensori
- **WebSocket Server**: Broadcast in tempo reale ai client
- **Database MySQL**: Archiviazione dati giri e sensori
- **Docker Support**: Container MySQL per sviluppo

## Avvio del Sistema

### 1. Avvio Backend

\`\`\`bash
cd backend
npm install
docker-compose up -d  # Avvia MySQL
node server.js       # Avvia il server
\`\`\`

### 2. Avvio Frontend

\`\`\`bash
npm install
npm run dev
\`\`\`

### 3. Simulatore (Opzionale)

\`\`\`bash
cd backend
node simulatore.js   # Simula dati dai sensori
\`\`\`

## Funzionalità

### Dashboard
- **Metriche in Tempo Reale**: Ultima velocità, velocità media, numero misurazioni
- **Grafico Velocità**: Andamento velocità per giro
- **Tabella Misurazioni**: Lista dettagliata delle misurazioni recenti
- **Indicatore Connessione**: Status della connessione WebSocket

### Integrazione Backend
- **WebSocket Connection**: Connessione automatica con riconnessione
- **Real-time Updates**: Aggiornamento automatico dei dati
- **Error Handling**: Gestione errori di connessione
- **Data Persistence**: Storico delle misurazioni

### Struttura Dati

#### Giro (Lap)
\`\`\`json
{
  "giro": 1,
  "timestamp": "2025-01-21T10:30:00.000Z",
  "dati": [
    {
      "numero_sensore": 1,
      "velocita": 125.5
    }
  ]
}
\`\`\`

#### Sensore
- **numero_sensore**: ID del sensore (1-6)
- **velocita**: Velocità misurata in km/h

## API Endpoints

### POST /api/dati
Riceve dati dai sensori:
\`\`\`json
{
  "sensore": 1,
  "velocita": 125.5
}
\`\`\`

### WebSocket ws://localhost:3000
Broadcast automatico quando un giro è completato (6 sensori).

## Database Schema

### Tabella `giri`
- `id`: Primary key auto-increment
- `timestamp`: Timestamp del giro

### Tabella `sensori`
- `id`: Primary key auto-increment
- `id_giro`: Foreign key verso giri
- `numero_sensore`: Numero del sensore (1-6)
- `velocita`: Velocità misurata

## Tecnologie Utilizzate

### Frontend
- **Next.js 14**: Framework React
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Recharts**: Grafici
- **WebSocket API**: Connessione real-time

### Backend
- **Node.js**: Runtime
- **Express**: Web framework
- **WebSocket**: Real-time communication
- **MySQL**: Database
- **Docker**: Containerization

## Configurazione

### Variabili Ambiente Backend
\`\`\`env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ff65@Abindini
DB_NAME=pista
PORT=3000
\`\`\`

### Configurazione Frontend
Il frontend si connette automaticamente a `ws://localhost:3000` per il WebSocket.

## Sviluppo

### Aggiungere Nuove Funzionalità
1. **Backend**: Aggiungere endpoint in `server.js`
2. **Frontend**: Creare componenti in `components/`
3. **Database**: Modificare schema in `db.sql`

### Testing
- **Backend**: Utilizzare `simulatore.js` per generare dati di test
- **Frontend**: Verificare connessione WebSocket nella console browser

## Deployment

### Produzione
1. Configurare database MySQL in produzione
2. Aggiornare URL WebSocket nel frontend
3. Build e deploy del frontend
4. Deploy del backend con PM2 o Docker

### Docker (Completo)
\`\`\`bash
# TODO: Creare docker-compose per l'intero stack
docker-compose up --build
