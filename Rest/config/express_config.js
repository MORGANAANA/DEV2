/**
 * Created by mathias on 04/05/17.
 */
var bodyParser = require('body-parser');
var winston = require('winston');
var argv = require('yargs').argv;
var jwt = require('jsonwebtoken');
var express = require('express');
var mongan = require('morgan');
var cors = require('cors');

module.exports = function (app) {

    app.use(bodyParser.urlencoded({extended:true}));
    //app.use(bodyParser.urlencoded());

    app.set('view engine', 'ejs');

    app.use(bodyParser.json());

    app.use(cors());

    app.use(mongan('dev'));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    // app.set('secret', 'superultrapalavrapasse');

    // var routes = express.Router();
    //
    // routes.use(function(req,res,next){
    //
    //     var token = req.body.token || req.headers['x-access-token'] ;
    //
    //     if(token){
    //
    //         jwt.verify(token,app.get('secret'),function(err, decoded){
    //
    //             if(err){
    //
    //                 return res.json({'sucesso':false});
    //
    //             }else{
    //                 req.decoded = decoded;
    //                 next();
    //             }
    //         })
    //
    //     }else{
    //         return res.status(403).send({'sucesso':false});
    //     }
    //
    // })
    //
    // app.use('/inicial', routes);

};