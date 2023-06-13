const {Schema,model} = require('mongoose');

const SchemaTarjetaBloque = new Schema({
    nombre : {type : Number, required : true},
    folio : {type : String, required : true},
    sensores : [
        {
            basica : {
                valor         : { 
                    min           : {type:Number, default:Number.POSITIVE_INFINITY},
                    promedio      : {type:Number, default:Number.POSITIVE_INFINITY},
                    max           : {type:Number, default:Number.POSITIVE_INFINITY},    
                    desviacion    : [{type:Number, default:Number.POSITIVE_INFINITY}]            
                },
                nivel         : { 
                    min           : {type:Number, default:Number.POSITIVE_INFINITY},
                    promedio      : {type:Number, default:Number.POSITIVE_INFINITY},
                    max           : {type:Number, default:Number.POSITIVE_INFINITY},    
                    desviacion    : [{type:Number, default:Number.POSITIVE_INFINITY}]            
                },                       
                eficiencia    : {type:Number, default:Number.POSITIVE_INFINITY}, 
                paquetes      : {type:Number, default:0}                
            },
            sixsigma:{
                c:{
                    p  : {type:Number, default:Number.POSITIVE_INFINITY},
                    pl : {type:Number, default:Number.POSITIVE_INFINITY},
                    pu : {type:Number, default:Number.POSITIVE_INFINITY},
                    pk : {type:Number, default:Number.POSITIVE_INFINITY},
                    pm : {type:Number, default:Number.POSITIVE_INFINITY},
                    pml : {type:Number, default:Number.POSITIVE_INFINITY},
                    pmu : {type:Number, default:Number.POSITIVE_INFINITY},
                    pmk : {type:Number, default:Number.POSITIVE_INFINITY}
                },                          
                p:{
                    p  : {type:Number, default:Number.POSITIVE_INFINITY},
                    pl : {type:Number, default:Number.POSITIVE_INFINITY},
                    pu : {type:Number, default:Number.POSITIVE_INFINITY},
                    pk : {type:Number, default:Number.POSITIVE_INFINITY},
                    pm : {type:Number, default:Number.POSITIVE_INFINITY},
                    pml : {type:Number, default:Number.POSITIVE_INFINITY},
                    pmu : {type:Number, default:Number.POSITIVE_INFINITY},
                    pmk : {type:Number, default:Number.POSITIVE_INFINITY}
                },
                ppm : {
                    observado : {type:Number, default:Number.POSITIVE_INFINITY},
                    z : {
                        c :{
                            el : {type:Number, default:Number.POSITIVE_INFINITY},
                            eu : {type:Number, default:Number.POSITIVE_INFINITY}
                        },
                        p :{
                            el : {type:Number, default:Number.POSITIVE_INFINITY},
                            eu : {type:Number, default:Number.POSITIVE_INFINITY}
                        }
                    },
                    estimado : [{type:Number, default:Number.POSITIVE_INFINITY}]
                }
            },
            landmarks:{
                valor         : { 
                    min           : {type:Number, default:Number.POSITIVE_INFINITY},
                    promedio      : {type:Number, default:Number.POSITIVE_INFINITY},
                    max           : {type:Number, default:Number.POSITIVE_INFINITY},    
                    desviacion    : [{type:Number, default:Number.POSITIVE_INFINITY}]            
                },
                deltai         : { 
                    min           : {type:Number, default:Number.POSITIVE_INFINITY},
                    promedio      : {type:Number, default:Number.POSITIVE_INFINITY},
                    max           : {type:Number, default:Number.POSITIVE_INFINITY},    
                    desviacion    : [{type:Number, default:Number.POSITIVE_INFINITY}]            
                },
                deltay         : { 
                    min           : {type:Number, default:Number.POSITIVE_INFINITY},
                    promedio      : {type:Number, default:Number.POSITIVE_INFINITY},
                    max           : {type:Number, default:Number.POSITIVE_INFINITY},    
                    desviacion    : [{type:Number, default:Number.POSITIVE_INFINITY}]            
                },
                paquetes : {type:Number, default:0}                
            },
            peligrosidad:{
                valor         : { 
                    min           : {type:Number, default:Number.POSITIVE_INFINITY},
                    promedio      : {type:Number, default:Number.POSITIVE_INFINITY},
                    max           : {type:Number, default:Number.POSITIVE_INFINITY},    
                    desviacion    : [{type:Number, default:Number.POSITIVE_INFINITY}]            
                },              
                tendencia : { 
                    positiva   : {type:Number, default:Number.POSITIVE_INFINITY},
                    negativa   : {type:Number, default:Number.POSITIVE_INFINITY}                    
                },
                paquetes : {type:Number, default:0},
            }
        }
    ] 
},{timestamps:true,versionKey: false});

module.exports = model('tarjetasbloques',SchemaTarjetaBloque);