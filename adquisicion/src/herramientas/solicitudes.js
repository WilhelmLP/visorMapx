const axios = require('axios').default;
const {Log} = require('./herramientas');

const Respuesta = (operacion,respuesta,status)=>{
    return {operacion:operacion,respuesta:respuesta,status : status};
}
const Enrutamiento = async (req,opciones = [])=>{
    return new Promise((callback)=>{
        const {body} = req;
        const {operacion} = body;
        if(operacion!=undefined){
            let encontrado = false;
            opciones.forEach(async (opcion)=>{
                if(opcion.operacion == operacion){
                    encontrado = true;
                    const respuesta = await opcion.on(body)                   
                    callback(respuesta);
                }
            });
            if(!encontrado)
                callback(Respuesta("error",null,false));
        }
        else
            callback(Respuesta("error",null,false));
    });
}

const SolicitudSetRegistro = async(paquete)=>{
    return new Promise(async (callback)=>{
        let respuesta = null;
        try{
            respuesta = await axios.put(process.env.BACKEND+"api/registro",{
                operacion : "_setregistro",
                paquete
            });            
        }
        catch(error){
            Log("Servicio [BACKEND] desconectado.");
            callback(null);
            return;
        }
        callback(respuesta);
    });    
}
const SolicitudSetConfiguracion = async({nombre,configuracion})=>{
    return new Promise(async (callback)=>{
        let respuesta = null;
        try{
            respuesta = await axios.put(process.env.BACKEND+"api/registro",{
                operacion : "_setconfiguracion",
                nombre, configuracion
            });            
        }
        catch(error){
            Log("Servicio [BACKEND] desconectado.");
            callback(null);
            return;
        }
        callback(respuesta);
    });    
}
const SolicitudAddAlerta = async(alerta)=>{
    return new Promise(async (callback)=>{
        let respuesta = null;
        try{
            respuesta = await axios.post(process.env.BACKEND+"api/registro",{
                operacion : "_addalerta",
                alerta
            });            
        }
        catch(error){
            Log("Servicio [BACKEND] desconectado.");
            callback(null);
            return;
        }
        callback(respuesta);
    });    
}

module.exports = {
    Respuesta, Enrutamiento,
    SolicitudSetRegistro,
    SolicitudSetConfiguracion,
    SolicitudAddAlerta
};