const mongoose = require('mongoose');
const {Alerta} = require('../basedatos/alerta');
const {GetTarjetasDirecciones, IsAlmacenamiento} = require('../herramientas/herramientas');
const {GetUsuario} = require('./usuarios-controlador');
const {Enrutamiento,Respuesta} = require('../herramientas/solicitudes');

const REGISTROS = 200; 

//FUNCIONES

const AgregarAlerta = async (alerta)=>{
    return new Promise(async (callback)=>{

        if(alerta == null)
            callback(false);
        else{

            if(!IsAlmacenamiento()){
                //console.log(alerta);
                callback(true);
                return;
            }

            let cantidad = await Alerta.countDocuments();
            if(cantidad >= REGISTROS){
                const eliminar = await Alerta.findOne();
                await eliminar.deleteOne();
            }

            const log = new Alerta(alerta);
            await log.save();

            callback(true);

        }

    });
}
const GetAlertas = async ({direcciones,usuarioid,token,pendiente = false, vista = false,cantidad})=>{
    return new Promise(async (callback)=>{
        const limite = (cantidad==undefined)?REGISTROS:parseInt(cantidad);
        if(direcciones!=null){
            const _direcciones = await GetTarjetasDirecciones((Array.isArray(direcciones))?direcciones:[direcciones]);
            if(usuarioid != null){
                if(pendiente == vista){
                    const alertas = await Alerta.find({
                        $or:[
                            {pendiente : mongoose.Types.ObjectId(usuarioid),direccion : { $in : _direcciones}},
                            {vista : mongoose.Types.ObjectId(usuarioid),direccion : { $in : _direcciones}}
                        ]                                    
                    }).sort({_id:-1}).limit(limite);
                    callback(alertas.map(alerta => {     
                        return {  
                            _id : alerta._id,
                            direccion : alerta.direccion,
                            nombre: alerta.nombre,
                            alias: alerta.alias,
                            tipo : alerta.tipo,
                            peligrosidad : alerta.peligrosidad,                            
                            pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuarioid)),
                            vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuarioid)),
                            fechaservidor : alerta.fechaservidor
                        } 
                    }));
                }
                else if(pendiente){
                    const alertas = await Alerta.find({                    
                        pendiente : mongoose.Types.ObjectId(usuarioid),
                        direccion : { $in : _direcciones}                                                                            
                    }).sort({_id:-1}).limit(limite);
                    callback(alertas.map(alerta => {     
                        return {  
                            _id : alerta._id,
                            direccion : alerta.direccion,
                            nombre: alerta.nombre,
                            alias: alerta.alias,
                            tipo : alerta.tipo,
                            peligrosidad : alerta.peligrosidad,
                            pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuarioid)),
                            vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuarioid)),
                            fechaservidor : alerta.fechaservidor
                        } 
                    }));
                }
                else if(vista){
                    const alertas = await Alerta.find({                    
                        vista : mongoose.Types.ObjectId(usuarioid),
                        direccion : { $in : _direcciones}                                                                             
                    }).sort({_id:-1}).limit(limite);
                    callback(alertas.map(alerta => {     
                        return {  
                            _id : alerta._id,
                            direccion : alerta.direccion,
                            nombre: alerta.nombre,
                            alias: alerta.alias,
                            tipo : alerta.tipo,
                            peligrosidad : alerta.peligrosidad,
                            pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuarioid)),
                            vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuarioid)),
                            fechaservidor : alerta.fechaservidor
                        } 
                    }));
                }
                else
                    callback(null);
            }
            else if(token!=null){
                const usuario = await GetUsuario({token});
                if(usuario==null)
                    callback(null);
                else{
    
                    if(pendiente == vista){
                        const alertas = await Alerta.find({
                            $or:[
                                {pendiente : mongoose.Types.ObjectId(usuario._id),direccion : { $in : _direcciones}},
                                {vista : mongoose.Types.ObjectId(usuario._id),direccion : { $in : _direcciones}}
                            ]                                    
                        }).sort({_id:-1}).limit(limite);
                        callback(alertas.map(alerta => {     
                            return {  
                                _id : alerta._id,
                                direccion : alerta.direccion,
                                nombre: alerta.nombre,
                                alias: alerta.alias,
                                tipo : alerta.tipo,
                                peligrosidad : alerta.peligrosidad,
                                pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuario._id)),
                                vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuario._id)),
                                fechaservidor : alerta.fechaservidor
                            }                        
                        }));
                    }
                    else if(pendiente){
                        const alertas = await Alerta.find({                    
                            pendiente : mongoose.Types.ObjectId(usuario._id),
                            direccion : { $in : _direcciones}                                                                          
                        }).sort({_id:-1}).limit(limite);
                        callback(alertas.map(alerta => {     
                            return {  
                                _id : alerta._id,
                                direccion : alerta.direccion,
                                tipo : alerta.tipo,
                                nombre: alerta.nombre,
                                alias: alerta.alias,
                                peligrosidad : alerta.peligrosidad,
                                pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuario._id)),
                                vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuario._id)),
                                fechaservidor : alerta.fechaservidor
                            } 
                        }));
                    }
                    else if(vista){
                        const alertas = await Alerta.find({                    
                            vista : mongoose.Types.ObjectId(usuario._id),
                            direccion : { $in : _direcciones}                                                                            
                        }).sort({_id:-1}).limit(limite);
                        callback(alertas.map(alerta => {     
                            return {  
                                _id : alerta._id,
                                direccion : alerta.direccion,
                                nombre: alerta.nombre,
                                alias: alerta.alias,
                                tipo : alerta.tipo,
                                peligrosidad : alerta.peligrosidad,
                                pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuario._id)),
                                vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuario._id)),
                                fechaservidor : alerta.fechaservidor
                            } 
                        }));
                    }
                    else
                        callback(null);
                }            
            }
            else    
                callback(null);           
        }
        else{
            if(usuarioid != null){
                if(pendiente == vista){
                    const alertas = await Alerta.find({
                        $or:[
                            {pendiente : mongoose.Types.ObjectId(usuarioid)},
                            {vista : mongoose.Types.ObjectId(usuarioid)}
                        ]                                    
                    }).sort({_id:-1}).limit(limite);
                    callback(alertas.map(alerta => {     
                        return {  
                            _id : alerta._id,
                            direccion : alerta.direccion,
                            nombre: alerta.nombre,
                            alias: alerta.alias,
                            tipo : alerta.tipo,
                            peligrosidad : alerta.peligrosidad,
                            pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuarioid)),
                            vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuarioid)),
                            fechaservidor : alerta.fechaservidor
                        } 
                    }));
                }
                else if(pendiente){
                    const alertas = await Alerta.find({                    
                        pendiente : mongoose.Types.ObjectId(usuarioid)                                                                                
                    }).sort({_id:-1}).limit(limite);
                    callback(alertas.map(alerta => {     
                        return {  
                            _id : alerta._id,
                            direccion : alerta.direccion,
                            nombre: alerta.nombre,
                            alias: alerta.alias,
                            tipo : alerta.tipo,
                            peligrosidad : alerta.peligrosidad,
                            pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuarioid)),
                            vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuarioid)),
                            fechaservidor : alerta.fechaservidor
                        } 
                    }));
                }
                else if(vista){
                    const alertas = await Alerta.find({                    
                        vista : mongoose.Types.ObjectId(usuarioid)                                                                                
                    }).sort({_id:-1}).limit(limite);
                    callback(alertas.map(alerta => {     
                        return {  
                            _id : alerta._id,
                            direccion : alerta.direccion,
                            nombre: alerta.nombre,
                            alias: alerta.alias,
                            tipo : alerta.tipo,
                            peligrosidad : alerta.peligrosidad,
                            pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuarioid)),
                            vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuarioid)),
                            fechaservidor : alerta.fechaservidor
                        } 
                    }));
                }
                else
                    callback(null);
            }
            else if(token!=null){
                const usuario = await GetUsuario({token});
                if(usuario==null)
                    callback(null);
                else{
    
                    if(pendiente == vista){
                        const alertas = await Alerta.find({
                            $or:[
                                {pendiente : mongoose.Types.ObjectId(usuario._id)},
                                {vista : mongoose.Types.ObjectId(usuario._id)}
                            ]                                    
                        }).sort({_id:-1}).limit(limite);
                        callback(alertas.map(alerta => {     
                            return {  
                                _id : alerta._id,
                                direccion : alerta.direccion,
                                nombre: alerta.nombre,
                                alias: alerta.alias,
                                tipo : alerta.tipo,
                                peligrosidad : alerta.peligrosidad,
                                pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuario._id)),
                                vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuario._id)),
                                fechaservidor : alerta.fechaservidor
                            }                        
                        }));
                    }
                    else if(pendiente){
                        const alertas = await Alerta.find({                    
                            pendiente : mongoose.Types.ObjectId(usuario._id)                                                                                
                        }).sort({_id:-1}).limit(limite);
                        callback(alertas.map(alerta => {     
                            return {  
                                _id : alerta._id,
                                direccion : alerta.direccion,
                                nombre: alerta.nombre,
                                alias: alerta.alias,
                                tipo : alerta.tipo,
                                peligrosidad : alerta.peligrosidad,
                                pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuario._id)),
                                vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuario._id)),
                                fechaservidor : alerta.fechaservidor
                            } 
                        }));
                    }
                    else if(vista){
                        const alertas = await Alerta.find({                    
                            vista : mongoose.Types.ObjectId(usuario._id)                                                                                
                        }).sort({_id:-1}).limit(limite);
                        console.log(alertas);
                        callback(alertas.map(alerta => {     
                            return {  
                                _id : alerta._id,
                                direccion : alerta.direccion,
                                nombre: alerta.nombre,
                                alias: alerta.alias,
                                tipo : alerta.tipo,
                                peligrosidad : alerta.peligrosidad,
                                pendiente : alerta.pendiente.includes(mongoose.Types.ObjectId(usuario._id)),
                                vista   : alerta.vista.includes(mongoose.Types.ObjectId(usuario._id)),
                                fechaservidor : alerta.fechaservidor
                            } 
                        }));
                    }
                    else
                        callback(null);
                }            
            }
            else    
                callback(null);
        }
        
    });
}
const SetVista = async({id,usuarioid,token})=>{
    return new Promise(async (callback)=>{
        const alertas  = await Alerta.find({_id : {$in : id}});        
        if(usuarioid!=undefined){
            let respuesta = true;
            alertas.forEach(async (alerta)=>{
                if(alerta.pendiente.includes(mongoose.Types.ObjectId(usuarioid))){
                    let index = alerta.pendiente.indexOf(mongoose.Types.ObjectId(usuarioid));
                    if(index>-1){
                        alerta.pendiente.slice(index,1);
                        alerta.vista.push(mongoose.Types.ObjectId(usuarioid))
                        await alerta.save();
                        respuesta = respuesta && true;
                    }
                    else
                        respuesta = respuesta && false;
    
                }
                else if(alerta.vista.includes(mongoose.Types.ObjectId(usuarioid)))
                    respuesta = respuesta && true;
                else
                   respuesta = respuesta && false;
            }); 
            callback(respuesta);           
        }
        else if(token != undefined){
            const usuario = await GetUsuario({token});
            if(usuario!=null){
                let respuesta = true;
                alertas.forEach(async (alerta)=>{
                    if(alerta.pendiente.includes(mongoose.Types.ObjectId(usuario._id))){
                        let index = alerta.pendiente.indexOf(mongoose.Types.ObjectId(usuario._id));
                        if(index>-1){
                            alerta.pendiente.splice(index,1);
                            alerta.vista.push(mongoose.Types.ObjectId(usuario._id))
                            await alerta.save();
                            respuesta = respuesta && true;
                        }
                        else
                            respuesta = respuesta && false;
                    }
                    else if(alerta.vista.includes(mongoose.Types.ObjectId(usuario._id)))
                        respuesta = respuesta && true;
                    else
                        respuesta = respuesta && false; 
                });    
                callback(respuesta);                       
            }
            else
                callback(respuesta)
        }
        else
            callback(false);
    });    
}

