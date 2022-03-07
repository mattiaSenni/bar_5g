const jwt = require('jsonwebtoken')
/*
grad server per inserire l'autenticazione, se un utente ha privilegi di un 
certo grado allora la richiesta avanzerà, se no verrà rifiutata e ritornerà 
un errore
*/

function getUserJwt(stringa){
    return jwt.verify(stringa, 'cane')
}

function grad1(req, res, next){
    try{
        let token = req.body['token']
        if(!token) throw new Error()
        let user = getUserJwt(token)
        res.locals.user = user
        if(!(user['Ruolo'] >= 1)){
            throw new Error();
        }
        next()
    }catch(ex){
        res.status(401).json({message:'invalid token'})
    }
}
function grad2(req, res, next){
    try{
        let token = req.body['token']
        if(!token) throw new Error()
        let user = getUserJwt(token)
        res.locals.user = user
        if(!(user['Ruolo'] >= 2)){
            throw new Error();
        }
        next()
    }catch(ex){
        res.status(401).json({message:'invalid token'})
    }
}
function grad3(req, res, next){
    try{
        let token = req.body['token']
        if(!token) throw new Error()
        let user = getUserJwt(token)
        res.locals.user = user
        if(!(user['Ruolo'] >= 3)){
            throw new Error();
        }
        next()
    }catch(ex){
        res.status(401).json({message:'invalid token'})
    }
}
function grad4(req, res, next){
    try{
        let token = req.body['token']
        if(!token) throw new Error()
        let user = getUserJwt(token)
        res.locals.user = user
        if(!(user['Ruolo'] >= 4)){
            throw new Error();
        }
        next()
    }catch(ex){
        res.status(401).json({message:'invalid token'})
    }
}

function userCheck(req, res, next){
    if(req.params['userId'] == res.locals.user.id){
        next()
    }else{
        res.status(401).json({message:'invalid token'})
    }
}

module.exports= {
    grad1,grad2,grad3,grad4,userCheck
}