const { registro, isComandoEmisor } = require("./registro");
const uniqid = require("uniqid");
const { GetDate } = require("../herramientas/herramientas");
const { SolicitudSetConfiguracion } = require("../herramientas/solicitudes");

const ComandoEtapa = {
    REGISTRADO : 0,
    EMITIDO : 1,
    SINRESPUESTA : 2,
    RECIBIDO : 3        
}
class EmisorRegistro{
    constructor(){
        this.registros = [];
    }
    pushComando({nombre,comando,trama = ""}){
        const id = uniqid();
        const etapa = ComandoEtapa.REGISTRADO;
        const fecha = GetDate();
        if(!isComandoEmisor(nombre,comando))
            return null;
        for(let i=0;i<this.registros.length;i++)
            if( this.registros[i].nombre === nombre &&                 
                this.registros[i].comando === comando &&
                this.registros[i].trama === trama)
            {
                this.registros[i].fecha = fecha;
                return this.registros[i].id;
            }                                       
        this.registros.push({id,nombre,comando,trama,etapa,fecha});               
        return id;
    }
    pushRespuesta({nombre,trama,socket}){
        const configuracion = registro.getRegistro(nombre);    
        const data = trama.split("|");            
        const comando = data[1].substring(0,data[1].length-1);            
        this.registros.forEach(registro => {
            if(registro.nombre == nombre && 
                registro.comando == comando &&
                registro.etapa == ComandoEtapa.EMITIDO){
                registro.etapa = ComandoEtapa.RECIBIDO;
                if(comando == "??"){               
                    const respuesta = configuracion.respuestas.configuracion({nombre,comando,trama});
                    respuesta.id = registro.id;
                    SolicitudSetConfiguracion(respuesta);
                }
            }
        });            
    }
    _clearComandos(){
        this.registros.forEach(registro => {});
        this.registros = this.registros.filter(registro => registro.etapa !== ComandoEtapa.RECIBIDO && registro.etapa != ComandoEtapa.SINRESPUESTA);
    }
    _emitirComando(nombre,socket){
        this.registros.forEach(registro => {
            if(registro.nombre == nombre && 
               registro.etapa == ComandoEtapa.REGISTRADO){
                if(registro.trama.length > 0)
                    socket.write(nombre+"|"+registro.comando+"|"+registro.trama+"\r\n");
                else
                    socket.write(nombre+"|"+registro.comando+"\r\n");
                registro.etapa = ComandoEtapa.EMITIDO;
               }                
        });
    }
    update({nombre,socket}){
        this._clearComandos();
        this._emitirComando(nombre,socket);
    }
}
const emisorregistro = new EmisorRegistro();

const emisor = ({trama, socket})=>{
    if(trama==null || trama==undefined)
        return null;
    if(trama.length<=0)
        return null;
    const data = trama.split('|');
    const nombre  = Number.parseInt(data[0]);
    const configuracion = registro.getRegistro(nombre);    
    if(configuracion)
        emisorregistro.update({nombre,socket});    
}
module.exports = {emisor,emisorregistro};