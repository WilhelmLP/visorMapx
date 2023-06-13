const {AgregarEstadistica,GetEstadisticas} = require("../controladores/tarjetasestadisticas-controlador")
const {GetSensores} = require('../controladores/tarjetas-controlador');
const {SensorEstado} = require('../basedatos/tarjeta');
const { Normalizacion, GetDate, Log } = require("../herramientas/herramientas");

const {LandmarksTarjetas} = require('../modulos-secuenciador/landmarks');
const {PeligrosidadTarjetas} = require('../modulos-secuenciador/peligrosidad');

const {BloquesUpdate} = require('../submodulos/bloques');

//TODO: MODULOS DE ESTADISTICA : TEMPLATES
const BASICA = {
    sumatoria: 0,
    actual: Number.POSITIVE_INFINITY,
    min:Number.POSITIVE_INFINITY,
    promedio : Number.POSITIVE_INFINITY,
    max:Number.POSITIVE_INFINITY,
    enrango: 0,
    eficiencia : Number.POSITIVE_INFINITY,    
    nivelsumatoria: 0,    
    nivelactual : Number.POSITIVE_INFINITY,
    nivelmin : Number.POSITIVE_INFINITY,
    nivelpromedio : Number.POSITIVE_INFINITY,
    nivelmax : Number.POSITIVE_INFINITY,
    paquetes: 0,
    estado : SensorEstado[1]
};
const LANDMARKS = {
    sumatoria : 0,
    actual : Number.POSITIVE_INFINITY,
    min:Number.POSITIVE_INFINITY,
    promedio : Number.POSITIVE_INFINITY,
    max:Number.POSITIVE_INFINITY,
    sumatoriadeltai : 0,
    deltai: Number.POSITIVE_INFINITY,
    deltaimin:Number.POSITIVE_INFINITY,
    deltaipromedio : Number.POSITIVE_INFINITY,
    deltaimax:Number.POSITIVE_INFINITY,
    sumatoriadeltay : 0,
    deltay: Number.POSITIVE_INFINITY,
    deltaymin:Number.POSITIVE_INFINITY,
    deltaypromedio : Number.POSITIVE_INFINITY,
    deltaymax:Number.POSITIVE_INFINITY,    
    landmark : false,
    paquetes : 0
}
const PELIGROSIDAD = {
    sumatoria : 0,
    actual : Number.POSITIVE_INFINITY,
    min:Number.POSITIVE_INFINITY,
    promedio : Number.POSITIVE_INFINITY,
    max : Number.POSITIVE_INFINITY,
    tendencia : [0,0],
    paquetes : 0    
}

const calcularEstadisticaBasica = (paquete,valor,rango)=>{
    
    if(paquete==null)
        paquete = {...BASICA}; 

    const actual       = valor;
    const nivelactual  = Normalizacion(actual,rango);
    
    let {sumatoria,min,max,nivelsumatoria,nivelmin,nivelmax,enrango,paquetes} = paquete;                

    sumatoria      += actual;
    nivelsumatoria += nivelactual;
    paquetes++;
    
    if(actual<min || !Number.isFinite(min))
        min = actual;
    if(actual>max  || !Number.isFinite(max))
        max = actual;
    
    if(nivelactual<nivelmin || !Number.isFinite(nivelmin))
        nivelmin = nivelactual;
    if(nivelactual>nivelmax  || !Number.isFinite(nivelmax))
        nivelmax = nivelactual;

    const promedio      = sumatoria / paquetes;                 
    const nivelpromedio = nivelsumatoria / paquetes;                                    

    if(nivelactual>=0 && nivelactual<=1)
        enrango++;
    const eficiencia = enrango / paquetes;

    return {
        ...BASICA,
        sumatoria,
        actual,                
        min,
        promedio,
        max,
        enrango,
        eficiencia,
        paquetes,
        nivelsumatoria,
        nivelactual,
        nivelmin,
        nivelpromedio,
        nivelmax
    };        
    
}

//CLASES
class EstadisticaTarjetas{

