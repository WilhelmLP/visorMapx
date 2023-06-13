const {GetTarjeta} = require('../controladores/tarjetas-controlador');
const {GetElemento} = require('../controladores/elementos-controlador');
const {GetProyecto} = require('../controladores/proyectos-controlador');
const bcrypt = require('bcrypt')

const GenerarToken = async ()=>{
    return new Promise(async (callback)=>{
        const {GetTokens} = require('../controladores/usuarios-controlador');
        const tokens = await GetTokens();
        const GenerarToken = ()=>{            
            return Math.floor((Math.random() * 999999)).toString();
        };
        let token = GenerarToken();
        while(tokens.includes(token))
            token = GenerarToken();
        callback(token);
    })
}
const GenerarSesion = async ()=>{
    return new Promise(async (callback)=>{
        const fecha = GetDate();
        const sesion = await bcrypt.hash(fecha.getTime().toString(),parseInt(process.env.SALTS));  
        callback(sesion);     
    });
}

const GetTarjetasInterprete = async (direcciones)=>{

    return new Promise(async (callback)=>{

        let tarjetasdirecciones = []; 
        let tarjetas = [];
        
        const GetIndexTarjeta = (nombre)=>{
            for(let i=0;i<tarjetas.length;i++)
                if(nombre == tarjetas[i])
                    return i;
            return -1;
        }
        const AgregarSensor= (nombre,sensores)=>{
            let agregar = true;
            tarjetas.forEach((t)=>{
                if(t == nombre)
                    agregar = false;
            });
            if(agregar)
                tarjetas.push(nombre);
            sensores.forEach((s)=>{
                tarjetasdirecciones.push({tarjeta:GetIndexTarjeta(nombre),index:s});
            });
        }
        
        for(let i=0;i<direcciones.length;i++){
            const data = direcciones[i].trim().split('.'); 
            let vacio = true;
            if(data.length == 1){
                if(data[0].length<=6){
                    const tarjeta = await GetTarjeta({nombre : parseInt(data[0])});            
                    if(tarjeta == null)
                        continue;
                    const sensores = tarjeta.sensores.map((s)=>{
                        return s.index;
                    });      
                    vacio = false;          
                    AgregarSensor(tarjeta.nombre,sensores);                                
                }
            }
            else if(data.length == 2){
                if(data[0].length<=6){
                    if(data[1].toUpperCase().substring(0,1)  == "S"){
                        const tarjeta = await GetTarjeta({nombre : parseInt(data[0])});            
                        if(tarjeta == null)
                            continue;
                        vacio = false;
                        AgregarSensor(tarjeta.nombre,[parseInt(data[1].substring(1))]);   
                    }
                }
            }        
            if(vacio)
                tarjetasdirecciones.push(null);            
        }

        callback( {direcciones: tarjetasdirecciones,tarjetas: tarjetas});

    });
    
}
const GetTarjetasDirecciones = async(direcciones)=>{
    return new Promise(async (callback)=>{
        const interprete = await GetTarjetasInterprete(direcciones);
        if(interprete!=null){            
            const direcciones = interprete.direcciones.map((direccion)=>{
                return interprete.tarjetas[direccion.tarjeta]+".S"+direccion.index;
            });
            callback(direcciones);
        }
        else 
            callback(null);
    });
}
const GetElementosInterprete = async (direcciones)=>{

    return new Promise(async (callback)=>{

        let elementosdirecciones = []; 
        let elementos = [];
        
        const GetIndexElemento = (id)=>{
            for(let i=0;i<elementos.length;i++)
                if(id == elementos[i])
                    return i;
            return -1;
        }
        const AgregarVariable = (id,variables)=>{
            let agregar = true;
            elementos.forEach((t)=>{
                if(t == id)
                    agregar = false;
            });
            if(agregar)
                elementos.push(id);
            variables.forEach((v)=>{
                elementosdirecciones.push({elemento:GetIndexElemento(id),index:v});
            });
        }
        
        for(let i=0;i<direcciones.length;i++){
            const data = direcciones[i].trim().split('.'); 
            let vacio = true;
            if(data.length == 1){
                if(data[0].length > 6){
                    const elemento = await GetElemento({id : data[0]});            
                    if(elemento == null)
                        continue;
                    const variables = elemento.variables.map((v)=>{
                        return v.index;
                    });      
                    vacio = false;          
                    AgregarVariable(elemento._id,variables);                                
                }
            }
            else if(data.length == 2){
                if(data[0].length > 6){
                    if(data[1].toUpperCase().substring(0,1)  == "V"){
                        const elemento = await GetElemento({id : data[0]});            
                        if(elemento == null)
                            continue;
                        vacio = false;
                        AgregarVariable(elemento._id,[data[1].substring(1)]);   
                    }
                }
            }        
            if(vacio)
                elementosdirecciones.push(null);            
        }

        callback( {direcciones: elementosdirecciones,elementos: elementos});

    });
    
}
const GetProyectosInterprete = async (direcciones)=>{

    return new Promise(async (callback)=>{

        let proyectosdirecciones = []; 
        let proyectos = [];
        
        const GetIndexProyecto = (id)=>{
            for(let i=0;i<proyectos.length;i++)
                if(id == proyectos[i])
                    return i;
            return -1;
        }
        const AgregarVariable = (id,variables)=>{
            let agregar = true;
            proyectos.forEach((t)=>{
                if(t == id)
                    agregar = false;
            });
            if(agregar)
                proyectos.push(id);
            variables.forEach((v)=>{
                proyectosdirecciones.push({proyecto:GetIndexProyecto(id),index:v});
            });
        }
        
        for(let i=0;i<direcciones.length;i++){
            const data = direcciones[i].trim().split('.'); 
            let vacio = true;
            if(data.length == 1){
                if(data[0].length > 6){
                    const proyecto = await GetProyecto({id : data[0]});            
                    if(proyecto == null)
                        continue;
                    const variables = proyecto.variables.map((v)=>{
                        return v.index;
                    });      
                    vacio = false;          
                    AgregarVariable(proyecto._id,variables);                                
                }
            }
            else if(data.length == 2){
                if(data[0].length > 6){
                    if(data[1].toUpperCase().substring(0,1)  == "V"){
                        const proyecto = await GetProyecto({id : data[0]});            
                        if(proyecto == null)
                            continue;
                        vacio = false;
                        AgregarVariable(proyecto._id,[data[1].substring(1)]);   
                    }
                }
            }        
            if(vacio)
                proyectosdirecciones.push(null);            
        }

        callback( {direcciones: proyectosdirecciones,proyectos : proyectos});

    });
    
}

