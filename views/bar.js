var express = require('express');
var router = express.Router();
var { getBar, updateBar, getMenu, getFascieOrarie} = require('./../db_crud')

/* GET home page. */
async function get(req, res, next) {
  try{
    res.json(await getBar(req.params['idBar']))
  }catch(ex){
    res.status(500).send({message:'internal error'})
  }
};

async function getFasciaOraria(req, res, next) {
  try {
    res.json(await getFascieOrarie(req.params['idBar']))
  } catch (ex) {
    res.status(500).send({ message: 'internal error' })
  }
}

async function update(req, res, next) {
  try{
    res.json(await updateBar(req.params['idBar', 'nome']))
  }catch(ex){
    res.status(500).send({message:'internal error'})
  }
};

async function getMenu(req, res, next){
  try{
    let data = await getMenu(req.params['idBar']);
    res.json(data);
  }catch(ex){
    res.status(500).json({message:'internal error'})
  }
}

module.exports = {
    get, update, getMenu, getFasciaOraria
}
