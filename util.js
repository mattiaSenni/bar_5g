
var jwt = require('jsonwebtoken');


function genJwt(data){
    var token = jwt.sign(data, process.env['jwttoken']);
    var token = jwt.sign(data, 'cane');    
    return token;
}

module.exports = {
    genJwt
}