//FUNCIONES-SOLICITUDES

const SolicitudGetAlertas = async ({ direcciones,usuarioid,token,pendiente = false,vista = false,cantidad})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getalertas';
        if(token == undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(usuarioid != undefined){
                const respuesta = await GetAlertas({direcciones,usuarioid,pendiente,vista,cantidad});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }                             
            else {
                const respuesta = await GetAlertas({direcciones,token,pendiente,vista,cantidad});
                callback(Respuesta(operacion,respuesta,respuesta!=null));            
            }
                
        }        
    });
}
const SolicitudSetVista = async ({id,usuarioid,token})=>{
    return new Promise(async (callback)=>{
        const operacion = 'setvista';
        if(token == undefined || id == undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(usuarioid != undefined){
                const respuesta = await SetVista({id,usuarioid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }                             
            else {
                const respuesta = await SetVista({id,token});
                callback(Respuesta(operacion,respuesta,respuesta!=null));            
            }                
        }        
    });
}

//SOLICITUDES

const SolicitudPost = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion:"getalertas", on:SolicitudGetAlertas}
    ]);        
    res.json(respuesta);
}
const SolicitudPut = async (req,res)=>{
    const respuesta = await Enrutamiento(req,[
        {operacion:"setvista", on:SolicitudSetVista}
    ]);        
    res.json(respuesta);
}
const SolicitudDelete = async (req,res)=>{
    res.json({});
}

module.exports = {
    AgregarAlerta,GetAlertas,
    SolicitudPost,SolicitudPut,SolicitudDelete
};