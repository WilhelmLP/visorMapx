const TarjetaBloque = require('../basedatos/tarjetabloque');
const {GetTarjetasInterprete, IsAlmacenamiento} = require('../herramientas/herramientas');
const { Enrutamiento, Respuesta} = require('../herramientas/solicitudes');

const REGISTROS = 2000; 
const LIMITE    = 120;

//FUNCIONES

const AgregarBloque = async (bloque)=>{
    return new Promise(async (callback)=>{

        if(bloque == null)
            callback(false);
        else{
           
  
            if(!IsAlmacenamiento()){
                //console.log(bloque.sensores);
                //console.log(bloque.sensores[1].sixsigma);
                callback(true);
                return;
            }
            
            
            try{
                const cantidad = await TarjetaBloque.countDocuments();
                if(cantidad >= REGISTROS){
                    const eliminar = await TarjetaBloque.findOne();
                    await eliminar.deleteOne();
                }

                const log = new TarjetaBloque(bloque);
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
const GetBloques = async({direcciones,folios})=>{
    return new Promise(async (callback)=>{     
        let resultado = null;
        let interprete = null;

        if(Array.isArray(direcciones))
            interprete = await GetTarjetasInterprete(direcciones);                         
        else
            interprete = await GetTarjetasInterprete([direcciones]);            
    
        let bloques = [];
        for(let i=0;i<interprete.tarjetas.length;i++)
            bloques.push(await TarjetaBloque.find({nombre : interprete.tarjetas[i],folio : {$in : folios}}).sort({_id:-1}).limit(LIMITE));

        let data = [];
        for(let i=0;i<folios.length;i++){    
            let sensores =  [];        
            for(let j=0;j<interprete.direcciones.length;j++){
                if(interprete.direcciones[j]==null){
                    sensores.push({bloque : null});
                    continue;
                }
                const {tarjeta,index} = interprete.direcciones[j];
                const bloque = bloques[tarjeta][i];    
                if(bloque == null)
                    sensores.push({bloque : null});
                else
                    sensores.push({bloque : bloque.sensores[index] , folio : bloque.folio});                       
                                         
            }
            data.push(sensores); 
        }       
            
        resultado = {sensores:data.reverse()};             
        callback(resultado);
    });
}

//SOLICITUDES FUNCIONES

const SolicitudGetBloques = async ({token,direcciones,folios})=>{
    return new Promise(async (callback)=>{
        const operacion = "getbloques";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(direcciones != null){
                const respuesta = await GetBloques({direcciones,folios});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }            
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}

//SOLICITUDES

const SolicitudBloquesPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : 'getbloques', on : SolicitudGetBloques}
    ]);
    res.json(respuesta);
}
const SolicitudBloquesPut = async (req,res)=>{
    res.json({});
}
const SolicitudBloquesDelete = async (req,res)=>{
    res.json({});
}

module.exports = {
                    AgregarBloque, GetBloques,
                    SolicitudBloquesPost,SolicitudBloquesPut,SolicitudBloquesDelete
                };


