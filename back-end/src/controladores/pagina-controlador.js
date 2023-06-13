const path = require('path');

const GetIndex = (req,res)=>{
    return res.sendFile(path.join(__dirname,'../vistas/index.html'));
}
const Get404 = (req,res)=>{
    return res.sendFile(path.join(__dirname,'../vistas/404.html'));
}


module.exports = {
    GetIndex,
    Get404
};