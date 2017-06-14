/**
 * Created by mathias on 05/06/17.
 */
'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'aplicativoliberep@gmail.com',
        pass: 'mgrossagrossa'
    }
});

module.exports = transporter;