/**
 * Created by mathias on 04/05/17.
 */

var app = require('express')();
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var winston = require('winston');
var bb = require('express-busboy-custom');
var fs = require('fs');
var ip = require('os').networkInterfaces().lo[0].address;
var argv = require('yargs').argv;
var porta = argv.porta ? argv.porta : 7001;

module.exports = (app) => {

    //Listagem de questões por Universidade Com limite
    app.get('/simulado/universidade/:universidade/quantidade/:quantidade', (req, res) => {

        let universidade = req.params.universidade;
        let quantidade = parseInt(req.params.quantidade);

        mongoClient.connect('mongodb://localhost:27017/app_livros',(err, db) => {
            if (err) {
                winston.error('ocorreu um erro de conexão ', {erro: err});
                res.status(500).send('ocorreu um erro de conexão: ' + err);
            } else {

                let query = {
                    universidade: {'$regex': '^' + universidade + '$', '$options': 'i'}
                };

                db.collection('questao').find(query).limit(quantidade).toArray( (err, docs) => {
                    if (err) {
                        winston.error('ocorreu um erro de busca', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    res.status(201).json(docs);
                });
            }
        });
    });

    app.post('/simulado/resultados', (req, res) => {

        let resultado = req.body;

        mongoClient.connect('mongodb://localhost:27017/app_livros',  (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('livro').insertOne(resultado, (err) => {
                    if(err){
                        winston.error('ocorreu um erro de insercao', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    else{

                        let response = {
                            dados_inseridos: resultado,
                            links: [
                                {
                                    href:'http://' + ip + ':'+ porta +'/livro/id/' + meuLivro._id,
                                    rel: 'DADOS',
                                    method: 'GET'
                                },
                                {
                                    href:'http://' + ip + ':'+ porta +'/livro/id/' + meuLivro._id,
                                    rel: 'EXCLUIR',
                                    method: 'DELETE'
                                }
                            ]
                        };

                        res.status(201).json(response);
                    }
                });
            }
        });

    });

};