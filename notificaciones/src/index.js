require('dotenv').config();

const app = require('./apps/app');
const {telegram} = require("./apps/telegram");

const {Log} = require('./herramientas/herramientas');

const main = async()=>{
    const PUERTO = app.get("PUERTO");
    await telegram();
    await app.listen(PUERTO);    
    Log("Servidor inicializado en localhost:"+PUERTO);
}

main();