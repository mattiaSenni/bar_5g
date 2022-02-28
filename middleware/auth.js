/*
grad server per inserire l'autenticazione, se un utente ha privilegi di un 
certo grado allora la richiesta avanzerà, se no verrà rifiutata e ritornerà 
un errore
*/

function grad1(req, res, next){
    if(true)
    {
        next()
    }
    else{
        res.status(401).send()
    }
}
function grad2(req, res, next){
    if(true)
    {
        next()
    }
    else{
        res.status(401).send()
    }
}
function grad3(req, res, next){
    if(true)
    {
        next()
    }
    else{
        res.status(401).send()
    }
}
function grad4(req, res, next){
    if(true)
    {
        next()
    }
    else{
        res.status(401).send()
    }
}

module.exports= {
    grad1,grad2,grad3,grad4
}