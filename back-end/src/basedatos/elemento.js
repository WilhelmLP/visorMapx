/*

VARIABLES-TIPO

    min
    promedio
    max
    distancia-min
    distancia-max

- Arreglo-S
- Motor-M

    encendido { variables:[{umbral,invertido}]}

- Motor-T

    potencia-activa   {configuracion : {fp}}
    potencia-reactiva {configuracion : {fp}}
    potencia-aparente
    encendido { variables:[{umbral,invertido}]}

- Sensor-Delta  - DIRECCIONES[2]

    delta
    conversion

*/ 

//VARIABLES->PARAMETROS->{rango,resolucion,peligrosidad}

const {Schema,model} = require('mongoose');

const ElementoTipo = ['Arreglo-S','Motor-M','Motor-T','Sensor-Delta'];
const UIElementoTipo = ['Arreglo de sensores','Motor monofasico','Motor trifasico','Sensor delta'];
const ElementoEstado = ['activo','inactivo','reparacion','mantenimiento','muerto'];
const VariableEstado  = ['activo','inactivo','reparacion','mantenimiento','muerto'];

const SchemaElemento = new Schema({
    nombre : {type : String, default : ''},
    descripcion : {type : String, default : ''},
    area : {type : String, default : ''},
    linea : {type : String, default : ''},
    proceso : {type : String, default : ''},
    identificador : {type : String, default : ''},
    tipo : {type: String, enum: ElementoTipo, default : ElementoTipo[0]},
    estado : {type: String, enum: ElementoEstado, default : ElementoEstado[0]},      
    sensores : [{nombre : {type : String, default : ""},
                 direccion : {type : String, default : ""}}],
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

const Elemento =  model('elementos',SchemaElemento);
module.exports = { Elemento, ElementoTipo, UIElementoTipo, ElementoEstado, VariableEstado};