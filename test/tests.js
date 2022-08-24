const chai  = require('chai');
const chaiHttp  = require('chai-http');
const server  = require('../src/index');
const RandomGenerate  = require('../src/support/util/RandomGenerate');
const ManageError  = require('../src/support/util/ManageError');

//assertion style
chai.should();

chai.use(chaiHttp);

const VALID_AND_EXISTING_ACCOUNT_CPF = '84293271007';
const VALID_AND_NON_EXISTENT_ACCOUNT_CPF = '18925985071';
const INVALID_CPF = '02303950521';
const ARRAY_KEYS_OBJECT_ERROR = Object.keys(ManageError.objectError());

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
        const cpf = VALID_AND_EXISTING_ACCOUNT_CPF;
        it('it should GET an account by a valid cpf (200)', (done) => {
            chai.request(server)
                .get("/account")
                .set('cpf', cpf)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys([
                        'cpf',
                        'email',
                        'cellphone',
                        'firstName',
                        'lastName',
                        'createdAt',
                        'updatedAt'
                    ]);
                    response.body.should.have.property('cpf').eql(cpf);
                    done();
                })
        });

        it('it should get an error object when account is not found (404)', (done) => {
            chai.request(server)
                .get("/account")
                .set('cpf', VALID_AND_NON_EXISTENT_ACCOUNT_CPF)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(ARRAY_KEYS_OBJECT_ERROR);
                    done();
                })
        });

        it('it should get a validation error object when cpf is invalid - JOI (422)', (done) => {
            chai.request(server)
                .get("/account")
                .set('cpf', INVALID_CPF)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(ARRAY_KEYS_OBJECT_ERROR);
                    done();
                })
        });

        it('it should get a validation error object when cpf is missing - JOI (422)', (done) => {
            chai.request(server)
                .get("/account")
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(ARRAY_KEYS_OBJECT_ERROR);
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
                email: RandomGenerate.email(),
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
                    response.body.should.includes.all.keys(ARRAY_KEYS_OBJECT_ERROR);
                    done();
                })
        });
    });

    describe ('PUT /account', function() {
        it('it should PUT an account (200)', (done) => {
            const account = {
                firstName: RandomGenerate.name(),
                lastName: RandomGenerate.name(),
                email: RandomGenerate.email(),
                cellphone: RandomGenerate.cellphone()
            }

            chai.request(server)
                .put("/account")
                .set('cpf', VALID_AND_EXISTING_ACCOUNT_CPF)
                .send(account)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                })
        });

        it('it should get an error object when trying PUT an account with unique key duplicated (406)', (done) => {
            const account = {
                firstName: "Bruna",
                lastName: "Silva",
                email: "brunasilva@gmail.com",
                cellphone: "77991998771"
            }
            chai.request(server)
                .put("/account")
                .set('cpf', VALID_AND_EXISTING_ACCOUNT_CPF)
                .send(account)
                .end((err, response) => {
                    response.should.have.status(406);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(ARRAY_KEYS_OBJECT_ERROR);
                    done();
                })
        });

        it('it should get an error object when account is not found (404)', (done) => {
            const account = {
                firstName: "Bruna",
                lastName: "Silva",
                email: "brunasilva@gmail.com",
                cellphone: "77991998771"
            }

            chai.request(server)
                .put("/account")
                .set('cpf', VALID_AND_NON_EXISTENT_ACCOUNT_CPF)
                .send(account)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(ARRAY_KEYS_OBJECT_ERROR);
                    done();
                })
        });
    });
});

describe('Category', function() {
    describe ('GET /categorie', function() {
        it('it should GET all categories (200)', (done) => {
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
        it('it should GET all statements (200)', (done) => {
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