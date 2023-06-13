const axios = require('axios').default;

const Respuesta = (operacion,respuesta,status)=>{
    return {operacion:operacion,respuesta:respuesta,status : status};
}

/**
 * 
 * @param {Object} req 
 * @param {Object[]} opciones 
 * @returns Respuesta 
 */
const Enrutamiento = async (req,opciones = [])=>{
    return new Promise((callback)=>{
        try{
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
        }
        catch(error){
            callback(Respuesta("error",null,false));
        }        
    });
}


const SolicitudGetContactos = async ()=>{
    return new Promise(async (callback)=>{
        try{
            const respuesta = await axios.post(process.env.BACKEND + "api/usuarios",{
                operacion : "_getcontactos"
            });
            callback(respuesta.data);
        }        
        catch(error){
            callback(null);
        }
    });
}
const SolicitudSetTelegram = async ({celular,telegram})=>{
    return new Promise(async (callback)=>{
        try{
            const respuesta = await axios.put(process.env.BACKEND + "api/usuarios",{
                operacion : "_settelegram",
                celular : celular,
                telegram : telegram 
            });
            callback(respuesta.data);
        }
        catch(error){
            callback(null);
        }
    });
}
const SolicitudSetActivo = async ({chatid,activo})=>{
    return new Promise(async (callback)=>{
        try{
            const respuesta = await axios.put(process.env.BACKEND + "api/usuarios",{
                operacion : "_settelegramactivo",
                chatid,
                activo
            });
            callback(respuesta.data);
        }
        catch(error){
            callback(null);
        }        
    });
}

module.exports = {Respuesta,Enrutamiento,SolicitudGetContactos,SolicitudSetActivo,SolicitudSetTelegram};