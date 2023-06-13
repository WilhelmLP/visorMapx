const {GetTarjeta} = require('../controladores/tarjetas-controlador');
const {GetData} = require('../controladores/empresas-controlador');
const { SensorEstado } = require('../basedatos/tarjeta.js');
const { GetBloques } = require('../controladores/tarjetasbloques-controlador');

const GenerarReporteTarjetas = async ({nombre,folios})=>{
    return new Promise(async (callback)=>{

        let   estadisticas = await GetBloques({direcciones:[nombre],folios});
        const tarjeta      = await GetTarjeta({nombre});
        const empresa      = await GetData({tarjetanombre:nombre});

        if(estadisticas!=null){     
            estadisticas = estadisticas.sensores;
            const data = [];
            estadisticas.forEach((reporte,i)=>{
                reporte.map((bloque,j)=>{
                    const sensor = {
                        ...bloque,
                        nombre : tarjeta.sensores[j].nombre,
                        alias: tarjeta.sensores[j].alias,
                        unidades: tarjeta.sensores[j].unidades,
                        tipo: tarjeta.sensores[j].tipo,
                        rango: tarjeta.sensores[j].parametros.rango,
                    }
                    if(i==0){
                        data.push([sensor]);                    
                    }                    
                    else
                        data[j] = [...data[j],sensor]
                });
            });
        
            const generales = data.map((reportes,i)=>{
                const n = reportes.length; 
                const general = {
                    basica:{
                        valor : {
                            min: Number.POSITIVE_INFINITY,
                            promedio: 0,
                            max:Number.NEGATIVE_INFINITY,
                            desviacion:[ 0,
                                         0 ]
                        },
                        nivel : {
                            min: Number.POSITIVE_INFINITY,
                            promedio: 0,
                            max:Number.NEGATIVE_INFINITY,
                            desviacion:[ 0,
                                         0 ]
                        },
                        eficiencia : 0,
                        paquetes : 0
                    },
                    sixsigma:{
                        c:{
                            p   : 0,
                            pl  : 0,
                            pu  : 0,
                            pk  : 0,
                            pm  : 0,
                            pml : 0,
                            pmu : 0,
                            pmk : 0
                        },                          
                        p:{
                            p   : 0,
                            pl  : 0,
                            pu  : 0,
                            pk  : 0,
                            pm  : 0,
                            pml : 0,
                            pmu : 0,
                            pmk : 0
                        },
                        ppm : {
                            observado : 0,
                            z : {
                                c :{
                                    el : 0,
                                    eu : 0,
                                },
                                p :{
                                    el : 0,
                                    eu : 0,
                                }
                            },
                            estimado : [ 0,
                                         0 ]
                        }
                    },
                    landmarks:{
                        valor : {
                            min: Number.POSITIVE_INFINITY,
                            promedio: 0,
                            max:Number.NEGATIVE_INFINITY,
                            desviacion:[ 0,
                                         0 ]
                        },
                        deltai : {
                            min: Number.POSITIVE_INFINITY,
                            promedio: 0,
                            max:Number.NEGATIVE_INFINITY,
                            desviacion:[ 0,
                                         0 ]
                        },
                        deltay : {
                            min: Number.POSITIVE_INFINITY,
                            promedio: 0,
                            max:Number.NEGATIVE_INFINITY,
                            desviacion:[ 0,
                                         0 ]
                        },
                        paquetes: 0
                    },
                    peligrosidad:{
                        valor : {
                            min: Number.POSITIVE_INFINITY,
                            promedio: 0,
                            max:Number.NEGATIVE_INFINITY,
                            desviacion:[ 0,
                                         0 ]
                        },                                
                        tendencia : {
                            positiva: 0,
                            negativa: 0
                        },
                        paquetes: 0
                    }
                }
                const procesar = (acumulativo,valor)=>{
                    return {
                        min : Math.min(acumulativo.min,valor.min),
                        max : Math.max(acumulativo.max,valor.max),
                        promedio : acumulativo.promedio + valor.promedio/n,
                        desviacion : [
                            acumulativo.desviacion[0] + valor.desviacion[0]/n,
                            acumulativo.desviacion[1] + valor.desviacion[1]/n
                        ]                    
                    };
                }
                reportes.forEach(reporte=>{     

                    const bloque = reporte.bloque;

                    if(bloque==null || bloque==undefined)
                        return;
                    
                    general.basica.valor = procesar(general.basica.valor,bloque.basica.valor);
                    general.basica.nivel = procesar(general.basica.nivel,bloque.basica.nivel);
                    general.basica.eficiencia += bloque.basica.eficiencia/n;
                    general.basica.paquetes += bloque.basica.paquetes;

                    general.sixsigma.c.p += bloque.sixsigma.c.p/n;
                    general.sixsigma.c.pl += bloque.sixsigma.c.pl/n;
                    general.sixsigma.c.pu += bloque.sixsigma.c.pu/n;
                    general.sixsigma.c.pk += bloque.sixsigma.c.pk/n;
                    general.sixsigma.c.pm += bloque.sixsigma.c.pm/n;
                    general.sixsigma.c.pml += bloque.sixsigma.c.pml/n;
                    general.sixsigma.c.pmu += bloque.sixsigma.c.pmu/n;
                    general.sixsigma.c.pmk += bloque.sixsigma.c.pmk/n;

                    general.sixsigma.p.p += bloque.sixsigma.p.p/n;
                    general.sixsigma.p.pl += bloque.sixsigma.p.pl/n;
                    general.sixsigma.p.pu += bloque.sixsigma.p.pu/n;
                    general.sixsigma.p.pk += bloque.sixsigma.p.pk/n;
                    general.sixsigma.p.pm += bloque.sixsigma.p.pm/n;
                    general.sixsigma.p.pml += bloque.sixsigma.p.pml/n;
                    general.sixsigma.p.pmu += bloque.sixsigma.p.pmu/n;
                    general.sixsigma.p.pmk += bloque.sixsigma.p.pmk/n;

                    general.sixsigma.ppm.observado += bloque.sixsigma.ppm.observado/n;
                    general.sixsigma.ppm.z.c.el += bloque.sixsigma.ppm.z.c.el/n;
                    general.sixsigma.ppm.z.c.eu += bloque.sixsigma.ppm.z.c.eu/n;
                    general.sixsigma.ppm.z.p.el += bloque.sixsigma.ppm.z.p.el/n;
                    general.sixsigma.ppm.z.p.eu += bloque.sixsigma.ppm.z.p.eu/n;
                    general.sixsigma.ppm.estimado[0] += bloque.sixsigma.ppm.estimado[0]/n;
                    general.sixsigma.ppm.estimado[1] += bloque.sixsigma.ppm.estimado[1]/n;  
                    
                    general.landmarks.valor = procesar(general.landmarks.valor ,bloque.landmarks.valor);
                    general.landmarks.deltai = procesar(general.landmarks.deltai ,bloque.landmarks.deltai);
                    general.landmarks.deltay = procesar(general.landmarks.deltay ,bloque.landmarks.deltay);
                    general.landmarks.paquetes += bloque.landmarks.paquetes;

                    general.peligrosidad.valor = procesar(general.peligrosidad.valor,bloque.peligrosidad.valor);
                    general.peligrosidad.tendencia.positiva += bloque.peligrosidad.tendencia.positiva;
                    general.peligrosidad.tendencia.negativa += bloque.peligrosidad.tendencia.negativa;
                    general.peligrosidad.paquetes += bloque.peligrosidad.paquetes;

                });
                return general;
            });

            const reporte = {
                configuracion : {
                    nombre,
                    estado  : tarjeta.estado,
                    empresa : (empresa)?empresa.nombre:"-",                    
                },
                reportes : data,
                generales : generales
            };                
            callback(reporte);              
        }
        else
            callback(null)

    });    

}

module.exports = {GenerarReporteTarjetas}