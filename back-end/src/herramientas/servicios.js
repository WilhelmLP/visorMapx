const Servicios = [
    "TC",
    "TGI",
    "TE",
    "EC",
    "EGI",
    "EGII",
    "EE",
    "PC",
    "PGI",
    "PGII",
    "PE",    
    "AI",
    "AII",
    "AIII",
    "LM",
    "PD",
    "RE",
    "SO"
];

const GetPaquete = (servicios)=>{
    const interprete = {
        TC : false,
        TGI : false,
        TE: false,        
        EC : false,
        EGI : false,
        EGII : false,
        EE : false,
        PC : false,
        PGI : false,
        PGII : false,
        PE : false,        
        AI : false,
        AII : false,
        AIII : false,
        LM : false,
        PD : false,
        RE : false,
        SO : false
    };
    if(!Array.isArray(servicios))
        return interprete;
    servicios.forEach((s)=>{
        const servicio = s.trim().toUpperCase();
        if(servicio=="TC")
            interprete.TC = true;
        else if(servicio=="TGI")
            interprete.TGI = true;
        else if(servicio=="TE")
            interprete.TE = true;
        else if(servicio=="EC")
            interprete.EC = true;        
        else if(servicio=="EGI")
            interprete.EGI = true;
        else if(servicio=="EGII")
            interprete.EGII = true;
        else if(servicio=="EE")
            interprete.EE = true;
        else if(servicio=="PC")
            interprete.PC = true;        
        else if(servicio=="PGI")
            interprete.PGI = true;
        else if(servicio=="PGII")
            interprete.PGII = true;
        else if(servicio=="PE")
            interprete.PE = true;        
        else if(servicio=="AI")
            interprete.AI = true;
        else if(servicio=="AII")
            interprete.AII = true;
        else if(servicio=="AIII")
            interprete.AIII = true;
        else if(servicio=="LM")
            interprete.LM = true;
        else if(servicio=="PD")
            interprete.PD = true;
        else if(servicio=="RE")
            interprete.RE = true;
        else if(servicio=="SO")
            interprete.SO = true;
    });

    return interprete;
}


module.exports = {GetPaquete,Servicios};

