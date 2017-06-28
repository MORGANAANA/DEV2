/**
 * Created by mathias on 04/05/17.
 */
let mongoClient = require('mongodb').MongoClient;
let objectId = require('mongodb').ObjectID;
let winston = require('winston');
let fs = require('fs');
let ip = "localhost";
let argv = require('yargs').argv;
let porta = argv.porta ? argv.porta : 7001;
let validacaoTopico = require('../validacoes/topico');

module.exports =  (app) => {

    //TOPICOS

    // Adicionar tópico no sistema
    app.post('/topico', (req, res) => {

        let topico = req.body;

        let retornoValidacao = validacaoTopico(topico);

        if(!retornoValidacao.valido){
            res.json(400, {
                sucesso: false,
                mensagem: retornoValidacao.mensagem
            });
            return;
        }

        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros',  (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('topico').insertOne(topico,  (err) => {
                    if(err){
                        winston.error('ocorreu um erro de insercao', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    else{

                        let response = {
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
    app.get('/topico/id/:id',  (req, res) => {
        let id = new objectId(req.params.id);

        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('topico').findOne({'_id':id}, (err, resultado) => {
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
    app.delete('/topico/id/:id', (req, res) => {
        let id = new objectId(req.params.id);

        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('topico').deleteOne({'_id':id}, (err, resultado) => {
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
    app.get('/topico/livro/:livro', (req, res) => {

        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{

                let query = [
                    {$match: {livro:{'$regex' : '^'+ req.params.livro +'$', '$options' : 'i'}}}
                ];

                db.collection('topico').aggregate(query).toArray( (err, docs) => {
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
    app.get('/topico/usuario/:usuario', (req, res) => {

        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{

                let query = [
                    {$match: {livro:{'$regex' : '^'+ req.params.usuario +'$', '$options' : 'i'}}}
                ];

                db.collection('topico').aggregate(query).toArray( (err, docs) => {
                    if(err){
                        winston.error('ocorreu um erro de busca: ', {erro:err});
                        res.status(500).send('erro de busca' + err);
                    }
                    res.status(201).json(docs);
                });
            }
        });
    });

    app.post('/topico/id/:id/comentario/', (req, res) => {

        let id = new objectId(req.params.id);
        let comentario = req.body;

        let query = {
            "$addToSet": {"respostas": comentario}
        };

        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros', (err, db) =>{
            if(err){
                winston.error(' Ocorreu um erro de conexão', {erro: err});
                res.status(500).send(' Ocorreu um erro de conexão: ' + err);
            } else{
                db.collection('topico').updateOne({"_id":id}, query, (err, result) => {
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

    app.delete('/topico/id/:id/comentario/', (req, res) => {

        let id = new objectId(req.params.id);
        let comentario = req.body;

        let query = {
            "$pull": {"respostas": comentario}
        };

        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros', (err, db) =>{
            if(err){
                res.status(500).send(' Ocorreu um erro de conexão: ' + err);
                winston.error(' Ocorreu um erro de conexão', {erro: err});
            } else{
                db.collection('topico').updateOne({"_id":id}, query,  (err, result) => {
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

    app.get('/topicos', (req, res) => {
        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros', (err, db) => {
            if(err){
                winston.error('ocorreu um erro de conexão ', {erro:err});
                res.status(500).send('ocorreu um erro de conexão: ' + err);
            } else {
                db.collection('topico').find({}).toArray(function (err, docs) {
                    if(err){
                        winston.error('ocorreu um erro de busca: ', {erro:err});
                        res.status(500).send('erro de busca' + err);
                    }
                    res.status(201).json(docs);
                });
            }
        });
    });
};