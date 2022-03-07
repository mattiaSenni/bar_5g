var express = require('express');
var router = express.Router();
var user = require('../views/user')
var prenotazioni = require('../views/prenotazione')
var {grad1, grad2, userCheck} = require('../middleware/auth')

/* GET home page. */

router.get('/:idUser/prenotazione', grad2, prenotazioni.get)
router.get('/:idUser', grad2, userCheck, user.get)
router.delete('/:idUser', grad2, userCheck, user.del)


module.exports = router;
