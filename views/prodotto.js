
var {getMenu, getProdotto, getProdottiMenu} = require('../db_crud')

async function get(req, res, next) {
  try{
    let data = await getMenu(req.params['idBar'])
    let ret = []
    for(let d of data[0]){
      ret.push({
        ...d,
        prodotti : (await getProdottiMenu(d['ID']))[0]
      })
    }
    res.json(ret)
  }catch(ex){
    res.status(500).json({message:'internal error'})
  }
};

function getSingle(req, res, next) {  
  try{
    getProdotto(req.params['idBar'], req.params['idProdotto']).then((data)=>{
      res.json(data[0])
    })
  }catch(ex){
    res.status(500).json({message:'internal error'})
  }
};

module.exports = {
    get, getSingle
}
