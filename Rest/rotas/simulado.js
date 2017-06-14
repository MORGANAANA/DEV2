/**
 * Created by mathias on 04/05/17.
 */

let mongoClient = require('mongodb').MongoClient;
let winston = require('winston');
let fs = require('fs');
let ip = "localhost";
let argv = require('yargs').argv;
let porta = argv.porta ? argv.porta : 7001;

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
                db.collection('simulado').insertOne(resultado, (err) => {
                    if(err){
                        winston.error('ocorreu um erro de insercao', {erro: err});
                        res.status(500).send('erro de busca' + err);
                    }
                    else{
                        res.status(201).json(resultado);
                    }
                });
            }
        });

    });

    app.get('/simulado/resultados/:usuario', (req, res) => {

        let usuario = req.params.usuario;
        // let quantidade = parseInt(req.params.quantidade);

        let queryTotal = [
            {
                $match: {
                    usuario: usuario
                }
            },{
                $group: {
                    _id: "$usuario",
                    nAcertoTotais: {
                        $sum: "$nAcerto" },
                    nQuestoesTotais: {
                        $sum: "$nQuestoes"
                    }
                }
            }];

        let queryUniversidade = [
            { $match: { usuario: usuario } },
            { $group: { _id: "$universidade",
                nAcerto: { $sum: "$nAcerto" },
                nQuestoes: {$sum: "$nQuestoes"}
            }
            }
        ];

        let queryTempo = {
            'usuario': usuario
        };

        let projectionQueryTempo = {
            _id: false,
            usuario: false,
            universidade: false
        };

        mongoClient.connect('mongodb://localhost:27017/app_livros', (err, db) => {
            if(err){
                winston.error('ocorreu um erro de conexão ', {erro:err});
                res.status(500).send('ocorreu um erro de conexão: ' + err);
            } else {
                db.collection('simulado').aggregate(queryUniversidade).toArray( (err, docsUniversidade) => {
                    if(err){
                        winston.error('ocorreu um erro de busca: ', {erro:err});
                        res.status(500).send('erro de busca' + err);
                    }

                    db.collection('simulado').aggregate(queryTotal).toArray( (err, docsTotal) => {
                        if(err){
                            winston.error('ocorreu um erro de busca: ', {erro:err});
                            res.status(500).send('erro de busca' + err);
                        }

                        let resultados = db.collection('simulado').find(queryTempo)
                            .project(projectionQueryTempo)
                            .limit(5);

                        resultados.toArray((err, docsTempo)=>{

                            let resultadoFinal = {
                                "graficoGeral": docsTotal[0],
                                "graficoUniversidade": docsUniversidade,
                                "graficoTempo": docsTempo
                            };

                            res.status(201).json(resultadoFinal);
                        });
                    });

                });
            }
        });
    });

};