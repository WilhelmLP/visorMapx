const {GetTarjetasNombre} = require('../controladores/tarjetas-controlador');
const {AgregarPaquete} = require('../controladores/tarjetaspaquetes-controlador');
const {GetFechaActual, Log, IsSecuenciador} = require('../herramientas/herramientas');
const registro = require('./registro');

//TODO: MODULOS-SECUENCIADOR
const {VariablesStart,VariablesUpdate,VariablesLate} = require('../modulos-secuenciador/variables');
const {LandmarksStart,LandmarksUpdate,LandmarksLate} = require('../modulos-secuenciador/landmarks');
const {PeligrosidadStart,PeligrosidadUpdate,PeligrosidadLate} = require('../modulos-secuenciador/peligrosidad');
const {AlertasStart,AlertasUpdate,AlertasLate} = require('../modulos-secuenciador/alertas');
const {EstadisticaStart,EstadisticaUpdate,EstadisticaLate} = require('../modulos-secuenciador/estadistica');


const Start  = [VariablesStart,LandmarksStart,PeligrosidadStart,AlertasStart,EstadisticaStart];
const Update = [VariablesUpdate,LandmarksUpdate,PeligrosidadUpdate,AlertasUpdate,EstadisticaUpdate];
const Late   = [VariablesLate,LandmarksLate,PeligrosidadLate,AlertasLate,EstadisticaLate];

const INTERVALO = 30000;

//Secuenciador
const secuenciador = async()=>{

    return new Promise(async (callback)=>{

        let index = 0;

        if(IsSecuenciador()){
            for(let i=0;i<Start.length;i++)
                await Start[i]();
        }

        const Secuencia = async ()=>{                
            const fecha = GetFechaActual();
            const tarjetas = await GetTarjetasNombre(); 
            for(let i=0;i<tarjetas.length;i++){
                const tarjeta = tarjetas[i];
                const paquete = registro.GetPaquete(tarjeta);
                if(paquete==null)
                    continue;
                paquete.fechaservidor = fecha;   
                if(IsSecuenciador()){    
                    for(let i=0;i<Update.length;i++){
                        await Update[i](paquete,index);
                    }
                }
                await AgregarPaquete(paquete);
            }            
            if(IsSecuenciador()){
                for(let i=0;i<Late.length;i++){
                    await Late[i]({fechaservidor:fecha},index);                             
                }
            }            
            index++;
        } 

        if(IsSecuenciador()){
            setInterval(()=>{
                Secuencia();
            },INTERVALO);
        }

        Log("Secuenciador inicializado : (ENABLE : "+IsSecuenciador()+")");     
        callback(true);
    });
}

module.exports = {secuenciador,INTERVALO};