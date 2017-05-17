/**
 * Created by mathi on 20/03/2017.
 */
var app = require('express')();
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var winston = require('winston');
var bb = require('express-busboy-custom');
var fs = require('fs');
// var ip = require('os').networkInterfaces().lo[0].address;
var ip = 'localhost';
var argv = require('yargs').argv;
var porta = argv.porta ? argv.porta : 7001;

var logger = require('./config/logger_config')(winston);
var express = require('./config/express_config')(app);

var livro = require('./rotas/livro')(app);
var questao = require('./rotas/questao')(app);
var simulado = require('./rotas/simulado')(app);
var topico = require('./rotas/topico')(app);

var usuario = require('./rotas/usuario')(app);

app.get('/', function (req, res) {
   res.render('../views/home.ejs');
});

app.listen(porta, function () {
    console.log('servidor rodando na porta ' + porta);
});

module.exports = app;

/*

 curl http://localhost:7001/meupost -X POST -v -H "Content-type: application/json" -d '{"nome":"mathias"}'; echo

 curl http://localhost:5001/pagamentos/pagamento -X POST -v -H "Content-type: application/json" -d @arquivo.json; echo


 */