// server.js
const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const db = require('./db');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

let buffer = [];
let giroCorrente = 1;

app.post('/api/dati', async (req, res) => {
  const { sensore, velocita } = req.body;
  console.log(`📩 Dato ricevuto via POST: Sensore ${sensore}, Velocità ${velocita}`);

  buffer.push({ sensore, velocita });

  if (buffer.length === 6) {
    try {
      const [result] = await db.query('INSERT INTO giri () VALUES ()');
      const giroId = result.insertId;

      for (let riga of buffer) {
        await db.query(
          'INSERT INTO sensori (id_giro, numero_sensore, velocita) VALUES (?, ?, ?)',
          [giroId, riga.sensore, riga.velocita]
        );
      }

      console.log(`✅ Giro ${giroCorrente} salvato`);
      giroCorrente++;
      buffer = [];

      const [giri] = await db.query('SELECT * FROM giri ORDER BY id DESC LIMIT 1');
      const latestGiro = giri[0];

      const [dati] = await db.query(
        'SELECT numero_sensore, velocita FROM sensori WHERE id_giro = ? ORDER BY numero_sensore',
        [latestGiro.id]
      );

      const update = {
        giro: latestGiro.id,
        timestamp: latestGiro.timestamp,
        dati: dati,
      };

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(update));
        }
      });

    } catch (err) {
      console.error('❌ Errore nel salvataggio:', err);
    }
  }

  res.status(200).send('Dati ricevuti');
});

wss.on('connection', async (socket) => {
  console.log('🔌 Client WebSocket connesso');

  try {
    const [giri] = await db.query('SELECT * FROM giri ORDER BY id DESC LIMIT 1');
    const latestGiro = giri[0];

    if (latestGiro) {
      const [dati] = await db.query(
        'SELECT numero_sensore, velocita FROM sensori WHERE id_giro = ? ORDER BY numero_sensore',
        [latestGiro.id]
      );

      const update = {
        giro: latestGiro.id,
        timestamp: latestGiro.timestamp,
        dati: dati,
      };

      socket.send(JSON.stringify(update));
    }
  } catch (err) {
    console.error('❌ Errore durante il recupero dell\'ultimo giro:', err);
  }
});

server.listen(3000, () => {
  console.log('🚀 Server attivo su http://localhost:3000');
});
