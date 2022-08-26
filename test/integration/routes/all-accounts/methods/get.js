const { chai, server, testData } = require('../../../config/TestConfig');

module.exports = () => describe ('GET', () => {
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