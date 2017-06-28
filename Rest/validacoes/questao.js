/**
 * Created by mathias on 28/06/17.
 */
function validacaoQuestao (questao){

    let valido;
    let erro;

    if(!questao.questao ||
        !questao.resposta ||
        !questao.alternativas ||
        !questao.livro){

        valido = false;
        erro = 'Preencha todos os campos obrigatórios: Questao, Resposta, Alternativa, Universidade e Livro'
    } else if (!Array.isArray(questao.alternativas)){
        valido = false;
        erro = 'Alternativas deve ser um array'
    } else if(questao.alternativas.length < 1){
        valido = false;
        erro = 'Seu questão deve contar mais do que apenas uma alternativa.'
    }
    return {
        valido: valido,
        mensagem: erro
    };
}

module.exports = validacaoQuestao;