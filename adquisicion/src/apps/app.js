const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const pagina = require('../rutas/pagina');
const emisor = require('../rutas/emisor');

app.set('port', (process.env.PUERTOAPP || 1000));

//MIDDLEWARES
app.use(express.static(path.join(__dirname, '../../public')));
app.use(morgan('combined'));
app.use(express.json());
app.use(cors({origin: true}));

//RUTAS
app.use('/api/emisor', emisor);
app.use(pagina);


module.exports = app;