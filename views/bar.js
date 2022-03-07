var express = require('express');
var router = express.Router();
var {getBar, updateBar} = require('./../db_crud')

/* GET home page. */
async function get(req, res, next) {
  try{
    res.json(await getBar(req.params['idBar']))
  }catch(ex){
    res.status(500).send({message:'internal error'})
  }
};

async function update(req, res, next) {
  try{
    res.json(await updateBar(req.params['idBar', 'nome']))
  }catch(ex){
    res.status(500).send({message:'internal error'})
  }
};

module.exports = {
    get, update
}
