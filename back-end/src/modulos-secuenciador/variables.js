const {GetElementos} = require('../controladores/elementos-controlador');
const {GetProyectos} = require('../controladores/proyectos-controlador');

const {AgregarPaquete: AgregarPaqueteElemento} = require('../controladores/elementospaquetes-controlador');
const {AgregarPaquete: AgregarPaqueteProyecto} = require('../controladores/proyectospaquetes-controlador');
const {GetTarjetasInterprete} = require('../herramientas/herramientas');

const { VariableEstado: VariableEstadoElemento } = require('../basedatos/elemento');

const mongoose = require('mongoose');

/*
    VARIABLES
*/

const VariableTipo = [ 'promedio',
                       'min',
                       'max',
                       'distancia-min',
                       'distancia-max',
                       'encendido',
                       'conversion',
                       'potencia-activa',
                       'potencia-activa-pro',
                       'potencia-reactiva',
                       'potencia-reactiva-pro',
                       'potencia-aparente',
                       'potencia-aparente-pro',
                       'delta',
                       'conversion',
                       'ganancia',
                    ]; 

const VARIABLE = {
   tipo : "",
   direcciones : [],
   resultado : Number.POSITIVE_INFINITY,
   estado: VariableEstadoElemento[1],
   parametros : null
};

/*
    HERRAMIENTAS
*/

const calcularVariable = ({variable,configuracion,registro = null})=>{
    //TODO: CALCULO DE VARIABLES
    if(variable.estado!=VariableEstadoElemento[0]){
        variable.resultado = Number.POSITIVE_INFINITY;
        return variable;
    }
    if(variable.tipo=="promedio"){
        let promedio = 0;
        variable.direcciones.forEach(({valor})=>{
            if(Number.isFinite(valor))
                promedio += valor/variable.direcciones.length;
        });                        
        variable.resultado = (promedio==0)?Number.POSITIVE_INFINITY:promedio;
    }
    else if(variable.tipo=="min"){
        let min = Number.POSITIVE_INFINITY;
        variable.direcciones.forEach(({valor})=>{
            if(Number.isFinite(valor))
                if(valor < min)
                    min = valor;
        });
        variable.resultado = min;
    }
    else if(variable.tipo=="max"){
        let max = Number.NEGATIVE_INFINITY;
        variable.direcciones.forEach(({valor})=>{
            if(Number.isFinite(valor))
                if(valor > max)
                    max = valor;
        });
        variable.resultado = max;
    }
    else if(variable.tipo=="distancia-min"){
        let min = Number.POSITIVE_INFINITY;
        variable.direcciones.forEach(({valor:valor1})=>{
            variable.direcciones.forEach(({valor:valor2})=>{
                if(Number.isFinite(valor1) && Number.isFinite(valor2)){
                    const distancia = Math.abs(valor2-valor1);
                    if(distancia < min)
                        min = distancia;
                }                                
            }); 
        });
        variable.resultado = min;
    }
    else if(variable.tipo=="distancia-max"){
        let max = Number.NEGATIVE_INFINITY;
        variable.direcciones.forEach(({valor:valor1})=>{
            variable.direcciones.forEach(({valor:valor2})=>{
                if(Number.isFinite(valor1) && Number.isFinite(valor2)){
                    const distancia = Math.abs(valor2-valor1);
                    if(distancia > max)
                        max = distancia;
                }
            }); 
        });
        variable.resultado = max;
    }
    else if(variable.tipo=="encendido"){
        let promedio = 0;
        try{
            const {umbral,invertido} = variable.parametros;                                 
            variable.direcciones.forEach(({valor})=>{
                if(Number.isFinite(valor))
                    promedio += valor/variable.direcciones.length;
            });
            if(promedio!=0){
                const valor = (promedio > umbral)?1:0;
                variable.resultado = (invertido)?1-valor:valor;
            }
            else
                variable.resultado = Number.POSITIVE_INFINITY;
        }
        catch(e){
            variable.resultado = Number.POSITIVE_INFINITY;
        }
    }
    else if(variable.tipo=="potencia-activa"){
        const {fp} = configuracion;                    
        variable.resultado = Math.sqrt(3)*variable.direcciones[0].valor*variable.direcciones[1].valor*fp;                        
    }
    else if(variable.tipo=="potencia-activa-pro"){
        const {fp} = configuracion;             
        const n = parseInt(variable.direcciones.length/2);
        let promedio = 0;
        for(let i=0;i<n;i++)
            promedio += Math.sqrt(3)*variable.direcciones[i*2].valor*variable.direcciones[(i*2)+1].valor*fp/n;                                          
        variable.resultado = (promedio==0)?Number.POSITIVE_INFINITY:promedio;
    }
    else if(variable.tipo=="potencia-reactiva"){
        const {fp} = configuracion;     
        const sinphi = Math.sin( Math.acos(fp) );               
        variable.resultado = Math.sqrt(3)*variable.direcciones[0].valor*variable.direcciones[1].valor*sinphi;                        
    }
    else if(variable.tipo=="potencia-reactiva-pro"){
        const {fp} = configuracion;     
        const sinphi = Math.sin( Math.acos(fp) );               
        const n = parseInt(variable.direcciones.length/2);
        let promedio = 0;
        for(let i=0;i<n;i++)
            promedio += Math.sqrt(3)*variable.direcciones[i*2].valor*variable.direcciones[(i*2)+1].valor*sinphi/n;                                          
        variable.resultado = (promedio==0)?Number.POSITIVE_INFINITY:promedio;                      
    }
    else if(variable.tipo=="potencia-aparente"){            
        variable.resultado = Math.sqrt(3)*variable.direcciones[0].valor*variable.direcciones[1].valor;                        
    }
    else if(variable.tipo=="potencia-aparente-pro"){            
        const n = parseInt(variable.direcciones.length/2);
        let promedio = 0;
        for(let i=0;i<n;i++)
            promedio += Math.sqrt(3)*variable.direcciones[i*2].valor*variable.direcciones[(i*2)+1].valor/n;                                          
        variable.resultado = (promedio==0)?Number.POSITIVE_INFINITY:promedio;                       
    }
    else if(variable.tipo=="delta")                                           
        variable.resultado = (variable.direcciones[0].valor - variable.direcciones[1].valor);                   
    else if(variable.tipo=="conversion")                                           
        variable.resultado = (variable.direcciones[0].valor / variable.direcciones[1].valor)*100;
    else if(variable.tipo=="ganancia")                                           
        variable.resultado = ((variable.direcciones[0].valor / variable.direcciones[1].valor) - 1)*100;

    if((!Number.isFinite(variable.resultado) || Number.isNaN(variable.resultado)) && registro!=null)
        variable.resultado = registro; 
    return variable;
}

