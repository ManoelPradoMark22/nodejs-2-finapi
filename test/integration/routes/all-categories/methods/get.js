const { chai, server, testData } = require('../../../../support/enum/EnumTestData');

module.exports = () => describe ('GET', () => {
  it('it should GET all categories (200)', (done) => {
    chai.request(server)
      .get("/all-categories")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
      })
  });
});