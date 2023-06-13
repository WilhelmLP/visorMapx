const {Schema,model} = require('mongoose');

const UsuarioEstado =  ['activo','inactivo','muerto'];

const SchemaUsuario = new Schema({
    nombre : {type : String , unique : true, required: true},
    correo : {type : String, unique : true, required: true},
    celular : {type : String, default : ""},
    pass : {type : String, required: true},
    token : {type : String, unique : true, required : true},
    estado : {type:String, enum : UsuarioEstado, default : UsuarioEstado[0]},
    telegram : {
                activo : { type : Boolean, default : true},
                chatid : { type : String, default : ""}
            },
    flogo : {type : Boolean, default : false},
    empresa : {type : Schema.Types.ObjectId, ref : 'empresas'},
    proyectos : [{type : Schema.Types.ObjectId, ref : 'proyectos'}],    
    elementos : [{type : Schema.Types.ObjectId, ref : 'elementos'}],
    tarjetas : [String],
    puesto : {type : String, default : ''},
    servicios : [String]
},{timestamps:true,versionKey: false});

const Usuario = model("usuarios",SchemaUsuario); 
module.exports = {Usuario};