const {Schema,model} = require('mongoose');

const EmpresaTipo = ['activo','inactivo','muerto'];

const SchemaEmpresa = new Schema({
    nombre : {type : String, default : ''},
    planta : {type : String, default : ''},
    descripcion : {type : String, default : ''},
    disponibles : {type : Number, default : 0},
    estado : {type : String, enum : EmpresaTipo, default : EmpresaTipo[0]},
    flogo : {type : Boolean, default : false},
    servicios : [String],
    proyectos : [ {type : Schema.Types.ObjectId, ref : 'proyectos'} ],
    usuarios : [{type : Schema.Types.ObjectId, ref : "usuarios"}],
    tarjetas : [{type : Schema.Types.ObjectId, ref : "tarjetas"}],
    ui : Object
},{timestamps:true,versionKey: false});

const Empresa = model('empresas',SchemaEmpresa);;

module.exports = {Empresa,EmpresaTipo};