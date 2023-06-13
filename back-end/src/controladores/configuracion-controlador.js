const {Enrutamiento,Respuesta} = require('../herramientas/solicitudes');
const {INTERVALO} = require('../app/secuenciador');

const SolicitudGetSecuenciador = async ({token})=>{
    return new Promise((callback)=>{
        const operacion = "getsecuenciador";
        if(token==undefined)
            callback(Respuesta(operacion,null,false));
        else{
            callback(Respuesta(operacion,{
                intervalo : INTERVALO 
            }));
        }
    });
}

const SolicitudPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : "getsecuenciador",on : SolicitudGetSecuenciador}
    ]);
    res.json(respuesta);
}
const SolicitudPut = async (req,res)=>{
    res.json({});
}
const SolicitudDelete = async (req,res)=>{
    res.json({});
}

module.exports = {SolicitudPost,SolicitudPut,SolicitudDelete};