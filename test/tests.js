const chai  = require('chai');
const chaiHttp  = require('chai-http');
const server  = require('../src/index');
const RandomGenerate  = require('../src/support/util/RandomGenerate');

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

        it('it should get an error object when account is not found (404)', (done) => {
            const cpf = '18925985071';
            chai.request(server)
                .get("/account")
                .set('cpf', cpf)
                .end((err, response) => {
                    response.should.have.status(404);
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

    describe ('POST /account', function() {
        it('it should POST an account (200)', (done) => {           
            const account = {
                firstName: RandomGenerate.name(),
                lastName: RandomGenerate.name(),
                cpf: RandomGenerate.cpf(),
                email: `${RandomGenerate.name()}@gmail.com`,
                cellphone: RandomGenerate.cellphone()
            }
            chai.request(server)
                .post("/account")
                .send(account)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                })
        });

        it('it should get an error object when trying POST an account with unique key duplicated (406)', (done) => {
            const account = {
                firstName: "Bruna",
                lastName: "Silva",
                cpf: "97728322087",
                email: "brunasilva@gmail.com",
                cellphone: "77991998771"
            }
            chai.request(server)
                .post("/account")
                .send(account)
                .end((err, response) => {
                    response.should.have.status(406);
                    response.body.should.be.a('object');
                    done();
                })
        });
    });

    describe ('PUT /account', function() {
        const account = {
            firstName: "Bruna",
            lastName: "Silva",
            email: "brunasilva@gmail.com",
            cellphone: "77991998771"
        }

        const cpf = '18925985071';

        it('it should get an error object when account is not found (404)', (done) => {
            chai.request(server)
                .put("/account")
                .set('cpf', cpf)
                .send(account)
                .end((err, response) => {
                    response.should.have.status(404);
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