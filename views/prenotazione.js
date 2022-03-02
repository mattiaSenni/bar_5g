
var {getPrenotazione, getPrenotazioni, postPrenotazione, deletePrenotazione, updatePrenotazione} = require('../db_crud')

function get(req, res, next) {
  getPrenotazion1(req.params['idUser']).then((data)=>{
    res.json(data[0])
  })
};

function getSingle(req, res, next) {  
    getPrenotazione(req.params['idUser'], req.params['idPrenotazione']).then((data)=>{
        res.json(data[0])
    })
};

function post(req, res, next){
    try{
        if(!(req.body['momento_evasione'] && req.body['id_fascia_oraria'] && req.body['prodotti'])) throw new Error('bad request')
        let prodotti = JSON.parse(req.body['prodotti'])
        postPrenotazione(req.params['idUser'],{momentoEvasione:req.body['momento_evasione'], idFasciaOraria:req.body['id_fascia_oraria'], prodotti}).then(data=>{
            res.json(data[0])
        })
    }catch(ex){
        res.status(500).json({message:'internal error'})
    }
}

function del(req, res, next){
    try{
        deletePrenotazione(req.params['idUser'], req.params['idPrenotazione']).then(data=>{
            res.json(data[0])
        })
    }catch(ex){
        res.status(500).json({message:'internal error'})
    }
}
function update(req, res, next){
    try{
        if(!(req.body['momento_evasione'] && req.body['id_fascia_oraria'] && req.body['prodotti'])) throw new Error('bad request')
        let prodotti = JSON.parse(req.body['prodotti'])
        updatePrenotazione(req.params['idUser'], req.params['idPrenotazione'], {momentoEvasione:req.body['momento_evasione'], idFasciaOraria:req.body['id_fascia_oraria'], prodotti}).then(data=>{
            res.json(data[0])
        })
    }catch(ex){
        res.status(500).json({message:'internal error'})
    }
}

module.exports = {
    get, getSingle, post, del, update
}
