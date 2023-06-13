const axios    = require('axios').default;
const FormData = require("form-data");
const fetch    = require("node-fetch")
const {GetDate, Log} = require('../herramientas/herramientas');
const {receptor,RecepcionTipo} = require('./receptor');

const HORAS_AJUSTE = 5;
const INTERVALO = 30000;

// HERRAMIENTAS
const GetFechaAdquisicion = ()=>{
    
    const fecha = GetDate();
    fecha.setTime(fecha.getTime() + (HORAS_AJUSTE*60*60*1000));

    let anio = fecha.getFullYear();
    let mes = (fecha.getMonth()+1);
    let dia = fecha.getDate();    

    anio = anio.toString();
    mes = (mes < 10) ? "0"+mes: mes.toString();
    dia = (dia < 10) ? "0"+dia: dia.toString();

    return anio+"-"+mes+"-"+dia;
}
// FUNCIONES
const SolicitarTramas = async(nombre,fecha) => {
    return new Promise(async (callback)=>{
        let body = new FormData();

        body.append("id","active");
        body.append("nombre",nombre.toString());//19686
        body.append("apellido","datalogger");
        body.append("email","2021-04-01 00:00:00 / 2021-04-05 23:00:00");
        body.append("telefono",fecha.toString());

        try{
            const solicitud = await fetch(process.env.CONSULTA, {
                method: 'POST',
                body: body
            });
            
            let respuesta = await solicitud.text(); 
    
            if(respuesta == 1){
                const resultado = await axios.get(process.env.DESCARGA);
                let lineas = resultado.data.split("\n");        
                lineas = lineas.filter((linea)=>{ return linea.trim().length > 0})
                callback(lineas);                    
            }
            else 
                callback(null);
        }
        catch(error){
            Log("Servidor [ADQUISICION] desconectado.");
            callback(null);
        }        
        
    }); 
}

// PRINCIPAL
const adquisicion = async ()=>{
    
    return new Promise(async (callback)=>{

        const enable = process.env.ADQUISICION=="true" || process.env.ADQUISICION==undefined; 

        const Solicitud = async (nombre)=>{
            if(!enable)
                return;
            const tramas  = await SolicitarTramas(nombre,GetFechaAdquisicion());        
            if(tramas)
                await receptor({trama : tramas[tramas.length-1], tipo : RecepcionTipo.SERVIDOR});
        }
        //TODO: DISPOSITIVOS: 19686
        await Solicitud(19686);
        setInterval(async ()=>{
            await Solicitud(19686);
        },INTERVALO);
        
        Log("Servidor : Adquisicion inicializada : (ENABLE : "+enable+")");
        callback(true);

    });

}

module.exports = {adquisicion};