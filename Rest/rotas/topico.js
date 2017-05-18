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
//var ip = require('os').networkInterfaces().lo[0].address;
var ip = "localhost";
var argv = require('yargs').argv;
var porta = argv.porta ? argv.porta : 7001;

module.exports = function (app) {

    //TOPICOS

    // Adicionar tópico no sistema
    app.post('/topico',function (req, res) {

        var topico = req.body;

        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('topico').insertOne(topico, function (err) {
                    if(err){
                        winston.error('ocorreu um erro de insercao', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    else{

                        var response = {
                            dados_inseridos: topico,
                            links: [
                                {
                                    href:'http://' + ip + ':'+ porta +'/topico/id/' + topico._id,
                                    rel: 'DADOS',
                                    method: 'GET'
                                },
                                {
                                    href:'http://' + ip + ':'+ porta +'/topico/id/' + topico._id,
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

    //Pegar um topico pelo ID
    app.get('/topico/id/:id', function (req, res) {
        var id = new objectId(req.params.id);

        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('topico').findOne({'_id':id}, function (err, resultado) {
                    if(err){
                        winston.error('ocorreu um erro de busca', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    if(resultado == null)
                        res.status(500).send('Erro de busca, nenhum dado encontrado.');
                    else{
                        res.status(201).json(resultado);
                    }
                });
            }
        });
    });

    // Deletar um tópico pelo ID
    app.delete('/topico/id/:id', function (req, res) {
        var id = new objectId(req.params.id);

        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('topico').deleteOne({'_id':id}, function (err, resultado) {
                    if(err){
                        winston.error('ocorreu um erro de busca', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    if(resultado == null)
                        res.status(500).send('Erro de exclusao, seu dado nao foi encontrado.');
                    else{
                        let resposta = {
                            "_id":id,
                            "situacao":"removido"
                        }
                        res.status(201).json(resposta);
                    }
                });
            }
        });
    });

    // Topicos por livro
    app.get('/topico/livro/:livro', function (req, res) {

        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{

                var query = [
                    {$match: {livro:{'$regex' : '^'+ req.params.livro +'$', '$options' : 'i'}}}
                ];

                db.collection('topico').aggregate(query).toArray(function (err, docs) {
                    if(err){
                        winston.error('ocorreu um erro de busca: ', {erro:err});
                        res.status(500).send('erro de busca' + err);
                    }
                    res.status(201).json(docs);
                });
            }
        });
    });

    // Topicos por usuario
    app.get('/topico/usuario/:usuario', function (req, res) {

        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{

                var query = [
                    {$match: {livro:{'$regex' : '^'+ req.params.usuario +'$', '$options' : 'i'}}}
                ];

                db.collection('topico').aggregate(query).toArray(function (err, docs) {
                    if(err){
                        winston.error('ocorreu um erro de busca: ', {erro:err});
                        res.status(500).send('erro de busca' + err);
                      }
                    res.status(201).json(docs);
                });
            }
        });
    });

    app.post('/topico/id/:id/comentario/', (req, res) =>{

        var id = new objectId(req.params.id);
        var comentario = req.body;

        var query = {
            "$addToSet": {"respostas": comentario}
        };

        mongoClient.connect('mongodb://localhost:27017/app_livros', (err, db) =>{
           if(err){
               res.status(500).send(' Ocorreu um erro de conexão: ' + err);
               winston.error(' Ocorreu um erro de conexão', {erro: err});
           } else{
               db.collection('topico').updateOne({"_id":id}, query, function (err, result) {
                   if(err){
                       winston.error('ocorreu um erro de insercao', {erro: err});
                       res.status(500).send('erro de busca: ' + err);
                   }
                   else{
                       res.status(201).json({"valor":"ok"});
                   }
               });
           }
       })
    });

    app.delete('/topico/id/:id/comentario/', (req, res) =>{

        var id = new objectId(req.params.id);
        var comentario = req.body;

        var query = {
            "$pull": {"respostas": comentario}
        };

        mongoClient.connect('mongodb://localhost:27017/app_livros', (err, db) =>{
            if(err){
                res.status(500).send(' Ocorreu um erro de conexão: ' + err);
                winston.error(' Ocorreu um erro de conexão', {erro: err});
            } else{
                db.collection('topico').updateOne({"_id":id}, query, function (err, result) {
                    if(err){
                        winston.error('ocorreu um erro de insercao', {erro: err});
                        res.status(500).send('erro de busca: ' + err);
                    }
                    else{
                        res.status(201).json({"valor":"ok"});
                    }
                });
            }
        })
    });

    app.post('/topico/teste/:id', (req, res) =>{
        var id = req.params.id;
        var objeto = req.body;
        console.log('id: ' + id);
        console.log('objeto: '+ JSON.stringify(objeto));
        res.send('ok');
    })

};