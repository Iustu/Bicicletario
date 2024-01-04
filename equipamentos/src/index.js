var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var bicicletas = require('./bicicleta.js');
app.use('/bicicleta', bicicletas);

app.listen(3000);
//teste