/**
 * Created by Portal on 17/05/2017.
 */
var sha = require('sha256');
var jwt    = require('jsonwebtoken');

module.exports = (app) => {

    app.post('/login',function(req,res){

        var usuario = req.body;

        if(usuario.email == "fulano@gmail.com" && usuario.senha == "minhasenha") {

            var token = jwt.sign(usuario, app.get("secret"), {expiresIn: '1h'});

            var resposta = {
                'sucesso': true,
                'token': token
            }

            res.status(201).json(resposta);
        }else{

            res.status(401);
        }
    });

}
