const {TarjetaPeligrosidad} = require('../basedatos/tarjetapeligrosidad');
const {GetTarjetasInterprete, IsAlmacenamiento} = require('../herramientas/herramientas');
const {Enrutamiento, Respuesta} = require('../herramientas/solicitudes');

const REGISTROS = 2000; 

//FUNCIONES

const AgregarPeligrosidad = async (peligrosidad)=>{
    return new Promise(async (callback)=>{

        if(peligrosidad == null)
            callback(false);
        else{

            if(!IsAlmacenamiento()){
                //console.log(peligrosidad);
                callback(true);
                return;
            }

            let cantidad = await TarjetaPeligrosidad.countDocuments();
            if(cantidad >= REGISTROS){
                const eliminar = await TarjetaPeligrosidad.findOne();
                await eliminar.deleteOne();
            }

            const log = new TarjetaPeligrosidad(peligrosidad);
            await log.save();

            callback(true);

        }
    });
}
const GetPeligrosidad = async({direcciones,cantidad = 1})=>{
    return new Promise(async (callback)=>{     
        let resultado = null;
        let interprete = null;
        let limite = parseInt(cantidad);
        
        if(Array.isArray(direcciones))
            interprete = await GetTarjetasInterprete(direcciones);                         
        else
            interprete = await GetTarjetasInterprete([direcciones]);            
    
        let peligrosidades = [];
        for(let i=0;i<interprete.tarjetas.length;i++)
            peligrosidades.push( await TarjetaPeligrosidad.find({nombre : interprete.tarjetas[i]} ).sort({_id:-1}).limit(limite) );

        let data = [];
        for(let i=0;i<limite;i++){
            let sensores =  [];            
            for(let j=0;j<interprete.direcciones.length;j++){
                const {tarjeta,index} = interprete.direcciones[j];
                const peligrosidad = peligrosidades[tarjeta][i];    
                if(peligrosidad == null)
                    sensores.push({peligrosidad : null});
                else
                    sensores.push({peligrosidad : peligrosidad.sensores[index], fecha : peligrosidad.fechaservidor});                                
            }
            data.push(sensores);
        }
            
        resultado = {sensores:data};             
        callback(resultado);
    });
}

//SOLICITUDES FUNCIONES

const SolicitudGetPeligrosidad = async ({token,direcciones,cantidad})=>{
    return new Promise(async (callback)=>{
        const operacion = "getpeligrosidad";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(direcciones != null){
                const respuesta = await GetPeligrosidad({direcciones,cantidad});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }            
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}

//SOLICITUDES

const SolicitudPeligrosidadPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : 'getpeligrosidad', on : SolicitudGetPeligrosidad}
    ]);
    res.json(respuesta);
}
const SolicitudPeligrosidadPut = async (req,res)=>{
    res.json({});
}
const SolicitudPeligrosidadDelete = async (req,res)=>{
    res.json({});
}

module.exports = {
                    AgregarPeligrosidad, GetPeligrosidad,
                    SolicitudPeligrosidadPost,SolicitudPeligrosidadPut,SolicitudPeligrosidadDelete
                };


