require('dotenv').config();
const bcrypt= require('bcrypt');

const app          = require('./app/app');
const basedatos    = require('./app/basedatos');
const {secuenciador} = require('./app/secuenciador');
const {Empresa} = require('./basedatos/empresa')
const {Elemento } = require('./basedatos/elemento');
const {Proyecto} = require('./basedatos/proyecto');
const {Tarjeta} = require('./basedatos/tarjeta');
const { Usuario } = require('./basedatos/usuario');
const { Log, GenerarToken, IsAlmacenamiento } = require('./herramientas/herramientas');
const { Servicios } = require('./herramientas/servicios');

async function main(){

    await basedatos();
    await secuenciador();
    await app.listen(app.get("PUERTO"));    
    Log("Sesion inicializada : ( ENABLE : "+(process.env.SESION=="true")+")");
    Log("Almacenamiento inicializado : ( ENABLE : "+(IsAlmacenamiento())+")");
    Log("Aplicacion inicializada - localhost:" + app.get("PUERTO"));

}

/*

async function registrarproyecto(){

    const template =  await Proyecto.findById("60a5cbe7837452042c592c90");
    const sensores = template.sensores.map(sensor => {        
        return {
            direccion: sensor.direccion,
            nombre: sensor.nombre,
        };
    });   
    const elementos = template.elementos.map(elemento => {        
        return {
            prioridad: elemento.prioridad,
            elemento: elemento.elemento
        };
    });
    const graficas = template.graficas.map(grafica => {        
        return {
            direcciones: grafica.direcciones,
            nombre: grafica.nombre
        };
    });
    const proyecto = {
        sensores: sensores,
        elementos: elementos,
        graficas: graficas,
        nombre: "Proyecto DEMO",
        tipo : "ProyectoDemo"
    }
    
    const obj = new Proyecto(proyecto);    
    console.log(obj);
    await obj.save();

}

async function registrartarjeta(){

    const template =  await Tarjeta.findById("608ca5ddf1a1f33e1432c37c");
    const sensores = template.sensores.map(sensor => {        
        return {
            index: sensor.index,
            nombre: sensor.nombre,
            alias: sensor.alias,
            unidades: sensor.unidades,
            tipo: sensor.tipo,
            estado: sensor.estado,
            parametros: sensor.parametros
        };
    });
    const tarjeta = {
        sensores: sensores,
        nombre: "000000",
        graficas: [],
    }
    
    const obj = new Tarjeta(tarjeta);    
    console.log(obj);
    await obj.save();

}

async function registrarempresa(){
    
        
    const flogoDesarrollo = {                        
        nombre : "Grupo Flogo",
        planta : "Grupo Flogo - Desarrollo",
        disponibles : -1,
        flogo: true,
        servicios : Servicios,
    }
    const flogoSoporte = {                        
        nombre : "Grupo Flogo",
        planta : "Grupo Flogo - Soporte",
        disponibles : -1,
        flogo: true,
        servicios : Servicios,
    }
    const flogoDemo = {                        
        nombre : "Grupo Flogo",
        planta : "Grupo Flogo - Demostración",
        disponibles : -1,        
        servicios : Servicios,
    }
    let empresa = new Empresa(flogoDesarrollo);
    await empresa.save();
    empresa = new Empresa(flogoSoporte);
    await empresa.save();
    empresa = new Empresa(flogoDemo);
    await empresa.save();
}


async function usuario(){
    const servicios = Servicios;
    
    const template = await Usuario.findById("608c5af58e0b2c2648c02a04");
    
    const pass = await bcrypt.hash("tecnico",parseInt(process.env.SALTS));
    const token = await GenerarToken();

    const usuario = new Usuario({
        nombre : "tecnico",
        correo : "tecnico@correo.com",
        celular : "",
        pass,
        token,
        flogo : false,
        puesto : "Tecnico",
        servicios,
        empresa : template.empresa,
        proyectos : template.proyectos,
        elementos : template.elementos,
        tarjetas : template.tarjetas
    });
    usuario.save();
}
async function actualizar(){

    const base = await Elemento.findById("60a5d20b1ee3b61c9c2bbb0d");
    if(base!=null){

        const motor2 = await Elemento.findById("60a5d20b1ee3b61c9c2bbb0e");
        const motor3 = await Elemento.findById("60a5d20b1ee3b61c9c2bbb0f");

        for(let i=8;i<base.variables.length;i++){
        
            if(motor2!=null)
                motor2.variables.push(base.variables[i]);
            if(motor3!=null)
                motor3.variables.push(base.variables[i]);
        }
        
        await motor2.save();
        await motor3.save();      

    }



}
async function torre(){

    const proyecto = await Proyecto.findById("60a5cbe7837452042c592c90");
    proyecto.variables = [
        {
            index : 0,
            nombre : "Encendido",
            alias  : "ON",
            tipo   : "encendido",
            unidades : "",
            direcciones : ["19686.S3","19686.S4","19686.S5",
                           "19686.S9","19686.S10","19686.S11",
                           "19686.S15","19686.S16","19686.S17"],
            parametros : {
                umbral : 10,
                invertido : false
            }
        }
    ];
    await proyecto.save();

}

async function motor1(){

    const elemento = await Elemento.findById("60a5d20b1ee3b61c9c2bbb0d");
    elemento.variables = [
        {
            index : 0,
            nombre : "Voltaje - Minima",
            alias  : "VMIN",
            tipo : "min",
            unidades : "V",
            direcciones : ["19686.S3","19686.S4","19686.S5"]
        },
        {
            index : 1,
            nombre : "Voltaje - Promedio",
            alias  : "VPROM",
            tipo : "promedio",
            unidades : "V",
            direcciones : ["19686.S3","19686.S4","19686.S5"]
        },
        {
            index : 2,
            nombre : "Voltaje - Maximo",
            alias  : "VMAX",
            tipo : "max",
            unidades : "V",
            direcciones : ["19686.S3","19686.S4","19686.S5"]
        },
        {
            index : 3,
            nombre : "Voltaje - Error",
            alias  : "VERROR",
            tipo : "distancia-max",
            unidades : "V",
            direcciones : ["19686.S3","19686.S4","19686.S5"]
        },
        {
            index : 4,
            nombre : "Amperaje - Minima",
            alias  : "AMIN",
            tipo : "min",
            unidades : "A",
            direcciones : ["19686.S6","19686.S7","19686.S8"]
        },
        {
            index : 5,
            nombre : "Amperaje - Promedio",
            alias  : "APROM",
            tipo : "promedio",
            unidades : "A",
            direcciones : ["19686.S6","19686.S7","19686.S8"]
        },
        {
            index : 6,
            nombre : "Amperaje - Maximo",
            alias  : "AMAX",
            tipo : "max",
            unidades : "A",
            direcciones : ["19686.S6","19686.S7","19686.S8"]
        },
        {
            index : 7,
            nombre : "Amperaje - Error",
            alias  : "AERROR",
            tipo : "distancia-max",
            unidades : "A",
            direcciones : ["19686.S6","19686.S7","19686.S8"]
        },
        {
            index : 8,
            nombre : "Encendido",
            alias  : "ON",
            tipo : "encendido",
            unidades : "",
            direcciones : ["19686.S3","19686.S4","19686.S5"],
            parametros : {umbral : 10,invertido :  false}
        }
    ];
    await elemento.save();

}
async function motor2(){

    const elemento = await Elemento.findById("60a5d20b1ee3b61c9c2bbb0e");
    elemento.variables = [
        {
            index : 0,
            nombre : "Voltaje - Minima",
            alias  : "VMIN",
            tipo : "min",
            unidades : "V",
            direcciones : ["19686.S9","19686.S10","19686.S11"]
        },
        {
            index : 1,
            nombre : "Voltaje - Promedio",
            alias  : "VPROM",
            tipo : "promedio",
            unidades : "V",
            direcciones : ["19686.S9","19686.S10","19686.S11"]
        },
        {
            index : 2,
            nombre : "Voltaje - Maximo",
            alias  : "VMAX",
            tipo : "max",
            unidades : "V",
            direcciones : ["19686.S9","19686.S10","19686.S11"]
        },
        {
            index : 3,
            nombre : "Voltaje - Error",
            alias  : "VERROR",
            tipo : "distancia-max",
            unidades : "V",
            direcciones : ["19686.S9","19686.S10","19686.S11"]
        },
        {
            index : 4,
            nombre : "Amperaje - Minima",
            alias  : "AMIN",
            tipo : "min",
            unidades : "A",
            direcciones : ["19686.S12","19686.S13","19686.S14"]
        },
        {
            index : 5,
            nombre : "Amperaje - Promedio",
            alias  : "APROM",
            tipo : "promedio",
            unidades : "A",
            direcciones : ["19686.S12","19686.S13","19686.S14"]
        },
        {
            index : 6,
            nombre : "Amperaje - Maximo",
            alias  : "AMAX",
            tipo : "max",
            unidades : "A",
            direcciones : ["19686.S12","19686.S13","19686.S14"]
        },
        {
            index : 7,
            nombre : "Amperaje - Error",
            alias  : "AERROR",
            tipo : "distancia-max",
            unidades : "A",
            direcciones : ["19686.S12","19686.S13","19686.S14"]
        },
        {
            index : 8,
            nombre : "Encendido",
            alias  : "ON",
            tipo : "encendido",
            unidades : "",
            direcciones : ["19686.S9","19686.S10","19686.S11"],
            parametros : {umbral : 10,invertido :  false}
        }
    ];
    await elemento.save();

}
async function motor3(){

    const elemento = await Elemento.findById("60a5d20b1ee3b61c9c2bbb0f");
    elemento.variables = [
        {
            index : 0,
            nombre : "Voltaje - Minima",
            alias  : "VMIN",
            tipo : "min",
            unidades : "V",
            direcciones : ["19686.S15","19686.S16","19686.S17"]
        },
        {
            index : 1,
            nombre : "Voltaje - Promedio",
            alias  : "VPROM",
            tipo : "promedio",
            unidades : "V",
            direcciones : ["19686.S15","19686.S16","19686.S17"]
        },
        {
            index : 2,
            nombre : "Voltaje - Maximo",
            alias  : "VMAX",
            tipo : "max",
            unidades : "V",
            direcciones : ["19686.S15","19686.S16","19686.S17"]
        },
        {
            index : 3,
            nombre : "Voltaje - Error",
            alias  : "VERROR",
            tipo : "distancia-max",
            unidades : "V",
            direcciones : ["19686.S15","19686.S16","19686.S17"]
        },
        {
            index : 4,
            nombre : "Amperaje - Minima",
            alias  : "AMIN",
            tipo : "min",
            unidades : "A",
            direcciones : ["19686.S18","19686.S19","19686.S20"]
        },
        {
            index : 5,
            nombre : "Amperaje - Promedio",
            alias  : "APROM",
            tipo : "promedio",
            unidades : "A",
            direcciones : ["19686.S18","19686.S19","19686.S20"]
        },
        {
            index : 6,
            nombre : "Amperaje - Maximo",
            alias  : "AMAX",
            tipo : "max",
            unidades : "A",
            direcciones : ["19686.S18","19686.S19","19686.S20"]
        },
        {
            index : 7,
            nombre : "Amperaje - Error",
            alias  : "AERROR",
            tipo : "distancia-max",
            unidades : "A",
            direcciones : ["19686.S18","19686.S19","19686.S20"]
        },
        {
            index : 8,
            nombre : "Encendido",
            alias  : "ON",
            tipo : "encendido",
            unidades : "",
            direcciones : ["19686.S15","19686.S16","19686.S17"],
            parametros : {umbral : 10,invertido :  false}
        }
    ];
    await elemento.save();

}
async function delta1(){

    const elemento = await Elemento.findById("60a5d20b1ee3b61c9c2bbb10");
    elemento.variables = [
        {
            index : 0,
            nombre : "Presión - Minima",
            alias  : "PMIN",
            tipo : "min",
            unidades : "psi",
            direcciones : ["19686.S21","19686.S22"]
        },
        {
            index : 1,
            nombre : "Presión - Promedio",
            alias  : "PPROM",
            tipo : "promedio",
            unidades : "psi",
            direcciones : ["19686.S21","19686.S22"]
        },
        {
            index : 2,
            nombre : "Presión - Maximo",
            alias  : "PMAX",
            tipo : "max",
            unidades : "psi",
            direcciones : ["19686.S21","19686.S22"]
        },
        {
            index : 3,
            nombre : "Presión - Delta",
            alias  : "PDELTA",
            tipo : "delta",
            unidades : "psi",
            direcciones : ["19686.S21","19686.S22"]
        },
        {
            index : 4,
            nombre : "Presión - Conversion",
            alias  : "PCON",
            tipo : "conversion",
            unidades : "",
            direcciones : ["19686.S21","19686.S22"]
        }
    ];
    await elemento.save();

}
*/

main();

