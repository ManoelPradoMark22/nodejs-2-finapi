const chai  = require('chai');
const chaiHttp  = require('chai-http');
const server  = require('../src/index');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Account', function() {
    describe ('GET /all-accounts', function() {
        it('it should GET all accounts', (done) => {
            chai.request(server)
                .get("/all-accounts")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
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