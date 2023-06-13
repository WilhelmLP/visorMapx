const mongoose = require('mongoose');
const {Enrutamiento,Respuesta} = require('../herramientas/solicitudes');
const {Elemento, ElementoTipo, UIElementoTipo, ElementoEstado, VariableEstado} = require('../basedatos/elemento')

// FUNCIONES
const GetElementos = async ()=>{
    return new Promise(async (callback)=>{
        const elementos = await Elemento.find();
        callback(elementos);
    });
}
const GetElemento = async ({id})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const ids = id.map((i)=>{
                    return mongoose.Types.ObjectId(i);
                });
                const elementos = await Elemento.find({_id : {$in : ids}});
                callback(elementos);
            }
            else{
                const elemento = await Elemento.findById(id);
                if(elemento==null)
                    callback(null);
                else
                    callback(elemento);
            }
        }       
        else
            callback(null);
    });
}
const GetData = async ({id})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){                
                const elementos = await GetElemento({id});
                callback(elementos.map((elemento)=>{
                    return {
                                _id           : elemento._id,
                                nombre        : elemento.nombre,                                
                                descripcion   : elemento.descripcion,
                                area          : elemento.area,
                                linea         : elemento.linea,
                                proceso       : elemento.proceso,
                                identificador : elemento.identificador,                                                                
                                tipo          : elemento.tipo,
                                estado        : elemento.estado
                            }
                }));
            }
            else{
                const elemento = await GetElemento({id});
                if(elemento==null)
                    callback(null);
                else
                    callback({
                        _id           : elemento._id,
                        nombre        : elemento.nombre,                                
                        descripcion   : elemento.descripcion,
                        area          : elemento.area,
                        linea         : elemento.linea,
                        proceso       : elemento.proceso,
                        identificador : elemento.identificador,                                                                
                        tipo          : elemento.tipo,
                        estado        : elemento.estado
                    });
            }
        }       
        else
            callback(null);
    });
}
const GetUbicacion = async ({id})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const elementos = await GetElemento({id});
                callback(elementos.map((elemento)=>{
                    return {                            
                                area: elemento.area,
                                linea: elemento.linea,
                                proceso: elemento.proceso,                                
                            }
                }));
            }
            else{
                const elemento = await GetElemento({id});
                if(elemento==null)
                    callback(null);
                else
                    callback({
                        area: elemento.area,
                        linea: elemento.linea,
                        proceso: elemento.proceso, 
                    });
            }
        }       
        else
            callback(null);
    });
}
const GetVariables = async ({id})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const ids = id.map((i)=>{
                    return mongoose.Types.ObjectId(i);
                });
                const elementos = await GetElemento({id});
                callback(elementos.map((elemento)=>{
                    return {
                                sensores: elemento.sensores,                                
                                variables: elemento.variables,                               
                            }
                }));
            }
            else{
                const elemento = await GetElemento({id});
                if(elemento==null)
                    return callback(null);
                else
                    callback({
                        sensores: elemento.sensores,                                
                        variables: elemento.variables,
                    });
            }
        }       
        else
            callback(null);
    });
}
const GetRecursos = async ({id})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const ids = id.map((i)=>{
                    return mongoose.Types.ObjectId(i);
                });
                const elementos = await GetElemento({id});
                callback(elementos.map((elemento)=>{
                    return {
                                sensores: elemento.sensores,                                
                                variables: elemento.variables,
                                graficas: elemento.graficas                                
                            }
                }));
            }
            else{
                const elemento = await GetElemento({id});
                if(elemento==null)
                    return callback(null);
                else
                    callback({
                        sensores: elemento.sensores,                                
                        variables: elemento.variables,
                        graficas: elemento.graficas    
                    });
            }
        }       
        else
            callback(null);
    });
}
const GetGraficas = async ({id})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const ids = id.map((i)=>{
                    return mongoose.Types.ObjectId(i);
                });
                const elementos = await GetElemento({id});
                callback(elementos.map((elemento)=>{
                    return elemento.graficas;
                }));
            }
            else{
                const elemento = await GetElemento({id});
                if(elemento==null)
                    return callback(null);
                else
                    callback(elemento.graficas);
            }
        }       
        else
            callback(null);
    });
}
const GetConfiguracion = async ({id})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const elementos = await GetElemento({id});
                callback(elementos.map((elemento)=>{
                    return elemento.configuracion || null;
                }));
            }
            else{
                const elemento = await GetElemento({id});
                if(elemento==null)
                    return callback(null);
                else
                    callback(elemento.configuracion || null);
            }
        }       
        else
            callback(null);
    });
}
const SolicitudGetInterpretacion = async ({token,direcciones})=>{
    return new Promise(async (callback)=>{
        const operacion = "getinterpretacion";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            const {GetElementosInterprete} = require('../herramientas/herramientas');
            const elementos = (Array.isArray(direcciones))?direcciones:[direcciones]; 
            const respuesta = await GetElementosInterprete(elementos);
            callback(Respuesta(operacion,respuesta,respuesta!=null));
        }        
    });
}

