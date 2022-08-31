const { chai, server, testData } = require('../../../../support/enum/EnumTestData');

module.exports = () => describe ('PUT', () => {
  it('it should PUT an account (200)', (done) => {
    chai.request(server)
      .put("/account")
      .set('cpf', testData.VALID_AND_EXISTING_ACCOUNT_CPF)
      .send(testData.BODY_FULL_PUT_SUCCESS)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        done();
      })
  });

  it('it should get an error object when trying PUT an account with unique key duplicated (406)', (done) => {
    chai.request(server)
      .put("/account")
      .set('cpf', testData.VALID_AND_EXISTING_ACCOUNT_CPF)
      .send(testData.BODY_FULL_PUT_DUPLICATED_KEY)
      .end((err, response) => {
        response.should.have.status(406);
        response.body.should.be.a('object');
        response.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
        done();
      })
  });

  it('it should get an error object when account is not found (404)', (done) => {
    chai.request(server)
      .put("/account")
      .set('cpf', testData.VALID_AND_NON_EXISTENT_ACCOUNT_CPF)
      .send(testData.BODY_FULL_PUT_SUCCESS)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
        done();
      })
  });
});