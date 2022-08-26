const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const EnumTestData = require('./support/enum/EnumTestData');

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
            chai.request(server)
                .get("/account")
                .set('cpf', EnumTestData.VALID_AND_EXISTING_ACCOUNT_CPF)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(EnumTestData.ARRAY_KEYS_BODY_GET_ACCOUNT);
                    response.body.should.have.property('cpf').eql(EnumTestData.VALID_AND_EXISTING_ACCOUNT_CPF);
                    done();
                })
        });

        it('it should get an error object when account is not found (404)', (done) => {
            chai.request(server)
                .get("/account")
                .set('cpf', EnumTestData.VALID_AND_NON_EXISTENT_ACCOUNT_CPF)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(EnumTestData.ARRAY_KEYS_OBJECT_ERROR);
                    done();
                })
        });

        it('it should get a validation error object when cpf is invalid - JOI (422)', (done) => {
            chai.request(server)
                .get("/account")
                .set('cpf', EnumTestData.INVALID_CPF)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(EnumTestData.ARRAY_KEYS_OBJECT_ERROR);
                    done();
                })
        });

        it('it should get a validation error object when cpf is missing - JOI (422)', (done) => {
            chai.request(server)
                .get("/account")
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(EnumTestData.ARRAY_KEYS_OBJECT_ERROR);
                    done();
                })
        });
    });

    describe ('POST /account', function() {
        it('it should POST an account (200)', (done) => {           
            chai.request(server)
                .post("/account")
                .send(EnumTestData.BODY_FULL_POST_SUCCESS)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                })
        });

        it('it should get an error object when trying POST an account with unique key duplicated (406)', (done) => {
            chai.request(server)
                .post("/account")
                .send(EnumTestData.BODY_FULL_POST_DUPLICATED_KEY)
                .end((err, response) => {
                    response.should.have.status(406);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(EnumTestData.ARRAY_KEYS_OBJECT_ERROR);
                    done();
                })
        });
    });

    describe ('PUT /account', function() {
        it('it should PUT an account (200)', (done) => {
            chai.request(server)
                .put("/account")
                .set('cpf', EnumTestData.VALID_AND_EXISTING_ACCOUNT_CPF)
                .send(EnumTestData.BODY_FULL_PUT_SUCCESS)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                })
        });

        it('it should get an error object when trying PUT an account with unique key duplicated (406)', (done) => {
            chai.request(server)
                .put("/account")
                .set('cpf', EnumTestData.VALID_AND_EXISTING_ACCOUNT_CPF)
                .send(EnumTestData.BODY_FULL_PUT_DUPLICATED_KEY)
                .end((err, response) => {
                    response.should.have.status(406);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(EnumTestData.ARRAY_KEYS_OBJECT_ERROR);
                    done();
                })
        });

        it('it should get an error object when account is not found (404)', (done) => {
            chai.request(server)
                .put("/account")
                .set('cpf', EnumTestData.VALID_AND_NON_EXISTENT_ACCOUNT_CPF)
                .send(EnumTestData.BODY_FULL_PUT_SUCCESS)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.includes.all.keys(EnumTestData.ARRAY_KEYS_OBJECT_ERROR);
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