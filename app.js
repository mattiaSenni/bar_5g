var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersCatalog = require('./routes/userCatalog');
var barCatalog = require('./routes/barCatalog');
var login = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.use('/', indexRouter);
app.use('/user', usersCatalog);
app.use('/bar', barCatalog);
app.use('/login', login)
module.exports = app;
