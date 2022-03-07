var express = require('express');
var router = express.Router();
var bar = require('./../views/bar')
var menu = require('../views/prodotto')
var {grad1, grad2, grad3, grad4} = require('./../middleware/auth')

router.get('/:idBar/menu/:idProdotto', grad1, menu.getSingle)
router.get('/:idBar/menu', grad1, menu.get)
router.get('/:idBar', grad2, bar.get)
router.put('/:idBar', grad3, bar.update)
module.exports = router;