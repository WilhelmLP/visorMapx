const {Tarjeta} = require('../basedatos/tarjeta');
const mongoose = require('mongoose');
const {Respuesta, Enrutamiento} = require('../herramientas/solicitudes')

// FUNCIONES

const GetTarjeta = async ({id,nombre})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const ids = id.map((i)=>{
                    return mongoose.Types.ObjectId(i);
                });
                const tarjetas = await Tarjeta.find({_id : {$in : ids}});
                callback(tarjetas);
            }
            else{
                const tarjeta = await Tarjeta.findById(id);
                callback(tarjeta);
            }
        }
        else if(nombre != null){
            if(Array.isArray(nombre)){
                const nombres = nombre.map((n)=>{
                    return parseInt(n);
                });
                const tarjetas = await Tarjeta.find({nombre : {$in : nombres}});
                callback(tarjetas);
            }
            else{
                const tarjeta = await Tarjeta.findOne({nombre:nombre});
                callback(tarjeta);
            }
        }
        else
            callback(null);
    });
}
const GetData = async ({id,nombre})=>{
    return new Promise(async (callback)=>{
        const tarjetas = await GetTarjeta({id,nombre});        
        if(Array.isArray(tarjetas)){
            callback(tarjetas.map((tarjeta)=>{
                return {    _id    : tarjeta._id,
                            nombre : tarjeta.nombre,
                            estado : tarjeta.estado  
                        };
            }));
        }
        else{
            const tarjeta = tarjetas;
            if(tarjeta == null)
                callback(null);
            else
                callback({
                            _id    : tarjeta.id,
                            nombre : tarjeta.nombre, 
                            estado : tarjeta.estado
                        });
        }
    });
}
const GetRecursos = async ({id,nombre})=>{
    return new Promise(async (callback)=>{
        const tarjetas = await GetTarjeta({id,nombre});
        if(Array.isArray(tarjetas)){
            callback(tarjetas.map((t)=>{
                return {    sensores : t.sensores,
                            graficas : t.graficas  };
            }));
        }
        else{
            const tarjeta = tarjetas;
            if(tarjeta==null)
                callback(null);
            else
                callback({sensores : tarjeta.sensores, 
                            graficas : tarjeta.graficas});
        }
            
    });
}
const GetSensores = async ({id,nombre})=>{
    return new Promise(async (callback)=>{
        const tarjetas = await GetTarjeta({id,nombre});
        if(Array.isArray(tarjetas)){
            callback(tarjetas.map((tarjeta)=>{
                return tarjeta.sensores;
            }));
        }
        else{
            const tarjeta = tarjetas;
            if(tarjeta==null)
                callback(null);
            else
                callback(tarjeta.sensores);
        }        
    });
}
const GetGraficas = async ({id,nombre})=>{
    return new Promise(async (callback)=>{    
        const tarjetas = await GetTarjeta({id,nombre});    
        if(Array.isArray(tarjetas)){            
            callback(tarjetas.map((tarjeta)=>{
                return tarjeta.graficas;
            }));
        }
        else{
            const tarjeta = tarjetas;
            if(tarjeta==null)
                callback(null);
            else
                callback(tarjeta.graficas);
        }                
    });
}
const GetTarjetasNombre = async ()=>{
    return new Promise(async (callback)=>{
        const tarjetas = await Tarjeta.find();
        callback(tarjetas.map((t)=>t.nombre));
    });        
}

// SOLICITUDES FUNCIONES

const SolicitudGetTarjeta = async ({token,id,nombre})=>{
    return new Promise(async (callback)=>{
        const operacion = "gettarjeta";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(id != null){
                const respuesta = await GetTarjeta({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(nombre!=null){
                const respuesta = await GetTarjeta({nombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetData = async ({token,id,nombre})=>{
    return new Promise(async (callback)=>{
        const operacion = "getdata";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(id != null){
                const respuesta = await GetData({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(nombre!=null){
                const respuesta = await GetData({nombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetRecursos = async ({token,id,nombre})=>{
    return new Promise(async (callback)=>{
        const operacion = "getrecursos";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(id != null){
                const respuesta = await GetRecursos({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(nombre!=null){
                const respuesta = await GetRecursos({nombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetSensores = async ({token,id,nombre})=>{
    return new Promise(async (callback)=>{
        const operacion = "getsensores";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(id != null){
                const respuesta = await GetSensores({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(nombre!=null){
                const respuesta = await GetSensores({nombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetGraficas = async ({token,id,nombre})=>{
    return new Promise(async (callback)=>{
        const operacion = "getgraficas";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(id != null){
                const respuesta = await GetGraficas({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(nombre!=null){
                const respuesta = await GetGraficas({nombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}
const SolicitudGetInterpretacion = async ({token,direcciones})=>{
    return new Promise(async (callback)=>{
        const operacion = "getinterpretacion";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            const {GetTarjetasInterprete} = require('../herramientas/herramientas');
            const elementos = (Array.isArray(direcciones))?direcciones:[direcciones]; 
            const respuesta = await GetTarjetasInterprete(elementos);
            callback(Respuesta(operacion,respuesta,respuesta!=null));
        }        
    });
}
// SOLICITUDES

const SolicitudPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,
        [
            {operacion : 'gettarjeta',on : SolicitudGetTarjeta},
            {operacion : 'getdata',on : SolicitudGetData},
            {operacion : 'getrecursos',on : SolicitudGetRecursos},
            {operacion : 'getsensores',on : SolicitudGetSensores},
            {operacion : 'getgraficas',on : SolicitudGetGraficas},
            {operacion : 'getinterpretacion',on : SolicitudGetInterpretacion}            
        ]
    );
    res.json(respuesta);
}
const SolicitudPut = async (req,res)=>{
    res.json({});
}
const SolicitudDelete = async (req,res)=>{
    res.json({});
}

module.exports = {  
                    GetTarjetasNombre, GetTarjeta, GetSensores,
                    SolicitudPost,SolicitudPut,SolicitudDelete
                 };