const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ff65@Abindini', // o la tua password
  database: 'pista',
});

module.exports = db;
