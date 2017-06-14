/**
 * Created by mathias on 04/05/17.
 */

let mongoClient = require('mongodb').MongoClient;
let objectId = require('mongodb').ObjectID;
let ip = "localhost";
let winston = require('winston');
let argv = require('yargs').argv;
let porta = argv.porta ? argv.porta : 7001;

module.exports = (app) => {

    // LIVROS

    //Pegar um livro pelo ID
    app.get('/livro/id/:id', (req, res) => {
        let id = new objectId(req.params.id);

        mongoClient.connect('mongodb://localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('livro').findOne({'_id':id}, (err, resultado) => {
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

    // Pegar todos os livros
    app.get('/livros', (req, res) => {
        mongoClient.connect('mongodb://localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('livro').find({}).toArray( (err, docs) => {
                    if(err){
                        winston.error('ocorreu um erro de busca', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    res.status(201).json(docs);
                });
            }
        });
    });

    // Deletar um arquivo pelo ID
    app.delete('/livro/id/:id', (req, res) => {
        let id = new objectId(req.params.id);

        mongoClient.connect('mongodb://localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('livro').deleteOne({'_id':id}, (err, resultado) => {
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
                        };
                        res.status(201).json(resposta);
                    }
                });
            }
        });
    });

    // Adicionar um livro no banco, Body Raw JSON!
    app.post('/livro', (req, res) => {
        let meuLivro = req.body;

        mongoClient.connect('mongodb://localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('livro').insertOne(meuLivro, (err) => {
                    if(err){
                        winston.error('ocorreu um erro de insercao', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    else{

                        let response = {
                            dados_inseridos: meuLivro,
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

    // Listagem de livros Por Universidade
    app.get('/livros/universidade/:universidade', (req, res) => {
        mongoClient.connect('mongodb://localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('questao').aggregate([
                    {$match: {universidade: {'$regex' : '^' + req.params.universidade +'$', '$options' : 'i'} }},
                    {$group: {_id : "$livro"}},
                    {$lookup: { from: "livro", localField: "_id", foreignField: "titulo", as: "livro"}},
                    { "$project": {"_id": 1, "livro": { "$arrayElemAt": [ "$livro", 0 ] }}}
                ]).toArray( (err, docs) => {

                    if(err){
                        winston.error('ocorreu um erro de busca', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    if(docs.length == 0){
                        winston.error('ocorreu um erro de busca', {erro: 'Nenhum resultado'});
                        res.status(500).send('Erro de busca: ' + 'Nenhum resultado encontrado');
                    }

                    res.status(201).json(docs);


                });
            }
        });
    });

};