const mongoose = require('mongoose');
const {Proyecto,ProyectoTipo,UIProyectoTipo,ProyectoEstado,VariableEstado} = require('../basedatos/proyecto');
const { Enrutamiento,Respuesta } = require('../herramientas/solicitudes');

// FUNCIONES

const GetProyectos = async ()=>{
    return new Promise(async (callback)=>{
        const proyectos = await Proyecto.find();
        callback(proyectos);
    });
}
const GetProyecto = async ({id})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const ids = id.map((i)=>{
                    return mongoose.Types.ObjectId(i);
                });
                const proyectos = await Proyecto.find({_id : {$in : ids}});
                callback(proyectos);
            }
            else{
                const proyecto = await Proyecto.findById(id);
                if(proyecto==null)
                    callback(null);
                else
                    callback(proyecto);
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
                const proyectos = await GetProyecto({id});
                callback(proyectos.map((proyecto)=>{
                    return {
                        _id           : proyecto._id,
                        nombre        : proyecto.nombre,
                        descripcion   : proyecto.descripcion,
                        area          : proyecto.area,
                        linea         : proyecto.linea,
                        proceso       : proyecto.proceso,
                        identificador : proyecto.identificador,                                                                
                        tipo          : proyecto.tipo,
                        estado        : proyecto.estado
                    }
                }));
            }
            else{
                const proyecto = await Proyecto.findById(id);
                if(proyecto==null)
                    callback(null);
                else
                    callback({
                        _id           : proyecto._id,
                        nombre        : proyecto.nombre,
                        descripcion   : proyecto.descripcion,
                        area          : proyecto.area,
                        linea         : proyecto.linea,
                        proceso       : proyecto.proceso,
                        identificador : proyecto.identificador,                                                                
                        tipo          : proyecto.tipo,
                        estado        : proyecto.estado
                    });
            }
        }       
        else
            callback(null);
    });
}
const GetElementos = async ({id})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const proyectos = await GetProyecto({id});
                callback(proyectos.map((proyecto)=>{
                    return proyecto.elementos
                }));
            }
            else{
                const proyecto = await GetProyecto({id});
                if(proyecto==null)
                    callback(null);
                else
                    callback(proyecto.elementos);
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
                const proyectos = await GetProyecto({id});
                callback(proyectos.map((proyecto)=>{
                    return proyecto.graficas
                }));
            }
            else{
                const proyecto = await GetProyecto({id});
                if(proyecto==null)
                    callback(null);
                else
                    callback(proyecto.graficas);
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
                const proyectos = await GetProyecto({id});
                callback(proyectos.map((proyecto)=>{
                    return {
                        sensores : proyecto.sensores,
                        variables : proyecto.variables
                    }
                }));
            }
            else{
                const proyecto = await GetProyecto({id});
                if(proyecto==null)
                    callback(null);
                else
                    callback({
                        sensores : proyecto.sensores,
                        variables : proyecto.variables
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
                const proyectos = await GetProyecto({id});
                callback(proyectos.map((proyecto)=>{
                    return {
                        elementos : proyecto.elementos,
                        sensores : proyecto.sensores,
                        variables : proyecto.variables,
                        graficas : proyecto.graficas
                    }
                }));
            }
            else{
                const proyecto = await GetProyecto({id});
                if(proyecto==null)
                    callback(null);
                else
                    callback({
                        elementos : proyecto.elementos,
                        sensores : proyecto.sensores,
                        variables : proyecto.variables,
                        graficas : proyecto.graficas
                    });
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
                const proyectos = await GetProyecto({id});
                callback(proyectos.map((proyecto)=>{
                    return proyecto.configuracion || null;
                }));
            }
            else{
                const proyecto = GetProyecto({id});
                if(proyecto==null)
                    callback(null);
                else
                    callback(proyecto.configuracion || null);
            }
        }       
        else
            callback(null);
    });
}


// SOLICITUDES FUNCIONES

const SolicitudGetProyecto = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = "getproyecto";
        if(token == undefined)
            callback(Respuesta(operacion,null,false));
        else{
            if(id != null){
                const respuesta = await GetProyecto({id});
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
const SolicitudGetElementos = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = "getelementos";
        if(token == undefined)
            callback(Respuesta(operacion,null,false));
        else{
            if(id != null){
                const respuesta = await GetElementos({id});
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
                    tipos            : ProyectoTipo, 
                    uitipos          : UIProyectoTipo,
                    estados          : ProyectoEstado,
                    variableestados  : VariableEstado
            },false));
             
    });
}
//S

//SOLICITUDES

const SolicitudPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : 'getbase', on : SolicitudGetBase},
        {operacion : 'getproyecto', on : SolicitudGetProyecto},
        {operacion : 'getdata', on : SolicitudGetData},
        {operacion : 'getelementos', on : SolicitudGetElementos},
        {operacion : 'getvariables', on : SolicitudGetVariables},
        {operacion : 'getgraficas', on : SolicitudGetGraficas},
        {operacion : 'getrecursos', on : SolicitudGetRecursos},
        {operacion : 'getconfiguracion', on : SolicitudGetConfiguracion},
    ]);
    res.json(respuesta);
}
const SolicitudPut = async (req,res)=>{
    res.json({});
}
const SolicitudDelete = async (req,res)=>{
    res.json({});
}

module.exports = {
    GetProyecto,GetProyectos,
    SolicitudPost,SolicitudPut,SolicitudDelete
};
