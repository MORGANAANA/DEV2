/**
 * Created by mathias on 04/05/17.
 */
var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var winston = require('winston');
var ip = require('os').networkInterfaces().lo[0].address;
var argv = require('yargs').argv;
var porta = argv.porta ? argv.porta : 7001;

module.exports = function (app) {

    //QUESTOES

    // Questões de um livro agrupado por universidade
    app.get('/questoes/livro/:livro', function (req, res) {
        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                winston.error('ocorreu um erro de conexão ', {erro:err});
                res.status(500).send('ocorreu um erro de conexão: ' + err);
            } else {

                var query = [
                    {$match: {livro:{'$regex' : '^'+ req.params.livro +'$', '$options' : 'i'}}},
                    {$group: {_id : "$universidade", qtdd_Questoes: { $sum: 1 }, questoes: {$addToSet: {
                        questao: "$questao",
                        alternativas: "$alternativas",
                        resposta: "$resposta"
                    }}}}
                ];

                db.collection('questao').aggregate(query).toArray(function (err, docs) {
                    if(err){
                        winston.error('ocorreu um erro de busca: ', {erro:err});
                        res.status(500).send('erro de busca' + err);
                    }
                    res.status(201).json(docs);
                });
            }
        });
    });

    // Adicionar uma questao no banco
    app.post('/questao',function (req, res) {
        // res.send('está funcionando');

        var questao = req.body;

        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('questao').insertOne(questao, function (err) {
                    if(err){
                        winston.error('ocorreu um erro de insercao', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    else{

                        var response = {
                            dados_inseridos: questao,
                            links: [
                                {
                                    href:'http://' + ip + ':'+ porta +'/questao/id/' + questao._id,
                                    rel: 'DADOS',
                                    method: 'GET'
                                },
                                {
                                    href:'http://' + ip + ':'+ porta +'/questao/id/' + questao._id,
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

    //Pegar todos as questões
    app.get('/questoes', function (req, res) {
        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                winston.error('ocorreu um erro de conexão ', {erro:err});
                res.status(500).send('ocorreu um erro de conexão: ' + err);
            } else {
                db.collection('questao').find({}).toArray(function (err, docs) {
                    if(err){
                        winston.error('ocorreu um erro de busca: ', {erro:err});
                        res.status(500).send('erro de busca' + err);
                    }
                    res.status(201).json(docs);
                });
            }
        });
    });

    //Pegar uma questão por ID
    app.get('/questao/id/:id', function (req, res){
        var id = new objectId(req.params.id);

        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('questao').findOne({'_id':id}, function (err, resultado) {
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

    // Deletar um questão por ID
    app.delete('/questao/id/:id', function (req, res) {
        var id = new objectId(req.params.id);

        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('questao').deleteOne({'_id':id}, function (err, resultado) {
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

    // listagem de UNIVERSIDADES
    app.get('/universidades', function (req, res) {
        mongoClient.connect('mongodb://localhost:27017/app_livros', function (err, db) {
            if(err){
                winston.error('ocorreu um erro de conexão ', {erro:err});
                res.status(500).send('ocorreu um erro de conexão: ' + err);
            } else {
                db.collection('questao').aggregate([{
                    $group: {_id : "$universidade", qnt_questoes: { $sum: 1 }}
                }]).toArray(function (err, docs) {
                    if(err){
                        winston.error('ocorreu um erro de busca: ', {erro:err});
                        res.status(500).send('erro de busca' + err);
                    }
                    res.status(201).json(docs);
                    // console.log('dados da query: ' + docs);
                });
            }
        });
    });


};