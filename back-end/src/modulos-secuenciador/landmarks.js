const {GetSensores} = require('../controladores/tarjetas-controlador');
const {Normalizacion} = require("../herramientas/herramientas");
const {GetLandmarks,AgregarLandmark} = require('../controladores/tarjetaslandmarks-controlador');
const {SensorEstado} = require('../basedatos/tarjeta');


const LANDMARK = {
    nivel : [Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],
    deltay : Number.POSITIVE_INFINITY,
    deltai : Number.POSITIVE_INFINITY,
    landmark : false
}

class LandmarkTarjetas{

    constructor(){
        this.registros = [];
        this.resetprogramacion = [];
    }
    async Reset(nombre){
        return new Promise(async (callback)=>{
            const tarjetasensores = await GetSensores({nombre});
            const sensores = tarjetasensores.map(()=>{
                return LANDMARK;
            });
            let registro = null;
            for(let i=0;i<this.registros.length;i++){
                if(this.registros[i].nombre == nombre)
                    registro = this.registros[i];            
            }        
            if(registro!=null){
                for(let i=0;i<registro.sensores.length && i<sensores.length;i++)
                    registro.sensores[i] = sensores[i];
                callback(registro);
            }
            else{                         
                this.registros.push({nombre,sensores});
                callback({nombre,sensores});
            }                            
        })
    }
    ProgramarReset(nombre){
        const tarjeta = this.resetprogramacion.find((tarjeta)=>nombre==tarjeta);
        if(tarjeta==undefined)
            this.resetprogramacion.push(nombre);
    }

    //GENERAL
    async _PullLandmarks({nombre,landmarks = []}){        
        new Promise(async (callback)=>{
            let registro = null;
            for(let i=0;i<this.registros.length;i++){
                if(this.registros[i].nombre == nombre)
                    registro = this.registros[i];            
            }        
            if(registro!=null){
                for(let i=0;i<registro.sensores.length && i<landmarks.length;i++)
                    registro.sensores[i] =  landmarks[i];
            }
            else{       
                    this.registros.push({
                    nombre : nombre,
                    sensores : landmarks
                });
            }    
            callback(true);
        });            
    }    
    async _Save({nombre,fechadispositivo,fechaservidor}){
        return new Promise(async (callback)=>{
            let guardado = false;
            for(let i=0;i<this.registros.length;i++)
                if(this.registros[i].nombre==nombre){
                    const landmark = {...this.registros[i],fechadispositivo,fechaservidor};                    
                    guardado = true;
                    await AgregarLandmark(landmark);
                }
            callback(guardado);
        });
    }

    //UPDATE
    async _UpdateReset({nombre}){
        return new Promise( async (callback)=>{
            const index = this.resetprogramacion.findIndex((tarjeta)=>tarjeta==nombre);
            if(index <= -1){
                callback(false);
                return;                
            }
            await this.Reset(nombre);
            this.resetprogramacion.splice(index,1); 
            callback(true);
        });        
    }
    async _UpdateLandmarks(paquete,index){        
        return new Promise(async (callback)=>{
            const registro        = await this.GetRegistro(paquete.nombre);
            const tarjetasensores = await GetSensores({nombre : paquete.nombre}) || [];

            const GetConfiguracion = (index)=>{
                for(let i=0;i<tarjetasensores.length;i++)
                    if(tarjetasensores[i].index == index)
                        return tarjetasensores[i];
                return null;
            }  

            const landmarks = registro.sensores.map((sensor,i)=>{
                const configuracion = GetConfiguracion(i);
                const {estado}      = configuracion; 

                if(estado == SensorEstado[0]){
                    
                    const actual       = paquete.sensores[i];
                    const {rango,resolucion}  = configuracion.parametros;

                    const nivelactual  = Normalizacion(actual,rango);    
                    let {nivel:niveles,deltai,landmark} = sensor;                          

                    let nivel = niveles[0]; 
                    if(!Number.isFinite(nivel))
                        nivel = nivelactual - resolucion[1];

                    if(landmark || !Number.isFinite(deltai))
                        deltai = 1;
                    else
                        deltai++;                    

                    const deltay   =  nivelactual - nivel;                                      
                    const landmarkactual = Math.abs(deltay) >= resolucion[1];

                    const nivellandmark = (landmarkactual) ? nivelactual : nivel;

                    return {
                        nivel  : [nivellandmark,nivelactual],
                        deltai,
                        deltay,
                        landmark :landmarkactual
                    };        
                }
                else
                    return LANDMARK;
                
            });

            await this._PullLandmarks({nombre:paquete.nombre,landmarks});   
            callback(true);            
        });              
    }

    async GetRegistro(nombre){        
        return new Promise(async (callback)=>{
            
            let encontrado = false;

            for(let i=0;i<this.registros.length;i++){
                if(this.registros[i].nombre == nombre){
                    encontrado = true;
                    callback(this.registros[i]);                                
                }                    
            }

            if(!encontrado){                
                const landmark = await GetLandmarks({direcciones : [nombre.toString()]});
                
                if(landmark!=null){
                    
                    const registro = landmark.sensores[0].map((s)=>{                          
                        return s.landmark || LANDMARK;
                    });
                    await this._PullLandmarks({nombre,landmarks : registro});
                    
                    for(let i=0;i<this.registros.length;i++){
                        if(this.registros[i].nombre == nombre){
                            encontrado = true;
                            callback(this.registros[i]);                                
                        }                    
                    }

                }        
                else{
                    const registro = await this.Reset(nombre);            
                    callback(registro)
                }                   
            }
            else  
                callback({});
        });

    }
    async Update(paquete,index){
        return new Promise(async (callback)=>{
            await this._UpdateReset(paquete);
            await this._UpdateLandmarks(paquete,index);
            await this._Save(paquete);
            callback(true);
        });                
    }


}

const landmarktarjetas = new LandmarkTarjetas();

const LandmarksStart = async ()=>{
    
}
const LandmarksUpdate = async (paquete,index)=>{    
    return new Promise(async (callback)=>{           
       await landmarktarjetas.Update(paquete,index);       
       callback(true);
    });    
}
const LandmarksLate = async (paquete,index)=>{
    
}

module.exports = {  LandmarksStart,LandmarksUpdate,LandmarksLate,
                    LandmarksTarjetas:landmarktarjetas};