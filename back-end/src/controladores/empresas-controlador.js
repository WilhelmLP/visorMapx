const mongoose = require('mongoose');
const {Empresa} = require('../basedatos/empresa')
const {GetUsuario} = require('../controladores/usuarios-controlador');
const {GetProyecto} = require('../controladores/proyectos-controlador');
const {GetTarjeta} = require('../controladores/tarjetas-controlador');
const {Enrutamiento,Respuesta} = require('../herramientas/solicitudes');
const {GetPaquete} = require('../herramientas/servicios');

//FUNCIONES

const GetEmpresa = async ({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token})=>{
    return new Promise(async (callback)=>{
        if(id != null){
            if(Array.isArray(id)){
                const ids = id.map((i)=>{
                    return mongoose.Types.ObjectId(i);
                });
                const empresas = await Empresa.find({_id : {$in : ids}});
                callback(empresas);
            }
            else{
                const empresa = await Empresa.findById(id);
                callback(empresa);
            }
        }
        else if(usuarioid != null){
            if(Array.isArray(usuarioid)){
                const usuarios = await GetUsuario({id : usuarioid});
                let empresas = [];
                for(let i=0;i<usuarios.length;i++){
                    empresa = await Empresa.findOne({usuarios : mongoose.Types.ObjectId(usuarios[i]._id)});
                    empresas.push(empresa);
                }
                callback(empresas);
            }
            else{
                const usuario = await GetUsuario({id : usuarioid});
                const empresa = await Empresa.findOne({usuarios : mongoose.Types.ObjectId(usuario._id)});
                callback(empresa);
            }
        }
        else if(proyectoid != null){
            if(Array.isArray(proyectoid)){
                const proyectos = await GetProyecto({id : proyectoid});
                let empresas = [];
                for(let i=0;i<proyectos.length;i++){
                    empresa = await Empresa.findOne({proyectos : mongoose.Types.ObjectId(proyectos[i]._id)});
                    empresas.push(empresa);
                }
                callback(empresas);
            }
            else{
                const proyecto = await GetProyecto({id : proyectoid});
                if(proyecto!=null){
                    const empresa = await Empresa.findOne({proyectos : mongoose.Types.ObjectId(proyecto._id)});
                    callback(empresa);
                }
                else    
                    callback(null);                
            }
        }
        else if(tarjetaid != null){
            if(Array.isArray(tarjetaid)){
                const tarjetas = await GetTarjeta({id : tarjetaid});
                let empresas = [];
                for(let i=0;i<tarjetas.length;i++){
                    empresa = await Empresa.findOne({tarjetas : mongoose.Types.ObjectId(tarjetas[i]._id)});
                    empresas.push(empresa);
                }
                callback(empresas);
            }
            else{
                const tarjeta = await GetTarjeta({id : tarjetaid});
                const empresa = await Empresa.findOne({tarjetas : mongoose.Types.ObjectId(tarjeta._id)});
                callback(empresa);
            }
        }
        else if(tarjetanombre != null){
            if(Array.isArray(tarjetanombre)){
                const tarjetas = await GetTarjeta({nombre : tarjetanombre});
                let empresas = [];
                for(let i=0;i<tarjetas.length;i++){
                    empresa = await Empresa.findOne({tarjetas : mongoose.Types.ObjectId(tarjetas[i]._id)});
                    empresas.push(empresa);
                }
                callback(empresas);
            }
            else{
                const tarjeta = await GetTarjeta({nombre : tarjetanombre});
                const empresa = await Empresa.findOne({tarjetas : mongoose.Types.ObjectId(tarjeta._id)});
                callback(empresa);
            }
        }       
        else if(token != null){
            const usuario = await GetUsuario({token});
            if(usuario == null)
                callback(null);
            else{
                const empresa = await Empresa.findOne({usuarios : mongoose.Types.ObjectId(usuario._id)});
                if(empresa==null)
                    callback(null);
                else
                    callback(empresa);
            }                        
        }
        else
            callback(null);
    });
}
const GetData = async ({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token})=>{
    return new Promise(async (callback)=>{       
        const empresas = await GetEmpresa({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token});
        if(Array.isArray(empresas)){
            callback(empresas.map((empresa)=>{
                return  { 
                            _id : empresa._id, 
                            nombre : empresa.nombre,
                            planta : empresa.planta,
                            descripcion : empresa.descripcion,
                            disponibles : empresa.disponibles,
                            estado : empresa.estado
                        }                    
            }));
        }
        else{
            const empresa = empresas;
            if(empresa==null)
                callback(null);
            else
                callback({ 
                    _id : empresa._id, 
                    nombre : empresa.nombre,
                    planta : empresa.planta,
                    descripcion : empresa.descripcion,
                    disponibles : empresa.disponibles,
                    estado : empresa.estado
                });
        }            
    });   
}
const GetRecursos = async ({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token})=>{
    return new Promise(async (callback)=>{
            const empresas = await GetEmpresa({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token});
            if(Array.isArray(empresas)){                
                callback(empresas.map((empresa)=>{
                    return  { 
                                disponibles : empresa.disponibles,
                                proyectos : empresa.proyectos, 
                                usuarios  : empresa.usuarios,
                                tarjetas  : empresa.tarjetas                                
                            }                    
                }));
            }
            else{
                const empresa = empresas;
                if(empresa==null)
                    callback(null);
                else
                    callback({ 
                        disponibles : empresa.disponibles,
                        proyectos : empresa.proyectos, 
                        usuarios  : empresa.usuarios,
                        tarjetas  : empresa.tarjetas
                    });
            }        
    });
}
const GetServicios = async ({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token})=>{
    return new Promise(async (callback)=>{
        const empresas = await GetEmpresa({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token});
        if(Array.isArray(empresas)){                
            callback(empresas.map((empresa)=>{
                return  empresa.servicios;                    
            }));
        }
        else{
            const empresa = empresas;
            if(empresa==null)
                callback(null);
            else
                callback(empresa.servicios);
        }        
    });
}
const GetServiciosPaquete = async ({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token})=>{
    return new Promise(async (callback)=>{
        const empresas = await GetEmpresa({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token});
        if(Array.isArray(empresas)){                
            callback(empresas.map((empresa)=>{
                return  GetPaquete(empresa.servicios);                    
            }));
        }
        else{
            const empresa = empresas;
            if(empresa==null)
                callback(null);
            else
                callback(GetPaquete(empresa.servicios));
        }        
    });
}
const GetFlogo = async ({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token})=>{
    return new Promise(async (callback)=>{
        const empresas = await GetEmpresa({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token});
        if(Array.isArray(empresas)){                
            callback(empresas.map((empresa)=>{
                return  empresa.flogo;                    
            }));
        }
        else{
            const empresa = empresas;
            if(empresa==null)
                callback(null);
            else
                callback(empresa.flogo);
        }        
    });
}
const GetUI = async ({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token})=>{
    return new Promise(async (callback)=>{
        const empresas = await GetEmpresa({id,usuarioid,proyectoid,tarjetaid,tarjetanombre,token});
        if(Array.isArray(empresas)){                
            callback(empresas.map((empresa)=>{
                return  empresa.ui;                    
            }));
        }
        else{
            const empresa = empresas;
            if(empresa==null)
                callback(null);
            else
                callback(empresa.ui);
        }        
    });
}

