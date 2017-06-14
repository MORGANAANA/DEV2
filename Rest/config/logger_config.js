/**
 * Created by mathias on 04/05/17.
 */
let winston = require('winston');
let fs = require('fs');
let ip = "localhost";


module.exports = (winston) => {

    let logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({ filename: 'somefile.log' })
        ]
    });

    let dadosLog ={
        data: new Date(),
        computer: require('os').hostname(),
        ipComputer: ip
    };

    logger.warn('Servidor Inicializado', dadosLog);
};