const chai  = require('chai');
const chaiHttp  = require('chai-http');
const server  = require('../src/index');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Account', function() {
    describe ('GET /all-accounts', function() {
        it('it should GET all accounts (200)', (done) => {
            chai.request(server)
                .get("/all-accounts")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        });
    });

    describe ('GET /account', function() {
        it('it should GET an account by a valid cpf (200)', (done) => {
            const cpf = '06350390520';
            chai.request(server)
                .get("/account")
                .set('cpf', cpf)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                })
        });

        it('it should get an error object when account is not found (422)', (done) => {
            const cpf = '18925985071';
            chai.request(server)
                .get("/account")
                .set('cpf', cpf)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a('object');
                    done();
                })
        });

        it('it should get a validation object when cpf is invalid - JOI (422)', (done) => {
            const cpf = '06350390521';
            chai.request(server)
                .get("/account")
                .set('cpf', cpf)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a('object');
                    done();
                })
        });

        it('it should get a validation object when cpf is missing - JOI (422)', (done) => {
            chai.request(server)
                .get("/account")
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a('object');
                    done();
                })
        });
    });
});

describe('Category', function() {
    describe ('GET /categorie', function() {
        it('it should GET all categories', (done) => {
            chai.request(server)
                .get("/categorie")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        });
    });
});

describe('Statement', function() {
    describe ('GET /all-statements', function() {
        it('it should GET all statements', (done) => {
            chai.request(server)
                .get("/all-statements")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        });
    });
});