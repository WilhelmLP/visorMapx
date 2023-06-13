const { emisorregistro } = require('../apps/emisor');
const {Enrutamiento,Respuesta} = require('../herramientas/solicitudes');

//GENERALES

const AddComando =  (comando)=>{
    return emisorregistro.pushComando(comando);
}
const GetConfiguracion = (nombre)=>{
    const comando = {
        nombre,
        comando : '??',
    }
    return AddComando(comando);
}

//FUNCIONES-SOLICITUDES

const SolicitudAddComando = async ({comando})=>{
    return new Promise(async (callback)=>{
        const operacion = '_addcomando';        
        if(comando==null)            
            callback(Respuesta(operacion,null,false));                    
        else{
            const respuesta = AddComando(comando);
            callback(Respuesta(operacion,respuesta,respuesta!=null));            
        }        
    });
}
const SolicitudGetConfiguracion= async ({nombre})=>{
    return new Promise(async (callback)=>{
        const operacion = '_getconfiguracion';        
        if(nombre==null)            
            callback(Respuesta(operacion,null,false));                    
        else{
            const respuesta = GetConfiguracion(nombre);
            callback(Respuesta(operacion,respuesta,respuesta!=null));            
        }        
    });
}

//SOLICITUDES

const SolicitudPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : '_addcomando', on : SolicitudAddComando},
        {operacion : '_getconfiguracion', on : SolicitudGetConfiguracion}
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
    SolicitudPost,SolicitudPut,SolicitudDelete
};