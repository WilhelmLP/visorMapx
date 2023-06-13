const {GenerarReporteTarjetas} = require('../modulos-api/reportes');
const {Enrutamiento, Respuesta} = require('../herramientas/solicitudes');

//FUNCIONES

const GetReportes = ({tarjetanombre,folios})=>{
    return new Promise(async (callback)=>{                        
        if(tarjetanombre!=undefined){
            if(Array.isArray(tarjetanombre)){                
                let reportes = [];
                for(let i=0;i<tarjetanombre.length;i++)
                    reportes.push(await GenerarReporteTarjetas({nombre:tarjetanombre[i],folios}));
                callback(reportes);            
            }                
            else{
                const reporte = await GenerarReporteTarjetas({nombre:tarjetanombre,folios});
                callback(reporte);
            }   
        }       
        else
            callback(null);      
    });
}

//SOLICITUDES FUNCIONES

const SolicitudGetReportes = async ({token,tarjetanombre,folios})=>{
    return new Promise(async (callback)=>{
        const operacion = "getreportes";
        if(token == undefined){
            callback(Respuesta(operacion,null,false));
        }
        else{
            if(tarjetanombre != null){
                const respuesta = await GetReportes({tarjetanombre,folios});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }            
            else
                callback(Respuesta(operacion,null,false));
        }        
    });
}

//SOLICITUDES

const SolicitudReportePost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion : 'getreportes', on : SolicitudGetReportes}
    ]);
    res.json(respuesta);
}
const SolicitudReportePut = async (req,res)=>{
    res.json({});
}
const SolicitudReporteDelete = async (req,res)=>{
    res.json({});
}

module.exports = {                    
                    SolicitudReportePost,SolicitudReportePut,SolicitudReporteDelete
                };


