
var jwt = require('jsonwebtoken');


function genJwt(data){
    var token = jwt.sign(data, process.env['jwttoken']);    
}

module.exports = {
    genJwt
}