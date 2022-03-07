
var {getMenu, getProdotto} = require('../db_crud')

async function get(req, res, next) {
  try{
    getMenu(req.params['idBar']).then((data)=>{
      res.json(data[0])
    })
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
