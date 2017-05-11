/**
 * Created by mathias on 04/05/17.
 */
var bodyParser = require('body-parser');
var winston = require('winston');
var argv = require('yargs').argv;

module.exports = function (app) {

    app.use(bodyParser.urlencoded({extended:true}));
    //app.use(bodyParser.urlencoded());

    app.set('view engine', 'ejs');

    app.use(bodyParser.json());

    app.use(function(req, res, next){
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

};