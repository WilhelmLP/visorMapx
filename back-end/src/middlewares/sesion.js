const { GetDate, GenerarSesion} = require("../herramientas/herramientas");
const {Respuesta} = require('../herramientas/solicitudes');

const TIMEOUT = 2*60*1000;
const FILTRO = [    
    {ruta : "/api/usuarios", operacion : "gettoken"},
    {ruta : "/api/usuarios", operacion : "getsesion"},
    {ruta : "/api/usuarios", operacion : "updatesesion"},
    //SOLICITUDES INTERNAS
    {ruta : "/api/registro", operacion : "_setregistro"},
    {ruta : "/api/registro", operacion : "_addalerta"},
    {ruta : "/api/registro", operacion : "_settelegram"},
    {ruta : "/api/registro", operacion : "_settelegramactivo"},
    {ruta : "/api/registro", operacion : "_getcontactos"}
];

class UsuarioSesiones{
    constructor(){
        this.sesiones = []; 
    }
    async CreateSesion({token}){
        return new Promise(async (callback)=>{
            const registrosesion = this.GetSesion({token});
            if(registrosesion==null){
                const sesion = await GenerarSesion();                
                this.sesiones.push({
                    token  : token,
                    sesion : sesion,
                    fecha  : GetDate()
                });  
                callback({sesion,status:true});
            }
            else{
                if(this.IsSesion({token}))
                    callback({sesion:"",status:false});                
                else{
                    const sesion = await GenerarSesion();
                    registrosesion.sesion = sesion;
                    registrosesion.fecha  = GetDate();
                    callback({sesion,status:true});
                }       
            }
        });        
    }
    GetSesion({token,sesion}){    
        for(let i=0;i<this.sesiones.length;i++)
            if( (this.sesiones[i].token == token && token!=undefined) ||
                (this.sesiones[i].sesion == sesion && sesion!=undefined)) 
                return this.sesiones[i];
        return null;
    }    
    UpdateSesion(sesion){
        const registrosesion = this.GetSesion({sesion});
        if(registrosesion==null)
            return false;        
        registrosesion.tiempo = GetDate();
        return true;
    }
    RemoveSesion(token){        
        const registrosesion = this.GetSesion({token});
        if(registrosesion==null)
            return true;
        for(let i=0;i<this.sesiones.length;i++){
            if(this.sesiones[i].token==token){
                this.sesiones.splice(i,1);
                return true;
            }
        }
        return false;
    }
    IsSesion({token,sesion}){        
        const registrosesion = this.GetSesion({token,sesion});
        if(registrosesion == null)
            return false;
        const tiempo = GetDate().getTime() - registrosesion.fecha.getTime();
        return tiempo < TIMEOUT;
    }

}

const usuariossesiones = new UsuarioSesiones();

const IsFiltro = ({ruta,operacion})=>{
    for(let i=0;i<FILTRO.length;i++)
        if( FILTRO[i].ruta==ruta && 
            FILTRO[i].operacion==operacion )
            return true;
    return false;
}
const CreateSesion = async ({token})=>{
    return await usuariossesiones.CreateSesion({token});    
}
const UpdateSesion = async (sesion)=>{
    return await usuariossesiones.UpdateSesion(sesion);    
}
const RemoveSesion = (sesion)=>{
    return usuariossesiones.RemoveSesion(sesion);    
}

const sesion = (req,res,next) => {
    
    if(process.env.SESION=="false" || process.env.SESION==undefined)
        next();
    else{
        const {operacion} = req.body;
        if(operacion==undefined)
            next();
        else{
            const {sesion} = req.cookies;
            if(IsFiltro({ruta : req.originalUrl, operacion}))
                next();
            else if(usuariossesiones.IsSesion({sesion}))
                next();
            else
                res.json(Respuesta("errorsession",false,false));        

        }
    }

}

module.exports = {sesion,CreateSesion, UpdateSesion, RemoveSesion};
