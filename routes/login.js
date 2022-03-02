var express = require('express');
var router = express.Router();
var user = require('../views/user')

/* GET home page. */
router.post('/', user.login);

module.exports = router;