//FUNCIONES-SOLICITUDES

const SolicitudGetEmpresa = async ({token,id,usuarioid,tarjetaid,tarjetanombre,proyectoid})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getempresa';
        if(token == undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const respuesta = await GetEmpresa({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(usuarioid != undefined){
                const respuesta = await GetEmpresa({usuarioid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }    
            else if(tarjetaid != undefined){
                const respuesta = await GetEmpresa({tarjetaid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            } 
            else if(tarjetanombre != undefined){
                const respuesta = await GetEmpresa({tarjetanombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }    
            else if(proyectoid != undefined){
                const respuesta = await GetEmpresa({proyectoid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }                 
            else {
                const respuesta = await GetEmpresa({token});
                callback(Respuesta(operacion,respuesta,respuesta!=null));            
            }
                
        }        
    });
}
const SolicitudGetData = async ({token,id,usuarioid,tarjetaid,tarjetanombre,proyectoid})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getdata';
        if(token == undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const respuesta = await GetData({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(usuarioid != undefined){
                const respuesta = await GetData({usuarioid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(tarjetaid != undefined){
                const respuesta = await GetData({tarjetaid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(tarjetanombre != undefined){
                const respuesta = await GetData({tarjetanombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(proyectoid != undefined){
                const respuesta = await GetData({proyectoid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }                     
            else {
                const respuesta = await GetData({token});
                callback(Respuesta(operacion,respuesta,respuesta!=null));            
            }
                
        }        
    });
}
const SolicitudGetRecursos = async ({token,id,usuarioid,tarjetaid,tarjetanombre,proyectoid})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getrecursos';
        if(token == undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const respuesta = await GetRecursos({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(usuarioid != undefined){
                const respuesta = await GetRecursos({usuarioid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(tarjetaid != undefined){
                const respuesta = await GetRecursos({tarjetaid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(tarjetanombre != undefined){
                const respuesta = await GetRecursos({tarjetanombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(proyectoid != undefined){
                const respuesta = await GetRecursos({proyectoid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }                    
            else {
                const respuesta = await GetRecursos({token});
                callback(Respuesta(operacion,respuesta,respuesta!=null));            
            }
                
        }        
    });
}
const SolicitudGetServicios = async ({token,id,usuarioid,tarjetaid,tarjetanombre,proyectoid})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getservicios';
        if(token == undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const respuesta = await GetServicios({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(usuarioid != undefined){
                const respuesta = await GetServicios({usuarioid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(tarjetaid != undefined){
                const respuesta = await GetServicios({tarjetaid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(tarjetanombre != undefined){
                const respuesta = await GetServicios({tarjetanombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }  
            else if(proyectoid != undefined){
                const respuesta = await GetServicios({proyectoid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }                      
            else {
                const respuesta = await GetServicios({token});
                callback(Respuesta(operacion,respuesta,respuesta!=null));            
            }
                
        }        
    });
}
const SolicitudGetServiciosPaquete = async ({token,id,usuarioid,tarjetaid,tarjetanombre,proyectoid})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getserviciospaquete';
        if(token == undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const respuesta = await GetServiciosPaquete({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(usuarioid != undefined){
                const respuesta = await GetServiciosPaquete({usuarioid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(tarjetaid != undefined){
                const respuesta = await GetServiciosPaquete({tarjetaid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(tarjetanombre != undefined){
                const respuesta = await GetServiciosPaquete({tarjetanombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(proyectoid != undefined){
                const respuesta = await GetServiciosPaquete({proyectoid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }                    
            else {
                const respuesta = await GetServiciosPaquete({token});
                callback(Respuesta(operacion,respuesta,respuesta!=null));            
            }
                
        }        
    });
}
const SolicitudGetFlogo = async ({token,id,usuarioid,tarjetaid,tarjetanombre,proyectoid})=>{
    return new Promise(async (callback)=>{
        const operacion = 'getflogo';
        if(token == undefined)
            callback(Respuesta(operacion,null,false));        
        else{
            if(id != undefined){
                const respuesta = await GetFlogo({id});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }
            else if(usuarioid != undefined){
                const respuesta = await GetFlogo({usuarioid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(tarjetaid != undefined){
                const respuesta = await GetFlogo({tarjetaid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }   
            else if(tarjetanombre != undefined){
                const respuesta = await GetFlogo({tarjetanombre});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }    
            else if(proyectoid != undefined){
                const respuesta = await GetFlogo({proyectoid});
                callback(Respuesta(operacion,respuesta,respuesta!=null));
            }                    
            else {
                const respuesta = await GetFlogo({token});
                callback(Respuesta(operacion,respuesta,respuesta!=null));            
            }
                
        }        
    });
}

//SOLICITUDES

const SolicitudPost = async (req,res)=>{
   const respuesta = await Enrutamiento(req,
        [
            {operacion:'getempresa',on:SolicitudGetEmpresa},            
            {operacion:'getdata',on:SolicitudGetData},
            {operacion:'getrecursos',on:SolicitudGetRecursos},
            {operacion:'getflogo',on:SolicitudGetFlogo},
            {operacion:'getservicios',on:SolicitudGetServicios},
            {operacion:'getserviciospaquete',on:SolicitudGetServiciosPaquete}

        ]
   );
    res.json(respuesta);
}
const SolicitudPut = async (req,res)=>{
   
    res.json({});
}
const SolicitudDelete = async (req,res)=>{
   
   res.json({});
}

module.exports = {GetData,SolicitudPost,SolicitudPut,SolicitudDelete};