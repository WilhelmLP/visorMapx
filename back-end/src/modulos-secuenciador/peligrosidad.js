const {GetSensores} = require('../controladores/tarjetas-controlador');
const {Normalizacion} = require("../herramientas/herramientas");
const {GetPeligrosidad,AgregarPeligrosidad} = require('../controladores/tarjetaspeligrosidad-controlador');
const {SensorEstado} = require('../basedatos/tarjeta');

//REQUERIMIENTOS

const {LandmarksTarjetas} = require('./landmarks')


const PELIGROSIDAD = {
    peligrosidad : [Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],
    deltay       : [Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],
    landmark     : false
}

class PeligrosidadTarjetas{

    constructor(){
        this.registros = [];
        this.resetprogramacion = [];
    }

    async Reset(nombre){
        return new Promise(async (callback)=>{
            const tarjetasensores = await GetSensores({nombre});
            const sensores = tarjetasensores.map(()=>{
                return PELIGROSIDAD;
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
    async _PullPeligrosidad({nombre, peligrosidad = []}){        
        new Promise(async (callback)=>{
            let registro = null;
            for(let i=0;i<this.registros.length;i++){
                if(this.registros[i].nombre == nombre)
                    registro = this.registros[i];            
            }        
            if(registro!=null){
                for(let i=0;i<registro.sensores.length && i<peligrosidad.length;i++)
                    registro.sensores[i] =  peligrosidad[i];
            }
            else{       
                    this.registros.push({
                    nombre : nombre,
                    sensores : peligrosidad
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
                    const peligrosidad = {...this.registros[i],fechadispositivo,fechaservidor};
                    guardado = true;                    
                    await AgregarPeligrosidad(peligrosidad);
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
    async _UpdatePeligrosidad(paquete,index){        
        return new Promise(async (callback)=>{
            const registro = await this.GetRegistro(paquete.nombre);
            const tarjetasensores = await GetSensores({nombre : paquete.nombre}) || [];
            const registrolandmark = await LandmarksTarjetas.GetRegistro(paquete.nombre); 

            const GetConfiguracion = (index)=>{
                for(let i=0;i<tarjetasensores.length;i++)
                    if(tarjetasensores[i].index == index)
                        return tarjetasensores[i];
                return null;
            }  
            const GetPeligroActual = (nivel,di,dy,resolucion)=>{

                let peligroi = 0,peligroy = 0,peligro = 0;

                if(dy >= 0) {         
                    if(nivel <= 0)
                        peligroy = 0;
                    else
                        peligroy = nivel;           
                }
                else{
                    if(nivel >= 1)
                        peligroy = 0;
                    else
                        peligroy = 1 - nivel;                            

                }                
                if(nivel >= 1)
                    peligro = 1;
                else if(nivel < 0)
                    peligro = -1;
                else {                         
                    if(di >= resolucion[0])
                        peligroi = 0;
                    else if(di <= 0)
                        peligroi = 1;
                    else
                        peligroi = 1 - di/resolucion[0];     

                    peligro = peligroy * peligroi * dy;  
                }         
                
                return [peligro,peligroy];
               
            }
            const GetPeligroAcumulado = (deltay,deltayactual,peligro,peligroactual,peligroy,ajuste)=>{
                
                if( (Math.sign(deltay) == Math.sign(deltayactual)) && 
                    (Math.sign(peligro) == Math.sign(peligroactual)))
                    peligroactual = (peligro*ajuste + peligroactual) * (1+peligroy);

                if(peligroactual >= 1)
                    peligroactual = 1;
                else if(peligroactual <= -1)
                    peligroactual = -1;
                
                return peligroactual;
            }

            const peligrosidades = registro.sensores.map((sensor,i)=>{
                const configuracion = GetConfiguracion(i);
                const {estado}      = configuracion; 

                if(estado == SensorEstado[0]){
                                        
                    const landmarkpaquete = registrolandmark.sensores[i];                    
                    const {peligrosidad,deltay : deltasy} = sensor;                                        
                    const {resolucion,peligrosidad:filtro,peligrosidadajuste : ajuste}  = configuracion.parametros;
                    const {nivel,deltay: deltayactual,deltai: deltaiactual,landmark} = landmarkpaquete;
                    
                    const [peligroactual,peligroy] = GetPeligroActual(nivel[1],deltaiactual,deltayactual,resolucion);

                    let peligro = peligrosidad[0];
                    let deltay  = deltasy[0];
                    if(!Number.isFinite(peligro))
                        peligro = peligroactual;
                    if(!Number.isFinite(deltay))
                        deltay = 0;
                    if(landmark){                       
                        peligro = GetPeligroAcumulado(deltay,deltayactual,peligro,peligroactual,peligroy,ajuste);                                           
                        deltay  = deltayactual;                        
                    }
                    if(Math.abs(peligro) < filtro)
                        peligro = 0;                     

                    return {                    
                        peligrosidad  : [peligro,peligroactual],
                        deltay : [deltay,deltayactual],
                        landmark  : landmark
                    };        
                }
                else
                    return PELIGROSIDAD;
                
            });

            await this._PullPeligrosidad({nombre:paquete.nombre,peligrosidad: peligrosidades});   
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
                const peligrosidad = await GetPeligrosidad({direcciones : [nombre.toString()]});
                
                if(peligrosidad!=null){
                    
                    const registro = peligrosidad.sensores[0].map((s)=>{                          
                        return s.peligrosidad || PELIGROSIDAD;
                    });
                    await this._PullPeligrosidad({nombre,peligrosidad : registro});
                    
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
            await this._UpdatePeligrosidad(paquete,index);
            await this._Save(paquete);
            callback(true);
        });                
    }


}

const peligrosidadtarjetas = new PeligrosidadTarjetas();

const PeligrosidadStart = async ()=>{
    
}
const PeligrosidadUpdate = async (paquete,index)=>{    
    return new Promise(async (callback)=>{  
       await peligrosidadtarjetas.Update(paquete,index);       
       callback(true);
    });    
}
const PeligrosidadLate = async (paquete,index)=>{
    
}

module.exports = {  PeligrosidadStart,PeligrosidadUpdate,PeligrosidadLate,
                    PeligrosidadTarjetas : peligrosidadtarjetas};