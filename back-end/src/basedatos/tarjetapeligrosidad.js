const {Schema,model} = require('mongoose');


const SchemaTarjetaPeligrosidad = new Schema({
    nombre : {type : Number, required : true},
    fechadispositivo: String,
    fechaservidor: String,    
    sensores : [
        {
            peligrosidad : [{type:Number, default: Number.POSITIVE_INFINITY}],
            deltay       : [{type:Number, default: Number.POSITIVE_INFINITY}],
            landmark     : {type:Boolean, defaul:false}
        }
    ]
},{timestamps:true,versionKey: false});

const TarjetaPeligrosidad = model('tarjetaspeligrosidad',SchemaTarjetaPeligrosidad);

module.exports = {TarjetaPeligrosidad};