// SOLICITUDES FUNCIONES

const SolicitudGetElemento = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = "getelemento";
        if(token == undefined)
            callback(Respuesta(operacion,null,false));
        else{
            if(id != null){
                const respuesta = await GetElemento({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetData = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = "getdata";
        if(token == undefined)
            callback(Respuesta(operacion,null,false));
        else{
            if(id != null){
                const respuesta = await GetData({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetUbicacion = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = "getubicacion";
        if(token == undefined)
            callback(Respuesta(operacion,null,false));
        else{
            if(id != null){
                const respuesta = await GetUbicacion({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetRecursos = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = "getrecursos";
        if(token == undefined)
            callback(Respuesta(operacion,null,false));
        else{
            if(id != null){
                const respuesta = await GetRecursos({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetVariables = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = "getvariables";
        if(token == undefined)
            callback(Respuesta(operacion,null,false));
        else{
            if(id != null){
                const respuesta = await GetVariables({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetGraficas = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = "getgraficas";
        if(token == undefined)
            callback(Respuesta(operacion,null,false));
        else{
            if(id != null){
                const respuesta = await GetGraficas({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetConfiguracion = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = "getconfiguracion";
        if(token == undefined)
            callback(Respuesta(operacion,null,false));
        else{
            if(id != null){
                const respuesta = await GetConfiguracion({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }           
             
    });
}
const SolicitudGetBase = async ({token})=>{
    return new Promise(async (callback)=>{
        const operacion = "getbase";
        if(token == undefined)
            callback(Respuesta(operacion,null,false));
        else
            callback(Respuesta(operacion,{
                    tipos            : ElementoTipo, 
                    uitipos          : UIElementoTipo,
                    estados          : ElementoEstado,
                    variableestados  : VariableEstado
            },false));
             
    });
}
//SOLICITUDES

const SolicitudPost = async(req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : 'getbase', on : SolicitudGetBase},
        {operacion : 'getelemento', on : SolicitudGetElemento},        
        {operacion : 'getdata', on : SolicitudGetData},
        {operacion : 'getubicacion', on : SolicitudGetUbicacion},
        {operacion : 'getvariables', on : SolicitudGetVariables},
        {operacion : 'getgraficas', on : SolicitudGetGraficas},
        {operacion : 'getrecursos', on : SolicitudGetRecursos},
        {operacion : 'getconfiguracion', on : SolicitudGetConfiguracion},
        {operacion : 'getinterpretacion', on : SolicitudGetInterpretacion}
    ]);
    res.json(respuesta);
}
const SolicitudPut = async(req,res)=>{
    res.json({});
}
const SolicitudDelete = async(req,res)=>{
    res.json({});
}

module.exports = {
    SolicitudPost,SolicitudPut,SolicitudDelete,
    GetElemento,GetElementos
};