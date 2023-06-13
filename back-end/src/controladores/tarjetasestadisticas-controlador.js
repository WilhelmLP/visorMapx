const {TarjetaEstadistica} = require('../basedatos/tarjetaestadistica');
const {GetTarjetasInterprete, IsAlmacenamiento} = require('../herramientas/herramientas');
const {Enrutamiento, Respuesta} = require('../herramientas/solicitudes');

const REGISTROS = 2000; 
//FUNCIONES

const AgregarEstadistica = async (estadistica)=>{
    return new Promise(async (callback)=>{

        if(estadistica == null)
            callback(false);
        else{

            if(!IsAlmacenamiento()){            
                //console.log(estadistica.sensores[0]);
                callback(true);
                return;
            }

            let cantidad = await TarjetaEstadistica.countDocuments();
            if(cantidad >= REGISTROS){
                const eliminar = await TarjetaEstadistica.findOne();
                await eliminar.deleteOne();
            }

            const log = new TarjetaEstadistica(estadistica);
            await log.save();

            callback(true);

        }
    });
}
const GetEstadisticas = async({direcciones,cantidad = 1})=>{
    return new Promise(async (callback)=>{     
        let resultado = null;
        let interprete = null;
        let limite = parseInt(cantidad);

        if(Array.isArray(direcciones))
            interprete = await GetTarjetasInterprete(direcciones);                         
        else
            interprete = await GetTarjetasInterprete([direcciones]);            

        let estadisticas = [];
        for(let i=0;i<interprete.tarjetas.length;i++)
            estadisticas.push(await TarjetaEstadistica.find({nombre : interprete.tarjetas[i]} ).sort({_id:-1}).limit(limite));        

        let data = [];
        for(let i=0;i<limite;i++){
            let sensores =  [];            
            for(let j=0;j<interprete.direcciones.length;j++){
                const {tarjeta,index} = interprete.direcciones[j];
                const estadistica = estadisticas[tarjeta][i];    
                //TODO: MODULOS DE ESTADISTICA : ENTREGAR RESULTADOS
                if(estadistica == null)
                    sensores.push({basica : null, landmarks: null, peligrosidad : null});
                else
                    sensores.push({
                        basica : estadistica.sensores[index].basica, 
                        landmarks : estadistica.sensores[index].landmarks, 
                        peligrosidad : estadistica.sensores[index].peligrosidad, 
                        fecha : estadistica.fechaservidor
                    });                                                
            }
            data.push(sensores);
        }
            
        resultado = {sensores:data};             
        callback(resultado);
    });
}
const GetBloque = async({nombre,limite})=>{
    return new Promise(async (callback)=>{
        if(limite==undefined)
            limite = 60;              
        const paquetes = await TarjetaEstadistica.find({nombre}).sort({_id:-1}).limit(limite);   
        callback(paquetes);
    });
}

//SOLICITUDES FUNCIONES

const SolicitudGetEstadisticas = async ({token,direcciones,cantidad})=>{
    return new Promise(async (callback)=>{
        const operacion = "getestadisticas";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(direcciones != null){
                const respuesta = await GetEstadisticas({direcciones,cantidad});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }            
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}

//SOLICITUDES

const SolicitudEstadisticasPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : 'getestadisticas', on : SolicitudGetEstadisticas}
    ]);
    res.json(respuesta);
}
const SolicitudEstadisticasPut = async (req,res)=>{
    res.json({});
}
const SolicitudEstadisticasDelete = async (req,res)=>{
    res.json({});
}

module.exports = {
                    AgregarEstadistica, GetEstadisticas, GetBloque,
                    SolicitudEstadisticasPost,SolicitudEstadisticasPut,SolicitudEstadisticasDelete
                };


