const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const {Usuario} = require('../basedatos/usuario');
const {GetPaquete} = require('../herramientas/servicios');
const { GetTarjetasInterprete } = require('../herramientas/herramientas');
const { CreateSesion, UpdateSesion : ActualizarSesion, RemoveSesion} = require('../middlewares/sesion');
const {Respuesta,Enrutamiento} = require('../herramientas/solicitudes');

//FUNCIONES-GENERALES

const GetTokens = async ()=>{
    return new Promise(async (callback)=>{
        const usuarios = await Usuario.find();
        callback(usuarios.map((usuario)=>{
            return usuario.token;
        }));
    });
}
const GetContactos = async ()=>{
    return new Promise(async (callback)=>{
        const usuarios = await Usuario.find();
        callback(usuarios.map((usuario)=>{
            return {
                cel : usuario.cel,
                telegram : usuario.telegram
            };
        }));
    });
}

const GetToken = async ({usuario,pass})=>{
    return new Promise(async (callback)=>{
        if(usuario != undefined && pass != undefined){
            let user = await Usuario.findOne({nombre:usuario});
            if(user == null)
                user = await Usuario.findOne({correo:usuario})
            if(user == null)
                callback(null);
            else{      
                const login = await bcrypt.compare(pass,user.pass);
                if(login)
                    callback(user.token);
                else
                    callback(null);
            }
        }
        else
            callback(null)
    });
}
const GetSesion = async ({token})=>{
    return new Promise(async (callback)=>{
        const sesion = await CreateSesion({token})
        callback(sesion);
    });
}
const GetUsuario = async ({token,id})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const ids = id.map((i)=>{
                    return mongoose.Types.ObjectId(i);
                });
                const usuarios = await Usuario.find({_id : {$in : ids}});                
                callback(usuarios.map((usuario)=>{
                    usuario.pass = undefined;
                    usuario.token = undefined;
                    return usuario;
                }));
            }
            else{
                const usuario = await Usuario.findById(id);
                usuario.pass  = undefined;
                usuario.token = undefined;
                callback(usuario);
            }
        }
        else if(token != null){
            const usuario = await Usuario.findOne({token:token});
            if(usuario!=null){
                usuario.token = undefined;
                usuario.pass = undefined;
            }
            callback(usuario);
        }
        else
            callback(null);
    });
}
const GetData = async({token, id}) => {
    return new Promise(async (callback)=>{
        const usuarios = await GetUsuario({token,id});
        if(Array.isArray(usuarios)){
            callback(usuarios.map((usuario)=>{
                return {
                            _id : usuario._id,
                            nombre:usuario.nombre,
                            correo:usuario.correo,
                            celular:usuario.celular,
                            estado:usuario.estado,
                            puesto:usuario.puesto,
                            empresa:usuario.empresa
                        }  
            }));
        }
        else{
            const usuario = usuarios;
            if(usuario!=null)
                callback({
                    _id     : usuario._id,
                    nombre  : usuario.nombre,
                    correo  : usuario.correo,
                    celular : usuario.celular,
                    estado  : usuario.estado,
                    puesto  : usuario.puesto,
                    empresa : usuario.empresa
                });
            else
                callback(null);
        }            
    });
}
const GetRecursos = async({token, id}) => {
    return new Promise(async (callback)=>{
        const usuarios = await GetUsuario({token,id});
        if(Array.isArray(usuarios)){
            callback(usuarios.map((usuario)=>{
                return {
                            proyectos:usuario.proyectos,
                            elementos:usuario.elementos,
                            tarjetas:usuario.tarjetas,
                        }  
            }));
        }
        else{
            const usuario = usuarios;
            if(usuario!=null)
                callback({
                    proyectos  : usuario.proyectos,
                    elementos  : usuario.elementos,
                    tarjetas   : usuario.tarjetas                        
                });
            else
                callback(null);
        }
                
    });
}
const GetServicios = async({token, id}) => {
    return new Promise(async (callback)=>{
        const usuarios = await GetUsuario({token,id});
        if(Array.isArray(usuarios)){
            callback(usuarios.map((usuario)=>{
                return usuario.servicios;  
            }));
        }
        else{
            const usuario = usuarios;
            if(usuario!=null)
                callback(usuario.servicios);
            else
                callback(null);
        }                
    });
}
const GetServiciosPaquete = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const usuarios = await GetUsuario({token,id});
        if(Array.isArray(usuarios)){
            callback(usuarios.map((usuario)=>{
                return GetPaquete(usuario.servicios);
            }));
        }
        else{
            const usuario = usuarios;
            if(usuario!=null)
                callback(GetPaquete(usuario.servicios));
            else
                callback(null);
        }        
    });
}
const GetFlogo = async({token, id}) => {
    return new Promise(async (callback)=>{
        const usuarios = await GetUsuario({token,id});
        if(Array.isArray(usuarios)){
            callback(usuarios.map((u)=>{
                return u.flogo;  
            }));
        }
        else{
            const usuario = usuarios;
            if(usuario!=null)
                callback(usuario.flogo);
            else
                callback(null);
        }
    });
}
const GetTelegram = async({token, id}) => {
    return new Promise(async (callback)=>{
        const usuarios = await GetUsuario({token,id});
        if(Array.isArray(usuarios)){
            callback(usuarios.map((u)=>{
                return u.telegram;  
            }));
        }
        else{
            const usuario = usuarios;
            if(usuario!=null)
                callback(usuario.telegram);
            else
                callback(null);
        }
    });
}
const GetUsuarioIsTarjetas = async({nombre})=>{
    return new Promise(async(callback)=>{
        const interprete = await GetTarjetasInterprete([nombre.toString()]);
        const usuariosnombre = await Usuario.find({tarjetas : nombre});
        const direcciones = interprete.direcciones.map((direccion)=>{
            return nombre+".S"+direccion.index;
        });
        const usuariosdirecciones = await Usuario.find({tarjetas : {$in : direcciones}});
        callback([...usuariosnombre,...usuariosdirecciones]);
    });
}

