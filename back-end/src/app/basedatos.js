const mongoose = require('mongoose');
const { Log } = require('../herramientas/herramientas');

const basedatos = async ()=>{
    return new Promise((callback)=>{

        const uri = process.env.BD || "";

        if(uri===""){
            Log("No se puede conectar la base de datos");
            callback(false);
        }
        else{
            mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})
            mongoose.connection.once("open",async ()=>{
                Log("Conectado a la base de datos");                             
                callback(true);
            }); 
            mongoose.connection.on("error",(error)=>Log(error));
        }

    });
};

module.exports = basedatos;




