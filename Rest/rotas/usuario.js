/**
 * Created by Portal on 17/05/2017.
 */
let mongoClient = require('mongodb').MongoClient;
let winston = require('winston');
let ejs = require('ejs');
let fs = require('fs');
let jwt = require('jsonwebtoken');
let objectId = require('mongodb').ObjectID;
let NodeMailer = require('../servicos/NodeMailer/NodeMailer');
let validacaoUsuario = require('../validacoes/usuario');
let crypto = require('bcrypt');

module.exports = (app) => {

    app.get('/usuario/ativar/:id', (req, res) =>{
        let id = new objectId(req.params.id);

        let query ={
            '$set': {
                ativado: true
            }
        };

        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros', (err, db) =>{
            if(err){
                res.status(500).send(' Ocorreu um erro de conexão: ' + err);
            } else {
                db.collection('usuario').findOneAndUpdate({_id: id}, query, (erro, result)=>{
                    if(erro){
                        res.status(500).send(' Ocorreu um erro de conexão: ' + err);
                    } else {
                        db.collection('usuario').findOne({_id: id}, function (err, usuario) {
                            const mailer = new NodeMailer();
                            mailer.setTemplate('./views/email/bem-vindo.ejs');
                            mailer.setTo(usuario.login);
                            mailer.setSubject('Conta Ativada o/');
                            mailer.enviarEmail();
                        });
                        res.redirect('/#ativo');
                    }
                });
            }

        });

    });

    app.post('/usuario/login', (req, res) => {

        let nome =  req.body.nome ||
            req.body.user ||
            req.body.usuario ||
            req.body.email ||
            req.body.login;

        let senha = req.body.senha ||
            req.body.password;

        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            }
            else{
                db.collection('usuario').findOne({login: nome}, (err, user) => {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: 'Autenticação falhou. Usuário não encontrado' });
                    } else if (user) {

                        if(user.ativado == false){
                            res.json({ success: false, message: 'Você precisa ativar sua conta.' });
                            return;
                        }

                        // check if password matches
                        if (!crypto.compareSync(senha, user.senha)) {
                            res.json({ success: false, message: 'Autenticação falhou. Senha incorreta' });
                        } else {

                            // if user is found and password is right
                            // create a token
                            let token = jwt.sign(user, 'Nao sei o que colocar aqui', {
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

    app.post('/usuario/registro', (req, res) => {

        let dados = req.body;
        let retornoValidacao = validacaoUsuario(dados);

        if (!retornoValidacao.valido){
            res.json(400, {
                sucesso: false,
                mensagem: retornoValidacao.mensagem
            });
            return;
        }


        mongoClient.connect('mongodb://administrador:123_node@localhost:27017/app_livros', (err, db) => {
            if(err){
                res.status(500).send('ocorreu um erro de conexão: ' + err);
                winston.error('ocorreu um erro de conexão', {erro: err});
            } else {

                let query = {
                    login: dados.nome || dados.login || dados.usuario || dados.email,
                    senha: crypto.hashSync(dados.senha, 5),
                    ativado: false,
                    email: dados.email
                };

                db.collection('usuario').findOne({login: query.login}, function (erroFind, dadosFind) {
                    if(erroFind){
                        console.log("Erro: " + erroFind);
                    }
                    console.log("-----" + dadosFind);
                    if (dadosFind === null){
                        db.collection('usuario').insertOne(query, (erro) => {
                            if(erro){
                                winston.error('ocorreu um erro de insercao', {erro: erro});
                                res.status(500).send('usuario já existe');
                            } else{

                                const mailer = new NodeMailer();
                                mailer.setTemplate('./views/email/ative.ejs');
                                mailer.setSubject('Ative sua Conta');
                                mailer.setTo(query.login);
                                mailer.setMensagens({
                                    url: 'https://www.liberep.com/usuario/ativar/' + query._id
                                });
                                mailer.enviarEmail();


                                let response = {
                                    usuario_inserido: query,
                                    urlAtivacao: '/usuario/ativar' + query._id
                                };
                                res.status(201).json(response);
                            }
                        });
                    } else {
                        res.json({
                            'erro': 'usuario já existe'
                        });
                    }
                });
            }
        })
    });

};
