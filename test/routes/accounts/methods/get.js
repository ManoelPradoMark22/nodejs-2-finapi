const { chai, server, testData } = require('../../../config/TestConfig');

module.exports = () => describe ('GET', () => {
  it('it should GET an account by a valid cpf (200)', (done) => {
    chai.request(server)
      .get("/account")
      .set('cpf', testData.VALID_AND_EXISTING_ACCOUNT_CPF)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_BODY_GET_ACCOUNT);
        res.body.should.have.property('cpf').eql(testData.VALID_AND_EXISTING_ACCOUNT_CPF);
        done();
      })
  });

  it('it should get an error object when account is not found (404)', (done) => {
    chai.request(server)
      .get("/account")
      .set('cpf', testData.VALID_AND_NON_EXISTENT_ACCOUNT_CPF)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
        done();
      })
  });

  it('it should get a validation error object when cpf is invalid - JOI (422)', (done) => {
    chai.request(server)
      .get("/account")
      .set('cpf', testData.INVALID_CPF)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
        done();
      })
  });

  it('it should get a validation error object when cpf is missing - JOI (422)', (done) => {
    chai.request(server)
      .get("/account")
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
        done();
      })
  });
});