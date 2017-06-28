/**
 * Created by mathias on 28/06/17.
 */
function isEmailValid(email) {
    const regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regx.test(email);
}

function validacaoUsuario(usuario) {

    let valido = true;
    let erro = "";

    if(!usuario.email || !usuario.senha){
        valido= false;
        erro = "Preencha todos os campos";
    } else if (!isEmailValid(usuario.email)) {
        valido = false;
        erro = "Forneça um email válido"
    } else if (usuario.senha.length < 5) {
        valido = false;
        erro = "Senha muito curta";
    }

    return {
        valido: valido,
        mensagem: erro
    };
}

module.exports = validacaoUsuario;