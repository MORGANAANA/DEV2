/**
 * Created by mathias on 04/05/17.
 */

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

let questao = {
    "questao":"Sobre o livro X responda:"
    ,"alternativas":[
        "Alternativa A",
        "Alternativa B",
        "Alternativa C",
        "Alternativa D",
        "Alternativa E",
    ],
    "resposta":"Alternativa B",}

chai.use(chaiHttp);

describe('Questoes', () => {

    describe('GET /questoes', () => {
        it(' Deverá retornar um array de questoes ', (done) => {
            chai.request(server)
                .get('/questoes')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('POST /questao', ()=> {
        it('Deverá persistir um nova questao no sistema', (done) => {

            chai.request(server)
                .post('/questao')
                .send(questao)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.dados_inseridos.should.have.property('questao');
                    res.body.dados_inseridos.should.have.property('alternativas');
                    res.body.links.should.be.a('array');
                    done();
                });
        });
    });

    describe('GET /questao/id/:id', ()=> {
        it('Deverá resgatar uma questao pelo _id', (done)=>{

            chai.request(server)
                .post('/questao')
                .send(questao)
                .end((err, res) => {
                    let id = res.body.dados_inseridos._id;
                    chai.request(server)
                        .get('/questao/id/' + id)
                        .end((err, res) => {
                            res.body.should.have.property('_id').eq(id);
                            res.should.have.status(201);
                            done();
                        });

                });
        });
    });

    describe('DELETE /questao/id/:id', ()=> {
        it('Deverá deletar uma questao inserida anteriormente', (done)=>{

            chai.request(server)
                .post('/questao')
                .send(questao)
                .end((err, res) => {
                    let id = res.body.dados_inseridos._id;
                    chai.request(server)
                        .delete('/questao/id/' + id)
                        .end((err, res) => {
                            res.body.should.have.property('situacao').eq('removido');
                            res.should.have.status(201);
                            done();
                        });

                });
        });
    });

    describe('GET /questoes/livro/:livro', ()=> {
        it('Agrupa questões por livros retornando um array', (done)=>{

            chai.request(server)
                .get('/questoes/livro/qualquerLivro')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('GET /universidades', ()=> {
        it('Retorna um array contendo as universidades', (done)=>{

            chai.request(server)
                .get('/universidades')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

});