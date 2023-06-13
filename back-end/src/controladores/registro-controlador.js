const registro = require('../app/registro');
const {Enrutamiento,Respuesta} = require('../herramientas/solicitudes');
const { alertastarjetas } = require('../modulos-secuenciador/alertas');

//GENERALES

const SetRegistro = async (paquete)=>{
    return new Promise(async (callback)=>{
        const respuesta = await registro.PullPaquete(paquete);
        callback(respuesta);
    });
}
const AddAlerta = async (alerta)=>{
    return new Promise(async (callback)=>{
        alertastarjetas.PushAlertaHardware(alerta);
        callback(alerta);
    });
}

//FUNCIONES-SOLICITUDES

const SolicitudSetRegistro = async ({paquete})=>{
    return new Promise(async (callback)=>{
        const operacion = '_setregistro';        
        if(paquete==null)            
            callback(Respuesta(operacion,null,false));                    
        else{
            const respuesta = await SetRegistro(paquete);
            callback(Respuesta(operacion,respuesta,respuesta!=null));            
        }
        
    });
}
const SolicitudAddAlerta = async ({alerta})=>{
    return new Promise(async (callback)=>{
        const operacion = '_addalerta';        
        if(alerta==null)            
            callback(Respuesta(operacion,null,false));                    
        else{
            const respuesta = await AddAlerta(alerta);
            callback(Respuesta(operacion,respuesta,respuesta!=null));            
        }
        
    });
}

//SOLICITUDES

const SolicitudPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : '_addalerta', on : SolicitudAddAlerta}
    ]);
    res.json(respuesta);
}
const SolicitudPut = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : '_setregistro', on : SolicitudSetRegistro}
    ]);
    res.json(respuesta);    
}
const SolicitudDelete = async (req,res)=>{
    res.json({});
}

module.exports = {
    SetRegistro,
    SolicitudPost,SolicitudPut,SolicitudDelete
};