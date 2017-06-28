/**
 * Created by mathi on 20/03/2017.
 */
let http = require('http');
let https = require('https');
let app = require('express')();
let winston = require('winston');
let fs = require('fs');
let jwt    = require('jsonwebtoken');

let argv = require('yargs').argv;
let porta = argv.porta ? argv.porta : 7004;
let portaHTTPS = argv.portaHTTPS ? argv.portaHTTTS : 443;
let onHttps = argv.onHttps ? argv.onHttps : "true";

// let logger = require('./config/logger_config')(winston);
let express = require('./config/express_config')(app);

// if(onHttps ==="true"){
//     app.use( (req, res, next) => {
//         if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//             return res.redirect('https://' + req.get('host') + req.url);
//         }
//         next();
//     });
// }

app.get('/', (req, res) => {
    res.render('../views/index.ejs');
});

app.get('/api', (req, res) => {
    res.render('../views/home.ejs');
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

app.get('/admin', (req, res) =>{
    if(req.decoded.admin === true){
        res.send('é admin')
    } else {
        res.send('não é admin');
    }
});


http.createServer(app)
    .listen(porta, () =>{
        console.log('servidor rodando http na porta '+ porta)
    });

if(onHttps === "true"){

    let options = {
        key  : fs.readFileSync('./chaves/liberep.key'),
        cert : fs.readFileSync('./chaves/8b521c56e11f0512.crt'),
        ca: [
            fs.readFileSync('./chaves/gd_bundle01.crt'),
            fs.readFileSync('./chaves/gd_bundle02.crt'),
            fs.readFileSync('./chaves/gd_bundle03.crt')
        ]
    };

    https.createServer(options, app)
        .listen(portaHTTPS, () =>{
            console.log('servidor rodando https na porta ' + portaHTTPS)
        });
}

module.exports = app;