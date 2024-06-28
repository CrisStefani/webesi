// server.js
const express = require('express');
const app = express();
const teaController = require('./controllers/teaController');

// Ruta para obtener datos de tés
app.get('/api/teas', teaController.getTeas);

// Otras rutas y controladores aquí...

app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001');
});


const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_tu_base_de_datos'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});
