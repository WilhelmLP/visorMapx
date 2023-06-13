const {Router} = require('express');
const {SolicitudPost,SolicitudPut,SolicitudDelete} = require('../controladores/registro-controlador')

const ruta = Router();

ruta.route("/")
    .post(SolicitudPost)
    .put(SolicitudPut)
    .delete(SolicitudDelete);

module.exports = ruta; 