const { chai, server, testData } = require('../../../config/TestConfig');

module.exports = () => describe ('GET', () => {
  it('it should GET all accounts (200)', (done) => {
    chai.request(server)
      .get("/all-accounts")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_RESPONSE);
        res.body.data.should.be.a('array');
        res.body.httpStatusCode.should.be.eql(200);
        done();
      })
  });
});