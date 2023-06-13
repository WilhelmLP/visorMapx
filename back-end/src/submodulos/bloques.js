var ztable = require('ztable');
const { GetTarjeta } = require("../controladores/tarjetas-controlador");
const { AgregarBloque } = require("../controladores/tarjetasbloques-controlador");
const { GetBloque } = require("../controladores/tarjetasestadisticas-controlador");

const BloquesUpdate = async (nombre,folio)=>{
    
    const [estadisticas,tarjeta] = await Promise.all([GetBloque({nombre,limite:60}),GetTarjeta({nombre})]);

    if(estadisticas!=null){            
        const bloque = {
            nombre,
            folio,            
            sensores : []
        };
        const n = estadisticas.length;
        for(let i=0;i<estadisticas.length;i++)
            estadisticas[i].sensores.forEach((sensor,j)=>{
                if(i == 0){
                    bloque.sensores.push({
                        basica:{
                            valor : {
                                min:sensor.basica.actual,
                                promedio:sensor.basica.actual/n,
                                max:sensor.basica.actual,
                                desviacion:[ Number.POSITIVE_INFINITY,
                                             Number.POSITIVE_INFINITY ]
                            },
                            nivel : {
                                min:sensor.basica.nivelactual,
                                promedio:sensor.basica.nivelactual/n,
                                max:sensor.basica.nivelactual,
                                desviacion:[ Number.POSITIVE_INFINITY, 
                                             Number.POSITIVE_INFINITY ]
                            },
                            eficiencia : (sensor.basica.nivelactual>=0 && sensor.basica.nivelactual<=1)?1/n:0,
                            paquetes : 1
                        },
                        sixsigma:{
                            c:{
                                p   : Number.POSITIVE_INFINITY,
                                pl  : Number.POSITIVE_INFINITY,
                                pu  : Number.POSITIVE_INFINITY,
                                pk  : Number.POSITIVE_INFINITY,
                                pm  : Number.POSITIVE_INFINITY,
                                pml : Number.POSITIVE_INFINITY,
                                pmu : Number.POSITIVE_INFINITY,
                                pmk : Number.POSITIVE_INFINITY
                            },                          
                            p:{
                                p   : Number.POSITIVE_INFINITY,
                                pl  : Number.POSITIVE_INFINITY,
                                pu  : Number.POSITIVE_INFINITY,
                                pk  : Number.POSITIVE_INFINITY,
                                pm  : Number.POSITIVE_INFINITY,
                                pml : Number.POSITIVE_INFINITY,
                                pmu : Number.POSITIVE_INFINITY,
                                pmk : Number.POSITIVE_INFINITY
                            },
                            ppm : {
                                observado : Number.POSITIVE_INFINITY,
                                z : {
                                    c :{
                                        el : Number.POSITIVE_INFINITY,
                                        eu : Number.POSITIVE_INFINITY,
                                    },
                                    p :{
                                        el : Number.POSITIVE_INFINITY,
                                        eu : Number.POSITIVE_INFINITY,
                                    }
                                },
                                estimado : [ Number.POSITIVE_INFINITY,
                                             Number.POSITIVE_INFINITY ]
                            }
                        },
                        landmarks:{
                            valor : {
                                min:sensor.landmarks.actual,
                                promedio:sensor.landmarks.actual/n,
                                max:sensor.landmarks.actual,
                                desviacion:[ Number.POSITIVE_INFINITY, 
                                             Number.POSITIVE_INFINITY ]
                            },
                            deltai : {
                                min:sensor.landmarks.deltai,
                                promedio:sensor.landmarks.deltai/n,
                                max:sensor.landmarks.deltai,
                                desviacion:[ Number.POSITIVE_INFINITY, 
                                             Number.POSITIVE_INFINITY ]
                            },
                            deltay : {
                                min:sensor.landmarks.deltay,
                                promedio:sensor.landmarks.deltay/n,
                                max:sensor.landmarks.deltay,
                                desviacion:[ Number.POSITIVE_INFINITY, 
                                             Number.POSITIVE_INFINITY ]
                            },
                            paquetes: (sensor.landmarks.landmark)?1:0
                        },
                        peligrosidad:{
                            valor : {
                                min:sensor.peligrosidad.actual,
                                promedio:sensor.peligrosidad.actual/n,
                                max:sensor.peligrosidad.actual,
                                desviacion:[ Number.POSITIVE_INFINITY, 
                                             Number.POSITIVE_INFINITY ]
                            },                                
                            tendencia : {
                                positiva:(sensor.landmarks.landmark && sensor.peligrosidad.actual>0)?1:0,
                                negativa:(sensor.landmarks.landmark && sensor.peligrosidad.actual<0)?1:0
                            },
                            paquetes: 0
                        }
                    });                  
                }
                else{
                    
                    let {valor,nivel,eficiencia,paquetes} = bloque.sensores[j].basica;
                    let {valor:landmarkvalor,deltai,deltay,paquetes:landmarkpaquetes} = bloque.sensores[j].landmarks;
                    let {valor:peligrosidadvalor,tendencia,paquetes:peligrosidadpaquetes} = bloque.sensores[j].peligrosidad;                    

                    //GENERAL
                    paquetes++;
                    valor.promedio += sensor.basica.actual/n;
                    if(sensor.basica.actual < valor.min)
                        valor.min = sensor.basica.actual;
                    if(sensor.basica.actual > valor.max)
                        valor.max = sensor.basica.actual;
                    nivel.promedio += sensor.basica.nivelactual/n;
                    if(sensor.basica.nivelactual < nivel.min)
                        nivel.min = sensor.basica.nivelactual;
                    if(sensor.basica.nivelactual > nivel.max)
                        nivel.max = sensor.basica.nivelactual;
                    eficiencia += (sensor.basica.nivelactual>=0 && sensor.basica.nivelactual<=1)?1/n:0;

                    //LANDMARKS
                    landmarkvalor.promedio += sensor.landmarks.actual/n;
                    if(sensor.landmarks.actual < landmarkvalor.min)
                        landmarkvalor.min = sensor.landmarks.actual;
                    if(sensor.landmarks.actual > landmarkvalor.max)
                        landmarkvalor.max = sensor.landmarks.actual;                            
                    deltai.promedio += sensor.landmarks.deltai/n;
                    if(sensor.landmarks.deltai < deltai.min)
                        deltai.min = sensor.landmarks.deltai;
                    if(sensor.landmarks.deltai > deltai.max)
                        deltai.max = sensor.landmarks.deltai;
                    deltay.promedio += sensor.landmarks.deltay/n;
                    if(sensor.landmarks.deltay < deltay.min)
                        deltay.min = sensor.landmarks.deltay;
                    if(sensor.landmarks.deltay > deltay.max)
                        deltay.max = sensor.landmarks.deltay;
                    landmarkpaquetes += (sensor.landmarks.landmark)?1:0;

                    //PELIGROSIDAD
                    peligrosidadvalor.promedio += sensor.peligrosidad.actual/n;
                    if(sensor.peligrosidad.actual < peligrosidadvalor.min)
                        peligrosidadvalor.min = sensor.peligrosidad.actual;
                    if(sensor.peligrosidad.actual > peligrosidadvalor.max)
                        peligrosidadvalor.max = sensor.peligrosidad.actual;    
                    tendencia.positiva   += (sensor.landmarks.landmark && sensor.peligrosidad.actual>0)?1:0;
                    tendencia.negativa   += (sensor.landmarks.landmark && sensor.peligrosidad.actual<0)?1:0;

                   bloque.sensores[j].basica = {...bloque.sensores[j].basica,paquetes,eficiencia};
                   bloque.sensores[j].landmarks = {...bloque.sensores[j].landmarks,paquetes:landmarkpaquetes};
                   bloque.sensores[j].peligrosidad = {...bloque.sensores[j].peligrosidad,paquetes:peligrosidadpaquetes};


                }
            });

        const denominador = [n,n-1];
        for(let i=0;i<estadisticas.length;i++)
            estadisticas[i].sensores.forEach((sensor,j)=>{                    
                const valor = bloque.sensores[j].basica.valor;
                const nivel = bloque.sensores[j].basica.nivel;  
                const eficiencia = bloque.sensores[j].basica.eficiencia; 
                
                const landmarkvalor = bloque.sensores[j].landmarks.valor; 
                const deltai = bloque.sensores[j].landmarks.deltai; 
                const deltay = bloque.sensores[j].landmarks.deltay; 

                const peligrosidad      = bloque.sensores[j].peligrosidad; 
                const peligrosidadvalor = bloque.sensores[j].peligrosidad.valor; 

                const sixsigma = bloque.sensores[j].sixsigma;
                const rango = tarjeta.sensores[j].parametros.rango;
                const target = (rango[0]+rango[1])/2;

                if(i==0){                        
                    valor.desviacion = [0,0];
                    nivel.desviacion = [0,0];
                    landmarkvalor.desviacion = [0,0];
                    deltai.desviacion = [0,0];
                    deltay.desviacion = [0,0];
                    peligrosidadvalor.desviacion = [0,0];
                }
                
                for(let j=0;j<valor.desviacion.length;j++){
                    valor.desviacion[j] += (sensor.basica.actual - valor.promedio)*(sensor.basica.actual - valor.promedio)/(denominador[j]);
                    nivel.desviacion[j] += (sensor.basica.nivelactual - nivel.promedio)*(sensor.basica.nivelactual - nivel.promedio)/(denominador[j]);
                    landmarkvalor.desviacion[j] += (sensor.landmarks.actual - landmarkvalor.promedio)*(sensor.landmarks.actual - landmarkvalor.promedio)/(denominador[j]);
                    deltai.desviacion[j] += (sensor.landmarks.deltai - deltai.promedio)*(sensor.landmarks.deltai - deltai.promedio)/(denominador[j]);
                    deltay.desviacion[j] += (sensor.landmarks.deltay - deltai.promedio)*(sensor.landmarks.deltay - deltai.promedio)/(denominador[j]);
                    peligrosidadvalor.desviacion[j] += (sensor.peligrosidad.actual - peligrosidadvalor.promedio)*(sensor.peligrosidad.actual - peligrosidadvalor.promedio)/(denominador[j]);
                }                
                if(i==(n-1)){
                        

                    for(let j=0;j<valor.desviacion.length;j++){
                        valor.desviacion[j] = Math.sqrt(valor.desviacion[j]) || Number.POSITIVE_INFINITY;
                        nivel.desviacion[j] = Math.sqrt(nivel.desviacion[j])  || Number.POSITIVE_INFINITY;
                        landmarkvalor.desviacion[j] = Math.sqrt(landmarkvalor.desviacion[j])  || Number.POSITIVE_INFINITY;
                        deltai.desviacion[j] = Math.sqrt(deltai.desviacion[j])  || Number.POSITIVE_INFINITY;
                        deltay.desviacion[j] = Math.sqrt(deltay.desviacion[j])  || Number.POSITIVE_INFINITY;
                        peligrosidadvalor.desviacion[j] = Math.sqrt(peligrosidadvalor.desviacion[j])  || Number.POSITIVE_INFINITY;
                    }  

                    peligrosidad.paquetes = peligrosidad.tendencia.positiva + peligrosidad.tendencia.negativa;

                    //SIX-PACK SIGMA
                    //FIXME: Arreglar los sensores inactivos                    
                    try{                         

                        sixsigma.c.p   = (rango[1]-rango[0])/(6*valor.desviacion[0]);
                        sixsigma.c.pl  = (valor.promedio-rango[0])/(3*valor.desviacion[0]);
                        sixsigma.c.pu  = (rango[1]-valor.promedio)/(3*valor.desviacion[0]);
                        sixsigma.c.pk  = (Math.min(valor.promedio-rango[0],rango[1]-valor.promedio))/(3*valor.desviacion[0]);
                        sixsigma.c.pm  = (rango[1]-rango[0])/(6 * Math.sqrt( Math.pow(valor.desviacion[0],2) + Math.pow(valor.promedio-target,2)));
                        sixsigma.c.pml = (valor.promedio-rango[0])/(3 * Math.sqrt( Math.pow(valor.desviacion[0],2) + Math.pow(valor.promedio-target,2)));
                        sixsigma.c.pmu = (rango[1]-valor.promedio)/(3 * Math.sqrt( Math.pow(valor.desviacion[0],2) + Math.pow(valor.promedio-target,2)));
                        sixsigma.c.pmk = (Math.min(valor.promedio-rango[0],rango[1]-valor.promedio))/(3 * Math.sqrt( Math.pow(valor.desviacion[0],2) + Math.pow(valor.promedio-target,2)));

                        sixsigma.p.p   = (rango[1]-rango[0])/(6*valor.desviacion[1]);
                        sixsigma.p.pl  = (valor.promedio-rango[0])/(3*valor.desviacion[1]);
                        sixsigma.p.pu  = (rango[1]-valor.promedio)/(3*valor.desviacion[1]);
                        sixsigma.p.pk  = (Math.min(valor.promedio-rango[0],rango[1]-valor.promedio))/(3*valor.desviacion[1]);
                        sixsigma.p.pm  = (rango[1]-rango[0])/(6 * Math.sqrt( Math.pow(valor.desviacion[1],2) + Math.pow(valor.promedio-target,2)));
                        sixsigma.p.pml = (valor.promedio-rango[0])/(3 * Math.sqrt( Math.pow(valor.desviacion[1],2) + Math.pow(valor.promedio-target,2)));
                        sixsigma.p.pmu = (rango[1]-valor.promedio)/(3 * Math.sqrt( Math.pow(valor.desviacion[1],2) + Math.pow(valor.promedio-target,2)));
                        sixsigma.p.pmk = (Math.min(valor.promedio-rango[0],rango[1]-valor.promedio))/(3 * Math.sqrt( Math.pow(valor.desviacion[1],2) + Math.pow(valor.promedio-target,2)));

                        sixsigma.ppm.observado = 1-eficiencia;
                        sixsigma.ppm.z.c.el = ztable((rango[0]-valor.promedio)/valor.desviacion[0]);
                        sixsigma.ppm.z.c.eu = ztable((valor.promedio-rango[1])/valor.desviacion[0]);
                        sixsigma.ppm.z.p.el = ztable((rango[0]-valor.promedio)/valor.desviacion[1]);
                        sixsigma.ppm.z.p.eu = ztable((valor.promedio-rango[1])/valor.desviacion[1]);
                        sixsigma.ppm.estimado = [sixsigma.ppm.z.c.el + sixsigma.ppm.z.c.eu,sixsigma.ppm.z.p.el + sixsigma.ppm.z.p.eu];                        
                    }
                    catch(err){
                        sixsigma.c.p   = Number.POSITIVE_INFINITY;
                        sixsigma.c.pl  = Number.POSITIVE_INFINITY;
                        sixsigma.c.pu  = Number.POSITIVE_INFINITY;
                        sixsigma.c.pk  = Number.POSITIVE_INFINITY;
                        sixsigma.c.pm  = Number.POSITIVE_INFINITY;
                        sixsigma.c.pml = Number.POSITIVE_INFINITY;
                        sixsigma.c.pmu = Number.POSITIVE_INFINITY;
                        sixsigma.c.pmk = Number.POSITIVE_INFINITY;

                        sixsigma.p.p   = Number.POSITIVE_INFINITY;
                        sixsigma.p.pl  = Number.POSITIVE_INFINITY;
                        sixsigma.p.pu  = Number.POSITIVE_INFINITY;
                        sixsigma.p.pk  = Number.POSITIVE_INFINITY;
                        sixsigma.p.pm  = Number.POSITIVE_INFINITY;
                        sixsigma.p.pml = Number.POSITIVE_INFINITY;
                        sixsigma.p.pmu = Number.POSITIVE_INFINITY;
                        sixsigma.p.pmk = Number.POSITIVE_INFINITY;

                        sixsigma.ppm.observado = Number.POSITIVE_INFINITY;
                        sixsigma.ppm.z.c.el = Number.POSITIVE_INFINITY;
                        sixsigma.ppm.z.c.eu = Number.POSITIVE_INFINITY;
                        sixsigma.ppm.z.p.el = Number.POSITIVE_INFINITY;
                        sixsigma.ppm.z.p.eu = Number.POSITIVE_INFINITY;
                        sixsigma.ppm.estimado = [Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY];                        
                    }
                    

                    
                }
            });        

        await AgregarBloque(bloque);
    }

}
module.exports = {BloquesUpdate};






