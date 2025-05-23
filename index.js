const path = require('path');
const express = require('express');//es como una importacion 
require('dotenv').config();
const cors = require('cors');
const { dbConection } = require('./database/config');
const { patch } = require('./routes/auth');

// crear el servidor de express 
const app = express();

// base de datos
dbConection();

//CORS
app.use(cors());

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth') );//todo lo que aporta el archivo se exporta en la primer ruta 
app.use('/api/events', require('./routes/events') );

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// escuchar peticioones 
app.listen( process.env.PORT, () => {
    console.log(`Server ${process.env.PORT} Run!`)
});