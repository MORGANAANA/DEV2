/**
 * Created by mathias on 04/05/17.
 */
var winston = require('winston');
var fs = require('fs');
//var ip = require('os').networkInterfaces().lo[0].address;
var ip = "localhost";


module.exports = function (winston) {
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({ filename: 'somefile.log' })
        ]
    });

    var dadosLog ={
        data: new Date(),
        computer: require('os').hostname(),
        ipComputer: ip
    };

    logger.warn('Servidor Inicializado', dadosLog);
};