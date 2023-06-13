const net = require('net');
const { GetFechaActual } = require('./herramientas');

const client = net.createConnection(2000,"localhost",()=>{	
    let i = 0;
    const tarjeta = "11111";
    client.on("data", function(trama) {
        console.log("CLIENTE : Data: ["+trama+"]");	
        const data = trama.toString().split("|");
        if(data[1]){
            const comando = data[1].trim();
            if(comando == "??")
                client.write(tarjeta+"|??=|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15");               
        }
        
    });
    client.on("error",(error)=>{
        console.log("CLIENTE : Error: ["+error+"]");
    })    
    setInterval(()=>{
        if(i%4 == 0){
            const fecha = GetFechaActual()
            const dato1 = (Math.random()*100).toFixed(2);
            client.write(tarjeta + "|SD|DL:E0.0.0:AT.0.0.0|"+fecha+"|"+dato1+"|270|270|270|6|6|6|70|0|0\r\n");
            if(Math.random() > 0.6){
                const dato1 = (Math.random()*100).toFixed(2);
                if(Math.random()>=0.5)
                    client.write(tarjeta + "|++|T__|"+dato1);
                else 
                    client.write(tarjeta + "|--|T__|"+(-dato1));
            }
        }
        else
            client.write(tarjeta + "\r\n"); 
        

        i++;
    },5000);    
});


