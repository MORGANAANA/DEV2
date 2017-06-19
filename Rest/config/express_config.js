/**
 * Created by mathias on 04/05/17.
 */
let bodyParser = require('body-parser');
let winston = require('winston');
let express = require('express');
let mongan = require('morgan');
let cors = require('cors');

module.exports = (app) => {

    app.use(bodyParser.urlencoded({extended:true}));
    //app.use(bodyParser.urlencoded());

    app.set('view engine', 'ejs');

    app.use(bodyParser.json());

    app.use(express.static('./public'));

    app.use(cors());

    app.use(mongan('dev'));

    app.use( (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
};