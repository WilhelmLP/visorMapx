const {SolicitudSetRegistro,SolicitudAddAlerta} = require('../herramientas/solicitudes');
const { registro, isComandoReceptor, getSensoresIndex } = require('./registro');
const { emisorregistro } = require("./emisor");

const RecepcionTipo = {
    SERVIDOR : 0,
    SOCKET : 1
}

const CrearPaqueteV1 = (trama)=>{
    if(trama==null || trama==undefined)
        return null;
    if(trama.length<=0)
        return null;
    const data = trama.split(',')  
    let sensores = [];    
    for(let i=5;i<data.length;i++)            
        sensores.push(Number.parseFloat(data[i]));
    if(process.env.ADQUISICION_LOG)
        if(process.env.ADQUISICION_LOG=="true")
            console.log({nombre:Number.parseInt(data[1]),fechadispositivo:data[3],sensores});
    return {
        nombre : Number.parseInt(data[1]),
        fechadispositivo : data[3],
        sensores : sensores
    };
}
const CrearPaqueteV2 = (trama)=>{
    if(trama==null || trama==undefined)
        return null;
    if(trama.length<=0)
        return null;
    const data = trama.split('|')  
    if(data[1]!="SD")
        return null;
    
    const nombre  = Number.parseInt(data[0]);
    const tipo = data[2].trim();

    if(tipo.includes('AT.0.0.0') || tipo.includes('AT.1.0.0')){        
        let sensores = []; 
        for(let i=4;i<(data.length-2);i++)            
            sensores.push(Number.parseFloat(data[i]));
        const paquete = {
            nombre,
            fechadispositivo : data[3],
            sensores : sensores            
        };         
        if(process.env.ADQUISICION_LOG)
            if(process.env.ADQUISICION_LOG=="true")
                console.log(paquete);            
        return paquete;
    }
    
    return null; 
}

const registroTarjeta = (trama)=>{
    if(trama==null || trama==undefined)
        return null;
    if(trama.length<=0)
        return null;
    const data = trama.split('|')  
    if(data[1]!="SD")
        return null;
    
    const nombre  = Number.parseInt(data[0]);
    const tipo = data[2].trim();
    registro.pushRegistro({nombre,tipo});
}
const ejecutarComando = async ({trama,socket,comando})=>{
    return new Promise(async (callback)=>{
        if(comando=="SD"){
            const paquete = CrearPaqueteV2(trama); 
            if(paquete!=null){
                await SolicitudSetRegistro(paquete);
                socket.write("OK#\r\n");
                return callback(true);                
            }   
        }
        else if(comando=="++" || comando=="--"){
            const data =trama.split('|'); 
            const nombre = Number.parseInt(data[0]);
            const etiqueta = data[2];
            const alerta = {
                nombre ,
                index : getSensoresIndex(nombre,etiqueta),
                peligrosidad : (comando=="++")?1:-1, 
                valor : Number.parseFloat(data[3])
            }
            await SolicitudAddAlerta(alerta);
            socket.write("OK#\r\n");
            return callback(true);            
        }
        else if(comando=="??="){
            const data =trama.split('|'); 
            const nombre = Number.parseInt(data[0]);
            emisorregistro.pushRespuesta({trama,nombre,socket});
            socket.write("OK#\r\n");
            return callback(true);            
        }          
    });
    
}

const receptor = async ({trama = "", socket, tipo})=>{
    return new Promise(async (callback)=>{        
        if(tipo==RecepcionTipo.SERVIDOR){
            let paquete = CrearPaqueteV1(trama); 
            if(paquete!=null){
                await SolicitudSetRegistro(paquete);
                callback(true);
                return;
            }
        }
        else if(tipo==RecepcionTipo.SOCKET){            
            const data = trama.split('|')          
            const nombre  = Number.parseInt(data[0]);
                        
            registroTarjeta(trama);
            if(!data[1]){
                socket.write("OK#\r\n");
                return callback(true);
            }
            const comando = data[1].trim();            
            if(!isComandoReceptor(nombre,comando))                
                return callback(false);
            ejecutarComando({
                trama,
                socket,
                comando
            });    

        }        
        return callback(false);
    });    
}

module.exports = {receptor,RecepcionTipo};