    constructor(){
        this.registros = [];        
        this.minutos = GetDate().getMinutes();
        this.resetprogramacion = [];
    }
    async Reset(nombre){
        return new Promise(async (callback)=>{

            const tarjetasensores = await GetSensores({nombre});
            //TODO: MODULOS DE ESTADISTICA : RESET
            const sensores = tarjetasensores.map(()=>{
                return {
                    basica : BASICA,
                    landmarks : LANDMARKS,
                    peligrosidad : PELIGROSIDAD
                };
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

    //BASICA
    async _PullEstadisticaBasica({nombre,basica = []}){        
        new Promise(async (callback)=>{
            let registro = null;
            for(let i=0;i<this.registros.length;i++){
                if(this.registros[i].nombre == nombre)
                    registro = this.registros[i];            
            }        
            if(registro!=null){
                for(let i=0;i<registro.sensores.length && i<basica.length;i++)
                    registro.sensores[i].basica =  basica[i];
            }
            else{         
                const sensores = basica.map((b)=>{
                    return {basica : b}
                });     
                this.registros.push({
                    nombre : nombre,
                    sensores
                });
            }    
            callback(true);
        });            
    }
    //LANDMARKS
    async _PullEstadisticaLandmarks({nombre,landmarks = []}){        
        new Promise(async (callback)=>{
            let registro = null;
            for(let i=0;i<this.registros.length;i++){
                if(this.registros[i].nombre == nombre)
                    registro = this.registros[i];            
            }        
            if(registro!=null){
                for(let i=0;i<registro.sensores.length && i<landmarks.length;i++)
                    registro.sensores[i].landmarks =  landmarks[i];
            }
            else{         
                const sensores = landmarks.map((l)=>{
                    return {landmarks : l}
                });     
                this.registros.push({
                    nombre : nombre,
                    sensores
                });
            }    
            callback(true);
        });            
    }
    //PELIGROSIDAD
    async _PullEstadisticaPeligrosidad({nombre,peligrosidad = []}){        
        new Promise(async (callback)=>{
            let registro = null;
            for(let i=0;i<this.registros.length;i++){
                if(this.registros[i].nombre == nombre)
                    registro = this.registros[i];            
            }        
            if(registro!=null){
                for(let i=0;i<registro.sensores.length && i<peligrosidad.length;i++)
                    registro.sensores[i].peligrosidad =  peligrosidad[i];
            }
            else{         
                const sensores = peligrosidad.map((p)=>{
                    return {peligrosidad : p}
                });     
                this.registros.push({
                    nombre : nombre,
                    sensores
                });
            }    
            callback(true);
        });            
    }

    //GENERAL
    async _GetRegistro(nombre){        

        return new Promise(async (callback)=>{
            
            let encontrado = false;

            for(let i=0;i<this.registros.length;i++){
                if(this.registros[i].nombre == nombre){
                    encontrado = true;
                    callback(this.registros[i]);                                
                }                    
            }

            if(!encontrado){                
                const estadistica = await GetEstadisticas({direcciones : [nombre.toString()]});
                if(estadistica!=null){
                    
                    //TODO: MODULOS DE ESTADISTICA : GETREGISTRO                  
                    const basica = estadistica.sensores[0].map((s)=>{                          
                        return s.basica || BASICA;
                    });
                    const landmarks = estadistica.sensores[0].map((s)=>{                          
                        return s.landmarks || LANDMARKS;
                    });  
                    const peligrosidad = estadistica.sensores[0].map((s)=>{                          
                        return s.peligrosidad || PELIGROSIDAD;
                    });               

                    await this._PullEstadisticaBasica({nombre,basica});
                    await this._PullEstadisticaLandmarks({nombre,landmarks});
                    await this._PullEstadisticaPeligrosidad({nombre,peligrosidad});

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
    async _Save({nombre,fechadispositivo,fechaservidor}){
        return new Promise(async (callback)=>{
            let guardado = false;
            for(let i=0;i<this.registros.length;i++)
                if(this.registros[i].nombre==nombre){
                    const estadistica = {...this.registros[i],fechadispositivo,fechaservidor};
                    guardado = true;
                    await AgregarEstadistica(estadistica);
                }
            callback(guardado);
        });
    }

    //UPDATE
    async _UpdateBasica(paquete,index){        
        return new Promise(async (callback)=>{
            const registro        = await this._GetRegistro(paquete.nombre);                 
            const tarjetasensores = await GetSensores({nombre : paquete.nombre}) || [];


            const GetConfiguracion = (index)=>{
                for(let i=0;i<tarjetasensores.length;i++)
                    if(tarjetasensores[i].index == index)
                        return tarjetasensores[i];
                return null;
            }        

            //TODO: CALCULO DE ESTADISTICA: BASICA

            const basica = registro.sensores.map((sensor,i)=>{

                const configuracion = GetConfiguracion(i);
                const {estado}      = configuracion; 

                if(estado == SensorEstado[0]){                
                    const actual       = paquete.sensores[i];
                    const {rango}      = configuracion.parametros;                    
                    return {
                        ...calcularEstadisticaBasica(sensor.basica,actual,rango),
                        estado
                    };        
                }
                else{
                    return {
                        ...BASICA,
                        estado
                    };
                }
                       
            });

            await this._PullEstadisticaBasica({nombre:paquete.nombre,basica});
            callback(true);
        });              
    }
    async _UpdateLandmarks(paquete,index){        
        return new Promise(async (callback)=>{

            const registro          = await this._GetRegistro(paquete.nombre);                 
            const tarjetasensores   = await GetSensores({nombre : paquete.nombre}) || [];
            const registrolandmark  = await LandmarksTarjetas.GetRegistro(paquete.nombre);

            const GetConfiguracion = (index)=>{
                for(let i=0;i<tarjetasensores.length;i++)
                    if(tarjetasensores[i].index == index)
                        return tarjetasensores[i];
                return null;
            }        

            //TODO: CALCULO DE ESTADISTICA: LANDMARK

            const landmarks = registro.sensores.map((sensor,i)=>{

                const configuracion = GetConfiguracion(i);                
                const {estado}      = configuracion; 

                if(estado == SensorEstado[0]){
                            
                    const landmarkpaquete = registrolandmark.sensores[i];  
                    let {nivel:niveles,deltai,deltay,landmark} = landmarkpaquete;
                    let {sumatoria,min,promedio,max,sumatoriadeltay,deltaymin,deltaypromedio,deltaymax,sumatoriadeltai,deltaimin,deltaipromedio,deltaimax,paquetes} = sensor.landmarks;                                  

                    const nivel = niveles[0];

                    if(landmark || !Number.isFinite(min)){
                        sumatoria += nivel;
                        sumatoriadeltai += deltai;
                        sumatoriadeltay += deltay;
                        paquetes++;                        

                        promedio = sumatoria/paquetes;
                        deltaipromedio = sumatoriadeltai/paquetes;
                        deltaypromedio = sumatoriadeltay/paquetes;

                        if(nivel<min || !Number.isFinite(min))
                            min = nivel;
                        if(nivel>max  || !Number.isFinite(max))
                            max = nivel;

                        if(deltai < deltaimin || !Number.isFinite(deltaimin))
                            deltaimin = deltai;
                        if(deltai > deltaimax  || !Number.isFinite(deltaimax))
                            deltaimax = deltai;

                        if(deltay<deltaymin || !Number.isFinite(deltaymin))
                            deltaymin = deltay;
                        if(deltay>deltaymax  || !Number.isFinite(deltaymax))
                            deltaymax = deltay;

                    }

                    return {
                        sumatoria,
                        actual : nivel, 
                        min,
                        promedio,
                        max,
                        sumatoriadeltay,
                        deltay,
                        deltaymin,   
                        deltaypromedio,                     
                        deltaymax,
                        sumatoriadeltai,
                        deltai,
                        deltaimin,
                        deltaipromedio,
                        deltaimax,
                        landmark,
                        paquetes
                    };        
                }
                else
                    return LANDMARKS;                
                       
            });

            await this._PullEstadisticaLandmarks({nombre:paquete.nombre,landmarks});
            callback(true);
        });              
    }
    async _UpdatePeligrosidad(paquete,index){        
        return new Promise(async (callback)=>{

            const registro              = await this._GetRegistro(paquete.nombre);                 
            const tarjetasensores       = await GetSensores({nombre : paquete.nombre}) || [];
            const registropeligrosidad  = await PeligrosidadTarjetas.GetRegistro(paquete.nombre);

            const GetConfiguracion = (index)=>{
                for(let i=0;i<tarjetasensores.length;i++)
                    if(tarjetasensores[i].index == index)
                        return tarjetasensores[i];
                return null;
            }        

            //TODO: CALCULO DE ESTADISTICA: PELIGROSIDAD

            const peligrosidades = registro.sensores.map((sensor,i)=>{

                const configuracion = GetConfiguracion(i);                
                const {estado}      = configuracion; 

                if(estado == SensorEstado[0]){
                            
                    const peligrosidadpaquete = registropeligrosidad.sensores[i];  
                    let {peligrosidad:peligrosidades,landmark} = peligrosidadpaquete;
                    let {sumatoria,min,promedio,max,tendencia,paquetes} = sensor.peligrosidad;                                  

                    const tendencias = tendencia.slice();
                    const peligrosidad = peligrosidades[0];

                    if(landmark || !Number.isFinite(min)){
                        sumatoria += peligrosidad;                        
                        paquetes++;                        
                        promedio = sumatoria/paquetes;
                        
                        if(peligrosidad<min || !Number.isFinite(min))
                            min = peligrosidad;
                        if(peligrosidad>max  || !Number.isFinite(max))
                            max = peligrosidad;

                        if(peligrosidad < 0)
                            tendencias[0]++;
                        else if(peligrosidad > 0)
                            tendencias[1]++;
                    }                   

                    return {
                        sumatoria,
                        actual : peligrosidad, 
                        min,
                        promedio,
                        max,         
                        tendencia : tendencias,               
                        paquetes
                    };        
                }
                else
                    return PELIGROSIDAD;                

                       
            });

            await this._PullEstadisticaPeligrosidad({nombre:paquete.nombre, peligrosidad : peligrosidades});
            callback(true);
        });              
    }
    async _UpdateRestart({fechaservidor,nombre}){
        return new Promise(async (callback)=>{

            this.minutos = (this.minutos<30)?0:30;                                                
            if(fechaservidor!=undefined){                
                const data = fechaservidor.split(' ');
                if(data[0]!=undefined && data[1]!=undefined){
                    const fecha  = data[0].split('-');
                    const tiempo = data[1].split(':');
                    if(tiempo[1]!=null){
                        const minutos = parseInt(tiempo[1]);
                        const enable1 = (minutos >= 30 && this.minutos==0),
                              enable2 = (minutos < 30 && this.minutos==30);                       
                        const index = this.resetprogramacion.findIndex((tarjeta)=>tarjeta==nombre);                                                
                        if(index > -1){                             
                            this.minutos = (minutos>=30)?30:0;
                            await this.Reset(nombre);                                                          
                            const folio = [fecha[0],fecha[1],fecha[2],tiempo[0],(minutos<30)?0:1].join('');                            
                            BloquesUpdate(nombre,folio);
                            Log("Reset estadisticas : "+nombre+" "+folio);
                            this.resetprogramacion.splice(index,1);                                
                            callback(true);
                            return;
                        }       
                        else if(enable1 || enable2){                                                       
                            Log("Preparando reset : "+nombre);
                            LandmarksTarjetas.ProgramarReset(nombre); 
                            PeligrosidadTarjetas.ProgramarReset(nombre);     
                            this.ProgramarReset(nombre);                                    
                            callback(true);
                            return;
                        }  
                    }
                }
            }
            callback(false);

        });        
    }
    async Update(paquete,index){
        return new Promise(async (callback)=>{
            await this._UpdateRestart(paquete);            
            await Promise.all([this._UpdateBasica(paquete,index),this._UpdateLandmarks(paquete,index),this._UpdatePeligrosidad(paquete,index)]);
            await this._Save(paquete);
            callback(true);
        });        
    }

};

//OBJETOS

const estadisticatarjetas  = new EstadisticaTarjetas();


const EstadisticaStart = async ()=>{

}
const EstadisticaUpdate = async (paquete,index)=>{
    return new Promise(async (callback)=>{     
        await estadisticatarjetas.Update(paquete,index);    
        callback(true);
    });    
}
const EstadisticaLate = async (paquete,index)=>{

}

module.exports = {EstadisticaStart,EstadisticaUpdate,EstadisticaLate};