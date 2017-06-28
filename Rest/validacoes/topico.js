/**
 * Created by mathias on 28/06/17.
 */
function validacaoTopico (topico) {

    let valido = true;
    let erro = "";

    if(!topico.titulo || !topico.descricao || !topico.usuario || !topico.livro) {
        valido = false;
        erro = "Preencha todos os campos obrigatórios: Título, Descrição, Usuário, Livro";
    } else if (topico.titulo.length > 100){
        valido = false;
        erro = "O título não pode conter mais de 100 caracteres";
    } else  if (topico.descricao.length > 1000 ) {
        valido = false;
        erro = "A descrição não pode conter mais que 1000 caracteres";
    } else if (topico.usuario.length < 3) {
        valido = false;
        erro = "Usuario tem muito poucos caracteres";
    }

    return {
        valido: valido,
        mensagem: erro
    };
}

module.exports = validacaoTopico;