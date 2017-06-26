/**
 * Created by mathi on 20/03/2017.
 */
let http = require('http');
let https = require('https');
let app = require('express')();
let winston = require('winston');
let cors = require('cors');
let fs = require('fs');
let argv = require('yargs').argv;
let porta = argv.porta ? argv.porta : 7004;
let portaHTTPS = argv.portaHTTPS ? argv.portaHTTTS : 443;
let jwt    = require('jsonwebtoken');

let objectId = require('mongodb').ObjectID;
let mongoClient = require('mongodb').MongoClient;

// let logger = require('./config/logger_config')(winston);
let express = require('./config/express_config')(app);

//
// let options = {
//     key  : fs.readFileSync('./chaves/liberep.key'),
//     cert : fs.readFileSync('./chaves/8b521c56e11f0512.crt'),
//     ca: [
//         fs.readFileSync('./chaves/gd_bundle01.crt'),
//         fs.readFileSync('./chaves/gd_bundle02.crt'),
//         fs.readFileSync('./chaves/gd_bundle03.crt')
//     ]
// };


// rotas não protegidas

app.get('/', (req, res) => {
    res.render('../views/index.ejs');
});

app.get('/api', (req, res) => {
    res.render('../views/home.ejs');
});

app.get('/.well-known/pki-validation/*', function (req, res) {
    res.send('65qja5baiiau06v0t1m97ied34');
});

//Pegar uma questão por ID
app.get('/xquestao/id/:id',  (req, res) => {
    console.log('ooiiiii');
    let id = new objectId(req.params.id);

    mongoClient.connect('mongodb://localhost:27017/app_livros', (err, db)  => {
        if(err){
            res.status(500).send('ocorreu um erro de conexão: ' + err);
            winston.error('ocorreu um erro de conexão', {erro: err});
        }
        else{
            db.collection('questao').findOne({'_id':id}, (err, resultado) => {
                if(err){
                    winston.error('ocorreu um erro de busca', {erro: err});
                    res.status(500).send('erro de busca' + err);
                }
                if(resultado == null)
                    res.status(500).send('Erro de busca, nenhum dado encontrado.');
                else{
                    console.log(resultado.questao);
                    // res.send('<html>' + resultado.questao.replace(/\n/g, '</br>') + '</html>');
                    res.send(resultado.questao)
                }

            });
        }
    });
});

require('./rotas/usuario')(app);

app.use( (req, res, next) => {

    let token = req.body.token
        || req.params.token
        || req.headers['x-access-token']
        || req.headers['authorization']
        || req.headers['token'];

    if (token) {

        jwt.verify(token, 'Nao sei o que colocar aqui', (err, decoded) => {
            if (err) {
                // return res.json({ success: false, message: 'Falha na Autenticação do Token' });
                return res.redirect('/#erro');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // return res.status(403).send({
        //     success: false,
        //     message: 'Você precisa prover um token!'
        // });
        return res.redirect('/#erro');
    }
});

// rotas protegidas
require('./rotas/livro')(app);
require('./rotas/questao')(app);
require('./rotas/simulado')(app);
require('./rotas/topico')(app);

// app.listen(porta,  () => {
//     console.log('servidor rodando na porta ' + porta);
// });

http.createServer(app).listen(porta, () =>{console.log('servidor rodando http na porta '+ porta)});
// https.createServer(options, app).listen(portaHTTPS, () =>{console.log('servidor rodando https na porta ' + portaHTTPS)});

module.exports = app;