/*
    CLASES
*/

class VariablesElementos{
   
    constructor(){
        this.calculo = [];      
        this.registro = [];  
        this.index = -1;
    }
    ResetCalculo(){
        this.calculo = [];        
    }
    Reset(){
        this.ResetCalculo();
    }

    //MUTATOR

    GetRegistro(elementoid){
        for(let i=0;i<this.registro.length;i++)
            if(this.registro[i]._id.toString() == elementoid.toString())
                return this.registro[i];
        return null;
    }
    _AgregarCalculo(elemento){
        if(elemento.variables!=undefined){
            if(elemento.variables.length<=0)
                return;
            const variables = elemento.variables.map((variable)=>{
                const direcciones  = variable.direcciones.map((direccion)=>{
                    return {
                        direccion : direccion,
                        valor : Number.POSITIVE_INFINITY
                    }
                });
                return {
                    ...VARIABLE,
                    tipo : variable.tipo,
                    direcciones : direcciones,
                    estado : variable.estado,
                    parametros : variable.parametros
                };
            });     
            this.calculo.push({
                _id : elemento._id,
                tipo : elemento.tipo,
                configuracion : elemento.configuracion,
                variables : variables
            });
        }
    }
    _AgregarRegistro(registro){
        let agregar = true;
        for(let i=0;i<this.registro.length;i++){                
            if(this.registro[i]._id.toString() == registro._id.toString()){                
                registro.variables = registro.variables.map((variable,index)=>{
                    if(!Number.isFinite(variable.resultado) && this.registro[i].variables[index]!=null)
                        variable.resultado = this.registro[i].variables[index].resultado;
                    return variable;
                });
                this.registro[i] = registro;
                agregar = false;           
            }            
        }
        if(agregar)
            this.registro.push(registro);
    }

