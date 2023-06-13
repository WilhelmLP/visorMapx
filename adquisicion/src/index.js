require('dotenv').config();
const { Log } = require('./herramientas/herramientas');
const appsocket = require('./apps/appsocket');
const app = require('./apps/app');
const {adquisicion} = require('./apps/adquisicion');

const main = async ()=>{
    const PUERTOSOCKET = process.env.PUERTOSOCKET || 2000;
    const DIRECCION = process.env.DIRECCION || "localhost";

    await appsocket.listen(PUERTOSOCKET, DIRECCION);
    await adquisicion();
    await app.listen(app.get('port'))

    Log("ServidorSocket inicializado en "+DIRECCION+":"+PUERTOSOCKET);    
    Log("Servidor inicializado en "+DIRECCION+":"+app.get('port'));    
}

main();