const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

const alertas = require('../rutas/alertas');
const pagina  = require('../rutas/pagina');

app.set("PUERTO",process.env.PUERTO || 2005);

app.use(express.json());
app.use(cors());
app.use(morgan('common'));
app.use(express.static(path.join(__dirname, '../../public')));

app.use("/api/alertas",alertas);
app.use(pagina);

module.exports = app;