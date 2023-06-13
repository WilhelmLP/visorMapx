const ElementoPaquete = require('../basedatos/elementopaquete');
const {GetElementosInterprete, IsAlmacenamiento} = require('../herramientas/herramientas');
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
            

            let cantidad = await ElementoPaquete.countDocuments();
            if(cantidad >= REGISTROS){
                const eliminar = await ElementoPaquete.findOne();
                await eliminar.deleteOne();
            }
            try{
                const log = new ElementoPaquete(paquete);
                await log.save();
                callback(true);
            }
            catch(error){
                console.log(error);
                callback(false);
            }            

        }
    });
}
const GetPaquetes = async({direcciones,cantidad = 1})=>{
    return new Promise(async (callback)=>{     
        let resultado = null;
        let interprete = null;
        let limite = parseInt(cantidad);

        if(Array.isArray(direcciones))
            interprete = await GetElementosInterprete(direcciones);                         
        else
            interprete = await GetElementosInterprete([direcciones]);            
    
        let paquetes = [];
        for(let i=0;i<interprete.elementos.length;i++)
            paquetes.push(await ElementoPaquete.find({elementoid : interprete.elementos[i]} ).sort({_id:-1}).limit(limite));

        let data = [];
        for(let i=0;i<limite;i++){
            let variables =  [];            
            
            for(let j=0;j<interprete.direcciones.length;j++){
                if(interprete.direcciones[j]==null){
                    variables.push({valor : Number.POSITIVE_INFINITY});
                    continue;
                }
                const {elemento,index} = interprete.direcciones[j];
                const paquete = paquetes[elemento][i];    
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


