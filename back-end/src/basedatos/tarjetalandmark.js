const {Schema,model} = require('mongoose');


const SchemaTarjetaLandmark = new Schema({
    nombre : {type : Number, required : true},
    fechadispositivo: String,
    fechaservidor: String,    
    sensores : [
        {
            nivel : [{type:Number, default: Number.POSITIVE_INFINITY}],
            deltay : {type:Number, default: Number.POSITIVE_INFINITY},
            deltai : {type:Number, default: Number.POSITIVE_INFINITY},
            landmark : {type:Boolean, defaul:false}
        }
    ]
},{timestamps:true,versionKey: false});

const TarjetaLandmark = model('tarjetaslandmarks',SchemaTarjetaLandmark);

module.exports = {TarjetaLandmark};