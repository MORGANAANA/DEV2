/**
 * Created by mathi on 20/03/2017.
 */
var app = require('express')();
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var winston = require('winston');
var cors = require('cors');
var bb = require('express-busboy-custom');
var fs = require('fs');
// var ip = require('os').networkInterfaces().lo[0].address;
var ip = 'localhost';
var argv = require('yargs').argv;
var porta = argv.porta ? argv.porta : 7001;
var jwt    = require('jsonwebtoken');
var mongan = require('morgan');
var logger = require('./config/logger_config')(winston);
var express = require('./config/express_config')(app);

// rotas não protegidas

app.get('/', function (req, res) {
    res.render('../views/home.ejs');
});

var usuario = require('./rotas/usuario')(app);

app.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.params.token || req.headers['x-access-token'] || req.headers['authorization'] || req.headers['token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'Nao sei o que colocar aqui', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});

// rotas protegidas
var livro = require('./rotas/livro')(app);
var questao = require('./rotas/questao')(app);
var simulado = require('./rotas/simulado')(app);
var topico = require('./rotas/topico')(app);

app.listen(porta, function () {
    console.log('servidor rodando na porta ' + porta);
});

module.exports = app;

/*

 curl http://localhost:7001/meupost -X POST -v -H "Content-type: application/json" -d '{"nome":"mathias"}'; echo

 curl http://localhost:5001/pagamentos/pagamento -X POST -v -H "Content-type: application/json" -d @arquivo.json; echo


 */