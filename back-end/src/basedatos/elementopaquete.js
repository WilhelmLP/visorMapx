const {Schema,model} = require('mongoose');

const SchemaElementoPaquete = new Schema({
    elementoid : {type : Schema.Types.ObjectId, ref: "elementos", required : true},
    fechaservidor: String,
    variables : [Number]
},{timestamps:true,versionKey: false});

module.exports = model('elementospaquetes',SchemaElementoPaquete);