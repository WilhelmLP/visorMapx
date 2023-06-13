const TarjetaPaquete = require('../basedatos/tarjetapaquete');
const {GetTarjetasInterprete, IsAlmacenamiento} = require('../herramientas/herramientas');
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

            let cantidad = await TarjetaPaquete.countDocuments();
            if(cantidad >= REGISTROS){
                const eliminar = await TarjetaPaquete.findOne();
                await eliminar.deleteOne();
            }

            const log = new TarjetaPaquete(paquete);
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
            interprete = await GetTarjetasInterprete(direcciones);                         
        else
            interprete = await GetTarjetasInterprete([direcciones]);            
    
        let paquetes = [];
        for(let i=0;i<interprete.tarjetas.length;i++)
            paquetes.push(await TarjetaPaquete.find({nombre : interprete.tarjetas[i]} ).sort({_id:-1}).limit(limite));

        let data = [];
        for(let i=0;i<limite;i++){
            let sensores =  [];            
            
            for(let j=0;j<interprete.direcciones.length;j++){
                if(interprete.direcciones[j]==null){
                    sensores.push({valor : Number.POSITIVE_INFINITY});
                    continue;
                }
                const {tarjeta,index} = interprete.direcciones[j];
                const paquete = paquetes[tarjeta][i];    
                if(paquete == null)
                    sensores.push({valor : Number.POSITIVE_INFINITY});
                else
                    sensores.push({valor : paquete.sensores[index] , fecha : paquete.fechaservidor});                                
            }
            data.push(sensores);
        }
            
        resultado = {sensores:data};             
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


