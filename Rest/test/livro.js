/**
 * Created by mathias on 27/04/17.
 */

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

let livro = {
    titulo: "The Lord of the Rings",
    autor: "J.R.R. Tolkien",
    imagem: "link imagem",
    descricao: " descricao livro ",
    ano: 1954
}

chai.use(chaiHttp);

describe('Livros', () => {

    describe('GET /livros', () => {
        it(' Deverá retornar um array de livros ', (done) => {
            chai.request(server)
                .get('/livros')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('POST /livro', ()=> {
        it('Deverá persistir um novo livro no sistema', (done) => {

            chai.request(server)
                .post('/livro')
                .send(livro)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.dados_inseridos.should.have.property('titulo');
                    res.body.dados_inseridos.should.have.property('ano');
                    res.body.dados_inseridos.should.have.property('descricao');
                    res.body.dados_inseridos.should.have.property('autor');
                    res.body.links.should.be.a('array');
                    done();
                });
        });
    });

    describe('GET /livro/id/:id', ()=> {
        it('Deverá resgatar um livro pelo _id', (done)=>{

            chai.request(server)
                .post('/livro')
                .send(livro)
                .end((err, res) => {

                let id = res.body.dados_inseridos._id;

                    chai.request(server)
                        .get('/livro/id/' + id)
                        .end((err, res) => {
                            res.body.should.have.property('_id').eq(id);
                            res.should.have.status(201);
                            done();
                        });

                });
        });
    });

    describe('DELETE /livro/id/:id', ()=> {
        it('Deverá deletar um dados inserido anteriormente', (done)=>{

            chai.request(server)
                .post('/livro')
                .send(livro)
                .end((err, res) => {
                    let id = res.body.dados_inseridos._id;
                    chai.request(server)
                        .delete('/livro/id/' + id)
                        .end((err, res) => {
                            res.body.should.have.property('situacao').eq('removido');
                            res.should.have.status(201);
                            done();
                        });

                });
        });
    });

    describe('GET /livros/universidade/:universidade', ()=> {
        it('Testa se a rota está ativa e retornando um array', (done)=>{
            chai.request(server)
                .get('/livros/universidade/fuvest')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

});