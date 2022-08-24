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
                    response.body.should.includes.all.keys(['name', 'httpStatusCode', 'context', 'duplicatedFields']);
                    done();
                })
        });

        it('it should get an error object when trying PUT a non existent account cpf (404)', (done) => {
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
                  response.body.should.includes.all.keys(['name', 'httpStatusCode', 'context']);
                  done();
              })
      });
    });
});
