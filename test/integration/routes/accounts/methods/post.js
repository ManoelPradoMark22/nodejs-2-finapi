const { chai, server, testData } = require('../../../config/TestConfig');

module.exports = () => describe('POST', () => {
  it('it should POST an account (200)', (done) => {           
    chai.request(server)
      .post("/account")
      .send(testData.BODY_FULL_POST_SUCCESS)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_RESPONSE);
        res.body.data.should.be.a('object');
        res.body.data.should.includes.all.keys(testData.ARRAY_KEYS_BODY_GET_ACCOUNT);
        res.body.data.cpf.should.be.eql(testData.BODY_FULL_POST_SUCCESS.cpf);
        res.body.httpStatusCode.should.be.eql(201);
        done();
      })
  });

  it('it should get an error object when trying POST an account with unique key duplicated (406)', (done) => {
    chai.request(server)
      .post("/account")
      .send(testData.BODY_FULL_POST_DUPLICATED_KEY)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_RESPONSE_NO_DATA);
        res.body.httpStatusCode.should.be.eql(406);
        done();
      })
  });
});