
var {getProdottiMenu, getPrenotazione, getPrenotazioni, postPrenotazione, deletePrenotazione, updatePrenotazione, insertProductInPrenotazione, pushPrenotazione} = require('../db_crud')

function get(req, res, next) {
  try{
    getPrenotazioni(req.params['idUser']).then((data)=>{
        res.json(data[0]);
      })
  }catch(ex){
      res.status(500).json({message:'internal error'})
  }
};

async function getSingle(req, res, next) {  
    try{
        let data = await getPrenotazione(req.params['idPrenotazione'])
        let fd1 = data[0]
        let obj = {
            ...fd1[0],
            IDMenu: undefined,
            Nome: undefined
        }
        console.log(obj);
        obj['menu'] = fd1.map(o => {return {IDMenu : o['IDMenu'], Nome : o['Nome'], Immagine: o['Immagine'], Quantita: o['Quantita']}})
        let ret = []
        for(let d of obj['menu']){
            ret.push({
                ...d,
                prodotti : (await getProdottiMenu(d['IDMenu']))[0]
            })
        }
        console.log(ret);
        obj['menu'] = ret;
        res.json(obj)
    }catch(e){
        res.status(500).json({message:'internal error'});
    }
};

async function post(req, res, next){
    try{
        if(!(req.body['modalita_pagamento'] && req.body['id_fascia_oraria'] && req.body['prodotti'] && req.body['data'] && req.body['stato'])) throw new Error('bad request')
        let prodotti = JSON.parse(req.body['prodotti'])
        let pren = await postPrenotazione(req.params['idUser'], req.body['data'], req.body['stato'], req.body['id_fascia_oraria'], req.body['modalita_pagamento'])
        let id = pren[0][0]['ID']
        for(let p in prodotto){
            insertProductInPrenotazione()
        }
        
    }catch(ex){
        console.log(ex);
        res.status(500).json({message:'internal error'})
    }
}

function del(req, res, next){
    try{
        deletePrenotazione(req.params['idUser'], req.params['idPrenotazione']).then(data=>{
            res.json(data)
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

async function create(req, res, next) {
    try {
        let json = JSON.parse(req.body['prenotazione'])
        /*
            json = {"transazione":{"idProvenienza": 4,"saldo": 2},"idUtente": 1,"modalitaPagamento":1,"idFasciaOraria":1, "menu": [{"idMenu":2,"quantita": 3}]}
        */
        res.json(await pushPrenotazione(json));
    } catch (ex) {
        res.status(500).json({ message: 'internal error' })
    }
}

module.exports = {
    get, getSingle, post, del, update, create
}
