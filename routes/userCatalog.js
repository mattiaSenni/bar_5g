var express = require('express');
var router = express.Router();
var user = require('../views/user')
var prenotazioni = require('../views/prenotazione')
var {grad1, grad2} = require('../middleware/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({user:'true'})
});

router.get('/:idUser/prenotazione', grad2, )

module.exports = router;
