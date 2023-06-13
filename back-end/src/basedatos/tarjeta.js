//SENSORES->PARAMETROS->{rango,resolucion,peligrosidad}

const {Schema,model} = require('mongoose');

const TarjetaEstado = ['activo','inactivo','reparacion','mantenimiento','muerto'];
const SensorEstado  = ['activo','inactivo','reparacion','mantenimiento','muerto'];

const SchemaTarjeta = new Schema({
    nombre : {type : Number, unique:true},
    estado : {type : String, enum: TarjetaEstado, default:TarjetaEstado[0]},
    sensores : [{
        index : Number,
        nombre : {type:String, default:"Sensor x"}, 
        alias : {type:String, default:"sx"},    
        unidades : {type:String, default:"-"},   
        tipo : {type:String, default:"sistema"}, 
        estado : {type:String, enum : SensorEstado, default:SensorEstado[0]},                
        parametros : Object
    }],
    graficas : [{
         nombre : String,
         sensores : [Number]
    }]
},{timestamps:true,versionKey: false});

const Tarjeta = model('tarjetas',SchemaTarjeta);

module.exports = {Tarjeta,TarjetaEstado,SensorEstado}