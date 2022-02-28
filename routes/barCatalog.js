var express = require('express');
var router = express.Router();
var bar = require('./../views/bar')
var menu = require('../views/prodotto')
var {grad1, grad2, grad3, grad4} = require('./../middleware/auth')

router.use('/:idBar/menu', grad1, menu.get)
router.use('/:idBar', grad2, bar.get)

module.exports = router;