const {Enrutamiento,Respuesta} = require('../herramientas/solicitudes');
const {EnviarAlerta} = require('../apps/telegram');

const AddAlerta = async ({alerta,telegram})=>{
    return new Promise(async (callback)=>{
        const resultado = await EnviarAlerta({alerta,telegram});
        callback(resultado);
    });
}


const SolicitudAddAlerta = async({alerta,telegram})=>{
    return new Promise(async (callback)=>{
        const operacion = "addalerta";
        const respuesta = await AddAlerta({alerta,telegram});
        callback(Respuesta(operacion,respuesta,respuesta!=null));
    });
}


const SolicitudPost = async (req,res) => {
    const respuesta = await Enrutamiento(req,[
        {operacion: "addalerta", on: SolicitudAddAlerta}
    ])
    res.json(respuesta);
    
}
const SolicitudPut = async (req,res) => {
    res.json({});   
}
const SolicitudDelete = async (req,res) => {
    res.json({});
}

module.exports = {
    SolicitudPost, SolicitudPut, SolicitudDelete
}