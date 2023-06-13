const mongoose = require('mongoose');
const {AgregarAlerta} = require('../controladores/alertas-controlador');
const {PeligrosidadTarjetas} = require('./peligrosidad');
const {LandmarksTarjetas} = require('./landmarks');
const {GetSensores, GetTarjeta} = require('../controladores/tarjetas-controlador');
const {SensorEstado} = require('../basedatos/tarjeta');
const {AlertaTipo} = require('../basedatos/alerta');
const { GetUsuarioIsTarjetas, GetUsuario } = require('../controladores/usuarios-controlador');
const { GetTarjetasInterprete, GetFechaActual } = require('../herramientas/herramientas');
const { SolicitudAddAlerta} = require('../herramientas/solicitudes');

const ALERTA = {
    peligrosidad : 0,
    tipo: '',
    pendiente : [],
}

class AlertasTarjetas{

    constructor(){        
        this.registros = [];
    }

    async Reset(nombre){
        return new Promise(async (callback)=>{
            const tarjetasensores = await GetSensores({nombre});
            const sensores = tarjetasensores.map(()=>{
                return ALERTA;
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

    //GENERAL
    async _PullAlertas({nombre,alertas = []}){        
        new Promise(async (callback)=>{
            let registro = null;
            for(let i=0;i<this.registros.length;i++){
                if(this.registros[i].nombre == nombre)
                    registro = this.registros[i];            
            }        
            if(registro!=null){
                for(let i=0;i<registro.sensores.length && i<alertas.length;i++)
                    registro.sensores[i] =  alertas[i];
            }
            else{       
                    this.registros.push({
                    nombre : nombre,
                    sensores : alertas
                });
            }    
            callback(true);
        });            
    }
    async _PullAlertaExterna(alert) {        
        const {pendiente,direccion,fechaservidor:fecha,tipo,peligrosidad,nombre,alias,aviso} = alert;
        const usuarios = await GetUsuario({id:pendiente});
        for(let i = 0; i < usuarios.length; i++) {
            if(usuarios[i].telegram==null)
                continue;
            //TODO: SERVICIO DE ALERTAS III (AIII)            
            if(!usuarios[i].servicios.includes("AIII"))
                continue;
            const {activo,chatid} = usuarios[i].telegram;
            if(activo && chatid!=""){
                
                const alerta = {direccion,nombre,alias,tipo,fecha,peligrosidad,aviso};
                const telegram = usuarios[i].telegram;
                
                //TODO: FILTRO DE ALERTAS(AI y AII)
                if(tipo=="falla" && !usuarios[i].servicios.includes("AI"))
                    continue;
                if(tipo=="tendencia" && !usuarios[i].servicios.includes("AII"))
                    continue;
                await SolicitudAddAlerta({telegram,alerta});

            }
        }
    }

    async _SaveAlerta({nombre,index,peligrosidad,tipo,pendiente,fechaservidor}){
        return new Promise(async (callback)=>{

            const direccion = nombre+".S"+index;

            let sensornombre = "",
                sensoralias  = "";

            const interprete = await GetTarjetasInterprete([direccion]);
            if(interprete!=null)                                
                if(interprete.tarjetas[0]!=null){
                    const tarjeta = await GetTarjeta({nombre:interprete.tarjetas[0]});
                    const sensor = tarjeta.sensores[interprete.direcciones[0].index];
                    if(sensor!=null){
                        sensornombre = sensor.nombre;
                        sensoralias  = sensor.alias; 
                    }
                }                                
            
            let aviso = "";
            if(tipo=="falla" || tipo=="hardware")
                aviso = "La variable se encuentra fuera del rango ("+((peligrosidad>0)?"Alta":"Baja")+")";                  
            else if(tipo=="tendencia")
                aviso = "La variable probablemente saldra del rango ("+((peligrosidad>0)?"Alta":"Baja")+")";
            const alerta = {                
                nombre : sensornombre,
                tipo,
                pendiente,   
                aviso,      
                peligrosidad,      
                alias : sensoralias,                             
                direccion,
                fechaservidor                         
            };         
            this._PullAlertaExterna(alerta);                                                             
            const respuesta = await AgregarAlerta(alerta)
            callback(respuesta);
            
        });
    }
    async _Save({nombre,fechaservidor}){
        return new Promise(async (callback)=>{
            let guardado = false;
            for(let i=0;i<this.registros.length;i++)
                if(this.registros[i].nombre==nombre){
                    const {sensores} = this.registros[i];
                    for(let j=0;j<sensores.length;j++){                    
                       if(sensores[j].tipo != ""){
                            const {peligrosidad,tipo,pendiente} = sensores[j];
                            guardado =  await this._SaveAlerta({
                                nombre,
                                index: j,
                                peligrosidad,
                                tipo, 
                                fechaservidor,
                                pendiente
                            });                            
                        }                              
                    }                  
                }
            callback(guardado);
        });
    }
 
    async PushAlertaHardware({nombre,index,peligrosidad}){
        return new Promise(async (callback)=>{
            
            let encontrado = false;
            const tarjetasensores = await GetSensores({nombre}) || [];            
            for(let i=0;i<tarjetasensores.length;i++)
                if(tarjetasensores[i].index == index){
                    encontrado = true;
                    break;
                }

            if(!encontrado)
                return callback(false);

            const pendiente = [];
            const tipo = "hardware";
            const fechaservidor = GetFechaActual();
            const usuarios = await GetUsuarioIsTarjetas({nombre});  
            if(usuarios!=null){
                usuarios.forEach(usuario=>{                            
                    usuario.tarjetas.forEach( tarjeta => {
                        if(tarjeta == nombre || tarjeta == nombre+".S"+index)
                            pendiente.push(mongoose.Types.ObjectId(usuario._id));
                    })
                });
            }
            this._SaveAlerta({nombre,index,peligrosidad,tipo,pendiente,fechaservidor});            

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
                const registro = await this.Reset(nombre);            
                callback(registro)                            
            }
            else  
                callback({});

        });

    }
    

    //UPDATE

    async _UpdateAlertas(paquete,index){        
        return new Promise(async (callback)=>{
            const registro = await this.GetRegistro(paquete.nombre);
            const registropeligrosidad = await PeligrosidadTarjetas.GetRegistro(paquete.nombre);
            const registrolandmarks    = await LandmarksTarjetas.GetRegistro(paquete.nombre);
            const tarjetasensores = await GetSensores({nombre : paquete.nombre}) || [];

            const GetConfiguracion = (index)=>{
                for(let i=0;i<tarjetasensores.length;i++)
                    if(tarjetasensores[i].index == index)
                        return tarjetasensores[i];
                return null;
            }  

            let usuarios = null;

            let alertas = [];
            for(let i=0;i<registro.sensores.length;i++){
                const configuracion = GetConfiguracion(i);
                const {estado,tipo}      = configuracion; 

                if(estado == SensorEstado[0] && tipo == "sistema"){

                    const {peligrosidad,landmark} = registropeligrosidad.sensores[i]; 
                    const {nivel: niveles}        = registrolandmarks.sensores[i]; 

                    const peligro = peligrosidad[0];
                    const nivel = niveles[0];

                    let alerta = '';
                    let pendiente = [];

                    if(landmark && peligro!=0){
                        if(Math.abs(peligro)>=1 && (nivel<=0 || nivel>=1))
                            alerta = AlertaTipo[0];
                        else
                            alerta = AlertaTipo[1];                        
                        if(usuarios==null)
                            usuarios = await GetUsuarioIsTarjetas({nombre :paquete.nombre});                        
                        if(usuarios!=null){
                            usuarios.forEach(usuario=>{                            
                                usuario.tarjetas.forEach( tarjeta => {
                                    if(tarjeta==paquete.nombre || tarjeta==paquete.nombre+".S"+i)
                                        pendiente.push(mongoose.Types.ObjectId(usuario._id));
                                })
                            });
                        }
                    }
                    
                    alertas.push({
                        peligrosidad  : peligro,
                        tipo : alerta,                        
                        pendiente,                        
                    });        
                }
                else
                    alertas.push(ALERTA);
                
            }

            await this._PullAlertas({nombre:paquete.nombre,alertas});   
            callback(true);            
        });              
    }
    async Update(paquete,index){
        return new Promise(async (callback)=>{
            await this._UpdateAlertas(paquete,index);
            await this._Save(paquete);
            callback(true);
        });                
    }


}

const alertastarjetas = new AlertasTarjetas();

//FUNCIONES

const AlertasStart = async ()=>{


}
const AlertasUpdate = async (paquete,index)=>{
    return new Promise(async (callback)=>{
        await alertastarjetas.Update(paquete,index);        
        callback(true);
    });    
}
const AlertasLate = async (paquete,index)=>{



}


module.exports = {
    alertastarjetas,
    AlertasStart,AlertasUpdate,AlertasLate
};