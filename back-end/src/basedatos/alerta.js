const {Schema,model} = require('mongoose');

const AlertaTipo = ['falla','tendencia','hardware'];

const SchemaAlerta = new Schema({
    direccion : {type:String, required:true},
    nombre: {type:String, default:""},
    alias : {type:String, default:""},
    peligrosidad : {type:Number, default:0},
    tipo : {type:String, enum:AlertaTipo, default:AlertaTipo[0]},
    fechaservidor: String,
    pendiente : [{type:Schema.Types.ObjectId, ref:'usuarios'}],
    vista : [{type:Schema.Types.ObjectId, ref:'usuarios'}]
},{timestamps:true,versionKey: false});

const Alerta = model('alertas',SchemaAlerta);

module.exports  = {Alerta,AlertaTipo};
