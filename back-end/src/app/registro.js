const { GetFechaActual } = require("../herramientas/herramientas");
const {GetTarjeta} = require('../controladores/tarjetas-controlador');
const {TarjetaEstado} = require('../basedatos/tarjeta');

class Registro{

    constructor(){
        this.paquetes = [];
    }
    async PullPaquete({nombre,fechadispositivo,sensores = []}){
        return new Promise(async (callback)=>{
            const tarjeta = await GetTarjeta({nombre});
            if(tarjeta==null){
                callback(false);
                return;
            }
            for(let i=0;i<sensores.length && i<tarjeta.sensores.length;i++){
                if(tarjeta.sensores[i].estado!=TarjetaEstado[0])
                    sensores[i] = Number.POSITIVE_INFINITY;
            }
            const paquete = {
                nombre : nombre,
                fechadispositivo : fechadispositivo,
                fechaservidor: GetFechaActual(),
                sensores : sensores
            }        
            for(let i=0;i<this.paquetes.length;i++){
                if(this.paquetes[i].nombre == nombre){
                    this.paquetes[i] = paquete;
                    callback(true);
                    return;
                }           
            }
            this.paquetes.push(paquete);
            callback(true);
        });        
    }
    GetPaquete(nombre){        

        for(let i=0;i<this.paquetes.length;i++){
            if(this.paquetes[i].nombre == nombre)
                return this.paquetes[i];            
        }
        return null;
    }

};
const registro  = new Registro();

module.exports = registro;