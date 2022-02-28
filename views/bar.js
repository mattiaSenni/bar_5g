var express = require('express');
var router = express.Router();
var {getBar} = require('./../db_crud')

/* GET home page. */
function get(req, res, next) {
  res.json(getBar(req.params['idBar']))
};

module.exports = {
    get
}
