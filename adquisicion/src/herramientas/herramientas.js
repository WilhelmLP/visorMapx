const GetDate = ()=>{
    const fecha = new Date();
    if(process.env.PRODUCCION == "true")
        fecha.setTime(fecha.getTime() + (-5) * 3600 * 1000);
    return fecha;
}
const GetFechaActual = ()=>{
    
    const fecha = GetDate();

    let anio = fecha.getFullYear();
    let mes = (fecha.getMonth()+1);
    let dia = fecha.getDate();    
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();

    anio = anio.toString();
    mes = (mes < 10) ? "0"+mes: mes.toString();
    dia = (dia < 10) ? "0"+dia: dia.toString();

    hora    = (hora < 10) ? "0"+hora : hora.toString();
    minutos = (minutos < 10) ? "0"+minutos : minutos.toString();
    segundos = (segundos < 10) ? "0"+segundos : segundos.toString();

    return anio+"-"+mes+"-"+dia+" "+hora+":"+minutos+":"+segundos;
}
const Log = (mensaje)=>{
    console.log("Servidor ("+GetFechaActual()+") : " + mensaje);
}

module.exports = {GetDate,GetFechaActual,Log};