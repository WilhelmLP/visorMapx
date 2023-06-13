const { default: axios } = require('axios');

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


//SOLICITUDES

const SolicitudAddAlerta = async ({telegram,alerta})=>{
    return new Promise(async (callback)=>{
        let respuesta = null;
        try{
            respuesta = await axios.post(process.env.NOTIFICACIONES+"api/alertas",{
                operacion : "addalerta",
                telegram,
                alerta
            });
            respuesta = respuesta.data;
        }      
        catch(error){
            respuesta = null;
            Log("Servicio NOTIFICACIONES desconectado.");
        }  
        callback(respuesta);
    });
}

module.exports = {Respuesta,Enrutamiento,SolicitudAddAlerta};