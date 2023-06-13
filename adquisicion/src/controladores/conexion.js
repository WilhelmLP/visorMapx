const { receptor, RecepcionTipo} = require('../apps/receptor');
const { emisor } = require('../apps/emisor');
const { Log } = require('../herramientas/herramientas');

const conexion = (socket)=>{
    
    Log("Conexión "+socket.remoteAddress+":"+socket.remotePort+" - "+socket.remoteFamily);
}
const data = (socket,data)=>{
    Log("Data: ["+data+"]");
    receptor({trama:data.toString().trim(),tipo:RecepcionTipo.SOCKET,socket})    
    emisor({trama:data.toString().trim(),socket});    
}
const desconexion = (socket)=>{
    Log("Desconexión "+socket.remoteAddress+":"+socket.remotePort+" - "+socket.remoteFamily);
}
const error = (socket,error)=>{
    Log("Error: "+error);    
}

module.exports = {conexion,data,desconexion,error}; 