const Normalizacion = (valor,rango = [])=>{
    const min = (rango[0] < rango[1])  ? rango[0] : rango[1];
    const max = (rango[0] >= rango[1]) ? rango[0] : rango[1];    
    return (valor - min) / (max - min);
}

const GetDate = ()=>{
    const fecha = new Date();
    if(IsProduccion())
        fecha.setTime(fecha.getTime() + (-5) * 3600 * 1000);
    return fecha;
}
const GetFechaActual = ()=>{
    
    const fecha = GetDate();

    let anio = fecha.getFullYear();
    let mes = (fecha.getMonth()+1);
    let dia = fecha.getDate();    
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();

    anio = anio.toString();
    mes = (mes < 10) ? "0"+mes: mes.toString();
    dia = (dia < 10) ? "0"+dia: dia.toString();

    hora    = (hora < 10) ? "0"+hora : hora.toString();
    minutos = (minutos < 10) ? "0"+minutos : minutos.toString();
    segundos = (segundos < 10) ? "0"+segundos : segundos.toString();

    return anio+"-"+mes+"-"+dia+" "+hora+":"+minutos+":"+segundos;
}
const Log = (mensaje)=>{
    console.log("Servidor ("+GetFechaActual()+") : " + mensaje);
}


const IsProduccion = ()=>{
    return process.env.PRODUCCION == undefined || process.env.PRODUCCION=="true";
}
const IsSecuenciador = ()=>{
    return process.env.SECUENCIADOR == undefined || process.env.SECUENCIADOR=="true";
}
const IsAlmacenamiento = ()=>{
    return process.env.ALMACENAMIENTO == undefined || process.env.ALMACENAMIENTO=="true";
}

module.exports = {
    GetDate,GetFechaActual,
    GetTarjetasInterprete, GetTarjetasDirecciones, GetElementosInterprete, GetProyectosInterprete,
    GenerarToken, GenerarSesion,
    Normalizacion, Log,
    IsProduccion,IsSecuenciador,IsAlmacenamiento
};