const {Router} = require('express');
const {SolicitudPost,SolicitudPut,SolicitudDelete} = require('../controladores/tarjetas-controlador');
const {SolicitudPaquetesPost,SolicitudPaquetesPut,SolicitudPaquetesDelete} = require('../controladores/tarjetaspaquetes-controlador');
const {SolicitudBloquesPost,SolicitudBloquesPut,SolicitudBloquesDelete} = require('../controladores/tarjetasbloques-controlador');
const {SolicitudEstadisticasPost,SolicitudEstadisticasPut,SolicitudEstadisticasDelete} = require('../controladores/tarjetasestadisticas-controlador');
const {SolicitudLandmarksPost,SolicitudLandmarksPut,SolicitudLandmarksDelete} = require('../controladores/tarjetaslandmarks-controlador');
const {SolicitudPeligrosidadPost,SolicitudPeligrosidadPut,SolicitudPeligrosidadDelete} = require('../controladores/tarjetaspeligrosidad-controlador');
const {SolicitudReportePost,SolicitudReportePut,SolicitudReporteDelete} = require('../controladores/tarjetasreportes-controlador');

const ruta = Router();

ruta.route('/')
    .post(SolicitudPost)
    .put(SolicitudPut)
    .delete(SolicitudDelete);

ruta.route('/paquetes')
    .post(SolicitudPaquetesPost)
    .put(SolicitudPaquetesPut)
    .delete(SolicitudPaquetesDelete);

ruta.route('/bloques')
    .post(SolicitudBloquesPost)
    .put(SolicitudBloquesPut)
    .delete(SolicitudBloquesDelete);

ruta.route('/estadisticas')
    .post(SolicitudEstadisticasPost)
    .put(SolicitudEstadisticasPut)
    .delete(SolicitudEstadisticasDelete);

ruta.route('/landmarks')
    .post(SolicitudLandmarksPost)
    .put(SolicitudLandmarksPut)
    .delete(SolicitudLandmarksDelete);

ruta.route('/peligrosidad')
    .post(SolicitudPeligrosidadPost)
    .put(SolicitudPeligrosidadPut)
    .delete(SolicitudPeligrosidadDelete);

ruta.route('/reportes')
    .post(SolicitudReportePost)
    .put(SolicitudReportePut)
    .delete(SolicitudReporteDelete);

module.exports = ruta;