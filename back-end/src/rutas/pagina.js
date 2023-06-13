const {Router} = require('express');
const {GetIndex,Get404} = require('../controladores/pagina-controlador');

const ruta = Router();

ruta.route('/').get(GetIndex);
ruta.route('/404').get(Get404);
ruta.route('*').get(Get404);

module.exports = ruta;