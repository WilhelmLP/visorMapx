/*

tipo : TorreEnfriamiento

configuracion : {
    encendido : index -> elementos
}

*/

//VARIABLES->PARAMETROS->{rango,resolucion,peligrosidad}

const {Schema,model} = require('mongoose');
const {VariableEstado} = require('./elemento');

const ProyectoTipo = ['TorreEnfriamiento',"ProyectoDemo"];
const UIProyectoTipo = ['Torre de enfriamiento', "Proyecto demostrativo"];
const ProyectoEstado = ['activo','inactivo','muerto'];

const SchemaProyecto = new Schema({
    nombre : {type : String, default : ''},
    descripcion : {type : String, default : ''},
    area : {type : String, default : ''},
    linea : {type : String, default : ''},
    proceso : {type : String, default : ''},
    identificador : {type : String, default : ''},
    tipo : {type: String, enum: ProyectoTipo,   default : ProyectoTipo[0]},
    estado: {type:String, enum: ProyectoEstado, default : ProyectoEstado[0]},
    elementos : [{
                    prioridad : {type : Number, default : 1},
                    elemento : {type : Schema.Types.ObjectId, ref : "elementos"} 
                 }],
    sensores : [{
                    nombre : {type : String, default : ""},
                    direccion : {type : String, default : ""}
                }],
    variables : [{  
                    index : {type: Number, default: 0},
                    nombre : {type : String, default : ""},                    
                    alias : {type : String, default : ""},                    
                    tipo : {type: String, default : "basico"},
                    unidades : {type:String, default:"-"},   
                    direcciones : [String],  
                    estado : {type:String, enum : VariableEstado, default : VariableEstado[0]},        
                    parametros : Object                   
                }],
    graficas : [{
                    nombre : String,
                    direcciones : [String]
                }],
    ui : Object,
    configuracion : Object
},{timestamps:true,versionKey: false});

const Proyecto = model('proyectos',SchemaProyecto);

module.exports = {
    Proyecto,
    ProyectoTipo,UIProyectoTipo,
    ProyectoEstado,VariableEstado
};
