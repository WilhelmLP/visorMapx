const express = require('express');
const path = require('path');

const cors    = require('cors');
const morgan  = require('morgan');
const cookies  = require('cookie-parser');  
const {sesion} = require('../middlewares/sesion');

const pagina        = require('../rutas/pagina');
const registro      = require('../rutas/registro');  
const configuracion = require('../rutas/configuracion');
const usuarios      = require('../rutas/usuarios');
const empresas      = require('../rutas/empresas');
const proyectos     = require('../rutas/proyectos');
const elementos     = require('../rutas/elementos');
const tarjetas      = require('../rutas/tarjetas');
const alertas       = require('../rutas/alertas');


const app = express();


//CONFIGURACION
app.set("PUERTO",process.env.PORT || 3000);

//MIDDLEWARE
app.use(express.static(path.join(__dirname, '../../public')));
app.use(morgan('combined'));
app.use(cookies());
app.use(cors({origin:true,credentials:true}));
app.use(express.json());
app.use(sesion);

//ENRUTAMIENTO

app.use("/api/registro",registro);
app.use("/api/configuracion",configuracion);
app.use("/api/usuarios",usuarios);
app.use("/api/empresas",empresas);
app.use("/api/proyectos",proyectos);
app.use("/api/elementos",elementos);
app.use("/api/tarjetas",tarjetas);
app.use("/api/alertas",alertas);
app.use(pagina);

module.exports = app;