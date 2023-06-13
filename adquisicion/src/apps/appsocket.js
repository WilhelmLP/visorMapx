const net = require("net");
const {conexion,data,desconexion,error} = require("../controladores/conexion");

const appsocket = net.createServer(function(socket) {	     
    conexion(socket);    
    socket.on("data",(d)=>{
        data(socket,d);
    });
    socket.on("close",()=>{
        desconexion(socket);
    });
    socket.on("error",(e)=>{        
        error(socket,e);
    });
});

module.exports = appsocket;