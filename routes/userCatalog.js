var express = require('express');
var router = express.Router();
var user = require('../views/user')
var prenotazioni = require('../views/prenotazione')
var {grad1, grad2, userCheck} = require('../middleware/auth')

/* GET home page. */

router.get('/:idUser/prenotazione', grad2,userCheck, prenotazioni.get)
router.get('/:idUser', grad2, userCheck, user.get)
router.delete('/:idUser', grad2, userCheck, user.del)
router.delete('/:idUser/prenotazione/:idPrenotazione', grad2, userCheck, prenotazioni.del)
router.get('/:idUser/prenotazione/:idPrenotazione', grad2, userCheck, prenotazioni.getSingle)

module.exports = router;
