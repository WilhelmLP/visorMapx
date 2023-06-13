const ProyectoPaquete = require('../basedatos/proyectopaquete');
const { GetProyectosInterprete, IsAlmacenamiento} = require('../herramientas/herramientas');
const { Enrutamiento, Respuesta} = require('../herramientas/solicitudes');

const REGISTROS = 2000; 

//FUNCIONES

const AgregarPaquete = async (paquete)=>{
    return new Promise(async (callback)=>{

        if(paquete == null)
            callback(false);
        else{

            if(!IsAlmacenamiento()){
                //console.log(paquete);
                callback(true);
                return;
            }

            let cantidad = await ProyectoPaquete.countDocuments();
            if(cantidad >= REGISTROS){
                const eliminar = await ProyectoPaquete.findOne();
                await eliminar.deleteOne();
            }

            const log = new ProyectoPaquete(paquete);
            await log.save();

            callback(true);

        }
    });
}
const GetPaquetes = async({direcciones,cantidad = 1})=>{
    return new Promise(async (callback)=>{     
        let resultado = null;
        let interprete = null;
        let limite = parseInt(cantidad);

        if(Array.isArray(direcciones))
            interprete = await GetProyectosInterprete(direcciones);                         
        else
            interprete = await GetProyectosInterprete([direcciones]);            
    
        let paquetes = [];
        for(let i=0;i<interprete.proyectos.length;i++)
            paquetes.push(await ProyectoPaquete.find({proyectoid : interprete.proyectos[i]} ).sort({_id:-1}).limit(limite));

        let data = [];
        for(let i=0;i<limite;i++){
            let variables =  [];            
            
            for(let j=0;j<interprete.direcciones.length;j++){
                if(interprete.direcciones[j]==null){
                    variables.push({valor : Number.POSITIVE_INFINITY});
                    continue;
                }
                const {proyecto,index} = interprete.direcciones[j];
                const paquete = paquetes[proyecto][i];    
                if(paquete == null)
                    variables.push({valor : Number.POSITIVE_INFINITY});
                else
                    variables.push({valor : paquete.variables[index] , fecha : paquete.fechaservidor});                                
            }
            data.push(variables);
        }
            
        resultado = {variables:data};             
        callback(resultado);
    });
}

//SOLICITUDES FUNCIONES

const SolicitudGetPaquetes = async ({token,direcciones,cantidad})=>{
    return new Promise(async (callback)=>{
        const operacion = "getpaquetes";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(direcciones != null){
                const respuesta = await GetPaquetes({direcciones,cantidad});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }            
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}

//SOLICITUDES

const SolicitudPaquetesPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : 'getpaquetes', on : SolicitudGetPaquetes}
    ]);
    res.json(respuesta);
}
const SolicitudPaquetesPut = async (req,res)=>{
    res.json({});
}
const SolicitudPaquetesDelete = async (req,res)=>{
    res.json({});
}

module.exports = {
                    AgregarPaquete,
                    SolicitudPaquetesPost,SolicitudPaquetesPut,SolicitudPaquetesDelete
                };
