const { chai, server, testData } = require('../../../config/TestConfig');

module.exports = () => describe ('PUT', () => {
  it('it should PUT an account (200)', (done) => {
    chai.request(server)
      .put("/account")
      .set('cpf', testData.VALID_AND_EXISTING_ACCOUNT_CPF)
      .send(testData.BODY_FULL_PUT_SUCCESS)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_RESPONSE);
        res.body.data.should.be.a('object');
        res.body.data.should.includes.all.keys(testData.ARRAY_KEYS_BODY_GET_ACCOUNT);
        res.body.data.cpf.should.be.eql(testData.VALID_AND_EXISTING_ACCOUNT_CPF);
        res.body.httpStatusCode.should.be.eql(200);
        done();
      })
  });

  it('it should get an error object when trying PUT an account with unique key duplicated (406)', (done) => {
    chai.request(server)
      .put("/account")
      .set('cpf', testData.VALID_AND_EXISTING_ACCOUNT_CPF)
      .send(testData.BODY_FULL_PUT_DUPLICATED_KEY)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_RESPONSE_NO_DATA);
        res.body.httpStatusCode.should.be.eql(406);
        done();
      })
  });

  it('it should get an error object when account is not found (404)', (done) => {
    chai.request(server)
      .put("/account")
      .set('cpf', testData.VALID_AND_NON_EXISTENT_ACCOUNT_CPF)
      .send(testData.BODY_FULL_PUT_SUCCESS)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_RESPONSE_NO_DATA);
        res.body.httpStatusCode.should.be.eql(404);
        done();
      })
  });
});