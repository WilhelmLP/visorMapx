
const comandos = {
    "AT.0.0.0" : {
        recepcion : [
            "SD", // Recepcion de datos sincronos
            "++", // Recepcion de alerta superior
            "--", // Recepcion de alerta inferior
            "??=", // Respuesta de la consulta
            "A?=", //Respuesta de la consulta
            "C*=" //Respuesta de la consulta
        ],
        emision : [
            "??", // Solicitar configuracion
            "A?", // Status de la tarjeta
            "C*" // Configurar la tarjeta   
        ],
    },
    "AT.1.0.0" : {
        recepcion : [
            "SD", // Recepcion de datos sincronos
            "++", // Recepcion de alerta superior
            "--", // Recepcion de alerta inferior
            "??=", // Respuesta de la consulta
            "A?=", //Respuesta de la consulta
            "C*=" //Respuesta de la consulta
        ],
        emision : [
            "??", // Solicitar configuracion
            "A?", // Status de la tarjeta
            "C*" // Configurar la tarjeta   
        ],
    }          
}
const sensores = {
    "0" : [
        "T0_","T1_","T2_",
        "V11","V12","V13","I11","I12","I13",
        "V21","V22","V23","I21","I22","I23",
        "V31","V32","V33","I31","I32","I33",
        "P1_","P2_","DG_","BAT"
    ],
    "1" : [
        "T0_","___","___",
        "PT_5503","PDI_5501","PDI_5500","PT_5500","PT_5501",
        "___","___","___","___","___","___","___","___","___",
        "___","___","___","___","___","___","___","___"
    ],
    "E0" : [
        "T__",
        "V1_","V2_","V3_","I1_","I2_","I3_",        
        "P__"
    ]
}
const respuestas = {
    "E0" : {
        configuracion : ({nombre,comando,trama})=>{
            const data = trama.split("|");            
            const respuesta = {
                nombre,
                configuracion:{
                    sensores : [
                        {
                            rango: [Number.parseFloat(data[2]),Number.parseFloat(data[3])]
                        },
                        {
                            rango: [Number.parseFloat(data[4]),Number.parseFloat(data[5])]
                        },
                        {
                            rango: [Number.parseFloat(data[6]),Number.parseFloat(data[7])]
                        },
                        {
                            rango: [Number.parseFloat(data[8]),Number.parseFloat(data[9])]
                        },
                        {
                            rango: [Number.parseFloat(data[10]),Number.parseFloat(data[11])]
                        },
                        {
                            rango: [Number.parseFloat(data[12]),Number.parseFloat(data[13])]
                        },
                        {
                            rango: [Number.parseFloat(data[14]),Number.parseFloat(data[15])]
                        },
                        {
                            rango: [Number.parseFloat(data[2]),Number.parseFloat(data[3])]
                        }
                    ]
                }
            };
            return respuesta;
        }        
    }
}

const isComandoReceptor = (nombre,comando)=>{
    if(!comando)
        return false;
    const configregistro = registro.getRegistro(nombre);
    if(configregistro){
        const configcomandos = comandos[configregistro.comunicacion];  
        if(configcomandos){            
            for(let i=0;i<configcomandos.recepcion.length;i++)
                if(configcomandos.recepcion[i]===comando)
                    return true;            
        }
        return false;
    }
    return false;
}
const isComandoEmisor = (nombre,comando)=>{
    if(!comando)
        return false;
    const configregistro = registro.getRegistro(nombre);
    if(configregistro){
        const configcomandos = comandos[configregistro.comunicacion];  
        if(configcomandos){
            for(let i=0;i<configcomandos.emision.length;i++){
                if(configcomandos.emision[i]===comando)
                    return true;
            }
        }
        return false;
    }
    return false;
}
const getSensoresIndex = (nombre,etiqueta)=>{
    const configregistro = registro.getRegistro(nombre);
    if(configregistro){
      if(configregistro.sensores){        
        return configregistro.sensores.indexOf(etiqueta);
      }   
    }
    return -1;
}

class Registro{

    constructor(){
        this.registros = [];
    }
    pushRegistro({nombre, tipo}){
        const registro = this.getRegistro(nombre);        
        const [dispositivo,version,comunicacion] = tipo.split(":");        
        const [mayor] = version.split(".");

        if(registro){
            registro.nombre = nombre;
            registro.dispositivo = dispositivo;  
            registro.version = version;  
            registro.comunicacion = comunicacion;
            registro.sensores = sensores[mayor];  
            registro.respuestas = respuestas[mayor];  
        }
        else{
            this.registros.push({
                nombre, dispositivo, version, comunicacion,
                sensores : sensores[mayor],
                respuestas : respuestas[mayor]
            })
        }
    }
    getRegistro(nombre){
        const registro = this.registros.find((registro)=>{
            return registro.nombre == nombre;
        })
        return registro;
    }
};
const registro = new Registro();

module.exports = {registro,isComandoEmisor,isComandoReceptor,getSensoresIndex};