    //PRINCIPAL

    async _UpdatePaquete(paquete){
        return new Promise(async (callback)=>{   
            let interpretes = [];         
            for(let i=0;i<this.calculo.length;i++){
                const registro = this.calculo[i];                
                for(let j=0;j<registro.variables.length;j++){
                    const variable    = registro.variables[j];
                    const direcciones = variable.direcciones.map((direccion)=>{
                        return direccion.direccion;
                    });                                       
                    interpretes.push(GetTarjetasInterprete(direcciones));                                       
                }                
            }  
            interpretes = await Promise.all(interpretes);
            let index = 0;
            for(let i=0;i<this.calculo.length;i++){
                const registro = this.calculo[i];                
                for(let j=0;j<registro.variables.length;j++){                    
                    const interprete = interpretes[index++];                      
                    if(!interprete.tarjetas.includes(paquete.nombre))
                        continue;                    
                    const variable    = registro.variables[j];
                    for(let k=0;k<variable.direcciones.length;k++){
                        const direccion = variable.direcciones[k];
                        direccion.valor = paquete.sensores[interprete.direcciones[k].index];
                    }
                }                
            }  
            callback(true);
        });        
    }
    async _Calcular(){
        return new Promise(async (callback)=>{
            for(let r=0;r<this.calculo.length;r++){
                const calculo = this.calculo[r];
                const registro = this.GetRegistro(calculo._id);
                for(let v=0;v<calculo.variables.length;v++){
                    const registroVariable = (registro)?registro.variables[v].resultado:null;
                    calculo.variables[v] = calcularVariable({
                        variable : calculo.variables[v], 
                        configuracion : calculo.configuracion,
                        registro : registroVariable
                    });                                     
                }

                this._AgregarRegistro(calculo);      
            }
            callback(true);
        });
    }
    async _Save({fechaservidor}){
        return new Promise(async (callback)=>{            
            for(let i=0;i<this.registro.length;i++){
                const variables = this.registro[i].variables.map((variable)=>{
                    return variable.resultado;
                });
                const paquete = {
                    elementoid : mongoose.Types.ObjectId(this.registro[i]._id),
                    fechaservidor,
                    variables
                };   
                await AgregarPaqueteElemento(paquete);
            }
            callback(true);
        });
    }

    //GENERAL

    async Update(paquete,index){
        return new Promise(async (callback)=>{
            if(this.index!=index){
                this.ResetCalculo();
                const elementos = await GetElementos();
                for(let i=0;i<elementos.length;i++)
                    this._AgregarCalculo(elementos[i]);
                this.index = index;
            }
            await this._UpdatePaquete(paquete);            
            callback(true);
        });
    }
    async Late(paquete){
        return new Promise(async (callback)=>{            
            await this._Calcular();
            await this._Save(paquete);
            callback(true);
        });
    }

}
class VariablesProyectos{
    constructor(){
        this.calculo = [];      
        this.registro = [];  
        this.index = -1;
    }
    ResetCalculo(){
        this.calculo = [];        
    }
    Reset(){
        this.ResetCalculo();
    }

    //MUTATOR

    GetRegistro(proyectoid){
        for(let i=0;i<this.registro.length;i++)
            if(this.registro[i]._id.toString() == proyectoid.toString())
                return this.registro[i];
    }

    _AgregarCalculo(proyecto){
        if(proyecto.variables!=undefined){
            if(proyecto.variables.length<=0)
                return;
            const variables = proyecto.variables.map((variable)=>{
                const direcciones  = variable.direcciones.map((direccion)=>{
                    return {
                        direccion : direccion,
                        valor : Number.POSITIVE_INFINITY
                    }
                });
                return {
                    ...VARIABLE,
                    tipo : variable.tipo,
                    direcciones : direcciones,
                    estado : variable.estado,
                    parametros : variable.parametros
                };
            });     
            this.calculo.push({
                _id : proyecto._id,
                tipo : proyecto.tipo,
                configuracion : proyecto.configuracion,
                variables : variables
            });
        }
    }
    _AgregarRegistro(registro){
        let agregar = true;
        for(let i=0;i<this.registro.length;i++){
            if(this.registro[i]._id.toString() == registro._id.toString()){
                registro.variables = registro.variables.map((variable,index)=>{
                    if(!Number.isFinite(variable.resultado) && this.registro[i].variables[index]!=null)
                        variable.resultado = this.registro[i].variables[index].resultado;
                    return variable;
                });
                this.registro[i] = registro;
                agregar = false;
            }            
        }
        if(agregar)
            this.registro.push(registro);
    }