const UpdateSesion = async ({sesion})=>{
    return new Promise(async (callback)=>{
        const respuesta = await ActualizarSesion(sesion);
        callback(respuesta);
    });
}
const SetTelegram = async ({celular,telegram})=>{
    return new Promise(async (callback)=>{        
        if(celular!=undefined){            
            const usuario = await Usuario.findOne({celular});
            if(usuario==null)               
                callback(false);            
            else{
                usuario.telegram = telegram;
                await usuario.save();
                callback(true);
            }            
        }
        else 
            callback(null);
    });
}
const SetTelegramActivo = async ({chatid,activo})=>{
    return new Promise(async (callback)=>{        
        if(chatid!=undefined){
            const usuario = await Usuario.findOne({"telegram.chatid" : chatid});
            usuario.telegram.activo = activo;
            await usuario.save();
            callback(true);
        }
        else 
            callback(null);
    });
}

const DeleteSesion = ({token})=>{
    return RemoveSesion(token);    
}

//FUNCIONES-SOLICITUDES

const SolicitudGetToken = async (body)=>{
    return new Promise(async (callback)=>{
        const respuesta = await GetToken(body);
        callback(Respuesta('gettoken',respuesta,respuesta != null))
    });
}
const SolicitudGetSesion = async ({token})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getsesion';
        if(token==undefined)
            callback(Respuesta(operacion,null,false));        
        else{            
            const respuesta = await GetSesion({token});
            callback(Respuesta(operacion,respuesta,respuesta!=null));                        
        }        
    });
}
const SolicitudGetUsuario = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getusuario';
        if(token==undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const usuario = await GetUsuario({id});
                callback(Respuesta(operacion,usuario,usuario!=null));
            }
            else{
                const usuario = await GetUsuario({token});
                callback(Respuesta(operacion,usuario,usuario!=null));
            }            
        }        
    });
}
const SolicitudGetData = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getdata';
        if(token==undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const data = await GetData({id});
                callback(Respuesta(operacion,data,data!=null));
            }
            else{
                const data = await GetData({token});
                callback(Respuesta(operacion,data,data!=null));
            }            
        }        
    });
}
const SolicitudGetRecursos = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getrecursos';
        if(token==undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const recursos = await GetRecursos({id});
                callback(Respuesta(operacion,recursos,recursos!=null));
            }
            else{
                const recursos = await GetRecursos({token});
                callback(Respuesta(operacion,recursos,recursos!=null));
            }            
        }        
    });
}
const SolicitudGetServicios = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getservicios';
        if(token==undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const servicios = await GetServicios({id});
                callback(Respuesta(operacion,servicios,servicios!=null));
            }
            else{
                const servicios = await GetServicios({token});
                callback(Respuesta(operacion,servicios,servicios!=null));
            }            
        }        
    });
}
const SolicitudGetServiciosPaquete = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getserviciospaquete';
        if(token==undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const servicios = await GetServiciosPaquete({id});
                callback(Respuesta(operacion,servicios,servicios!=null));
            }
            else{
                const servicios = await GetServiciosPaquete({token});
                callback(Respuesta(operacion,servicios,servicios!=null));
            }            
        }        
    });
}
const SolicitudGetFlogo = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getflogo';
        if(token==undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const recursos = await GetFlogo({id});
                callback(Respuesta(operacion,recursos,recursos!=null));
            }
            else{
                const recursos = await GetFlogo({token});
                callback(Respuesta(operacion,recursos,recursos!=null));
            }            
        }        
    });
}
const SolicitudGetTelegram = async ({token,id})=>{
    return new Promise(async (callback)=>{
        const operacion = 'gettelegram';
        if(token==undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const telegram = await GetTelegram({id});
                callback(Respuesta(operacion,telegram,telegram!=null));
            }
            else{
                const telegram = await GetTelegram({token});
                callback(Respuesta(operacion,telegram,telegram!=null));
            }            
        }        
    });
}

