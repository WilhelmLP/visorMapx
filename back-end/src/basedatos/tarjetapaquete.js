const {Schema,model} = require('mongoose');

const SchemaTarjetaPaquete = new Schema({
    nombre : {type : Number, required : true},
    fechadispositivo: String,
    fechaservidor: String,
    sensores : [Number]
},{timestamps:true,versionKey: false});

module.exports = model('tarjetaspaquetes',SchemaTarjetaPaquete);