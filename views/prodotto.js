
var {getMenu, getProdotto} = require('../db_crud')

function get(req, res, next) {
  getMenu(req.params['idBar']).then((data)=>{
    res.json(data[0])
  })
};

function getSingle(req, res, next) {  
  getProdotto(req.params['idBar'], req.params['idProdotto']).then((data)=>{
    res.json(data[0])
  })
};

module.exports = {
    get, getSingle
}
