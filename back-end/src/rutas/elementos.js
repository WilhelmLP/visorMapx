const {Router} = require('express');
const {SolicitudPost,SolicitudPut,SolicitudDelete} = require('../controladores/elementos-controlador');
const {SolicitudPaquetesPost,SolicitudPaquetesPut,SolicitudPaquetesDelete} = require('../controladores/elementospaquetes-controlador');

const ruta = Router();

ruta.route('/')
    .post(SolicitudPost)
    .put(SolicitudPut)
    .delete(SolicitudDelete);

ruta.route('/paquetes')
    .post(SolicitudPaquetesPost)
    .put(SolicitudPaquetesPut)
    .delete(SolicitudPaquetesDelete);

module.exports = ruta;