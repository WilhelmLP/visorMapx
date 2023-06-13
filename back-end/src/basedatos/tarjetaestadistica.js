const {Schema,model} = require('mongoose');
const {SensorEstado} = require('./tarjeta');


const SchemaTarjetaEstadistica = new Schema({
    nombre : {type : Number, required : true},
    fechadispositivo: String,
    fechaservidor: String,    
    sensores : [
        {
            basica : {
                sumatoria : {type: Number, default:0},
                actual : {type:Number, default:Number.POSITIVE_INFINITY}, 
                min : {type:Number, default:Number.POSITIVE_INFINITY},
                promedio : {type:Number, default:Number.POSITIVE_INFINITY},
                max : {type:Number, default:Number.POSITIVE_INFINITY},
                enrango : {type:Number, default:0}, 
                eficiencia : {type:Number, default:Number.POSITIVE_INFINITY}, 
                nivelsumatoria : {type:Number, default:0},
                nivelactual   : {type:Number, default:Number.POSITIVE_INFINITY},                
                nivelmin      : {type:Number, default:Number.POSITIVE_INFINITY},
                nivelpromedio : {type:Number, default:Number.POSITIVE_INFINITY},                
                nivelmax      : {type:Number, default:Number.POSITIVE_INFINITY},                
                paquetes : {type:Number, default:0},
                estado : {type : String, enum : SensorEstado, default : SensorEstado[0]}
            },
            landmarks:{
                sumatoria : {type:Number, default:0},
                actual : {type:Number, default:Number.POSITIVE_INFINITY},
                min: {type:Number, default:Number.POSITIVE_INFINITY},
                promedio : {type:Number, default:Number.POSITIVE_INFINITY},
                max: {type:Number, default:Number.POSITIVE_INFINITY},
                sumatoriadeltay : {type:Number, default:0},
                deltay : {type:Number, default:Number.POSITIVE_INFINITY},
                deltaymin: {type:Number, default:Number.POSITIVE_INFINITY},
                deltaypromedio : {type:Number, default:Number.POSITIVE_INFINITY},
                deltaymax: {type:Number, default:Number.POSITIVE_INFINITY},
                sumatoriadeltai : {type:Number, default:0},
                deltai : {type:Number, default:Number.POSITIVE_INFINITY},
                deltaimin: {type:Number, default:Number.POSITIVE_INFINITY},
                deltaipromedio : {type:Number, default:Number.POSITIVE_INFINITY},
                deltaimax: {type:Number, default:Number.POSITIVE_INFINITY},
                landmark : {type:Boolean,default:false},
                paquetes : {type:Number, default:0}                
            },
            peligrosidad:{
                sumatoria : {type:Number, default:0},
                actual : {type:Number, default:Number.POSITIVE_INFINITY},
                min: {type:Number, default:Number.POSITIVE_INFINITY},
                promedio : {type:Number, default:Number.POSITIVE_INFINITY},
                max: {type:Number, default:Number.POSITIVE_INFINITY},               
                tendencia : [{type:Number, default:0}],
                paquetes : {type:Number, default:0},
            }
        }
    ]    
},{timestamps:true,versionKey: false});

const TarjetaEstadistica = model('tarjetasestadisticas',SchemaTarjetaEstadistica);

module.exports = {TarjetaEstadistica,SensorEstado};  