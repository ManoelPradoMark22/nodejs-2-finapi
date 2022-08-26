const { chai, server, testData } = require('../../../config/TestConfig');

module.exports = () => describe('POST', () => {
  it('it should POST an account (200)', (done) => {           
    chai.request(server)
      .post("/account")
      .send(testData.BODY_FULL_POST_SUCCESS)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
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
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
        done();
      })
  });
});