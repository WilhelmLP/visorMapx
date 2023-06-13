const {TarjetaLandmark} = require('../basedatos/tarjetalandmark');
const {GetTarjetasInterprete, IsAlmacenamiento} = require('../herramientas/herramientas');
const {Enrutamiento, Respuesta} = require('../herramientas/solicitudes');

const REGISTROS = 2000; 

//FUNCIONES

const AgregarLandmark = async (landmark)=>{
    return new Promise(async (callback)=>{

        if(landmark == null)
            callback(false);
        else{

            if(!IsAlmacenamiento()){
                //console.log(landmark);
                callback(true);
                return;
            }

            let cantidad = await TarjetaLandmark.countDocuments();
            if(cantidad >= REGISTROS){
                const eliminar = await TarjetaLandmark.findOne();
                await eliminar.deleteOne();
            }

            const log = new TarjetaLandmark(landmark);
            await log.save();

            callback(true);

        }
    });
}
const GetLandmarks = async({direcciones,cantidad = 1})=>{
    return new Promise(async (callback)=>{     
        let resultado = null;
        let interprete = null;
        let limite = parseInt(cantidad);

        
        if(Array.isArray(direcciones))
            interprete = await GetTarjetasInterprete(direcciones);                         
        else
            interprete = await GetTarjetasInterprete([direcciones]);            
    
        let landmarks = [];
        for(let i=0;i<interprete.tarjetas.length;i++)
            landmarks.push(await TarjetaLandmark.find({nombre : interprete.tarjetas[i]} ).sort({_id:-1}).limit(limite));

        let data = [];
        for(let i=0;i<limite;i++){
            let sensores =  [];            
            for(let j=0;j<interprete.direcciones.length;j++){
                const {tarjeta,index} = interprete.direcciones[j];
                const landmark = landmarks[tarjeta][i];    
                if(landmark == null)
                    sensores.push({landmark : null});
                else
                    sensores.push({landmark : landmark.sensores[index], fecha : landmark.fechaservidor});                                
            }
            data.push(sensores);
        }
            
        resultado = {sensores:data};             
        callback(resultado);
    });
}

//SOLICITUDES FUNCIONES

const SolicitudGetLandmarks = async ({token,direcciones,cantidad})=>{
    return new Promise(async (callback)=>{
        const operacion = "getlandmarks";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(direcciones != null){
                const respuesta = await GetLandmarks({direcciones,cantidad});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }            
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}

//SOLICITUDES

const SolicitudLandmarksPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : 'getlandmarks', on : SolicitudGetLandmarks}
    ]);
    res.json(respuesta);
}
const SolicitudLandmarksPut = async (req,res)=>{
    res.json({});
}
const SolicitudLandmarksDelete = async (req,res)=>{
    res.json({});
}

module.exports = {
                    AgregarLandmark, GetLandmarks,
                    SolicitudLandmarksPost,SolicitudLandmarksPut,SolicitudLandmarksDelete
                };


