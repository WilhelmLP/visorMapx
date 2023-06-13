const {Schema,model} = require('mongoose');

const SchemaProyectoPaquete = new Schema({
    proyectoid : {type : Schema.Types.ObjectId, ref: "proyectos", required : true},
    fechaservidor: String,
    variables : [Number]
},{timestamps:true,versionKey: false});

module.exports = model('proyectospaquetes',SchemaProyectoPaquete);