    //PRINCIPAL

    async _UpdatePaquete(paquete){
        return new Promise(async (callback)=>{
            let interpretes = [];         
            for(let i=0;i<this.calculo.length;i++){
                const registro = this.calculo[i];                
                for(let j=0;j<registro.variables.length;j++){
                    const variable    = registro.variables[j];
                    const direcciones = variable.direcciones.map((direccion)=>{
                        return direccion.direccion;
                    });                                       
                    interpretes.push(GetTarjetasInterprete(direcciones));                                       
                }                
            }  
            interpretes = await Promise.all(interpretes);
            let index = 0;
            for(let i=0;i<this.calculo.length;i++){
                const registro = this.calculo[i];                
                for(let j=0;j<registro.variables.length;j++){                    
                    const interprete = interpretes[index++];                      
                    if(!interprete.tarjetas.includes(paquete.nombre))
                        continue;                    
                    const variable    = registro.variables[j];
                    for(let k=0;k<variable.direcciones.length;k++){
                        const direccion = variable.direcciones[k];
                        direccion.valor = paquete.sensores[interprete.direcciones[k].index];
                    }
                }                
            }  
            callback(true);
        });        
    }
    async _Calcular(){
        return new Promise(async (callback)=>{
            for(let r=0;r<this.calculo.length;r++){
                const calculo = this.calculo[r];
                const registro = this.GetRegistro(calculo._id);
                for(let v=0;v<calculo.variables.length;v++){                
                    const registroVariable = (registro)?registro.variables[v].resultado:null;
                    calculo.variables[v] = calcularVariable({
                        variable : calculo.variables[v], 
                        configuracion : calculo.configuracion,
                        registro : registroVariable
                    });   
                }    
                this._AgregarRegistro(calculo);
            }
            callback(true);
        });
    }
    async _Save({fechaservidor}){
        return new Promise(async (callback)=>{            
            for(let i=0;i<this.registro.length;i++){
                const variables = this.registro[i].variables.map((variable)=>{
                    return variable.resultado;
                });
                const paquete = {
                    proyectoid : mongoose.Types.ObjectId(this.registro[i]._id),
                    fechaservidor,
                    variables
                };             
                await AgregarPaqueteProyecto(paquete);
            }
            callback(true);
        });
    }

    //GENERAL

    async Update(paquete,index){
        return new Promise(async (callback)=>{
            if(this.index!=index){
                this.Reset();
                const proyectos = await GetProyectos();
                for(let i=0;i<proyectos.length;i++)
                    this._AgregarCalculo(proyectos[i]);
                this.index = index;
            }
            await this._UpdatePaquete(paquete);
            callback(true);
        });
    }
    async Late(paquete){
        return new Promise(async (callback)=>{            
            await this._Calcular();
            await this._Save(paquete);
            callback(true);
        });
    }
}

const variableselementos = new VariablesElementos();
const variablesproyectos = new VariablesProyectos();

/*
    FUNCIONES PRINCIPALES
*/

const VariablesStart = async ()=>{

}
const VariablesUpdate = async (paquete,index)=>{
    return new Promise(async(callback)=>{
        await variableselementos.Update(paquete,index);
        await variablesproyectos.Update(paquete,index);
        callback(true);
    });
}
const VariablesLate = async (paquete,index)=>{
    return new Promise(async(callback)=>{
        await variableselementos.Late(paquete);
        await variablesproyectos.Late(paquete);
        callback(true);
    });
}

module.exports = {
    VariablesStart,VariablesUpdate,VariablesLate,
    VariableTipo
};