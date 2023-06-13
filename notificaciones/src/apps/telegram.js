const { Telegraf } = require('telegraf');
const { Log } = require('../herramientas/herramientas');
const { SolicitudGetContactos, SolicitudSetTelegram, SolicitudSetActivo} = require('../herramientas/solicitudes');

var bot = null;

//MENSAJES

const mensaje = async (ctx)=>{
    const chatid = ctx.message.chat.id;
    const {contact} = ctx.message;    
    
    var mensaje = "";
    if(contact!=undefined){
        const telegram = {
            chatid,
            activo : true
        };
        var {phone_number:celular} = contact;
        
        //FILTRAR EL CELULAR
        if(celular[0] == "+")
            celular = celular.substring(1);
        
        const respuesta = await SolicitudSetTelegram({celular,telegram});
        if(respuesta!=null){
            if(respuesta.status){
                if(respuesta.respuesta)
                    mensaje = "*Se agrego tu contacto a la base de datos*";                
                else
                    mensaje = "*No se acepto tu contacto a la base de datos*";
            }
            else
                mensaje = "*No se obtuvo una respuesta positiva de la base de datos*";
        }
        else{
            mensaje = "*No se pudo contactar con la base de datos.*";
        }
    }
    EnviarMensaje({ctx,mensaje});
}
const start = async (ctx)=>{    
    
    const chatid = ctx.message.chat.id;
    const respuestacontactos = await SolicitudGetContactos(); 
    const contactos = respuestacontactos.respuesta;

    var existe = false;
    for(let i=0;i<contactos.length;i++){
        if(contactos[i].telegram.chatid==chatid)
            existe = true;
    }  
    
    var mensaje = "";

    if(existe){
        
        const respuestaactivo = await SolicitudSetActivo({chatid,activo:true});
        const res = respuestaactivo.respuesta;

        if(res==null)
            mensaje = "*No se pudo hacer contacto con la base de datos.*";        
        else if(res)
            mensaje = "*Se activo su contacto de Telegram.*";
        else
            mensaje = "*No se pudo activar su contacto de Telegram.*";    

    }
    else{
        mensaje = "*-----INICIO-----*\n\n" + 
                  "*Este chat no se encuentra registrado en la base de datos.*\n\n" +
                  "Si tu telefono celular ya se encuentra asignado a tu usuario de MXAP2020, puedes ingresar el comando /registro para agregar tu contacto.\n";                          
    }

    await EnviarMensaje({ctx,mensaje})
}
const stop = async (ctx)=>{    

    const chatid = ctx.message.chat.id;
    const respuestacontactos = await SolicitudGetContactos(); 
    const contactos = respuestacontactos.respuesta;

    var existe = false;
    for(let i=0;i<contactos.length;i++){
        if(contactos[i].telegram.chatid==chatid)
            existe = true;
    }  
    
    var mensaje = "";

    if(existe){
        
        const respuestaactivo = await SolicitudSetActivo({chatid,activo:false});
        const res = respuestaactivo.respuesta;

        if(res==null)
            mensaje = "*No se pudo hacer contacto con la base de datos.*";        
        else if(res)
            mensaje = "*Se desactivo su contacto de Telegram.*";
        else
            mensaje = "*No se pudo desactivar su contacto de Telegram.*";        
    }
    else{
        mensaje = "*-----INICIO-----*\n\n" + 
                  "*Este chat no se encuentra registrado en la base de datos.*\n\n" +
                  "Si tu telefono celular ya se encuentra asignado a tu usuario de MXAP2020, puedes ingresar el comando /registro para agregar tu contacto.\n";                          
    }

    await EnviarMensaje({ctx,mensaje})

}
const registro = async (ctx)=>{    
    const opciones = {
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: '[Entregar contacto]', request_contact : true}],
          ]
        })
    };
    const mensaje = '*-----REGISTRO-----*\n\n' + 
                    'Para registrar su usuario es necesario que entregue su contacto. Para ello da click en "[Entregar contacto]:"\n';                          
    EnviarMensaje({ctx,mensaje,opciones});

}

//TELEGRAM

const telegram = async ()=>{

    const enable = process.env.TELEGRAM==undefined || process.env.TELEGRAM == "true";
    const token  =  process.env.BOT_TOKEN || "";    

    if(enable){

        bot  = new Telegraf(token);    

        bot.start(start);
        bot.command('registro',registro);
        bot.command('stop',stop);
        bot.on('message',mensaje);    

        bot.launch();

    } 

    Log("Servicio de Telegram inicializado ( ENABLE : "+enable+").");

}

//FUNCIONES

const EnviarAlerta = async ({telegram,alerta})=>{
    return new Promise(async(callback)=>{
        const {activo,chatid} = telegram;
        if(chatid=="" || !activo){
            callback(false);
            return;
        }
        const {tipo,direccion,nombre,fecha,peligrosidad,aviso} = alerta;
        const mensaje = "*-----ALERTA-----*" + 
                              "\n\n*Nombre* : " + direccion + " - " + nombre +
                              "\n*Tendencia* : " + (aviso) + " - (" + (parseFloat(peligrosidad).toFixed(4))+")" +
                              "\n*Tipo* : " + tipo + 
                              "\n*Fecha* : " + fecha;                        
        await EnviarMensaje({chatid,mensaje});
        callback(true);
    });
}
const EnviarMensaje = async ({ctx = null,chatid = null,mensaje,opciones = {}})=>{
    return new Promise(async (callback)=>{
        const enable = process.env.TELEGRAM==undefined || process.env.TELEGRAM == "true";
        if(ctx!=null && enable)
            await ctx.reply(mensaje,{...opciones,parse_mode:'Markdown'});
        else if(chatid!=null && enable)
            await bot.telegram.sendMessage(chatid,mensaje,{...opciones,parse_mode:'Markdown'});
        callback(true);
    });
}

module.exports = {telegram,EnviarAlerta};