const _SolicitudGetContactos = async ()=>{
    return new Promise(async (callback)=>{
        const operacion = '_getcontactos';
        const respuesta = await GetContactos();
        callback(Respuesta(operacion,respuesta,respuesta!=null));                                        
    });
}

const SolicitudUpdateSesion = async ({token,sesion})=>{
    return new Promise(async (callback)=>{
        const operacion = 'updatesesion';
        if(token==undefined)
            callback(Respuesta(operacion,null,false));        
        else{            
            const respuesta = await UpdateSesion({sesion});
            callback(Respuesta(operacion,respuesta,respuesta!=null));                        
        }        
    });
}

const _SolicitudSetTelegram = async ({celular,telegram})=>{
    return new Promise(async (callback)=>{
        const operacion = '_settelegram';
        const respuesta = await SetTelegram({celular,telegram});
        callback(Respuesta(operacion,respuesta,respuesta!=null));                                        
    });
}
const _SolicitudSetTelegramActivo = async ({chatid,activo})=>{
    return new Promise(async (callback)=>{
        const operacion = '_setactivo';
        const respuesta = await SetTelegramActivo({chatid,activo});
        callback(Respuesta(operacion,respuesta,respuesta!=null));                                        
    });
}

const SolicitudDeleteSesion = async ({token})=>{
    return new Promise(async (callback)=>{
        const operacion = 'deletesesion';
        if(token==undefined)
            callback(Respuesta(operacion,null,false));        
        else{            
            const respuesta = DeleteSesion({token});
            callback(Respuesta(operacion,respuesta,respuesta!=null));                        
        }        
    });
}
//SOLICITUDES

const SolicitudPost = async (req,res)=>{       

    let respuesta = {};

    const {operacion} = req.body;

    if(operacion === "getsesion"){
        const {token} = req.body;
        respuesta = await SolicitudGetSesion({token});
        if(respuesta!=null){
            if(respuesta.respuesta!=null){    
                if(respuesta.respuesta.status)
                    res.cookie("sesion",respuesta.respuesta.sesion,{httpOnly:true,secure:true,sameSite:'none'}); 
                respuesta.respuesta = respuesta.respuesta.status;
            }
            else
                respuesta.respuesta = false;    
        }
    }
    else{
        respuesta = await Enrutamiento(req,
            [
                {operacion : 'gettoken', on : SolicitudGetToken},
                {operacion : 'getusuario', on : SolicitudGetUsuario},
                {operacion : 'getdata', on : SolicitudGetData},
                {operacion : 'getrecursos', on : SolicitudGetRecursos},
                {operacion : 'getservicios', on : SolicitudGetServicios},
                {operacion : 'getserviciospaquete', on : SolicitudGetServiciosPaquete},
                {operacion : 'getflogo', on : SolicitudGetFlogo},
                {operacion : 'gettelegram', on : SolicitudGetTelegram},
                //OPERACIONES INTERNAS
                {operacion : '_getcontactos', on : _SolicitudGetContactos}
            ]
        ); 
    }
    
    res.json(respuesta);
}
const SolicitudPut = async (req,res)=>{    
    
    let respuesta = {};
    const {operacion} = req.body;

    if(operacion === "updatesesion"){
        const {token}  = req.body;
        const {sesion} = req.cookies;
        respuesta = await SolicitudUpdateSesion({token,sesion});        
    }
    else{
        respuesta = await Enrutamiento(req,
            [
                //OPERACIONES INTERNAS
                {operacion : "_settelegram", on : _SolicitudSetTelegram},
                {operacion : "_settelegramactivo", on : _SolicitudSetTelegramActivo}
            ]    
        ); 
    }

    res.json(respuesta);
}
const SolicitudDelete = async (req,res)=>{
    const respuesta = await Enrutamiento(req,
        [{operacion : 'deletesesion', on: SolicitudDeleteSesion}]    
    ); 
    res.json(respuesta);
}

module.exports = {
    GetUsuario, GetServiciosPaquete, GetUsuarioIsTarjetas, GetTokens,
    SolicitudPost,SolicitudPut,SolicitudDelete
};