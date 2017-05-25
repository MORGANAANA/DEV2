/**
 * Created by Portal on 17/05/2017.
 */
var app = require('express')();
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var winston = require('winston');
var bb = require('express-busboy-custom');
var fs = require('fs');
//var ip = require('os').networkInterfaces().lo[0].address;
var ip = "localhost";
var argv = require('yargs').argv;
var porta = argv.porta ? argv.porta : 7001;

// var sha = require('sha256');
var jwt    = require('jsonwebtoken');

module.exports = (app) => {

    app.post('/usuario/login', function(req, res) {

        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('usuario').findOne({_id: req.body.nome}, function (err, user) {
                    console.log(req.body.nome);
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: 'Autenticação falhou. Usuário não encontrado' });
                    } else if (user) {

                        // check if password matches
                        if (user.senha != req.body.senha) {
                            res.json({ success: false, message: 'Autenticação falhou. Senha incorreta' });
                        } else {

                            // if user is found and password is right
                            // create a token
                            var token = jwt.sign(user, 'Nao sei o que colocar aqui', {
                                expiresIn: 86400 // expires in 24 hours
                            });

                            res.json({
                                success: true,
                                token: token
                            });
                        }

                    }

                });
            }
        });

    });

    app.post('/usuario/registro', function (req, res) {
       var dados = req.body;
       mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
           if(err){
               res.status(500).send('ocorreu um erro de conexão: ' + err);
               winston.error('ocorreu um erro de conexão', {erro: err});
           } else {
               var query = {
                   "_id": dados.nome,
                   senha: dados.senha
               };
               db.collection('usuario').insertOne(query, function (erro) {
                   if(erro){
                       winston.error('ocorreu um erro de insercao', {erro: erro});
                       res.status(500).send('usuario já existe');
                   } else{
                       var response = {
                           usuario_inserido: dados,
                       };
                       res.status(201).json(response);
                   }
               })
           }
       })
    });

};
